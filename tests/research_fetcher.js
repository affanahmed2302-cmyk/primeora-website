const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outputDir = 'C:\\Users\\Dhananjaya\\.gemini\\antigravity\\brain\\107427b5-d2da-4cfc-8de3-f87997a94f65\\research_references';

const sites = [
  { id: 'httpster', url: 'https://httpster.net/', name: 'Httpster' },
  { id: 'recent-design', url: 'https://recent.design/websites', name: 'Recent Design' },
  { id: 'dark-design', url: 'https://www.dark.design/', name: 'Dark Design' },
  { id: 'nicelydone', url: 'https://nicelydone.club/', name: 'Nicelydone' },
  { id: 'minimal-gallery', url: 'https://minimal.gallery/', name: 'Minimal Gallery' },
  { id: 'designspiration', url: 'https://www.designspiration.com/', name: 'Designspiration' },
  { id: 'ui-live', url: 'https://ui.live/', name: 'UI.live' },
  { id: 'screendesign', url: 'https://screendesign.com/', name: 'ScreenDesign' },
  { id: 'manus', url: 'https://manus.im/', name: 'Manus' },
  { id: 'watermelon-ui', url: 'https://ui.watermelon.sh/', name: 'Watermelon UI' },
  { id: 'cult-ui', url: 'https://www.cult-ui.com/', name: 'Cult UI' },
  { id: 'skiper-ui', url: 'https://www.skiper-ui.com/', name: 'Skiper UI' },
];

async function run() {
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9223',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const res = await fetch('http://127.0.0.1:9223/json');
    const tabs = await res.json();
    const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome')) || tabs[0];
    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

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

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    const results = [];

    for (const site of sites) {
      console.log(`Checking ${site.name} (${site.url})...`);
      try {
        await send('Page.navigate', { url: site.url });
        await new Promise(r => setTimeout(r, 4000)); // wait for network and render

        const evalRes = await send('Runtime.evaluate', {
          expression: `JSON.stringify({
            title: document.title,
            h1: document.querySelector('h1')?.innerText || '',
            metaDesc: document.querySelector('meta[name="description"]')?.content || '',
            bodyLength: document.body?.innerText?.length || 0,
            sampleHeadings: Array.from(document.querySelectorAll('h1, h2, h3')).slice(0, 5).map(h => h.innerText.trim()).filter(Boolean),
            bgCol: window.getComputedStyle(document.body).backgroundColor,
            linksCount: document.querySelectorAll('a').length
          })`
        });

        let data = {};
        try {
          data = JSON.parse(evalRes.result.value);
        } catch (e) {
          data = { error: 'Failed to eval' };
        }

        const shot = await send('Page.captureScreenshot', { format: 'png' });
        const shotPath = path.join(outputDir, `${site.id}.png`);
        if (shot && shot.data) {
          fs.writeFileSync(shotPath, Buffer.from(shot.data, 'base64'));
          data.screenshot = shotPath;
          data.screenshotSizeKb = (fs.statSync(shotPath).size / 1024).toFixed(1);
        }

        results.push({ ...site, ...data });
        console.log(`Success: ${site.name} -> Title: "${data.title}" | Shot: ${data.screenshotSizeKb} KB`);
      } catch (err) {
        console.error(`Error loading ${site.name}:`, err.message);
        results.push({ ...site, error: err.message });
      }
    }

    fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(results, null, 2));
    console.log('Saved summary.json');
    ws.close();
  } catch (err) {
    console.error('Fatal CDP error:', err);
  } finally {
    chrome.kill();
  }
}

run();
