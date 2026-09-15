import re

client_file = 'src/lib/supabaseClient.js'
with open(client_file, 'r', encoding='utf-8') as f:
    client_code = f.read()

new_functions = """
// Get all site media overrides
export async function getSiteMedia() {
  try {
    const { data, error } = await supabase.from('site_settings').select('value').eq('id', 'media').single();
    return data ? data.value : {};
  } catch (err) {
    console.warn('Media fetch error:', err);
    return {};
  }
}

// Save all site media overrides
export async function saveSiteMedia(mediaObj) {
  try {
    await supabase.from('site_settings').upsert({ id: 'media', value: mediaObj });
  } catch (err) {
    console.warn('Media save error:', err);
  }
}
"""

if "getSiteMedia" not in client_code:
    client_code += "\n" + new_functions
    with open(client_file, 'w', encoding='utf-8') as f:
        f.write(client_code)

print("supabaseClient.js patched")
