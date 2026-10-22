"""
PRIMEORA SOLUTIONS — MFA ENDPOINTS & RECOVERY VERIFICATION TEST
"""

import os
import sys
import json
import time
import base64
import hmac
import hashlib
import urllib.request
import urllib.error

BASE_URL = os.environ.get("TEST_BASE_URL", "http://127.0.0.1:3000")

def load_env_secret():
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    if os.path.exists(env_file):
        with open(env_file, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line.startswith("ADMIN_JWT_SECRET="):
                    return line.split("=", 1)[1].strip().strip('"\'')
    return os.environ.get("ADMIN_JWT_SECRET", "primeora_test_ephemeral_secret_key_32_chars_min_1234567")

SECRET_KEY = load_env_secret()

def generate_test_token(userId="7d3a5fe2-f074-48b6-9d2f-a25f8ac7be56", email="dhananjayagr99@gmail.com"):
    exp = int(time.time()) + 3600
    payload = {
        "userId": userId,
        "email": email,
        "fullName": "Dhananjaya G.R.",
        "role": "super_admin",
        "mustChangePassword": False,
        "aal": "aal2",
        "exp": exp
    }
    payload_json = json.dumps(payload).encode('utf-8')
    payload_b64 = base64.urlsafe_b64encode(payload_json).decode('utf-8').rstrip('=')
    sig = hmac.new(SECRET_KEY.encode('utf-8'), payload_b64.encode('utf-8'), hashlib.sha256).digest()
    sig_b64 = base64.urlsafe_b64encode(sig).decode('utf-8').rstrip('=')
    return f"{payload_b64}.{sig_b64}"

def test_mfa():
    print("=" * 70)
    print("  PRIMEORA SOLUTIONS — MFA ENDPOINTS TEST")
    print(f"  Target: {BASE_URL}")
    print("=" * 70)

    token = generate_test_token()

    # 1. Test MFA status
    req = urllib.request.Request(
        f"{BASE_URL}/api/admin/mfa/status",
        headers={"Cookie": f"admin_session={token}"}
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        print("MFA Status Response:", data.get('mfa', data))
        assert resp.status == 200
        print("  PASS: Authenticated /api/admin/mfa/status returned 200")

    # 2. Test MFA recovery endpoint
    rec_payload = json.dumps({
        "action": "verify_and_reset",
        "email": "dhananjayagr99@gmail.com",
        "code": "invalid_code"
    }).encode()
    rec_req = urllib.request.Request(
        f"{BASE_URL}/api/admin/mfa/recovery",
        data=rec_payload,
        headers={
            "Content-Type": "application/json",
            "Origin": BASE_URL,
            "X-Primeora-CSRF": "1"
        },
        method="POST"
    )
    try:
        with urllib.request.urlopen(rec_req) as resp:
            pass
    except urllib.error.HTTPError as e:
        print(f"Recovery invalid code check status: {e.code}")
        assert e.code in [400, 401]
        print("  PASS: Invalid recovery code rejected")

    print("\n" + "=" * 70)
    print("  ALL MFA ENDPOINT TESTS PASSED!")
    print("=" * 70)

if __name__ == "__main__":
    test_mfa()
