import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kxxjfcenukhftpanfijt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGpmY2VudWtoZnRwYW5maWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTg1NjksImV4cCI6MjEwMzczNDU2OX0.HDk93Lqe7Vn6IkPcj0ZkZTfxy4wl5P4zbK1pg8Ar7-g';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const staticUrls = [
    { loc: 'https://www.havenridgebuild.com/', priority: '1.0' },
    { loc: 'https://www.havenridgebuild.com/services', priority: '0.9' },
    { loc: 'https://www.havenridgebuild.com/services/additions-adus', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/services/whole-home-renovations', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/services/multi-unit-conversions', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/services/accessible-aging-in-place', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/process', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/work', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-bathrooms', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-kitchens', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-living-spaces', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-additions', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-basements', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-garages', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-millwork', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/inspiration-exteriors', priority: '0.6' },
    { loc: 'https://www.havenridgebuild.com/work/project-millwork', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-kitchens', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-bathrooms', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-basements', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-garages', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-living-spaces', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-additions', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-whole-home', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-accessibility', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/work/project-multi-unit', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/about', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/contact', priority: '0.9' },
    { loc: 'https://www.havenridgebuild.com/reviews', priority: '0.8' },
    { loc: 'https://www.havenridgebuild.com/resources/guides', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/resources/blog', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/resources/faq', priority: '0.7' },
    { loc: 'https://www.havenridgebuild.com/privacy', priority: '0.4' }
];

async function generateSitemap() {
    const { data: publishedBlogs, error } = await supabase.from('blog_posts').select('id, category').eq('status', 'Published');
    
    if (error) {
        console.error("Error fetching blogs for sitemap:", error.message);
        return;
    }
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    
    staticUrls.forEach(url => {
        xml += `  <url><loc>${url.loc}</loc><priority>${url.priority}</priority></url>\n`;
    });
    
    if (publishedBlogs && publishedBlogs.length > 0) {
        publishedBlogs.forEach(blog => {
            // Since most are now categorized as guides (additions, etc.), let's assign them to the guides URL unless the category is explicitly 'blog'
            let basePath = blog.category && blog.category === 'blog' ? '/resources/blog/' : '/resources/guides/';
            xml += `  <url><loc>https://www.havenridgebuild.com${basePath}${blog.id}</loc><priority>0.6</priority></url>\n`;
        });
    }
    
    xml += `</urlset>`;
    
    fs.writeFileSync('public/sitemap.xml', xml, 'utf8');
    console.log(`Generated sitemap with ${staticUrls.length + (publishedBlogs ? publishedBlogs.length : 0)} URLs.`);
}

generateSitemap();
