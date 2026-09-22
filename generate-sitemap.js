import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractArrayString(fileContent, arrayName) {
  const startIndex = fileContent.indexOf(`const ${arrayName} = [`);
  if (startIndex === -1) {
    const exportStart = fileContent.indexOf(`export const ${arrayName} = [`);
    if (exportStart === -1) return '[]';
    return parseArrayBlock(fileContent, exportStart + `export const ${arrayName} = `.length);
  }
  return parseArrayBlock(fileContent, startIndex + `const ${arrayName} = `.length);
}

function parseArrayBlock(fileContent, startPos) {
  let openBrackets = 0;
  let inString = false;
  let stringChar = '';
  
  for (let i = startPos; i < fileContent.length; i++) {
    const char = fileContent[i];
    
    if (inString) {
      if (char === stringChar && fileContent[i-1] !== '\\') {
        inString = false;
      }
      continue;
    }
    
    if (char === '"' || char === "'" || char === '`') {
      inString = true;
      stringChar = char;
      continue;
    }
    
    if (char === '[') openBrackets++;
    if (char === ']') {
      openBrackets--;
      if (openBrackets === 0) {
        return fileContent.substring(startPos, i + 1);
      }
    }
  }
  return '[]';
}

const appFile = fs.readFileSync(path.join(__dirname, 'src', 'App.jsx'), 'utf-8');
const guidesFile = fs.readFileSync(path.join(__dirname, 'src', 'data', 'guidesData.js'), 'utf-8');

const blogPostsStr = extractArrayString(appFile, 'blogPosts');
const liveGuidesStr = extractArrayString(guidesFile, 'guidesData');
const siteMedia = {}; 

let blogPosts = [];
let liveGuides = [];

try {
  blogPosts = eval(`(${blogPostsStr})`);
} catch (e) {
  console.error("Failed to parse blogPosts:", e);
}

try {
  liveGuides = eval(`(${liveGuidesStr})`);
} catch (e) {
  console.error("Failed to parse liveGuides:", e);
}

const siteUrl = 'https://havenridgebuild.com';

const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/process',
  '/work',
  '/work/inspiration',
  '/work/inspiration-bathrooms',
  '/work/inspiration-kitchens',
  '/work/inspiration-living-spaces',
  '/work/inspiration-additions',
  '/work/inspiration-basements',
  '/work/inspiration-garages',
  '/work/inspiration-millwork',
  '/work/inspiration-exteriors',
  '/work/project-millwork',
  '/work/project-kitchens',
  '/work/project-bathrooms',
  '/work/project-basements',
  '/work/project-garages',
  '/work/project-living-spaces',
  '/work/project-additions',
  '/work/project-exteriors',
  '/services',
  '/services/additions-adus',
  '/services/whole-home-renovations',
  '/services/multi-unit-conversions',
  '/services/accessible-aging-in-place',
  '/resources',
  '/resources/guides',
  '/resources/blog',
  '/resources/faq',
  '/reviews',
  '/privacy'
];

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static routes
staticRoutes.forEach(route => {
  const priority = route === '/' ? '1.0' : '0.8';
  sitemapXml += `  <url>
    <loc>${siteUrl}${route === '/' ? '' : route}</loc>
    <priority>${priority}</priority>
  </url>\n`;
});

// Add dynamic blog posts
blogPosts.forEach(post => {
  sitemapXml += `  <url>
    <loc>${siteUrl}/resources/blog/${post.slug || post.id}</loc>
    <priority>0.7</priority>
  </url>\n`;
});

// Add dynamic guides
liveGuides.forEach(guide => {
  sitemapXml += `  <url>
    <loc>${siteUrl}/resources/guides/${guide.slug || guide.id}</loc>
    <priority>0.7</priority>
  </url>\n`;
});

sitemapXml += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemapXml);
console.log('Successfully generated dynamic public/sitemap.xml');
