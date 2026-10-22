import urllib.request
import re
import sys

URL = 'https://primeora-solutions.netlify.app/robots.txt'

def match_robots_rule(path, rule_pattern):
    regex_pattern = '^'
    i = 0
    while i < len(rule_pattern):
        c = rule_pattern[i]
        if c == '*':
            regex_pattern += '.*'
        elif c == '$' and i == len(rule_pattern) - 1:
            regex_pattern += '$'
        else:
            regex_pattern += re.escape(c)
        i += 1
    if not rule_pattern.endswith('$'):
        regex_pattern += '.*'
    return bool(re.match(regex_pattern, path))

def evaluate_bot(path, rules):
    matching_rules = []
    for directive, pattern in rules:
        if match_robots_rule(path, pattern):
            matching_rules.append((len(pattern), directive, pattern))
    if not matching_rules:
        return True
    matching_rules.sort(key=lambda x: (x[0], 1 if x[1] == 'allow' else 0), reverse=True)
    return matching_rules[0][1] == 'allow'

def test_live_robots():
    print("====================================================================")
    print("  LIVE PRODUCTION ROBOTS.TXT POLICY VERIFICATION                    ")
    print("====================================================================")

    req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    with urllib.request.urlopen(req) as resp:
        status = resp.status
        headers = {k.lower(): v for k, v in resp.headers.items()}
        body = resp.read().decode('utf-8')

    print(f"HTTP Status: {status}")
    print("Key Headers:")
    for h in ['cache-control', 'cache-status', 'etag', 'server', 'x-nf-request-id', 'date']:
        if h in headers:
            print(f"  {h}: {headers[h]}")

    print("\nBody Content:")
    print(body)

    # Basic validations
    assert status == 200, f"Expected 200, got {status}"
    assert '/_next/' not in body, "Error: /_next/ found in robots.txt"
    assert 'User-Agent: *' in body, "Error: User-Agent: * missing"
    assert 'User-Agent: GPTBot' in body, "Error: User-Agent: GPTBot missing"
    assert 'User-Agent: OAI-SearchBot' in body, "Error: User-Agent: OAI-SearchBot missing"
    assert 'User-Agent: PerplexityBot' in body, "Error: User-Agent: PerplexityBot missing"
    assert 'Sitemap: https://primeora-solutions.netlify.app/sitemap.xml' in body, "Error: Sitemap missing"

    # Parse bot rules
    lines = body.splitlines()
    bots = ['*', 'gptbot', 'oai-searchbot', 'perplexitybot']
    bot_rules = {b: [] for b in bots}
    current_bot = None

    for line in lines:
        line = line.strip()
        if line.lower().startswith('user-agent:'):
            agent = line.split(':', 1)[1].strip().lower()
            current_bot = agent if agent in bot_rules else None
        elif current_bot:
            if line.lower().startswith('allow:'):
                bot_rules[current_bot].append(('allow', line.split(':', 1)[1].strip()))
            elif line.lower().startswith('disallow:'):
                bot_rules[current_bot].append(('disallow', line.split(':', 1)[1].strip()))

    public_paths = [
        '/',
        '/services',
        '/services/digital-presence',
        '/services/customer-acquisition',
        '/services/lead-sales-systems',
        '/services/operations-automation',
        '/services/analytics-insights',
        '/services/ongoing-management',
        '/insights',
        '/about',
        '/founders',
        '/process',
        '/work',
        '/readiness',
        '/contact',
        '/_next/static/chunks/main.js'
    ]

    protected_paths = [
        '/admin/',
        '/admin/login',
        '/admin/enquiries',
        '/admin/team',
        '/api/',
        '/api/enquiry',
        '/api/admin/session',
    ]

    print("\nEvaluating crawler access across all bot user agents:")
    for bot in bots:
        assert bot_rules[bot], f"Error: No rules recorded for {bot}"
        # All public paths must be ALLOWED
        for p in public_paths:
            allowed = evaluate_bot(p, bot_rules[bot])
            assert allowed, f"FAIL: {bot} unexpectedly blocked from public path {p}"
        # All protected paths must be DISALLOWED
        for p in protected_paths:
            allowed = evaluate_bot(p, bot_rules[bot])
            assert not allowed, f"FAIL: {bot} unexpectedly permitted to protected path {p}"
        print(f"  [PASS] User-Agent: {bot} -> {len(public_paths)} public routes allowed, {len(protected_paths)} protected routes disallowed.")

    print("\n====================================================================")
    print("ALL LIVE PRODUCTION ROBOTS.TXT DIRECTIVES FULLY VALIDATED (100%)")
    print("====================================================================")

if __name__ == '__main__':
    test_live_robots()
