import subprocess
import time
import os

chrome_path = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
output_dir = r'C:\Users\Dhananjaya\.gemini\antigravity\brain\107427b5-d2da-4cfc-8de3-f87997a94f65\screenshots'
os.makedirs(output_dir, exist_ok=True)

targets = [
    # (Route, Name, Width, Height)
    ('http://localhost:3000/', 'home-desktop-1440', 1440, 900),
    ('http://localhost:3000/', 'home-laptop-1280', 1280, 800),
    ('http://localhost:3000/', 'home-tablet-768', 768, 1024),
    ('http://localhost:3000/', 'home-mobile-390', 390, 844),
    ('http://localhost:3000/services', 'services-desktop-1440', 1440, 900),
    ('http://localhost:3000/team', 'team-desktop-1440', 1440, 900),
    ('http://localhost:3000/team', 'team-mobile-390', 390, 844),
    ('http://localhost:3000/process', 'process-desktop-1440', 1440, 900),
    ('http://localhost:3000/process', 'process-mobile-390', 390, 844),
    ('http://localhost:3000/contact', 'contact-desktop-1440', 1440, 900),
    ('http://localhost:3000/contact', 'contact-mobile-390', 390, 844),
]

def capture_screenshots():
    print(f"Capturing {len(targets)} multi-viewport screenshots via Chrome Headless...")
    for url, name, w, h in targets:
        out_file = os.path.join(output_dir, f"{name}.png")
        cmd = [
            chrome_path,
            '--headless=new',
            '--disable-gpu',
            '--no-sandbox',
            '--hide-scrollbars',
            f'--window-size={w},{h}',
            f'--screenshot={out_file}',
            url
        ]
        res = subprocess.run(cmd, capture_output=True, text=True)
        size_kb = os.path.getsize(out_file) / 1024 if os.path.exists(out_file) else 0
        print(f"Captured: {name}.png ({w}x{h}) - {size_kb:.1f} KB")

if __name__ == '__main__':
    capture_screenshots()
