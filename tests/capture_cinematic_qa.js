const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:\\Users\\Dhananjaya\\.gemini\\antigravity\\brain\\107427b5-d2da-4cfc-8de3-f87997a94f65\\screenshots_v2';
if (!fs.existsSync(output_dir)) {
  fs.mkdirSync(output_dir, { recursive: true });
}

const targets = [
  // 1440 Desktop
  { url: 'http://localhost:3000/', name: 'v2-desktop-1440-hero', w: 1440, h: 900, mobile: false, scrollTo: 0 },
  { url: 'http://localhost:3000/#founders', name: 'v2-desktop-1440-founders-section', w: 1440, h: 900, mobile: false, scrollTo: 'section#founders' },
  { url: 'http://localhost:3000/founders', name: 'v2-desktop-1440-founders-page', w: 1440, h: 900, mobile: false, scrollTo: 0 },
  { url: 'http://localhost:3000/services', name: 'v2-desktop-1440-services-page', w: 1440, h: 900, mobile: false, scrollTo: 0 },
  { url: 'http://localhost:3000/readiness', name: 'v2-desktop-1440-readiness-diagnostic', w: 1440, h: 900, mobile: false, scrollTo: 0 },
  { url: 'http://localhost:3000/process', name: 'v2-desktop-1440-process-page', w: 1440, h: 900, mobile: false, scrollTo: 0 },

  // 1280 Desktop
  { url: 'http://localhost:3000/', name: 'v2-desktop-1280-hero', w: 1280, h: 800, mobile: false, scrollTo: 0 },
  { url: 'http://localhost:3000/founders', name: 'v2-desktop-1280-founders', w: 1280, h: 800, mobile: false, scrollTo: 0 },
  { url: 'http://localhost:3000/readiness', name: 'v2-desktop-1280-readiness', w: 1280, h: 800, mobile: false, scrollTo: 0 },

  // 768 Tablet
  { url: 'http://localhost:3000/', name: 'v2-tablet-768-hero', w: 768, h: 1024, mobile: true, scrollTo: 0 },
  { url: 'http://localhost:3000/founders', name: 'v2-tablet-768-founders', w: 768, h: 1024, mobile: true, scrollTo: 0 },
  { url: 'http://localhost:3000/readiness', name: 'v2-tablet-768-readiness', w: 768, h: 1024, mobile: true, scrollTo: 0 },

  // 390 Mobile
  { url: 'http://localhost:3000/', name: 'v2-mobile-390-hero', w: 390, h: 844, mobile: true, scrollTo: 0 },
  { url: 'http://localhost:3000/founders', name: 'v2-mobile-390-founders', w: 390, h: 844, mobile: true, scrollTo: 0 },
  { url: 'http://localhost:3000/services', name: 'v2-mobile-390-services', w: 390, h: 844, mobile: true, scrollTo: 0 },
  { url: 'http://localhost:3000/readiness', name: 'v2-mobile-390-readiness', w: 390, h: 844, mobile: true, scrollTo: 0 },
  { url: 'http://localhost:3000/process', name: 'v2-mobile-390-process', w: 390, h: 844, mobile: true, scrollTo: 0 },
];

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

    for (const t of targets) {
      console.log(`Capturing ${t.name} at ${t.w}x${t.h}...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: t.w,
        height: t.h,
        deviceScaleFactor: 1,
        mobile: t.mobile
      });
      await send('Page.navigate', { url: t.url });
      await new Promise(r => setTimeout(r, 2000)); // wait for video and hydration

      if (t.scrollTo && typeof t.scrollTo === 'string') {
        await send('Runtime.evaluate', {
          expression: `const el = document.querySelector("${t.scrollTo}"); if (el) el.scrollIntoView();`
        });
        await new Promise(r => setTimeout(r, 500));
      }

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(output_dir, `${t.name}.png`);
      fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved: ${filePath} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
    }

    ws.close();
    console.log('All QA screenshots captured successfully.');
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
