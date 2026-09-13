import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://kxxjfcenukhftpanfijt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGpmY2VudWtoZnRwYW5maWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTg1NjksImV4cCI6MjEwMzczNDU2OX0.HDk93Lqe7Vn6IkPcj0ZkZTfxy4wl5P4zbK1pg8Ar7-g');

async function run() {
    const { data: posts, error } = await supabase.from('blog_posts').select('*');
    if (error) {
        console.error(error);
        return;
    }
    
    for (let post of posts) {
        let newCategory = 'Renovation Guides'; // default fallback
        
        const text = (post.title + ' ' + post.id).toLowerCase();
        
        // Map to correct frontend filter categories based on keywords
        if (text.includes('adu') || text.includes('suite') || text.includes('conversion') || text.includes('basement')) {
            newCategory = 'basements-adus';
        } else if (text.includes('addition') || text.includes('extension')) {
            newCategory = 'additions';
        } else if (text.includes('tax') || text.includes('cost') || text.includes('budget') || text.includes('grant') || text.includes('funding')) {
            newCategory = 'budget-planning';
        } else if (text.includes('accessibil') || text.includes('aging') || text.includes('main-floor')) {
            newCategory = 'accessibility';
        } else if (text.includes('permit') || text.includes('regulation') || text.includes('capacity')) {
            newCategory = 'permits';
        } else if (text.includes('renovate or move')) {
            newCategory = 'blog';
        } else if (text.includes('contractor') || text.includes('hiring')) {
            newCategory = 'hiring';
        }

        console.log(`Updating ${post.id} -> ${newCategory}`);
        
        await supabase.from('blog_posts').update({ category: newCategory }).eq('id', post.id);
    }
    
    console.log("Supabase categories updated.");
}

run();
