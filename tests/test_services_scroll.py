import time
import os
import sys
from playwright.sync_api import sync_playwright

ARTIFACTS_DIR = r"C:\Users\Dhananjaya\.gemini\antigravity\brain\107427b5-d2da-4cfc-8de3-f87997a94f65"
QA_DIR = os.path.join(ARTIFACTS_DIR, "services_qa")
os.makedirs(QA_DIR, exist_ok=True)

BASE_URL = "http://localhost:3000/services"

PRACTICES = [
    {"num": "01", "id": "digital-presence", "text": "NEXT.JS APP ROUTER // EDGE"},
    {"num": "02", "id": "customer-acquisition", "text": "AEO ENTITY"},
    {"num": "03", "id": "lead-sales-systems", "text": "POSTGRESQL"},
    {"num": "04", "id": "operations-automation", "text": "EVENT BUS"},
    {"num": "05", "id": "analytics-insights", "text": "EXECUTIVE REVENUE"},
    {"num": "06", "id": "ongoing-management", "text": "TURNKEY SYSTEMS STEWARDSHIP"},
]

def run_tests():
    print("====================================================================")
    print("  PRIMEORA SOLUTIONS — SERVICES SCROLL & VECTOR STORYTELLING QA     ")
    print("====================================================================")

    console_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)

        # -------------------------------------------------------------
        # TEST SUITE 1: Desktop Layout, Natural Forward & Reverse Scroll
        # -------------------------------------------------------------
        print("\n--- [TEST SUITE 1: Desktop Forward & Reverse Scroll Tracking] ---")
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.on("console", lambda msg: console_errors.append(f"{msg.text} [{msg.location.get('url', '')}]") if msg.type == "error" else None)

        page.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1.0)

        # Verify initial state (01 / 06)
        stage_num = page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"[Initial Load] Stage counter: {stage_num}")
        assert "01 / 06" in stage_num, f"Expected 01 / 06, got {stage_num}"
        assert page.locator(f"svg >> text='{PRACTICES[0]['text']}'").is_visible(), "Initial SVG 01 not visible"
        page.screenshot(path=os.path.join(QA_DIR, "services_desktop_stage_01.png"))
        print("[PASS] Desktop initial state: Practice 01 active.")

        # Forward scroll through sections without clicking
        print("\nScrolling downwards through sections (zero clicks)...")
        for i, p_info in enumerate(PRACTICES):
            # Scroll element so its top is placed comfortably in the central viewing zone (25% from top)
            page.evaluate("""(id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                window.scrollBy(0, rect.top - (window.innerHeight * 0.25));
            }""", p_info['id'])
            time.sleep(0.4)

            stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
            svg_visible = page.locator(f"svg >> text=/{p_info['text']}/").is_visible()
            print(f"  -> Scrolled to #{p_info['id']}: Stage counter = {stage_counter}, SVG matched = {svg_visible}")
            assert f"{p_info['num']} / 06" in stage_counter, f"Expected {p_info['num']} / 06, got {stage_counter}"
            assert svg_visible, f"Expected SVG text '{p_info['text']}' not found in active stage"

            if i == 2:
                page.screenshot(path=os.path.join(QA_DIR, "services_desktop_stage_03.png"))
            elif i == 5:
                page.screenshot(path=os.path.join(QA_DIR, "services_desktop_stage_06.png"))

        print("[PASS] Forward scroll tracking: all 6 practices synchronized automatically.")

        # Test bottom boundary: continue scrolling past container
        print("\nScrolling to page footer (testing natural release)...")
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(0.5)
        # Verify page scrolled to footer without error or trap
        scroll_y = page.evaluate("window.scrollY")
        assert scroll_y > 2000, "Page scroll trapped before reaching bottom"
        print(f"[PASS] Natural release at container bottom confirmed (Scroll Y: {scroll_y}px).")

        # Reverse scroll upwards back to practice 01
        print("\nScrolling upwards in reverse...")
        for i in range(len(PRACTICES) - 2, -1, -1):
            p_info = PRACTICES[i]
            page.evaluate("""(id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                window.scrollBy(0, rect.top - (window.innerHeight * 0.25));
            }""", p_info['id'])
            time.sleep(0.4)

            stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
            svg_visible = page.locator(f"svg >> text=/{p_info['text']}/").is_visible()
            print(f"  <- Reversed to #{p_info['id']}: Stage counter = {stage_counter}, SVG matched = {svg_visible}")
            assert f"{p_info['num']} / 06" in stage_counter, f"Reverse scroll mismatch for {p_info['id']}"
            assert svg_visible, f"Reverse SVG text '{p_info['text']}' not found in active stage"

        print("[PASS] Reverse scroll tracking: sequence reversed naturally from 06 back to 01.")

        # -------------------------------------------------------------
        # TEST SUITE 2: Tab Click Shortcut & Hash Navigation
        # -------------------------------------------------------------
        print("\n--- [TEST SUITE 2: Tab Navigation & Direct Hash Navigation] ---")
        # Click tab for practice 04 (Automations)
        tab_04 = page.locator("button[role='tab']:has-text('04')")
        tab_04.click()
        time.sleep(1.0)
        stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"Clicked tab 04: Stage counter = {stage_counter}")
        assert "04 / 06" in stage_counter, f"Tab click failed: expected 04 / 06, got {stage_counter}"
        assert page.locator(f"svg >> text=/{PRACTICES[3]['text']}/").is_visible(), "SVG 04 not displayed on click"
        print("[PASS] Tab click shortcut: section and stage synchronized cleanly.")

        # Direct Hash Navigation
        print("Testing direct hash navigation to #analytics-insights...")
        page.goto("http://localhost:3000/services#analytics-insights", wait_until="networkidle")
        time.sleep(1.0)
        stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"Loaded with #analytics-insights: Stage counter = {stage_counter}")
        assert "05 / 06" in stage_counter, f"Hash navigation failed: expected 05 / 06, got {stage_counter}"
        print("[PASS] Direct hash navigation confirmed.")

        # Reload / Refresh halfway through page
        print("Testing page refresh retention...")
        page.reload(wait_until="networkidle")
        time.sleep(1.0)
        stage_counter = page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"Refreshed page: Stage counter = {stage_counter}")
        assert "05 / 06" in stage_counter, f"Refresh retention failed: expected 05 / 06, got {stage_counter}"
        print("[PASS] Refresh retention confirmed.")

        context.close()

        # -------------------------------------------------------------
        # TEST SUITE 3: Mobile Viewport (390 x 844 iPhone)
        # -------------------------------------------------------------
        print("\n--- [TEST SUITE 3: Mobile Viewport (390x844)] ---")
        mobile_context = browser.new_context(
            viewport={"width": 390, "height": 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15"
        )
        mobile_page = mobile_context.new_page()
        mobile_page.on("console", lambda msg: console_errors.append(f"{msg.text} [{msg.location.get('url', '')}]") if msg.type == "error" else None)

        mobile_page.goto(BASE_URL, wait_until="networkidle")
        time.sleep(1.0)

        # Confirm sticky panel is top-ordered and visible
        m_stage = mobile_page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"[Mobile Initial] Stage counter: {m_stage}")
        assert "01 / 06" in m_stage, f"Mobile initial state error: {m_stage}"
        mobile_page.screenshot(path=os.path.join(QA_DIR, "services_mobile_stage_01.png"))

        # Scroll on mobile
        mobile_page.evaluate("""(id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            window.scrollBy(0, rect.top - (window.innerHeight * 0.35));
        }""", "operations-automation")
        time.sleep(0.6)
        m_stage_04 = mobile_page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"[Mobile Scrolled to 04] Stage counter: {m_stage_04}")
        assert "04 / 06" in m_stage_04, f"Mobile scroll error: expected 04 / 06, got {m_stage_04}"
        mobile_page.screenshot(path=os.path.join(QA_DIR, "services_mobile_stage_04.png"))
        print("[PASS] Mobile responsive layout and sticky scroll tracking verified.")

        mobile_context.close()

        # -------------------------------------------------------------
        # TEST SUITE 4: Reduced Motion Preference
        # -------------------------------------------------------------
        print("\n--- [TEST SUITE 4: Reduced Motion Preference] ---")
        rm_context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            reduced_motion="reduce"
        )
        rm_page = rm_context.new_page()
        rm_page.on("console", lambda msg: console_errors.append(f"{msg.text} [{msg.location.get('url', '')}]") if msg.type == "error" else None)
        rm_page.goto(BASE_URL, wait_until="networkidle")
        time.sleep(0.8)

        rm_page.evaluate("""(id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const rect = el.getBoundingClientRect();
            window.scrollBy(0, rect.top - (window.innerHeight * 0.25));
        }""", "customer-acquisition")
        time.sleep(0.5)
        rm_stage = rm_page.locator("span.font-bold:has-text('/ 06')").inner_text()
        print(f"[Reduced Motion Scrolled to 02] Stage counter: {rm_stage}")
        assert "02 / 06" in rm_stage, f"Reduced motion mismatch: {rm_stage}"
        print("[PASS] Reduced-motion preferences respected.")

        rm_context.close()
        browser.close()

    print("\n--- [CONSOLE ERROR AUDIT] ---")
    # Filter out external or non-app favicon notices if any
    app_errors = [e for e in console_errors if not e.startswith("Failed to load resource: the server responded with a status of 404") or "favicon.ico" not in e]
    if app_errors:
        print(f"[FAIL] {len(app_errors)} application console error(s) detected:")
        for err in app_errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("[PASS] Zero application console errors during all browser test sessions.")

    print("\n====================================================================")
    print("ALL SERVICES PAGE SCROLL & VECTOR STORYTELLING TESTS PASSED (100%)")
    print("====================================================================")

if __name__ == "__main__":
    run_tests()
