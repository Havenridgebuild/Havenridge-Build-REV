import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to extract the array string from a file
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

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

const appFile = fs.readFileSync(path.join(__dirname, 'src', 'App.jsx'), 'utf-8');
const guidesFile = fs.readFileSync(path.join(__dirname, 'src', 'data', 'guidesData.js'), 'utf-8');

// We are going to cheat a little by using eval on the extracted array blocks
// since they are plain JS objects.
const blogPostsStr = extractArrayString(appFile, 'blogPosts');
const liveGuidesStr = extractArrayString(guidesFile, 'guidesData');

// Add a mock siteMedia so it doesn't crash if they used siteMedia inside
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

const allPosts = [...blogPosts, ...liveGuides].sort((a, b) => {
  return new Date(b.date) - new Date(a.date);
});

const siteUrl = 'https://havenridgebuild.com';

const rssItems = allPosts.map(post => {
  const url = post.slug 
    ? `${siteUrl}/resources/guides/${post.slug}` 
    : `${siteUrl}/resources/blog/${post.id}`;
    
  const desc = post.excerpt || post.subtitle || post.quickAnswer || '';
  
  // Format date to RFC-822
  const pubDate = new Date(post.date).toUTCString();

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(desc)}</description>
      ${post.img ? `<enclosure url="${siteUrl}${post.img}" type="image/jpeg" />` : ''}
    </item>`;
}).join('');

const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Havenridge Build Blog &amp; Guides</title>
    <link>${siteUrl}</link>
    <description>Expert design-build renovation advice, trends, and guides for Waterloo Region.</description>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-ca</language>
    ${rssItems}
  </channel>
</rss>`;

fs.writeFileSync(path.join(__dirname, 'public', 'rss.xml'), rssXml);
console.log('Successfully generated public/rss.xml');
