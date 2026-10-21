const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:/Users/Dhananjaya/.gemini/antigravity/brain/107427b5-d2da-4cfc-8de3-f87997a94f65/v7_qa';
if (!fs.existsSync(output_dir)) {
  fs.mkdirSync(output_dir, { recursive: true });
}

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  try {
    const res = await fetch('http://127.0.0.1:9222/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome')) || tabs[tabs.length - 1];
    const wsUrl = pageTab.webSocketDebuggerUrl;
    const ws = new WebSocket(wsUrl);

    await new Promise(r => ws.onopen = r);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const curId = id++;
        const handler = (msg) => {
          const data = JSON.parse(msg.data);
          if (data.id === curId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    async function setViewport(w, h, mobile = false) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: w,
        height: h,
        deviceScaleFactor: 1,
        mobile: Boolean(mobile)
      });
    }

    async function setTheme(mode) {
      if (mode === 'light') {
        await send('Runtime.evaluate', {
          expression: `
            document.documentElement.classList.remove('dark');
            try { localStorage.setItem('primeora-theme', 'light'); } catch(e) {}
          `
        });
      } else {
        await send('Runtime.evaluate', {
          expression: `
            document.documentElement.classList.add('dark');
            try { localStorage.setItem('primeora-theme', 'dark'); } catch(e) {}
          `
        });
      }
    }

    async function dismissCookies() {
      await send('Runtime.evaluate', {
        expression: `
          try {
            localStorage.setItem('primeora_cookie_consent', JSON.stringify({
              essential: true,
              analytics: false,
              marketing: false,
              timestamp: new Date().toISOString()
            }));
            const banner = document.querySelector('div[class*="fixed bottom"]');
            if (banner) banner.remove();
          } catch(e) {}
        `
      });
    }

    async function capture(name) {
      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const imgBuffer = Buffer.from(screenshot.data, 'base64');
      fs.writeFileSync(path.join(output_dir, `${name}.png`), imgBuffer);
      console.log(`Saved ${name}.png (${imgBuffer.length} bytes)`);
    }

    // -------------------------------------------------------------
    // PART 1: SEQUENTIAL HOMEPAGE BESPOKE VECTOR SCROLL TRANSITIONS
    // -------------------------------------------------------------
    console.log('--- CAPTURING HOMEPAGE BESPOKE VECTOR SCROLL TRANSITIONS ---');
    await setViewport(1440, 900);
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 1500));
    await setTheme('dark');
    await dismissCookies();

    // Measure section coordinates
    const coords = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('systems-story');
        if (!el) return null;
        const rect = el.getBoundingClientRect();
        return {
          top: window.scrollY + rect.top,
          height: rect.height,
          distance: rect.height - window.innerHeight
        };
      })()`,
      returnByValue: true
    });
    const { top, distance } = coords.result.value;
    console.log(`Systems Story Section: top=${top}, distance=${distance}`);

    // 1a. Stage 01 - Operational Friction (Fragmented Silos)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-01-fragmented-vector');

    // 1b. Scroll down 40% into #systems-story (Transition 1 -> 2 in progress)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top + distance * 0.40});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-02-transition-1-to-2');

    // 1c. Scroll down 60% into #systems-story (Stage 02 - Systems Architecture active)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top + distance * 0.60});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-03-connected-conduit-vector');

    // 1d. Scroll down 78% into #systems-story (Transition 2 -> 3 in progress)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top + distance * 0.78});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-04-transition-2-to-3');

    // 1e. Scroll down 95% into #systems-story (Stage 03 - Commercial Clarity active)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top + distance * 0.95});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-05-clear-operations-vector');

    // 1f. REVERSE SCROLL UPWARD: Scroll back to 50% (Proving smooth reverse transition to Stage 2)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top + distance * 0.50});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-06-reverse-scroll-proof');

    // 1g. SCROLL PAST SECTION: Scroll into Act III (Proving page NEVER locks or traps visitor)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top + coords.result.value.height + 150});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-07-exit-to-next-section');

    // 1h. Day Mode View of Vector Stage (Stage 02)
    await send('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, ${top + distance * 0.60});
        if (window.ScrollTrigger) window.ScrollTrigger.update();
      `
    });
    await setTheme('light');
    await new Promise(r => setTimeout(r, 500));
    await capture('v7-scroll-08-day-mode-vector-stage');

    // -------------------------------------------------------------
    // PART 2: SERVICES BESPOKE VECTOR PRACTICE BLUEPRINTS
    // -------------------------------------------------------------
    console.log('--- CAPTURING SERVICES BESPOKE VECTOR PRACTICE BLUEPRINTS ---');
    await setTheme('dark');
    await send('Page.navigate', { url: 'http://localhost:3000/services' });
    await new Promise(r => setTimeout(r, 1200));
    await dismissCookies();

    // Scroll to practice explorer section
    await send('Runtime.evaluate', {
      expression: `window.scrollTo(0, 450);`
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v7-services-vector-stage-01');

    // Click Practice 02 (Customer Acquisition)
    await send('Runtime.evaluate', {
      expression: `
        const buttons = document.querySelectorAll('.cursor-pointer');
        if (buttons[1]) buttons[1].click();
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v7-services-vector-stage-02');

    // Click Practice 03 (Lead Systems)
    await send('Runtime.evaluate', {
      expression: `
        const buttons = document.querySelectorAll('.cursor-pointer');
        if (buttons[2]) buttons[2].click();
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v7-services-vector-stage-03');

    // -------------------------------------------------------------
    // PART 3: MOBILE 390 VIEWPORT
    // -------------------------------------------------------------
    console.log('--- CAPTURING MOBILE 390 VIEWPORT ---');
    await setViewport(390, 844, true);
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 1200));
    await dismissCookies();
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v7-mobile-390-vector-story');

    ws.close();
    console.log('--- ALL V7 QA CAPTURES COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Error during V7 QA capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
