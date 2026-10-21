import urllib.request
import re
import sys

BASE_URL = 'http://localhost:3000'

def check_gsc_meta_tag():
    req = urllib.request.Request(f'{BASE_URL}/', headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    token = '7AhatRTBjoTbSTNy1aAZIRTfWNqjeg_xWMHGDlKnm2c'
    old_token = 'hTCnMz5vc2nFRVRMEq1KG_euIlxn-Xcj91N9b_D5bog'
    assert old_token not in html, f'Error: Old GSC token {old_token} still present in HTML!'
    assert f'name="google-site-verification" content="{token}"' in html or f'content="{token}" name="google-site-verification"' in html, \
        f'GSC verification meta tag with token {token} missing or invalid in {BASE_URL}/'
    print(f'[PASS] Google Search Console verification meta tag confirmed with new token: {token}')

def check_robots_txt():
    req = urllib.request.Request(f'{BASE_URL}/robots.txt', headers={'User-Agent': 'Mozilla/5.0'})
    txt = urllib.request.urlopen(req).read().decode('utf-8')
    assert '/_next/' not in txt, 'Error: /_next/ is still blocked in robots.txt!'
    assert 'User-Agent: OAI-SearchBot' in txt, 'Error: OAI-SearchBot rule missing in robots.txt!'
    assert 'User-Agent: GPTBot' in txt, 'Error: GPTBot rule missing in robots.txt!'
    assert 'User-Agent: PerplexityBot' in txt, 'Error: PerplexityBot rule missing in robots.txt!'
    assert 'Disallow: /admin/' in txt and 'Disallow: /api/' in txt, 'Error: Admin/API routes not disallowed in robots.txt!'
    assert 'Allow: /insights' in txt or 'Allow: /services' in txt, 'Error: Training crawler specific allow paths missing!'
    assert 'Sitemap: https://primeora-solutions.netlify.app/sitemap.xml' in txt, 'Error: Canonical sitemap link missing!'
    print('[PASS] Robots.txt directives confirmed: /_next/ unblocked, OAI-SearchBot/GPTBot/PerplexityBot enabled, admin/api protected.')

def check_no_unqualified_fcp():
    path = r'src/components/motion/DigitalSystemsMap.tsx'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    assert '< 800ms First Contentful Paint' not in content, 'Error: unqualified FCP metric still present!'
    assert 'Edge-Rendered Asset Delivery' in content, 'Error: Edge-Rendered Asset Delivery metric missing!'
    print('[PASS] DigitalSystemsMap metric qualified to Edge-Rendered Asset Delivery.')

def check_analytics_module():
    path = r'src/lib/analytics.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    assert 'G-9JN6EWLSXV' in content, 'Error: G-9JN6EWLSXV measurement ID fallback missing in analytics.ts!'
    assert 'primeora_cookie_consent_v1' in content, 'Error: Cookie consent check missing in analytics.ts!'
    assert 'trackEvent' in content and 'trackPageView' in content, 'Error: Helper methods missing in analytics.ts!'
    print('[PASS] Centralized analytics module confirmed with G-9JN6EWLSXV fallback and cookie gating.')

def check_auth_security_boundary():
    # Verify that admin routes and APIs are strictly protected by authentication
    endpoints = [
        ('/api/admin/session', 401),
        ('/api/admin/enquiries', 401),
        ('/api/admin/team', 401),
    ]
    for ep, expected_code in endpoints:
        req = urllib.request.Request(f'{BASE_URL}{ep}')
        try:
            res = urllib.request.urlopen(req)
            assert False, f'Error: {ep} returned {res.status} without auth token!'
        except urllib.error.HTTPError as e:
            assert e.code == expected_code, f'Error: {ep} expected {expected_code}, got {e.code}'
    print('[PASS] Security boundary verified: Sensitive administrative APIs return HTTP 401 without auth token.')

if __name__ == '__main__':
    print('====================================================================')
    print('  PRIMEORA SOLUTIONS — SEO, AEO, GEO & GA4 VERIFICATION')
    print('====================================================================')
    try:
        check_gsc_meta_tag()
        check_robots_txt()
        check_no_unqualified_fcp()
        check_analytics_module()
        check_auth_security_boundary()
        print('====================================================================')
        print('ALL SEO, AEO, GEO & GA4 CHECKS PASSED SUCCESSFULLY (5/5)')
        print('====================================================================')
    except Exception as e:
        print(f'[FAIL] {e}')
        sys.exit(1)
