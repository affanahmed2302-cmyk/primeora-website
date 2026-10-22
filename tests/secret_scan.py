import os
import re
import sys
import subprocess

# Secret scanning validation script for Primeora Solutions
# Scans all tracked repository files to prevent accidental credential leakage.

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SELF_FILENAME = os.path.basename(__file__)
ALLOWED_FILES = {'.env.example'}

# Patterns for credentials
PATTERNS = [
    # Exposed postgres URI with credentials
    (r'postgres(?:ql)?://[^\s:@]+:[^\s:@]+@[^\s/]+', 'PostgreSQL Connection URI with Password'),
    # Generic database URL with credentials
    (r'mysql://[^\s:@]+:[^\s:@]+@[^\s/]+', 'MySQL Connection URI with Password'),
    # Supabase service role key literal in source (starts with eyJhbGciOiJIUzI1Ni... and has length > 100)
    (r'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_\-]{30,}\.[a-zA-Z0-9_\-]{30,}', 'Hardcoded Supabase Service Role JWT'),
    # Private Key header
    (r'-----BEGIN (?:RSA|EC|OPENSSH|PGP) PRIVATE KEY-----', 'Private Key Block'),
    # GitHub Personal Access Token
    (r'ghp_[a-zA-Z0-9]{36}', 'GitHub Personal Access Token'),
    # AWS Secret Access Key
    (r'(?i)aws_secret_access_key\s*=\s*[A-Za-z0-9/+=]{40}', 'AWS Secret Access Key'),
]

def get_tracked_files():
    try:
        res = subprocess.run(['git', 'ls-files'], cwd=REPO_ROOT, capture_output=True, text=True, check=True)
        return [f.strip() for f in res.stdout.splitlines() if f.strip()]
    except Exception:
        # Fallback to os.walk
        tracked = []
        for root, dirs, files in os.walk(REPO_ROOT):
            dirs[:] = [d for d in dirs if d not in {'.git', 'node_modules', '.next', '.netlify'}]
            for f in files:
                tracked.append(os.path.relpath(os.path.join(root, f), REPO_ROOT))
        return tracked

def scan_file(rel_path):
    if os.path.basename(rel_path) in ALLOWED_FILES or os.path.basename(rel_path) == SELF_FILENAME:
        return []

    filepath = os.path.join(REPO_ROOT, rel_path)
    if not os.path.exists(filepath):
        return []

    findings = []
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            for line_no, line in enumerate(f, 1):
                for regex, desc in PATTERNS:
                    if re.search(regex, line):
                        findings.append((rel_path, line_no, desc))
    except Exception:
        pass
    return findings

def main():
    print('====================================================================')
    print('  PRIMEORA SOLUTIONS — AUTOMATED SECRET SCANNER')
    print('====================================================================')
    tracked = get_tracked_files()
    print(f'Scanning {len(tracked)} tracked files in repository...')

    total_findings = []
    for rel_path in tracked:
        findings = scan_file(rel_path)
        if findings:
            total_findings.extend(findings)

    if total_findings:
        print(f'[FAIL] Found {len(total_findings)} potential secret leakage(s):')
        for path, line, desc in total_findings:
            print(f'  - {path}:{line}: {desc} [REDACTED]')
        print('====================================================================')
        sys.exit(1)
    else:
        print('[PASS] Zero hardcoded secrets, connection strings, or credentials found.')
        print('====================================================================')

if __name__ == '__main__':
    main()
