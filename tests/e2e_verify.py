import urllib.request
import json
import urllib.error

base = 'http://localhost:3000'
results = []

def record(test_name, success, details=''):
    results.append({'test': test_name, 'success': success, 'details': details})
    mark = 'PASS' if success else 'FAIL'
    print(f'[{mark}] {test_name} - {details}')

# 1. Test all public pages
public_routes = [
    '/',
    '/services',
    '/about',
    '/process',
    '/work',
    '/readiness',
    '/insights',
    '/contact',
    '/privacy',
    '/terms',
    '/cookie-preferences',
    '/sitemap.xml',
    '/robots.txt',
]

for path in public_routes:
    try:
        req = urllib.request.Request(base + path)
        with urllib.request.urlopen(req) as resp:
            headers = dict(resp.info())
            record(f'GET {path}', resp.status == 200, f'Status {resp.status}')
    except Exception as e:
        record(f'GET {path}', False, str(e))

# 2. Public Team API
try:
    with urllib.request.urlopen(base + '/api/team') as resp:
        data = json.loads(resp.read().decode())
        members = data.get('members', [])
        record('GET /api/team', data.get('success') and len(members) >= 3, f'Returned {len(members)} published members')
except Exception as e:
    record('GET /api/team', False, str(e))

# 3. Enquiry Validation - Empty Body
try:
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps({}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('POST /api/enquiry (Empty payload)', False, 'Should fail with 400')
except urllib.error.HTTPError as e:
    record('POST /api/enquiry (Empty payload)', e.code == 400, f'Correctly rejected: {e.code}')

# 4. Enquiry Bot Trap - Honeypot filled
try:
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps({
            'fullName': 'Spam Bot',
            'businessName': 'Spam Inc',
            'contactEmail': 'bot@spam.com',
            'problemSummary': 'This should be caught by honeypot',
            '_hp': 'http://spambot.com'
        }).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        record('POST /api/enquiry (Honeypot Bot)', data.get('success') is True, 'Silently discarded bot submission')
except Exception as e:
    record('POST /api/enquiry (Honeypot Bot)', False, str(e))

# 5. Valid Enquiry Submission
try:
    valid_payload = {
        'fullName': 'Akarsh Verification Client',
        'businessName': 'Tech Logistics Ltd',
        'contactEmail': 'client@techlogistics.in',
        'phone': '+91 9876543210',
        'serviceInterest': 'Operations & Automation',
        'problemSummary': 'Need to connect Shopify orders directly to Zoho Books with automated GST invoicing and Slack alerts.',
        'targetTimeline': 'Within 1-2 months'
    }
    req = urllib.request.Request(
        base + '/api/enquiry',
        data=json.dumps(valid_payload).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        enq_id = data.get('enquiryId', '')
        record('POST /api/enquiry (Valid submission)', data.get('success') is True, f'Enquiry ID: {enq_id}')
except Exception as e:
    record('POST /api/enquiry (Valid submission)', False, str(e))

# 6. Admin Authentication
# Bad login attempt
try:
    req = urllib.request.Request(
        base + '/api/admin/login',
        data=json.dumps({'email': 'admin@primeorasolutions.com', 'password': 'wrongpassword'}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    urllib.request.urlopen(req)
    record('POST /api/admin/login (Bad Password)', False, 'Should reject invalid credentials')
except urllib.error.HTTPError as e:
    record('POST /api/admin/login (Bad Password)', e.code == 401, f'Correctly rejected: {e.code}')

# Good login attempt
session_cookie = None
try:
    req = urllib.request.Request(
        base + '/api/admin/login',
        data=json.dumps({'email': 'admin@primeorasolutions.com', 'password': 'ChangeMeInProd2026!'}).encode(),
        headers={'Content-Type': 'application/json'},
        method='POST'
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        for c in resp.headers.get_all('Set-Cookie', []):
            if 'admin_session=' in c:
                session_cookie = c.split(';')[0]
        role = data.get('user', {}).get('role')
        record('POST /api/admin/login (Valid credentials)', data.get('success') is True, f'User Role: {role}')
except Exception as e:
    record('POST /api/admin/login (Valid credentials)', False, str(e))

# 7. Check Admin Protected Routes using Session Cookie
if session_cookie:
    try:
        req = urllib.request.Request(base + '/api/admin/session', headers={'Cookie': session_cookie})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            admin_email = data.get('user', {}).get('email')
            record('GET /api/admin/session', data.get('authenticated') is True, f'Authenticated as {admin_email}')
    except Exception as e:
        record('GET /api/admin/session', False, str(e))

    try:
        req = urllib.request.Request(base + '/api/admin/enquiries', headers={'Cookie': session_cookie})
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            enqs = data.get('enquiries', [])
            record('GET /api/admin/enquiries', data.get('success') is True, f'Found {len(enqs)} enquiries in admin queue')
    except Exception as e:
        record('GET /api/admin/enquiries', False, str(e))

    # Add a team member via admin API
    try:
        new_member = {
            'fullName': 'Consultant Associate',
            'publicTitle': 'Senior Strategy Associate',
            'department': 'Operations',
            'bio': 'Specializes in business process mapping and ERP integrations.',
            'responsibilities': ['Process mapping', 'Client workshops'],
            'displayOrder': 4,
            'status': 'published'
        }
        req = urllib.request.Request(
            base + '/api/admin/team',
            data=json.dumps(new_member).encode(),
            headers={'Content-Type': 'application/json', 'Cookie': session_cookie},
            method='POST'
        )
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            mem_id = data.get('member', {}).get('id')
            record('POST /api/admin/team (Add Member)', data.get('success') is True, f'Created member ID: {mem_id}')
    except Exception as e:
        record('POST /api/admin/team (Add Member)', False, str(e))

    # Verify that the newly added member appears on public /api/team
    try:
        with urllib.request.urlopen(base + '/api/team') as resp:
            data = json.loads(resp.read().decode())
            members = data.get('members', [])
            found_new = any(m.get('fullName') == 'Consultant Associate' for m in members)
            record('Public /api/team reflects CMS addition', found_new, f'Found newly added member among {len(members)} published members')
    except Exception as e:
        record('Public /api/team reflects CMS addition', False, str(e))

# 8. Check Security Headers
try:
    req = urllib.request.Request(base + '/')
    with urllib.request.urlopen(req) as resp:
        headers = dict(resp.info())
        has_xfo = 'X-Frame-Options' in headers or 'x-frame-options' in headers
        has_xcto = 'X-Content-Type-Options' in headers or 'x-content-type-options' in headers
        record('Security Headers (Frame & MIME guard)', has_xfo and has_xcto, f'Frame: {has_xfo}, MIME: {has_xcto}')
except Exception as e:
    record('Security Headers (Frame & MIME guard)', False, str(e))

# Summary
passed = sum(1 for r in results if r['success'])
failed = len(results) - passed
print(f'\n======================================================')
print(f'Total Tests: {len(results)} | Passed: {passed} | Failed: {failed}')
print(f'======================================================')
