import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://kxxjfcenukhftpanfijt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGpmY2VudWtoZnRwYW5maWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTg1NjksImV4cCI6MjEwMzczNDU2OX0.HDk93Lqe7Vn6IkPcj0ZkZTfxy4wl5P4zbK1pg8Ar7-g');
async function run() {
    const { error } = await supabase.from('blog_posts').delete().eq('title', 'HAVENRIDGE BUILD');
    if (error) console.error(error);
    else console.log('Deleted junk article');
}
run();
