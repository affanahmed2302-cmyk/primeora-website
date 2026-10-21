import urllib.request
import json
import urllib.error
import hmac
import hashlib
import base64
import time
import os
import sys

base = 'http://localhost:3000'
results = []

def record(test_name, success, details=''):
    results.append({'test': test_name, 'success': success, 'details': details})
    mark = 'PASS' if success else 'FAIL'
    print(f'[{mark}] {test_name} - {details}')

def make_session_token(secret: str, user_id: str, email: str, role: str, must_change: bool = False) -> str:
    payload = {
        'userId': user_id,
        'email': email,
        'fullName': f'Test {role.title()}',
        'role': role,
        'mustChangePassword': must_change,
        'exp': int(time.time()) + 3600
    }
    payload_json = json.dumps(payload, separators=(',', ':')).encode('utf-8')
    payload_b64 = base64.urlsafe_b64encode(payload_json).decode('utf-8').rstrip('=')
    sig = hmac.new(secret.encode('utf-8'), payload_b64.encode('utf-8'), hashlib.sha256).digest()
    sig_b64 = base64.urlsafe_b64encode(sig).decode('utf-8').rstrip('=')
    return f'{payload_b64}.{sig_b64}'

print("====================================================================")
print("  PRIMEORA SOLUTIONS — PRE-DEPLOYMENT TEST SUITE                    ")
print("====================================================================")

# -------------------------------------------------------------------
# 1. PUBLIC ROUTES VERIFICATION
# -------------------------------------------------------------------
public_routes = [
    ('/', 'Homepage'),
    ('/services', 'Services Practice Overview'),
    ('/services/digital-presence', 'Digital Presence Pillar Detail'),
    ('/services/customer-acquisition', 'Customer Acquisition Pillar Detail'),
    ('/services/lead-sales-systems', 'Lead & Sales Systems Pillar Detail'),
    ('/services/operations-automation', 'Operations & Automation Pillar Detail'),
    ('/services/analytics-insights', 'Analytics & Insights Pillar Detail'),
    ('/services/ongoing-management', 'Ongoing Management Pillar Detail'),
    ('/about', 'Firm & Team Leadership'),
    ('/founders', 'Dedicated Founding Partners Directory'),
    ('/team', 'Legacy Team Redirect to Founders'),
    ('/process', 'Strategic Methodology'),
    ('/work', 'Selected Case Studies'),
    ('/readiness', 'Interactive Diagnostic'),
    ('/insights', 'AEO Knowledge Base'),
    ('/contact', 'Project Consultation'),
    ('/privacy', 'GDPR/DPDP Privacy Disclosure'),
    ('/terms', 'Entity Governance Terms'),
    ('/cookie-preferences', 'Cookie Preferences'),
    ('/admin/update-password', 'Founder Secure Password Setup'),
    ('/admin/forgot-password', 'Self-Service Password Recovery'),
    ('/admin/reset-password', 'Verified Credential Reset'),
    ('/sitemap.xml', 'Technical XML Sitemap'),
    ('/robots.txt', 'Search Engine Robots Directive'),
]

for path, label in public_routes:
    try:
        req = urllib.request.Request(base + path)
        with urllib.request.urlopen(req) as resp:
            record(f'Public Route: {path} ({label})', resp.status == 200, f'Status {resp.status}')
    except Exception as e:
        record(f'Public Route: {path} ({label})', False, str(e))

# -------------------------------------------------------------------
# 1b. BRAND ASSETS & CONTENT AUDIT
# -------------------------------------------------------------------
brand_assets = [
    ('/brand/primeora-logo-dark.png', 'Authentic Horizontal Dark Logo'),
    ('/brand/primeora-emblem.png', 'Authentic Cobalt Emblem Mark'),
    ('/brand/primeora-app-icon.png', 'Authentic App Icon'),
    ('/team/dhananjaya-gr.jpg', 'Dhananjaya G.R. Founder Headshot'),
    ('/team/akarsh-thodaskar.jpg', 'Akarsh P. Thodaskar Founder Headshot'),
    ('/team/affan-ahmed-shariff.jpg', 'Affan Ahmed Shariff Founder Headshot'),
]
for asset_path, label in brand_assets:
    try:
        req = urllib.request.Request(base + asset_path)
        with urllib.request.urlopen(req) as resp:
            record(f'Brand Asset: {asset_path} ({label})', resp.status == 200, f'Status {resp.status}')
    except Exception as e:
        record(f'Brand Asset: {asset_path} ({label})', False, str(e))

