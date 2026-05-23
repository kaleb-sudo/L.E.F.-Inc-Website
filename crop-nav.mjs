import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-application-cache', '--disk-cache-size=0']
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

// Intercept and disable cache
await page.setCacheEnabled(false);

await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));

await page.screenshot({
  path: './temporary screenshots/screenshot-52-nav-nocache.png',
  clip: { x: 0, y: 0, width: 1440, height: 80 }
});

await browser.close();
console.log('Done.');
