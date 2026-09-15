import re

admin_file = 'src/components/AdminDashboardView.jsx'
with open(admin_file, 'r', encoding='utf-8') as f:
    admin_code = f.read()

# Add getSiteMedia and saveSiteMedia to imports
admin_code = admin_code.replace("import { supabase, getLeadsFromSupabase } from '../lib/supabaseClient';", "import { supabase, getLeadsFromSupabase, getSiteMedia, saveSiteMedia } from '../lib/supabaseClient';")

# Change state initialization to just default values, we will load async
old_state = """  const [siteImages, setSiteImages] = useState(() => {
    const saved = localStorage.getItem('havenridge_site_images');
    return saved ? JSON.parse(saved) : {"""
new_state = """  const [siteImages, setSiteImages] = useState({"""
admin_code = admin_code.replace(old_state, new_state)

# The end of that object was:
#       resources_blog_banner: 'project_images/hero_living_room_fireplace.jpg'
#     };
#   });
old_state_end = """      resources_blog_banner: 'project_images/hero_living_room_fireplace.jpg'
    };
  });"""
new_state_end = """      resources_blog_banner: 'project_images/hero_living_room_fireplace.jpg'
  });"""
admin_code = admin_code.replace(old_state_end, new_state_end)


# Change handleSaveMedia
old_save = """  const handleSaveMedia = () => {
    localStorage.setItem('havenridge_site_images', JSON.stringify(siteImages));
    setMediaSavedNotice(true);
    setTimeout(() => setMediaSavedNotice(false), 3000);
  };"""
new_save = """  const handleSaveMedia = async () => {
    await saveSiteMedia(siteImages);
    setMediaSavedNotice(true);
    setTimeout(() => setMediaSavedNotice(false), 3000);
  };"""
admin_code = admin_code.replace(old_save, new_save)


# Add an effect to load media from Supabase when Media tab opens
# Let's just put it in a generic useEffect
media_effect = """
  useEffect(() => {
    getSiteMedia().then(data => {
      if (data && Object.keys(data).length > 0) {
        setSiteImages(prev => ({ ...prev, ...data }));
      }
    });
  }, []);
"""
admin_code = admin_code.replace("const handleSaveMedia =", media_effect + "\n  const handleSaveMedia =")

# Also, update handleFileUpload to upload to Supabase Storage if it's a file
old_upload = """  const handleFileUpload = (key, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteImages(prev => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };"""
new_upload = """  const handleFileUpload = async (key, event) => {
    const file = event.target.files[0];
    if (file) {
      // Show temporary loading state
      setSiteImages(prev => ({ ...prev, [key]: 'Uploading...' }));
      
      const safeName = file.name.replace(/[^a-zA-Z0-9.\\-_]/g, '_');
      const uniqueName = `${Date.now()}_${Math.floor(Math.random()*1000)}_${safeName}`;
      
      try {
        const { error } = await supabase.storage.from('lead-attachments').upload(uniqueName, file);
        if (error) throw error;
        
        const { data } = supabase.storage.from('lead-attachments').getPublicUrl(uniqueName);
        setSiteImages(prev => ({ ...prev, [key]: data.publicUrl }));
      } catch (e) {
        console.error('Error uploading media:', e);
        alert('Upload failed. Please try again.');
      }
    }
  };"""
admin_code = admin_code.replace(old_upload, new_upload)

with open(admin_file, 'w', encoding='utf-8') as f:
    f.write(admin_code)

print("AdminDashboardView patched")
