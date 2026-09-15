import re

app_file = 'src/App.jsx'
with open(app_file, 'r', encoding='utf-8') as f:
    app_code = f.read()

# Add getSiteMedia to imports
app_code = app_code.replace("import { supabase, saveLeadToSupabase, incrementMetric } from './lib/supabaseClient';", "import { supabase, saveLeadToSupabase, incrementMetric, getSiteMedia } from './lib/supabaseClient';")

# Add state and effect to App component
app_start = "export default function App() {"
media_state = """
  // Global Site Media Overrides
  const [siteMedia, setSiteMedia] = useState({});
  useEffect(() => {
    getSiteMedia().then(data => {
      if (data && Object.keys(data).length > 0) {
        setSiteMedia(data);
      }
    });
  }, []);
"""
if "const [siteMedia" not in app_code:
    app_code = app_code.replace(app_start, app_start + "\n" + media_state)

# Replace heroImages array
old_hero = """  const heroImages = [
    '/project_images/hero_living_room_fireplace.jpg',
    '/project_images/piccadilly/1.png',
    '/project_images/mcdougall/3.png'
  ];"""
new_hero = """  const heroImages = [
    siteMedia['home_hero_1'] || '/project_images/hero_living_room_fireplace.jpg',
    siteMedia['home_hero_2'] || '/project_images/piccadilly/1.png',
    siteMedia['home_hero_3'] || '/project_images/mcdougall/3.png'
  ];"""
app_code = app_code.replace(old_hero, new_hero)

# Replace Cass Hero Banner images
old_cass = """        <section className="grid grid-cols-2 gap-2 h-[250px] sm:h-[350px] overflow-hidden bg-[#0B2638]">
          <img src="/project_images/piccadilly/1.png" alt="Kitchen highlight" className="w-full h-full object-cover opacity-80" />
          <img src="/project_images/hero_living_room_fireplace.jpg" alt="Living Room highlight" className="w-full h-full object-cover opacity-80" />
        </section>"""
new_cass = """        <section className="grid grid-cols-2 gap-2 h-[250px] sm:h-[350px] overflow-hidden bg-[#0B2638]">
          <img src={siteMedia['home_hero_2'] || "/project_images/piccadilly/1.png"} alt="Kitchen highlight" className="w-full h-full object-cover opacity-80" />
          <img src={siteMedia['home_hero_1'] || "/project_images/hero_living_room_fireplace.jpg"} alt="Living Room highlight" className="w-full h-full object-cover opacity-80" />
        </section>"""
app_code = app_code.replace(old_cass, new_cass)

with open(app_file, 'w', encoding='utf-8') as f:
    f.write(app_code)

print("App.jsx patched")
