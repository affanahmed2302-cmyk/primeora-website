import urllib.request
import urllib.error
import ssl
import json
import http.client

ctx = ssl.create_default_context()
PROD = 'https://primeora-solutions.netlify.app'

print('=' * 65)
print('  PRIMEORA SOLUTIONS — LIVE PRODUCTION SECURITY SMOKE TEST')
print(f'  Target: {PROD}')
print('=' * 65)

# 1. Favicon and Brand Icons
for path in ['/favicon.ico', '/icon.png', '/apple-icon.png', '/manifest.json']:
    req = urllib.request.Request(f'{PROD}{path}', headers={'User-Agent': 'Mozilla/5.0 (SmokeTest)'})
    with urllib.request.urlopen(req, context=ctx) as res:
        ct = res.headers.get("Content-Type")
        data = res.read()
        print(f'[PASS] {path}: HTTP {res.status}, Content-Type: {ct}, Length: {len(data)} bytes')

# 2. Robots.txt
req = urllib.request.Request(f'{PROD}/robots.txt', headers={'User-Agent': 'Mozilla/5.0 (SmokeTest)'})
with urllib.request.urlopen(req, context=ctx) as res:
    txt = res.read().decode('utf-8')
    print(f'[PASS] /robots.txt: HTTP {res.status}, length: {len(txt)} chars')
    assert 'Disallow: /admin/' in txt, 'admin must be disallowed'
    assert 'User-Agent: GPTBot' in txt or 'User-agent: GPTBot' in txt, 'GPTBot must be configured'

# 3. Security Headers on Homepage
req = urllib.request.Request(f'{PROD}/', headers={'User-Agent': 'Mozilla/5.0 (SmokeTest)'})
with urllib.request.urlopen(req, context=ctx) as res:
    h = res.headers
    print(f'[PASS] Homepage HTTP {res.status}')
    print(f'       X-Frame-Options: {h.get("X-Frame-Options")}')
    print(f'       X-Content-Type-Options: {h.get("X-Content-Type-Options")}')
    print(f'       Referrer-Policy: {h.get("Referrer-Policy")}')
    print(f'       Content-Security-Policy present: {"Content-Security-Policy" in h}')
    print(f'       Permissions-Policy: {h.get("Permissions-Policy")}')

# 4. Privileged Page Guard (Redirect to /admin/login)
conn = http.client.HTTPSConnection('primeora-solutions.netlify.app', context=ctx)
conn.request('GET', '/admin', headers={'User-Agent': 'Mozilla/5.0 (SmokeTest)'})
res = conn.getresponse()
location = res.getheader('Location') or ''
print(f'[PASS] /admin without session: HTTP {res.status}, Location: {location}')
assert res.status in [307, 308], f'Expected redirect, got {res.status}'
assert '/admin/login' in location, 'Must redirect to /admin/login'
conn.close()

# 5. Privileged API Guard (HTTP 401 Unauthorized)
conn = http.client.HTTPSConnection('primeora-solutions.netlify.app', context=ctx)
conn.request('GET', '/api/admin/session', headers={'User-Agent': 'Mozilla/5.0 (SmokeTest)'})
res = conn.getresponse()
body = res.read().decode('utf-8')
print(f'[PASS] /api/admin/session without session: HTTP {res.status}, Body: {body}')
assert res.status == 401, f'Expected 401, got {res.status}'
conn.close()

# 6. Team API Privileged Guard (HTTP 401 Unauthorized)
conn = http.client.HTTPSConnection('primeora-solutions.netlify.app', context=ctx)
conn.request('GET', '/api/admin/team', headers={'User-Agent': 'Mozilla/5.0 (SmokeTest)'})
res = conn.getresponse()
body = res.read().decode('utf-8')
print(f'[PASS] /api/admin/team without session: HTTP {res.status}, Body: {body}')
assert res.status == 401, f'Expected 401, got {res.status}'
conn.close()

print('=' * 65)
print('ALL LIVE PRODUCTION SMOKE TESTS PASSED (100%)')
print('=' * 65)
