const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:/Users/Dhananjaya/.gemini/antigravity/brain/107427b5-d2da-4cfc-8de3-f87997a94f65/v6_qa';
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
    const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome')) || tabs[0];
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

    async function capture(name) {
      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const imgBuffer = Buffer.from(screenshot.data, 'base64');
      fs.writeFileSync(path.join(output_dir, `${name}.png`), imgBuffer);
      console.log(`Saved ${name}.png`);
    }

    // -------------------------------------------------------------
    // PART 1: SEQUENTIAL HOMEPAGE PHOTOGRAPHIC SCROLL TRANSITIONS
    // -------------------------------------------------------------
    console.log('--- CAPTURING HOMEPAGE PHOTOGRAPHIC SCROLL TRANSITIONS ---');
    await setViewport(1440, 900);
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 1200));
    await setTheme('dark');

    // 1a. Stage 01 - Fragmented Friction Initial State
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-scroll-01-chaos-active');

    // 1b. Scroll down 40% into #systems-story (Transition 1 -> 2 in progress)
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) {
          const rect = el.getBoundingClientRect();
          const target = window.scrollY + rect.top + (rect.height - window.innerHeight) * 0.40;
          window.scrollTo({ top: target, behavior: 'instant' });
        }
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-scroll-02-transition-1-to-2');

    // 1c. Scroll down 60% into #systems-story (Stage 02 - Precision Systems Architecture active)
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) {
          const rect = el.getBoundingClientRect();
          const target = window.scrollY + rect.top + (rect.height - window.innerHeight) * 0.60;
          window.scrollTo({ top: target, behavior: 'instant' });
        }
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-scroll-03-engineered-active');

    // 1d. Scroll down 75% into #systems-story (Transition 2 -> 3 in progress)
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) {
          const rect = el.getBoundingClientRect();
          const target = window.scrollY + rect.top + (rect.height - window.innerHeight) * 0.75;
          window.scrollTo({ top: target, behavior: 'instant' });
        }
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-scroll-04-transition-2-to-3');

    // 1e. Scroll down 95% into #systems-story (Stage 03 - Executive Clarity fully active)
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) {
          const rect = el.getBoundingClientRect();
          const target = window.scrollY + rect.top + (rect.height - window.innerHeight) * 0.95;
          window.scrollTo({ top: target, behavior: 'instant' });
        }
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-scroll-05-clarity-active');

    // 1f. REVERSE SCROLL UPWARD: Scroll back to 50% (Proving smooth reverse transition to Stage 2)
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) {
          const rect = el.getBoundingClientRect();
          const target = window.scrollY + rect.top + (rect.height - window.innerHeight) * 0.50;
          window.scrollTo({ top: target, behavior: 'instant' });
        }
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-scroll-06-reverse-scroll-to-stage2');

    // 1g. Day Mode View of Stage 02
    await setTheme('light');
    await new Promise(r => setTimeout(r, 500));
    await capture('v6-scroll-07-day-mode-photographic-stage');

    // -------------------------------------------------------------
    // PART 2: HOMEPAGE FOUNDER EMAIL & FOUNDERS DIRECTORY
    // -------------------------------------------------------------
    console.log('--- CAPTURING FOUNDER EMAIL VERIFICATIONS ---');
    // Scroll down to founders section on homepage
    await send('Runtime.evaluate', {
      expression: `
        const founders = document.getElementById('founders') || document.querySelector('section.bg-white.dark\\\\:bg-\\\\[\\\\#0E0D0C\\\\]');
        window.scrollTo({ top: document.body.scrollHeight * 0.72, behavior: 'instant' });
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-homepage-founder-cards');

    // Navigate to /founders
    await send('Page.navigate', { url: 'http://localhost:3000/founders' });
    await new Promise(r => setTimeout(r, 800));
    await capture('v6-founders-directory-email');

    // -------------------------------------------------------------
    // PART 3: SERVICES PHOTOGRAPHIC PRACTICE STAGE
    // -------------------------------------------------------------
    console.log('--- CAPTURING SERVICES PHOTOGRAPHIC STAGE ---');
    await send('Page.navigate', { url: 'http://localhost:3000/services' });
    await new Promise(r => setTimeout(r, 800));
    await setTheme('dark');

    // Scroll to practice explorer section
    await send('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 400, behavior: 'instant' });`
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-services-01-digital-presence');

    // Trigger click on Practice 02 (Customer Acquisition)
    await send('Runtime.evaluate', {
      expression: `
        const buttons = document.querySelectorAll('.cursor-pointer');
        if (buttons[1]) buttons[1].click();
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-services-02-customer-acquisition');

    // Trigger click on Practice 03 (Lead Systems)
    await send('Runtime.evaluate', {
      expression: `
        const buttons = document.querySelectorAll('.cursor-pointer');
        if (buttons[2]) buttons[2].click();
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-services-03-lead-systems');

    // Trigger click on Practice 04 (Operations Automation)
    await send('Runtime.evaluate', {
      expression: `
        const buttons = document.querySelectorAll('.cursor-pointer');
        if (buttons[3]) buttons[3].click();
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-services-04-operations-automation');

    // -------------------------------------------------------------
    // PART 4: MOBILE 390 VIEWPORT
    // -------------------------------------------------------------
    console.log('--- CAPTURING MOBILE 390 VIEWPORT ---');
    await setViewport(390, 844, true);
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 800));
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('systems-story');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      `
    });
    await new Promise(r => setTimeout(r, 600));
    await capture('v6-mobile-390-photographic-story');

    ws.close();
    console.log('--- ALL V6 QA CAPTURES COMPLETED SUCCESSFULLY ---');
  } catch (err) {
    console.error('Error during V6 QA capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
