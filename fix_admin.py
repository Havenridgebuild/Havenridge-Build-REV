import re

with open('src/components/AdminDashboardView.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

redundant_effect = """  // Fetch live leads from Supabase on mount
  useEffect(() => {
    async function fetchLiveLeads() {
      try {
        const data = await getLeadsFromSupabase();
        if (data && data.length > 0) {
          const mapped = data.map(l => ({
            id: l.id,
            date: l.created_at ? new Date(l.created_at).toLocaleString() : '2026-09-02',
            name: l.name || 'Website Inquiry',
            email: l.email || 'N/A',
            phone: l.phone || 'N/A',
            address: l.address || 'Waterloo Region',
            budget: l.budget || 'Standard',
            projectScope: l.project_scope || 'Renovations',
            status: l.status || 'Pipedrive Deal Created'
          }));
          setFormSubmissions(mapped);
        }
      } catch (err) {
        console.warn('Leads fetch error:', err);
      }
    }
    fetchLiveLeads();
  }, []);"""
code = code.replace(redundant_effect, "")

old_supabase_effect = """        const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (leadsData && leadsData.length > 0) {
          const mappedLeads = leadsData.map(l => ({
            id: l.id,
            date: new Date(l.created_at).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
            name: l.name,
            email: l.email,
            phone: l.phone,
            address: l.address,
            budget: l.budget,
            projectScope: l.project_scope,
            status: l.status || 'Pipedrive Deal Created'
          }));
          setFormSubmissions(mappedLeads);
        }"""

new_supabase_effect = """        const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        
        let mappedLeads = [];
        if (leadsData && leadsData.length > 0) {
          mappedLeads = leadsData.map(l => ({
            id: l.id,
            date: new Date(l.created_at).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
            name: l.name,
            email: l.email,
            phone: l.phone,
            address: l.address,
            budget: l.budget,
            projectScope: l.project_scope,
            status: l.status || 'Pipedrive Deal Created'
          }));
        }

        // Merge with local storage leads to ensure local test submissions are not lost
        try {
          const localSaved = JSON.parse(localStorage.getItem('havenridge_leads_list') || '[]');
          if (localSaved.length > 0) {
            const mappedLocal = localSaved.map((l, idx) => ({
              id: l.id || `local-${idx}`,
              date: l.created_at ? new Date(l.created_at).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }) : new Date().toLocaleString(),
              name: l.name || 'Website Inquiry',
              email: l.email,
              phone: l.phone,
              address: l.address,
              budget: l.budget,
              projectScope: l.project_scope,
              status: l.status || 'Pipedrive Deal Created'
            }));

            // Deduplicate by email and date
            const existingKeys = new Set(mappedLeads.map(l => `${l.email}-${l.date}`));
            const uniqueLocal = mappedLocal.filter(l => !existingKeys.has(`${l.email}-${l.date}`));
            
            mappedLeads = [...uniqueLocal, ...mappedLeads];
          }
        } catch (e) {
          console.warn('Error merging local leads:', e);
        }
        
        if (mappedLeads.length > 0) {
          setFormSubmissions(mappedLeads);
        }"""

code = code.replace(old_supabase_effect, new_supabase_effect)

with open('src/components/AdminDashboardView.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("AdminDashboardView patched successfully!")