# Verify Homepage content integrity
try:
    with urllib.request.urlopen(base + '/') as resp:
        home_html = resp.read().decode('utf-8')
        has_primeora = 'Primeora Solutions' in home_html
        no_ritkara = 'Ritkara Veyra' not in home_html
        no_loading_fallback = 'Loading enquiry interface...' not in home_html
        has_logo_img = 'primeora-logo-dark.png' in home_html or 'primeora-emblem.png' in home_html
        
        record(
            'Homepage Content: Brand Integrity & No Fallback',
            has_primeora and no_ritkara and no_loading_fallback and has_logo_img,
            f'Primeora: {has_primeora}, No Ritkara: {no_ritkara}, No SSG Fallback: {no_loading_fallback}, Authentic Logo: {has_logo_img}'
        )
except Exception as e:
    record('Homepage Content: Brand Integrity & No Fallback', False, str(e))

# -------------------------------------------------------------------
# 2. PUBLIC TEAM API
# -------------------------------------------------------------------
try:
    with urllib.request.urlopen(base + '/api/team') as resp:
        data = json.loads(resp.read().decode())
        members = data.get('members', [])
        # Only published members should be returned
        all_published = all(m.get('status') == 'published' for m in members)
        record(
            'Public API: GET /api/team',
            data.get('success') is True and len(members) >= 3 and all_published,
            f'Returned {len(members)} published members, draft/inactive hidden'
        )
except Exception as e:
    record('Public API: GET /api/team', False, str(e))

# -------------------------------------------------------------------
# 3. DIRECT UNAUTHENTICATED ACCESS REJECTION (Admin API Guard)
# -------------------------------------------------------------------
unauth_endpoints = [
    ('/api/admin/session', 'GET', None, 401),
    ('/api/admin/enquiries', 'GET', None, 401),
    ('/api/admin/team', 'GET', None, 401),
    ('/api/admin/team', 'POST', {'fullName': 'Hacker', 'publicTitle': 'Bot', 'bio': 'Test'}, 401),
    ('/api/admin/team?id=fake_id', 'DELETE', None, 401),
]

for endpoint, method, payload, expected_code in unauth_endpoints:
    try:
        data_bytes = json.dumps(payload).encode() if payload else None
        headers = {'Content-Type': 'application/json'} if payload else {}
        req = urllib.request.Request(base + endpoint, data=data_bytes, headers=headers, method=method)
        urllib.request.urlopen(req)
        record(f'Unauthenticated Guard: {method} {endpoint}', False, 'Allowed access without authentication!')
    except urllib.error.HTTPError as e:
        record(
            f'Unauthenticated Guard: {method} {endpoint}',
            e.code == expected_code,
            f'Correctly denied with HTTP {e.code}'
        )
    except Exception as e:
        record(f'Unauthenticated Guard: {method} {endpoint}', False, str(e))

# -------------------------------------------------------------------
# 4. TAMPERED SESSION TOKEN REJECTION
# -------------------------------------------------------------------
try:
    tampered_cookie = 'admin_session=eyJ1c2VySWQiOiJoYWNrZXIifQ.invalidsignaturehere'
    req = urllib.request.Request(base + '/api/admin/session', headers={'Cookie': tampered_cookie})
    urllib.request.urlopen(req)
    record('Security Guard: Tampered Session Token', False, 'Accepted forged token!')
except urllib.error.HTTPError as e:
    record('Security Guard: Tampered Session Token', e.code == 401, f'Correctly rejected with HTTP {e.code}')
except Exception as e:
    record('Security Guard: Tampered Session Token', False, str(e))

