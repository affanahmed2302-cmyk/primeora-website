const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:/Users/Dhananjaya/.gemini/antigravity/brain/107427b5-d2da-4cfc-8de3-f87997a94f65/v4_qa';
if (!fs.existsSync(output_dir)) {
  fs.mkdirSync(output_dir, { recursive: true });
}

const targets = [
  // 1440 Desktop - Night Mode
  { url: 'http://localhost:3000/', name: 'v4-desktop-1440-night-hero', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v4-desktop-1440-night-reality', w: 1440, h: 900, mode: 'dark', scrollTo: 'section:nth-of-type(1)', delay: 600 },
  { url: 'http://localhost:3000/', name: 'v4-desktop-1440-night-ledger', w: 1440, h: 900, mode: 'dark', scrollTo: 'section:nth-of-type(2)', delay: 600 },
  { url: 'http://localhost:3000/services', name: 'v4-desktop-1440-night-services', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/process', name: 'v4-desktop-1440-night-process', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v4-desktop-1440-night-founders', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/work', name: 'v4-desktop-1440-night-work', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/insights', name: 'v4-desktop-1440-night-insights', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v4-desktop-1440-night-contact', w: 1440, h: 900, mode: 'dark', delay: 800 },

  // 1440 Desktop - Day Mode
  { url: 'http://localhost:3000/', name: 'v4-desktop-1440-day-hero', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v4-desktop-1440-day-reality', w: 1440, h: 900, mode: 'light', scrollTo: 'section:nth-of-type(1)', delay: 600 },
  { url: 'http://localhost:3000/', name: 'v4-desktop-1440-day-ledger', w: 1440, h: 900, mode: 'light', scrollTo: 'section:nth-of-type(2)', delay: 600 },
  { url: 'http://localhost:3000/services', name: 'v4-desktop-1440-day-services', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/process', name: 'v4-desktop-1440-day-process', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v4-desktop-1440-day-founders', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/work', name: 'v4-desktop-1440-day-work', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/insights', name: 'v4-desktop-1440-day-insights', w: 1440, h: 900, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v4-desktop-1440-day-contact', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 390 Mobile
  { url: 'http://localhost:3000/', name: 'v4-mobile-390-night-hero', w: 390, h: 844, mobile: true, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v4-mobile-390-day-hero', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/services', name: 'v4-mobile-390-day-services', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/process', name: 'v4-mobile-390-day-process', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v4-mobile-390-day-founders', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v4-mobile-390-day-contact', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
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
            const el = document.querySelector("${t.scrollTo}");
            if (el) el.scrollIntoView();
          `
        });
      }

      await new Promise(r => setTimeout(r, t.delay || 600));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(output_dir, `${t.name}.png`);
      fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved: ${t.name}.png (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
    }

    ws.close();
    console.log('All V4 QA screenshots captured successfully!');
  } catch (err) {
    console.error('Error during V4 QA capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
