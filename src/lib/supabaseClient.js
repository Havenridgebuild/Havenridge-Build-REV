import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://kxxjfcenukhftpanfijt.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4eGpmY2VudWtoZnRwYW5maWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTg1NjksImV4cCI6MjEwMzczNDU2OX0.HDk93Lqe7Vn6IkPcj0ZkZTfxy4wl5P4zbK1pg8Ar7-g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to fetch or save leads
export async function getLeadsFromSupabase() {
  try {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (err) {
    console.warn('Using local leads fallback:', err?.message || err);
  }
  const saved = localStorage.getItem('havenridge_leads_list');
  return saved ? JSON.parse(saved) : [];
}

// Save a new lead to Supabase
export async function saveLeadToSupabase(leadObj) {
  try {
    const { data, error } = await supabase.from('leads').insert([leadObj]);
    if (error) console.warn('Supabase lead insert warning:', error.message);
  } catch (err) {
    console.warn('Lead saved locally:', err?.message || err);
  }
}
