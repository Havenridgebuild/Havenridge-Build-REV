import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handler from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');

// Start a simple static server
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: DIST_DIR,
    rewrites: [{ source: '**', destination: '/index.html' }] // SPA fallback
  });
});

server.listen(0, async () => {
  const port = server.address().port;
  console.log(`Server started on http://localhost:${port}`);
  
  try {
    // Read sitemap to get all routes
    const sitemapContent = fs.readFileSync(path.join(DIST_DIR, 'sitemap.xml'), 'utf-8');
    const matches = [...sitemapContent.matchAll(/<loc>https:\/\/havenridgebuild\.com(.*?)<\/loc>/g)];
    const routes = matches.map(m => m[1] || '/');
    
    console.log(`Found ${routes.length} routes to prerender...`);

    const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    for (const route of routes) {
      console.log(`Prerendering ${route}...`);
      const page = await browser.newPage();
      
      // Navigate and wait for React to finish rendering
      await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });
      
      // Grab fully rendered HTML
      const html = await page.content();
      await page.close();

      // Ensure directory exists
      const routeDir = path.join(DIST_DIR, route);
      if (route !== '/') {
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), html);
      } else {
        fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
      }
    }
    
    await browser.close();
    console.log('Prerendering completed successfully.');
  } catch (err) {
    console.error('Prerendering failed:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