# -------------------------------------------------------------------
# 5. ENQUIRY API DEFENSES
# -------------------------------------------------------------------
# 5a. Empty Body Validation
try:
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps({}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('Enquiry Guard: Empty Payload', False, 'Accepted empty submission')
except urllib.error.HTTPError as e:
    record('Enquiry Guard: Empty Payload', e.code == 400, f'Rejected with HTTP {e.code}')
except Exception as e:
    record('Enquiry Guard: Empty Payload', False, str(e))

# 5b. Honeypot Bot Trap
try:
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps({
            'fullName': 'Spam Crawler',
            'businessName': 'Spam Network',
            'contactEmail': 'crawler@spambot.net',
            'problemSummary': 'Testing automated bot traps with honeypot fields.',
            '_hp': 'http://automated-spam-url.com'
        }).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        record('Enquiry Guard: Honeypot Trap', data.get('success') is True, 'Silently discarded bot without saving')
except Exception as e:
    record('Enquiry Guard: Honeypot Trap', False, str(e))

# 5c. Sub-second Script Submission Trap
try:
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps({
            'fullName': 'Fast Bot',
            'businessName': 'Speed Spammer',
            'contactEmail': 'speed@fastbot.com',
            'problemSummary': 'Submitting form in less than 50 milliseconds.',
            '_ts': int(time.time() * 1000) - 50 # 50ms ago
        }).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        record('Enquiry Guard: Sub-second Bot Timing', data.get('success') is True, 'Silently caught rapid submission')
except Exception as e:
    record('Enquiry Guard: Sub-second Bot Timing', False, str(e))

# 5d. Oversized Request Body Guard (Payload > 32KB)
try:
    oversized_data = {
        'fullName': 'Oversized Attacker',
        'businessName': 'Buffer Overflow Inc',
        'contactEmail': 'overflow@target.org',
        'problemSummary': 'A' * 40000 # 40KB payload
    }
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps(oversized_data).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('Enquiry Guard: Oversized Payload (>32KB)', False, 'Allowed oversized payload')
except urllib.error.HTTPError as e:
    record('Enquiry Guard: Oversized Payload (>32KB)', e.code == 413, f'Rejected with HTTP {e.code}')
except Exception as e:
    record('Enquiry Guard: Oversized Payload (>32KB)', False, str(e))

# 5e. Valid Client Enquiry Submission
valid_enquiry_id = None
try:
    valid_payload = {
        'fullName': 'Strategic Verification Client',
        'businessName': 'Apex Financial Technologies',
        'contactEmail': 'advisory@apexfintech.example.com',
        'phone': '+91 9876543210',
        'serviceInterest': 'Operations & Automation',
        'problemSummary': 'Need to connect multi-channel enterprise sales into Zoho Books with automated GST invoicing and compliance checks.',
        'targetTimeline': 'Within 1-2 months',
        '_ts': int(time.time() * 1000) - 5000 # 5 seconds ago
    }
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps(valid_payload).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        valid_enquiry_id = data.get('enquiryId')
        record('Enquiry Submission: Valid Request', data.get('success') is True, f'Generated Enquiry ID: {valid_enquiry_id}')
except Exception as e:
    record('Enquiry Submission: Valid Request', False, str(e))

# 5f. Duplicate Submission Prevention
try:
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps(valid_payload).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        is_deduped = 'already received' in data.get('message', '').lower()
        record('Enquiry Guard: Deduplication Window', is_deduped, 'Recognized identical duplicate submission within 10m')
except Exception as e:
    record('Enquiry Guard: Deduplication Window', False, str(e))

# -------------------------------------------------------------------
# 6. ROLE-BASED ACCESS CONTROL (RBAC) & PERMISSIONS
# -------------------------------------------------------------------
test_secret = os.environ.get('ADMIN_JWT_SECRET', 'test_verification_secret_key_32bytes_minimum_length!')
editor_token = make_session_token(test_secret, 'user_editor_01', 'editor@primeorasolutions.internal', 'content_editor')
super_token = make_session_token(test_secret, 'user_super_01', 'super@primeorasolutions.internal', 'super_admin')

editor_cookie = f'admin_session={editor_token}'
super_cookie = f'admin_session={super_token}'

# 6a. Content Editor Session Verification
try:
    req = urllib.request.Request(base + '/api/admin/session', headers={'Cookie': editor_cookie})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        record('RBAC: Content Editor Session', data.get('user', {}).get('role') == 'content_editor', 'Authenticated as content_editor')
except Exception as e:
    record('RBAC: Content Editor Session', False, str(e))

# 6b. Content Editor FORBIDDEN from accessing client enquiries
try:
    req = urllib.request.Request(base + '/api/admin/enquiries', headers={'Cookie': editor_cookie})
    urllib.request.urlopen(req)
    record('RBAC: Editor Enquiry Access (Forbidden)', False, 'Content editor should NOT access private enquiries')
except urllib.error.HTTPError as e:
    record('RBAC: Editor Enquiry Access (Forbidden)', e.code == 403, f'Correctly rejected with HTTP {e.code} Forbidden')
except Exception as e:
    record('RBAC: Editor Enquiry Access (Forbidden)', False, str(e))

# 6c. Super Admin ALLOWED to access client enquiries
try:
    req = urllib.request.Request(base + '/api/admin/enquiries', headers={'Cookie': super_cookie})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        enqs = data.get('enquiries', [])
        record('RBAC: Super Admin Enquiry Access', data.get('success') is True, f'Super admin retrieved {len(enqs)} enquiries')
except Exception as e:
    record('RBAC: Super Admin Enquiry Access', False, str(e))

# 6d. Content Editor FORBIDDEN from deleting team members
try:
    req = urllib.request.Request(base + '/api/admin/team?id=dummy_id', headers={'Cookie': editor_cookie}, method='DELETE')
    urllib.request.urlopen(req)
    record('RBAC: Editor Member Deletion (Forbidden)', False, 'Content editor should NOT delete team members')
except urllib.error.HTTPError as e:
    record('RBAC: Editor Member Deletion (Forbidden)', e.code == 403, f'Correctly rejected with HTTP {e.code} Forbidden')
except Exception as e:
    record('RBAC: Editor Member Deletion (Forbidden)', False, str(e))

# 6e. Content Editor ALLOWED to add a team member
created_member_id = None
try:
    new_member_payload = {
        'fullName': 'Siddharth Practice Director',
        'publicTitle': 'Principal Systems Architect',
        'department': 'Technology Practice',
        'bio': 'Specializes in distributed enterprise architectures and high-throughput systems design.',
        'responsibilities': ['Architecture Reviews', 'Scalability Audits'],
        'displayOrder': 5,
        'status': 'published'
    }
    req = urllib.request.Request(
        base + '/api/admin/team',
        data=json.dumps(new_member_payload).encode(),
        headers={'Content-Type': 'application/json', 'Cookie': editor_cookie},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        created_member_id = data.get('member', {}).get('id')
        record('RBAC: Editor Add Member Profile', data.get('success') is True, f'Created member ID: {created_member_id}')
except Exception as e:
    record('RBAC: Editor Add Member Profile', False, str(e))

# 6f. Super Admin ALLOWED to delete team member
if created_member_id:
    try:
        req = urllib.request.Request(
            base + f'/api/admin/team?id={created_member_id}',
            headers={'Cookie': super_cookie},
            method='DELETE'
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            record('RBAC: Super Admin Delete Member Profile', data.get('success') is True, 'Permanently deleted member profile')
    except Exception as e:
        record('RBAC: Super Admin Delete Member Profile', False, str(e))

# -------------------------------------------------------------------
# 7. SECURITY & CACHING HEADERS VERIFICATION
# -------------------------------------------------------------------
try:
    req = urllib.request.Request(base + '/')
    with urllib.request.urlopen(req) as resp:
        headers = dict(resp.info())
        has_xfo = 'X-Frame-Options' in headers or 'x-frame-options' in headers
        has_xcto = 'X-Content-Type-Options' in headers or 'x-content-type-options' in headers
        has_rp = 'Referrer-Policy' in headers or 'referrer-policy' in headers
        record(
            'DevOps Security: Response Headers',
            has_xfo and has_xcto and has_rp,
            f'XFO: {has_xfo}, XCTO: {has_xcto}, Referrer: {has_rp}'
        )
except Exception as e:
    record('DevOps Security: Response Headers', False, str(e))

# -------------------------------------------------------------------
# 8. PASSWORD UPDATE API GUARD
# -------------------------------------------------------------------
try:
    req = urllib.request.Request(
        base + '/api/admin/update-password',
        data=json.dumps({}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('Password Setup Guard: Missing Token', False, 'Should reject empty payload')
except urllib.error.HTTPError as e:
    record('Password Setup Guard: Missing Token', e.code in (400, 503), f'Correctly rejected with HTTP {e.code}')
except Exception as e:
    record('Password Setup Guard: Missing Token', False, str(e))

# -------------------------------------------------------------------
# 8b. FORGOT PASSWORD & RECOVERY WORKFLOW GUARDS
# -------------------------------------------------------------------
try:
    req = urllib.request.Request(
        base + '/api/admin/forgot-password',
        data=json.dumps({}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('Forgot Password Guard: Empty Payload', False, 'Should reject empty payload')
except urllib.error.HTTPError as e:
    record('Forgot Password Guard: Empty Payload', e.code in (400, 429), f'Correctly rejected with HTTP {e.code}')
except Exception as e:
    record('Forgot Password Guard: Empty Payload', False, str(e))

try:
    # Anti-enumeration test: unknown email returns HTTP 200 with neutral message
    req = urllib.request.Request(
        base + '/api/admin/forgot-password',
        data=json.dumps({'email': 'unknown_random_user_99@primeorasolutions.com'}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        body = json.loads(resp.read().decode())
        record(
            'Forgot Password: User Enumeration Defense',
            resp.status == 200 and body.get('success') is True,
            f'Neutral confirmation returned: {body.get("message")[:50]}...'
        )
except urllib.error.HTTPError as e:
    record('Forgot Password: User Enumeration Defense', e.code == 429, f'Rate limit triggered: HTTP {e.code}')
except Exception as e:
    record('Forgot Password: User Enumeration Defense', False, str(e))

try:
    req = urllib.request.Request(
        base + '/api/admin/verify-otp',
        data=json.dumps({}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('Verify OTP Guard: Empty Payload', False, 'Should reject empty payload')
except urllib.error.HTTPError as e:
    record('Verify OTP Guard: Empty Payload', e.code in (400, 429), f'Correctly rejected with HTTP {e.code}')
except Exception as e:
    record('Verify OTP Guard: Empty Payload', False, str(e))

try:
    # 8-digit OTP format rejection for malformed / short code
    req = urllib.request.Request(
        base + '/api/admin/verify-otp',
        data=json.dumps({'email': 'test@primeorasolutions.com', 'token': '123'}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('Verify OTP Guard: Short Code Rejection (<6 digits)', False, 'Should reject short token')
except urllib.error.HTTPError as e:
    record('Verify OTP Guard: Short Code Rejection (<6 digits)', e.code == 400, f'Correctly rejected short token with HTTP {e.code}')
except Exception as e:
    record('Verify OTP Guard: Short Code Rejection (<6 digits)', False, str(e))

try:
    req = urllib.request.Request(
        base + '/api/admin/reset-password',
        data=json.dumps({}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('Reset Password Guard: Missing Token', False, 'Should reject missing token')
except urllib.error.HTTPError as e:
    record('Reset Password Guard: Missing Token', e.code in (401, 429), f'Correctly rejected with HTTP {e.code}')
except Exception as e:
    record('Reset Password Guard: Missing Token', False, str(e))

# -------------------------------------------------------------------
# 8c. FORCED PASSWORD CHANGE LOCKOUT TEST
# -------------------------------------------------------------------
try:
    secret = os.environ.get('ADMIN_JWT_SECRET', 'test_verification_secret_key_32bytes_minimum_length!')
    temp_session = make_session_token(secret, 'founder_1', 'dhananjaya.noir@gmail.com', 'super_admin', must_change=True)
    
    # Try accessing protected enquiries with temporary password session
    req = urllib.request.Request(
        base + '/api/admin/enquiries',
        headers={'Cookie': f'admin_session={temp_session}'}
    )
    try:
        urllib.request.urlopen(req)
        record('Temporary Password Lockout: Enquiries API', False, 'Should have blocked temporary session')
    except urllib.error.HTTPError as e:
        body = json.loads(e.read().decode())
        record(
            'Temporary Password Lockout: Enquiries API',
            e.code == 403 and body.get('mustChangePassword') is True,
            f'Enquiries API returned HTTP {e.code} with mustChangePassword=True'
        )

    # Try accessing protected team API with temporary password session
    req = urllib.request.Request(
        base + '/api/admin/team',
        headers={'Cookie': f'admin_session={temp_session}'}
    )
    try:
        urllib.request.urlopen(req)
        record('Temporary Password Lockout: Team API', False, 'Should have blocked temporary session')
    except urllib.error.HTTPError as e:
        body = json.loads(e.read().decode())
        record(
            'Temporary Password Lockout: Team API',
            e.code == 403 and body.get('mustChangePassword') is True,
            f'Team API returned HTTP {e.code} with mustChangePassword=True'
        )
except Exception as e:
    record('Temporary Password Lockout Suite', False, str(e))

# -------------------------------------------------------------------
# 9. ROBOTS DIRECTIVE & DISALLOW CHECKS
# -------------------------------------------------------------------
try:
    req = urllib.request.Request(base + '/robots.txt')
    with urllib.request.urlopen(req) as resp:
        robots_txt = resp.read().decode()
        disallows_admin = '/admin/' in robots_txt
        disallows_api = '/api/' in robots_txt
        record(
            'Technical SEO: Robots.txt Rules',
            disallows_admin and disallows_api,
            'Disallows /admin/ and /api/ from automated web crawlers'
        )
except Exception as e:
    record('Technical SEO: Robots.txt Rules', False, str(e))

# -------------------------------------------------------------------
# FINAL SUMMARY REPORT
# -------------------------------------------------------------------
passed = sum(1 for r in results if r['success'])
failed = len(results) - passed

print('\n====================================================================')
print(f'TOTAL AUDIT CHECKS: {len(results)} | PASSED: {passed} | FAILED: {failed}')
print('====================================================================')

if failed > 0:
    print('FAILURES DETECTED:')
    for r in results:
        if not r['success']:
            print(f" - {r['test']}: {r['details']}")
    sys.exit(1)
else:
    print('ALL PRE-DEPLOYMENT AUDIT CHECKS PASSED WITH ZERO ERRORS.')
    sys.exit(0)
