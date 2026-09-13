import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://kxxjfcenukhftpanfijt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGpmY2VudWtoZnRwYW5maWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTg1NjksImV4cCI6MjEwMzczNDU2OX0.HDk93Lqe7Vn6IkPcj0ZkZTfxy4wl5P4zbK1pg8Ar7-g';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const text = fs.readFileSync('blog1.txt', 'utf8');
const articles = text.split(/ARTICLE \d+\n/).filter(a => a.trim().length > 0);

const images = [
    '/project_images/moore/1.png',
    '/project_images/paisley/1.png',
    '/project_images/wellington/1.png',
    '/project_images/inspiration/inspiration_living_spaces.jpg',
    '/project_images/inspiration/inspiration_additions.jpg',
    '/project_images/inspiration/inspiration_basements.jpg',
    '/project_images/inspiration/inspiration_custom_millwork.jpg',
    '/project_images/d_costa/exterior_facade_stone_driveway.jpg',
    '/project_images/isherwood/1.png',
    '/project_images/McDougall_Road/McDougall_1.png',
    '/project_images/Knox_Court/Knox_1.png',
    '/project_images/Morningdale_Crescent/morningdale_exterior_front_landscape.jpg'
];

async function run() {
    for (let i = 0; i < articles.length; i++) {
        const article = articles[i].trim();
        const lines = article.split('\n').map(l => l.trim()).filter(l => l.length > 0);
        
        const title = lines[0];
        let slugIndex = lines.indexOf('Suggested URL slug');
        let slug = lines[slugIndex + 1];
        
        let metaIndex = lines.indexOf('Meta description');
        let subtitle = lines[metaIndex + 1];
        
        let lastRevIndex = lines.indexOf('Last reviewed');
        let date = 'August 31, 2026';
        let contentStartIndex = 0;
        
        if (lastRevIndex !== -1) {
            date = lines[lastRevIndex + 1];
            contentStartIndex = lastRevIndex + 2;
        }
        
        // Clean lines
        let rawContentLines = lines.slice(contentStartIndex).filter(l => l !== '\f' && l !== '' && !l.includes('Publishing note') && !l.includes('Giuseppe Production Checklist'));
        
        // The first paragraph is often a short answer / quick answer, or the first heading is
        let quickAnswer = '';
        let sections = [];
        
        let currentHeading = '';
        let currentContent = '';
        let sectionCounter = 1;
        
        for (let j = 0; j < rawContentLines.length; j++) {
            let line = rawContentLines[j];
            // If it's a short line without punctuation, treat it as a heading
            if (line.length < 80 && !['.', '?', '!'].includes(line.slice(-1))) {
                // Save previous section if exists
                if (currentContent.trim()) {
                    if (!currentHeading && !quickAnswer) {
                        quickAnswer = currentContent.trim();
                    } else {
                        sections.push({
                            id: 'section-' + sectionCounter++,
                            heading: currentHeading || 'Overview',
                            content: currentContent.trim()
                        });
                    }
                }
                currentHeading = line;
                currentContent = '';
            } else {
                currentContent += line + '\n\n';
            }
        }
        
        // Push last section
        if (currentContent.trim()) {
            if (!currentHeading && !quickAnswer) {
                quickAnswer = currentContent.trim();
            } else {
                sections.push({
                    id: 'section-' + sectionCounter++,
                    heading: currentHeading || 'Conclusion',
                    content: currentContent.trim()
                });
            }
        }
        
        const payload = {
            id: slug,
            title: title,
            subtitle: subtitle,
            author: 'Havenridge Technical Team',
            date: date,
            img: images[i % images.length],
            quick_answer: quickAnswer || subtitle,
            sections: sections,
            status: 'Draft',
            category: 'Renovation Guides'
        };
        
        const { error } = await supabase.from('blog_posts').upsert([payload]);
        if (error) {
            console.error(`Error inserting ${slug}:`, error.message);
        } else {
            console.log(`Successfully created draft: ${title}`);
        }
    }
}

run();
