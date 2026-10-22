import time
import os
import sys
from playwright.sync_api import sync_playwright

PROD_URL = "https://primeora-solutions.netlify.app/services"
ARTIFACTS_DIR = r"C:\Users\Dhananjaya\.gemini\antigravity\brain\107427b5-d2da-4cfc-8de3-f87997a94f65\services_qa"
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

PRACTICES = [
    {"num": "01", "id": "digital-presence", "text": "NEXT.JS APP ROUTER // EDGE"},
    {"num": "02", "id": "customer-acquisition", "text": "AEO ENTITY"},
    {"num": "03", "id": "lead-sales-systems", "text": "POSTGRESQL"},
    {"num": "04", "id": "operations-automation", "text": "EVENT BUS"},
    {"num": "05", "id": "analytics-insights", "text": "EXECUTIVE REVENUE"},
    {"num": "06", "id": "ongoing-management", "text": "TURNKEY SYSTEMS STEWARDSHIP"},
]

def main():
    print("====================================================================")
    print("  LIVE PRODUCTION AUDIT — https://primeora-solutions.netlify.app   ")
    print("====================================================================")

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        ctx = browser.new_context(viewport={"width": 1440, "height": 900})
        page = ctx.new_page()

        print(f"Connecting to live production URL: {PROD_URL}")
        page.goto(PROD_URL, wait_until="networkidle")
        time.sleep(1.0)

        # Initial check
        s1 = page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"[Live Initial Stage]: {s1}")
        assert "01 / 06" in s1, f"Expected 01 / 06, got {s1}"

        # Scroll down through all 6 sections
        print("\n[Forward Scrolling on Live Site]...")
        for p_info in PRACTICES:
            match_text = p_info["text"]
            page.evaluate(""" (id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                window.scrollBy(0, rect.top - (window.innerHeight * 0.25));
            } """, p_info["id"])
            time.sleep(0.5)

            stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
            svg_visible = page.locator(f"svg >> text=/{match_text}/").is_visible()
            print(f"  Live -> #{p_info['id']}: Stage = {stage_counter}, SVG matched = {svg_visible}")
            assert f"{p_info['num']} / 06" in stage_counter, f"Expected {p_info['num']} / 06, got {stage_counter}"
            assert svg_visible, f"SVG {match_text} not visible on live site"

        # Reverse scrolling check
        print("\n[Reverse Scrolling on Live Site]...")
        for p_info in reversed(PRACTICES[:-1]):
            match_text = p_info["text"]
            page.evaluate(""" (id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                window.scrollBy(0, rect.top - (window.innerHeight * 0.25));
            } """, p_info["id"])
            time.sleep(0.5)

            stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
            svg_visible = page.locator(f"svg >> text=/{match_text}/").is_visible()
            print(f"  Live <- Reverse #{p_info['id']}: Stage = {stage_counter}, SVG matched = {svg_visible}")
            assert f"{p_info['num']} / 06" in stage_counter
            assert svg_visible

        # Tab click shortcut check
        print("\n[Interactive Tab Click on Live Site]...")
        tab_03 = page.locator("button[role='tab']:has-text('03')")
        tab_03.click()
        time.sleep(1.0)
        stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"Live Tab 03 clicked -> Stage counter: {stage_counter}")
        assert "03 / 06" in stage_counter

        # Take screenshot of live production
        screenshot_path = os.path.join(ARTIFACTS_DIR, "live_prod_services_stage_03.png")
        page.screenshot(path=screenshot_path)
        print(f"Captured live screenshot: {screenshot_path}")

        browser.close()

    print("\n====================================================================")
    print("LIVE PRODUCTION VERIFICATION CONFIRMED: 100% OPERATIONAL")
    print("====================================================================")

if __name__ == "__main__":
    main()
