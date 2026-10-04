import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = await puppeteer.launch({
  headless: 'new',
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });
await page.goto('http://localhost:3000/og-image-source.html', { waitUntil: 'networkidle0' });
// Wait for Google Fonts to load
await new Promise(r => setTimeout(r, 1500));
await page.screenshot({
  path: path.join(__dirname, 'og-image.jpg'),
  type: 'jpeg',
  quality: 92,
  clip: { x: 0, y: 0, width: 1200, height: 630 }
});
await browser.close();
console.log('OG image saved to og-image.jpg');
