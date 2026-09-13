import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://kxxjfcenukhftpanfijt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGpmY2VudWtoZnRwYW5maWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTg1NjksImV4cCI6MjEwMzczNDU2OX0.HDk93Lqe7Vn6IkPcj0ZkZTfxy4wl5P4zbK1pg8Ar7-g';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
async function run() {
    const { data } = await supabase.from('blog_posts').select('*').limit(1);
    console.log(JSON.stringify(data[0], null, 2));
}
run();
