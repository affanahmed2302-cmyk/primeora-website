import urllib.request
import json

# 1. Check Netlify API for active production deploy
url = 'https://api.netlify.com/api/v1/sites/8cb70aac-e601-4086-983a-e7fcb1b8cf79/deploys?per_page=5'
req = urllib.request.Request(url, headers={'Authorization': 'Bearer nfp_MvZmL1z3MYJ9ZsqZTPqGGpfiJvKNx4x29650'})
with urllib.request.urlopen(req) as resp:
    deploys = json.loads(resp.read().decode('utf-8'))

print('=== RECENT NETLIFY DEPLOYS ===')
for d in deploys:
    print(f"ID: {d['id']}, State: {d['state']}, Context: {d['context']}, Branch: {d.get('branch')}, Commit: {d.get('commit_ref')}, Created: {d['created_at']}, Published: {d.get('published_at')}")

# Check site details to see current active deploy
site_url = 'https://api.netlify.com/api/v1/sites/8cb70aac-e601-4086-983a-e7fcb1b8cf79'
req_site = urllib.request.Request(site_url, headers={'Authorization': 'Bearer nfp_MvZmL1z3MYJ9ZsqZTPqGGpfiJvKNx4x29650'})
with urllib.request.urlopen(req_site) as resp:
    site_data = json.loads(resp.read().decode('utf-8'))
    print('\n=== ACTIVE PUBLISHED DEPLOY ON NETLIFY ===')
    print('Published Deploy ID:', site_data.get('published_deploy', {}).get('id'))
    print('Published Deploy Context:', site_data.get('published_deploy', {}).get('context'))
    print('Published Deploy Commit:', site_data.get('published_deploy', {}).get('commit_ref'))
    print('Published Deploy Created At:', site_data.get('published_deploy', {}).get('created_at'))

# 2. Fetch ordinary public URL
print('\n=== ORDINARY FETCH: https://primeora-solutions.netlify.app/robots.txt ===')
url_robots = 'https://primeora-solutions.netlify.app/robots.txt'
req_ord = urllib.request.Request(url_robots, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req_ord) as resp:
        print('HTTP Status:', resp.status)
        print('Headers:')
        for k, v in resp.headers.items():
            print(f'  {k}: {v}')
        body = resp.read().decode('utf-8')
        print('Body:\n' + body)
except Exception as e:
    print('Fetch error:', e)

# 3. Fetch with Cache-Bypass headers
print('\n=== CACHE-BYPASS FETCH: https://primeora-solutions.netlify.app/robots.txt ===')
req_bypass = urllib.request.Request(url_robots, headers={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
    'Pragma': 'no-cache'
})
try:
    with urllib.request.urlopen(req_bypass) as resp:
        print('HTTP Status:', resp.status)
        print('Headers:')
        for k, v in resp.headers.items():
            print(f'  {k}: {v}')
        body = resp.read().decode('utf-8')
        print('Body:\n' + body)
except Exception as e:
    print('Fetch error:', e)
