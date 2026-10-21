const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:\\Users\\Dhananjaya\\.gemini\\antigravity\\brain\\107427b5-d2da-4cfc-8de3-f87997a94f65\\v3_qa';
if (!fs.existsSync(output_dir)) {
  fs.mkdirSync(output_dir, { recursive: true });
}

// Scenarios to capture
const scenarios = [
  // 1. Home Hero T=0 and T=2 (proving canvas simulation)
  { url: 'http://localhost:3000/', name: 'v3-desktop-1440-night-hero-t0', w: 1440, h: 900, mode: 'dark', delay: 300 },
  { url: 'http://localhost:3000/', name: 'v3-desktop-1440-night-hero-t2', w: 1440, h: 900, mode: 'dark', delay: 2200 },
  { url: 'http://localhost:3000/', name: 'v3-desktop-1440-day-hero-t0', w: 1440, h: 900, mode: 'light', delay: 300 },
  { url: 'http://localhost:3000/', name: 'v3-desktop-1440-day-hero-t2', w: 1440, h: 900, mode: 'light', delay: 2200 },

  // 2. Home Practice Explorer
  { url: 'http://localhost:3000/#practice-explorer', name: 'v3-desktop-1440-night-home-practice', w: 1440, h: 900, mode: 'dark', scrollTo: '#practice-explorer', delay: 800 },
  { url: 'http://localhost:3000/#practice-explorer', name: 'v3-desktop-1440-day-home-practice', w: 1440, h: 900, mode: 'light', scrollTo: '#practice-explorer', delay: 800 },

  // 3. Founders Page
  { url: 'http://localhost:3000/founders', name: 'v3-desktop-1440-night-founders', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v3-desktop-1440-day-founders', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 4. Services Page
  { url: 'http://localhost:3000/services', name: 'v3-desktop-1440-night-services', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/services', name: 'v3-desktop-1440-day-services', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 5. Process Page
  { url: 'http://localhost:3000/process', name: 'v3-desktop-1440-night-process', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/process', name: 'v3-desktop-1440-day-process', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 6. Work Page
  { url: 'http://localhost:3000/work', name: 'v3-desktop-1440-night-work', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/work', name: 'v3-desktop-1440-day-work', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 7. Readiness Diagnostic
  { url: 'http://localhost:3000/readiness', name: 'v3-desktop-1440-night-readiness', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/readiness', name: 'v3-desktop-1440-day-readiness', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 8. Contact Page
  { url: 'http://localhost:3000/contact', name: 'v3-desktop-1440-night-contact', w: 1440, h: 900, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v3-desktop-1440-day-contact', w: 1440, h: 900, mode: 'light', delay: 800 },

  // 9. Mobile Viewport (390px)
  { url: 'http://localhost:3000/', name: 'v3-mobile-390-night-hero', w: 390, h: 844, mobile: true, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/', name: 'v3-mobile-390-day-hero', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v3-mobile-390-night-founders', w: 390, h: 844, mobile: true, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/founders', name: 'v3-mobile-390-day-founders', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/services', name: 'v3-mobile-390-night-services', w: 390, h: 844, mobile: true, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/services', name: 'v3-mobile-390-day-services', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v3-mobile-390-night-contact', w: 390, h: 844, mobile: true, mode: 'dark', delay: 800 },
  { url: 'http://localhost:3000/contact', name: 'v3-mobile-390-day-contact', w: 390, h: 844, mobile: true, mode: 'light', delay: 800 },
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

    for (const s of scenarios) {
      console.log(`Capturing ${s.name} (${s.w}x${s.h}, ${s.mode})...`);
      await send('Emulation.setDeviceMetricsOverride', {
        width: s.w,
        height: s.h,
        deviceScaleFactor: 1,
        mobile: Boolean(s.mobile)
      });

      await send('Page.navigate', { url: s.url });
      await new Promise(r => setTimeout(r, 600));

      // Set theme mode (light or dark)
      if (s.mode === 'light') {
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

      if (s.scrollTo) {
        await send('Runtime.evaluate', {
          expression: `
            const el = document.querySelector("${s.scrollTo}");
            if (el) el.scrollIntoView();
          `
        });
      }

      await new Promise(r => setTimeout(r, s.delay || 600));

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(output_dir, `${s.name}.png`);
      fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved: ${s.name}.png (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
    }

    ws.close();
    console.log('All V3 QA screenshots captured successfully!');
  } catch (err) {
    console.error('Error in capture:', err);
  } finally {
    chrome.kill();
  }
}

run();
