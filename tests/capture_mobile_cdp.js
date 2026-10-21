const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:\\Users\\Dhananjaya\\.gemini\\antigravity\\brain\\107427b5-d2da-4cfc-8de3-f87997a94f65\\screenshots';

const targets = [
  { url: 'http://localhost:3000/', name: 'home-mobile-390', w: 390, h: 844 },
  { url: 'http://localhost:3000/services', name: 'services-mobile-390', w: 390, h: 844 },
  { url: 'http://localhost:3000/team', name: 'team-mobile-390', w: 390, h: 844 },
  { url: 'http://localhost:3000/process', name: 'process-mobile-390', w: 390, h: 844 },
  { url: 'http://localhost:3000/contact', name: 'contact-mobile-390', w: 390, h: 844 },
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
        mobile: true
      });
      await send('Page.navigate', { url: t.url });
      await new Promise(r => setTimeout(r, 1500)); // wait for hydration and render

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      const filePath = path.join(output_dir, `${t.name}.png`);
      fs.writeFileSync(filePath, Buffer.from(shot.data, 'base64'));
      console.log(`Saved: ${filePath} (${(fs.statSync(filePath).size / 1024).toFixed(1)} KB)`);
    }

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    chrome.kill();
  }
}

run();
