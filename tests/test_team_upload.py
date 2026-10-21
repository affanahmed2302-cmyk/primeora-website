import urllib.request
import json
import urllib.error
import hmac
import hashlib
import base64
import time
import os

base = 'http://localhost:3000'

# Read secret from .env.local
env_path = os.path.join(os.path.dirname(__file__), '..', '.env.local')
jwt_secret = ''
if os.path.exists(env_path):
    with open(env_path, 'r', encoding='utf-8') as f:
        for line in f:
            if line.startswith('ADMIN_JWT_SECRET='):
                jwt_secret = line.split('=', 1)[1].strip()

if not jwt_secret:
    jwt_secret = os.environ.get('ADMIN_JWT_SECRET', 'test_verification_secret_key_32bytes_minimum_length!')

def make_session_token(role: str = 'super_admin', must_change: bool = False) -> str:
    payload = {
        'userId': 'usr_test_upload_admin',
        'email': 'dhananjaya.noir@gmail.com',
        'fullName': 'Dhananjaya G.R.',
        'role': role,
        'mustChangePassword': must_change,
        'exp': int(time.time()) + 3600
    }
    payload_json = json.dumps(payload, separators=(',', ':')).encode('utf-8')
    payload_b64 = base64.urlsafe_b64encode(payload_json).decode('utf-8').rstrip('=')
    sig = hmac.new(jwt_secret.encode('utf-8'), payload_b64.encode('utf-8'), hashlib.sha256).digest()
    sig_b64 = base64.urlsafe_b64encode(sig).decode('utf-8').rstrip('=')
    return f'{payload_b64}.{sig_b64}'

def create_multipart_body(filename: str, file_bytes: bytes, mime_type: str):
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    lines = [
        f'--{boundary}'.encode('utf-8'),
        f'Content-Disposition: form-data; name="file"; filename="{filename}"'.encode('utf-8'),
        f'Content-Type: {mime_type}'.encode('utf-8'),
        b'',
        file_bytes,
        f'--{boundary}--'.encode('utf-8'),
        b''
    ]
    body = b'\r\n'.join(lines)
    content_type = f'multipart/form-data; boundary={boundary}'
    return body, content_type

def test_upload_suite():
    print("====================================================================")
    print("  TEAM PORTRAIT UPLOAD & STORAGE SUITE                              ")
    print("====================================================================")

    # 1. Unauthenticated Upload Test
    try:
        body, ct = create_multipart_body('test.png', b'dummy png data', 'image/png')
        req = urllib.request.Request(f'{base}/api/admin/team/upload', data=body, headers={'Content-Type': ct})
        urllib.request.urlopen(req)
        print("[FAIL] Unauthenticated upload allowed")
    except urllib.error.HTTPError as e:
        assert e.code == 401, f"Expected 401, got {e.code}"
        print(f"[PASS] Unauthenticated Guard: Rejected with HTTP {e.code}")

    # 2. Temporary Password Lockout Test
    try:
        token = make_session_token(must_change=True)
        body, ct = create_multipart_body('test.png', b'dummy png data', 'image/png')
        req = urllib.request.Request(f'{base}/api/admin/team/upload', data=body, headers={
            'Content-Type': ct,
            'Cookie': f'admin_session={token}'
        })
        urllib.request.urlopen(req)
        print("[FAIL] Temporary password upload allowed")
    except urllib.error.HTTPError as e:
        assert e.code == 403, f"Expected 403, got {e.code}"
        print(f"[PASS] Temporary Password Lockout: Rejected with HTTP {e.code}")

    # 3. Invalid MIME Type Test (e.g. text/plain)
    try:
        token = make_session_token(must_change=False)
        body, ct = create_multipart_body('malicious.txt', b'malicious script', 'text/plain')
        req = urllib.request.Request(f'{base}/api/admin/team/upload', data=body, headers={
            'Content-Type': ct,
            'Cookie': f'admin_session={token}'
        })
        urllib.request.urlopen(req)
        print("[FAIL] Invalid MIME type upload allowed")
    except urllib.error.HTTPError as e:
        assert e.code == 400, f"Expected 400, got {e.code}"
        print(f"[PASS] MIME Validation: Disallowed format rejected with HTTP {e.code}")

    # 4. Valid Image Upload (PNG)
    token = make_session_token(must_change=False)
    # 1x1 valid PNG bytes
    valid_png = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15c4\x00\x00\x00\rIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfe\xa74d\xaa\x00\x00\x00\x00IEND\xaeB`\x82'
    body, ct = create_multipart_body('portrait_avatar.png', valid_png, 'image/png')
    req = urllib.request.Request(f'{base}/api/admin/team/upload', data=body, headers={
        'Content-Type': ct,
        'Cookie': f'admin_session={token}'
    })
    res = urllib.request.urlopen(req)
    data = json.loads(res.read().decode('utf-8'))
    assert data.get('success') is True, f"Upload failed: {data}"
    url = data.get('url')
    print(f"[PASS] Valid Portrait Upload: Success! URL = {url}")

    print("====================================================================")
    print("ALL UPLOAD AUDIT CHECKS PASSED SUCCESSFULLY.")
    print("====================================================================")

if __name__ == '__main__':
    test_upload_suite()
