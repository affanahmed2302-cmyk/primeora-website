const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const output_dir = 'C:\\Users\\Dhananjaya\\.gemini\\antigravity\\brain\\107427b5-d2da-4cfc-8de3-f87997a94f65\\audit_baseline';
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

    // Set 1440 desktop
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    // 1. Capture Night Mode Home
    console.log('Navigating to Home (Night)...');
    await send('Page.navigate', { url: 'http://localhost:3000/' });
    await new Promise(r => setTimeout(r, 2000));

    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(output_dir, 'baseline-night-home-t0.png'), Buffer.from(shot.data, 'base64'));

    // Capture Home 2 seconds later to verify video motion
    await new Promise(r => setTimeout(r, 2000));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(output_dir, 'baseline-night-home-t2.png'), Buffer.from(shot.data, 'base64'));

    // 2. Switch to Day Mode by removing 'dark' class
    console.log('Switching to Day Mode...');
    await send('Runtime.evaluate', {
      expression: `
        document.documentElement.classList.remove('dark');
        localStorage.setItem('primeora-theme', 'light');
      `
    });
    await new Promise(r => setTimeout(r, 1000));

    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(output_dir, 'baseline-day-home.png'), Buffer.from(shot.data, 'base64'));

    // 3. Inspect Day Mode Services
    await send('Page.navigate', { url: 'http://localhost:3000/services' });
    await new Promise(r => setTimeout(r, 1500));
    // Re-ensure light mode
    await send('Runtime.evaluate', { expression: `document.documentElement.classList.remove('dark');` });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(output_dir, 'baseline-day-services.png'), Buffer.from(shot.data, 'base64'));

    // 4. Inspect Day Mode Founders
    await send('Page.navigate', { url: 'http://localhost:3000/founders' });
    await new Promise(r => setTimeout(r, 1500));
    await send('Runtime.evaluate', { expression: `document.documentElement.classList.remove('dark');` });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(output_dir, 'baseline-day-founders.png'), Buffer.from(shot.data, 'base64'));

    // 5. Inspect Night Mode Founders
    await send('Runtime.evaluate', { expression: `document.documentElement.classList.add('dark');` });
    await new Promise(r => setTimeout(r, 500));
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(output_dir, 'baseline-night-founders.png'), Buffer.from(shot.data, 'base64'));

    ws.close();
    console.log('Baseline audit screenshots captured successfully.');
  } catch (err) {
    console.error('Audit capture error:', err);
  } finally {
    chrome.kill();
  }
}

run();
