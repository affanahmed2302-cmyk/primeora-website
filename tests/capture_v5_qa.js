const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:/Users/Dhananjaya/.gemini/antigravity/brain/107427b5-d2da-4cfc-8de3-f87997a94f65/v5_qa';
if (!fs.existsSync(output_dir)) {
  fs.mkdirSync(output_dir, { recursive: true });
}

const targets = [
  // 1440 Desktop - Night Mode
  { url: 'http://localhost:3000/', name: 'v5-desktop-1440-night-hero', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v5-desktop-1440-night-storytelling', w: 1440, h: 900, mode: 'dark', scrollTo: 'section:nth-of-type(1)', delay: 600 },
  { url: 'http://localhost:3000/', name: 'v5-desktop-1440-night-readiness', w: 1440, h: 900, mode: 'dark', scrollTo: 'section:nth-of-type(2)', delay: 600 },
  { url: 'http://localhost:3000/services', name: 'v5-desktop-1440-night-services', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/services/digital-presence', name: 'v5-desktop-1440-night-service-slug', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v5-desktop-1440-night-founders', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/process', name: 'v5-desktop-1440-night-process', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/work', name: 'v5-desktop-1440-night-work', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/readiness', name: 'v5-desktop-1440-night-readiness-page', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/insights', name: 'v5-desktop-1440-night-insights', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v5-desktop-1440-night-contact', w: 1440, h: 900, mode: 'dark', delay: 800 },

  // 1440 Desktop - Day Mode
  { url: 'http://localhost:3000/', name: 'v5-desktop-1440-day-hero', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v5-desktop-1440-day-storytelling', w: 1440, h: 900, mode: 'light', scrollTo: 'section:nth-of-type(1)', delay: 600 },
  { url: 'http://localhost:3000/', name: 'v5-desktop-1440-day-readiness', w: 1440, h: 900, mode: 'light', scrollTo: 'section:nth-of-type(2)', delay: 600 },
  { url: 'http://localhost:3000/services', name: 'v5-desktop-1440-day-services', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/services/digital-presence', name: 'v5-desktop-1440-day-service-slug', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v5-desktop-1440-day-founders', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/process', name: 'v5-desktop-1440-day-process', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/work', name: 'v5-desktop-1440-day-work', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/readiness', name: 'v5-desktop-1440-day-readiness-page', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 390 Mobile
  { url: 'http://localhost:3000/', name: 'v5-mobile-390-night-hero', w: 390, h: 844, mobile: true, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v5-mobile-390-day-hero', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v5-mobile-390-day-storytelling', w: 390, h: 844, mobile: true, mode: 'light', scrollTo: 'section:nth-of-type(1)', delay: 600 },
  { url: 'http://localhost:3000/founders', name: 'v5-mobile-390-day-founders', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/services', name: 'v5-mobile-390-day-services', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/process', name: 'v5-mobile-390-day-process', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v5-mobile-390-day-contact', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
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
      console.log(`Capturing ${t.name} (${t.w}x${t.h}, ${t.mode})...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: t.w,
        height: t.h,
        deviceScaleFactor: 1,
        mobile: Boolean(t.mobile)
      });

      await send('Page.navigate', { url: t.url });
      await new Promise(r => setTimeout(r, 500));

      if (t.mode === 'light') {
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

      if (t.scrollTo) {
        await send('Runtime.evaluate', {
          expression: `
            const el = document.querySelector('${t.scrollTo}');
            if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
          `
        });
      }

      await new Promise(r => setTimeout(r, t.delay || 600));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const imgBuffer = Buffer.from(screenshot.data, 'base64');
      fs.writeFileSync(path.join(output_dir, `${t.name}.png`), imgBuffer);
      console.log(`Saved ${t.name}.png`);
    }

    ws.close();
  } catch (err) {
    console.error('Error during QA capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
