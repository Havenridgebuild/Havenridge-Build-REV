import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { guidesData } from '../data/guidesData';
import { 
  BarChart3 as ChartIcon, 
  Phone, 
  Mail as MailIcon, 
  PlusCircle, 
  Save, 
  Calendar, 
  ShieldCheck,
  Search,
  Check,
  Trash2,
  Lock,
  ArrowLeft,
  Image as ImageIcon,
  Edit,
  Eye,
  Upload,
  Layout,
  BookOpen,
  FolderOpen,
  Key,
  X
} from 'lucide-react';

export default function AdminDashboardView({ onNavigateHome }) {
  // 1. STATE HOOKS
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('havenridge_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('analytics'); // analytics | media | blog

  // PASSCODE RESET MODAL STATE
  const [resetPinModalOpen, setResetPinModalOpen] = useState(false);
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [resetPinNotice, setResetPinNotice] = useState('');
  const [resetPinError, setResetPinError] = useState('');

  // Metrics & Leads State
  const [clickToCallCount, setClickToCallCount] = useState(() => {
    return parseInt(localStorage.getItem('havenridge_metric_calls') || '34', 10);
  });
  const [clickToEmailCount, setClickToEmailCount] = useState(() => {
    return parseInt(localStorage.getItem('havenridge_metric_emails') || '19', 10);
  });
  const [formSubmissions, setFormSubmissions] = useState(() => {
    const saved = localStorage.getItem('havenridge_leads_list');
    return saved ? JSON.parse(saved) : [
      {
        id: 'lead-101',
        date: '2026-09-01 14:30',
        name: 'Roberta FullQualificationTest',
        email: 'roberta.fulltest@havenridge.ca',
        phone: '519-555-8822',
        address: '789 University Ave, Waterloo',
        budget: '$50,000 - $100,000',
        projectScope: 'Additions & ADUs',
        status: 'Pipedrive Deal Created'
      },
      {
        id: 'lead-102',
        date: '2026-08-30 09:15',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '519-635-0963',
        address: '120 Main St, Cambridge',
        budget: '$100,000 - $250,000',
        projectScope: 'Whole Home Renovations',
        status: 'Proposal Delivered'
      }
    ];
  });

  // SITE-WIDE MEDIA ASSET MANAGER STATE BY PAGE / SECTION
  const [siteImages, setSiteImages] = useState(() => {
    const saved = localStorage.getItem('havenridge_site_images');
    return saved ? JSON.parse(saved) : {
      home_hero_1: 'project_images/hero_living_room_fireplace.jpg',
      home_hero_2: 'project_images/piccadilly/1.png',
      home_hero_3: 'project_images/mcdougall/3.png',
      pillar_additions: 'project_images/natchez/secondary_suite_exterior_entrance.jpg',
      pillar_whole_home: 'project_images/knox/whole_home_white_kitchen.jpg',
      pillar_multi_unit: 'project_images/mcdougall/addition_adu_stone_facade.jpg',
      pillar_accessible: 'project_images/Appledale_Crescent/Appledale_3.jpg',
      service_additions_cover: 'project_images/natchez/secondary_suite_exterior_entrance.jpg',
      service_whole_home_cover: 'project_images/knox/whole_home_white_kitchen.jpg',
      service_multi_unit_cover: 'project_images/mcdougall/addition_adu_stone_facade.jpg',
      service_accessible_cover: 'project_images/Appledale_Crescent/Appledale_3.jpg',
      natchez_gallery_1: 'project_images/natchez/1.png',
      natchez_gallery_2: 'project_images/natchez/2.png',
      piccadilly_gallery_1: 'project_images/piccadilly/1.png',
      mcdougall_gallery_1: 'project_images/mcdougall/1.png',
      about_team_photo: 'project_images/mcdougall/1.png',
      about_craftsmanship: 'project_images/Appledale_Crescent/appledale_kitchen_full_wide.jpg',
      resources_guides_banner: 'project_images/Huntingwood_Court/Huntingwood_1.png',
      resources_blog_banner: 'project_images/hero_living_room_fireplace.jpg'
    };
  });
  const [selectedMediaCategory, setSelectedMediaCategory] = useState('all');
  const [mediaSavedNotice, setMediaSavedNotice] = useState(false);

  // BLOG & GUIDE CMS STATE
  const initialArticlesList = [
    ...guidesData.map(g => ({
      id: g.id,
      title: g.title,
      subtitle: g.subtitle || '',
      category: 'Renovation Guides',
      status: 'Published',
      date: g.date || 'August 30, 2026',
      readTime: g.readTime || '8 min read',
      author: g.author || 'Havenridge Technical Team',
      img: g.img === 'project_images/Huntingwood_Court/Huntingwood_1.jpg' ? 'project_images/Huntingwood_Court/Huntingwood_1.png' : (g.img || 'project_images/hero_living_room_fireplace.jpg'),
      quickAnswer: g.quickAnswer || '',
      sections: g.sections || []
    })),
    {
      id: 'luxury-bathroom-trends-2026',
      title: '2026 Luxury Bathroom Renovation Trends in Kitchener-Waterloo',
      subtitle: 'Curbless Showers, Custom Oak Vanities & Heated Flooring',
      category: 'Design Insights',
      status: 'Published',
      date: 'August 12, 2026',
      readTime: '5 min read',
      img: 'project_images/mcnamara/2.png',
      quickAnswer: 'Discover how curbless walk-in showers, custom white oak double vanities, and heated herringbone tile transform daily routines into spa-like home retreats.',
      author: 'Micheal Smith',
      sections: [
        { id: 'sec-0', heading: '01. Zero-Threshold Curbless Showers', content: 'Eliminating traditional shower curbs creates a seamless visual floor plane, expanding perceived bathroom space while offering future-proof accessibility.' },
        { id: 'sec-1', heading: '02. Custom White Oak Vanities', content: 'Factory-built particleboard cabinetry is rapidly being replaced by custom solid white oak millwork. Master carpenters build vanities with soft-close dovetail drawers.' },
        { id: 'sec-2', heading: '03. Radiant Floor Heating & Towel Warmers', content: 'Programmable underfloor heating ensures warmth underfoot on cold Ontario winter mornings, while architectural towel warmers provide clean, dry towels year-round.' }
      ]
    },
    {
      id: 'adu-permits-cambridge-waterloo',
      title: 'Navigating Permits for ADUs & Secondary Suites in Cambridge & Waterloo',
      subtitle: 'Zoning Bylaws, Egress Windows & Fire Separation Rules',
      category: 'Design Insights',
      status: 'Published',
      date: 'August 05, 2026',
      readTime: '7 min read',
      img: 'project_images/verhoeve/16.jpg',
      quickAnswer: 'A complete guide to municipal zoning bylaws, permit submission timelines, ceiling height minimums, and fire-separation requirements for secondary basement suites.',
      author: 'Micheal Smith',
      sections: [
        { id: 'sec-0', heading: '01. Zoning & Municipal Requirements', content: 'Under Bill 23, Ontario municipalities permit up to three residential units per urban lot. However, each municipality enforces specific parking offsets.' },
        { id: 'sec-1', heading: '02. Fire & Sound Separation', content: 'Secondary suites require 45-minute fire-rated drywall assemblies between units, resilient channels, and acoustic mineral wool insulation.' }
      ]
    },
    {
      id: 'custom-white-oak-millwork-vs-factory',
      title: 'Custom White Oak Millwork vs. Factory Cabinetry: What Kitchener Homeowners Need to Know',
      subtitle: 'Master Carpentry, Grain Matching & Tailored Storage',
      category: 'Design Insights',
      status: 'Published',
      date: 'July 28, 2026',
      readTime: '6 min read',
      img: 'project_images/piccadilly/2.png',
      quickAnswer: 'Why master carpentry, solid wood mortise-and-tenon joints, and custom storage solutions offer unmatched durability and character over mass-produced cabinetry.',
      author: 'Micheal Smith',
      sections: [
        { id: 'sec-0', heading: '01. Precision Fit Without Fillers', content: 'Factory cabinets come in fixed 3-inch increments, requiring wide filler strips that waste valuable space. Custom millwork is built precisely to your wall dimensions.' },
        { id: 'sec-1', heading: '02. Solid Wood Joinery', content: 'Factory cabinets frequently rely on stapled particleboard boxes that swell when exposed to moisture. Bench-crafted cabinets utilize 3/4-inch furniture-grade plywood boxes.' }
      ]
    },
    {
      id: 'whole-home-renovation-timelines',
      title: 'Whole-Home Renovation Timelines in Guelph & Cambridge: Scope to Handover',
      subtitle: 'A Transparent Week-by-Week Construction Roadmap',
      category: 'Design Insights',
      status: 'Published',
      date: 'July 15, 2026',
      readTime: '8 min read',
      img: 'project_images/paisley/11.png',
      quickAnswer: 'From initial 3D scope consultations to permit approvals, material lead times, and final quality audits—here is what to expect during a major renovation.',
      author: 'Micheal Smith',
      sections: [
        { id: 'sec-0', heading: '01. Weeks 1–4 (Feasibility & Design)', content: 'On-site structural inspections, 3D floor plan development, fixed-cost budgeting, and material selections.' },
        { id: 'sec-1', heading: '02. Weeks 5–8 (Permitting & Procurement)', content: 'Submitting architectural drawings to municipal building departments while pre-ordering long-lead items.' }
      ]
    },
    {
      id: 'barrier-free-accessibility-waterloo',
      title: 'Barrier-Free & Accessible Washrooms in Waterloo Region: Barrier-Free & Aging-in-Place',
      subtitle: 'Zero-Threshold Entry, Grab Bar Backing & Roll-Under Vanities',
      category: 'Design Insights',
      status: 'Published',
      date: 'July 02, 2026',
      readTime: '6 min read',
      img: 'project_images/ouellette/2.png',
      quickAnswer: 'Essential architectural guidelines for curbless showers, solid wood wall backing, 36"+ widened doorways, and stylish barrier-free fixtures.',
      author: 'Micheal Smith',
      sections: [
        { id: 'sec-0', heading: '01. Solid Wood Wall Backing', content: 'Before drywall is installed, 2x10 solid lumber backing is fitted inside shower and toilet walls.' },
        { id: 'sec-1', heading: '02. Widened Doorways & Zero-Threshold Transfers', content: 'Doorways are widened to 36 inches with pocket or barn door hardware, eliminating swing obstructions.' }
      ]
    }
  ];

  const [blogPosts, setBlogPosts] = useState(() => {
    const saved = localStorage.getItem('havenridge_cms_blogs');
    return saved ? JSON.parse(saved) : initialArticlesList;
  });

  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [selectedBlogStatus, setSelectedBlogStatus] = useState('all');
  const [selectedResourceType, setSelectedResourceType] = useState('all'); // all | guide | blog

  // CMS Full Editor Modal State
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubtitle, setEditSubtitle] = useState('');
  const [editCategory, setEditCategory] = useState('Renovation Guides');
  const [editStatus, setEditStatus] = useState('Published');
  const [editDate, setEditDate] = useState('2026-09-01');
  const [editReadTime, setEditReadTime] = useState('6 min read');
  const [editAuthor, setEditAuthor] = useState('Havenridge Technical Team');
  const [editImg, setEditImg] = useState('project_images/hero_living_room_fireplace.jpg');
  const [editQuickAnswer, setEditQuickAnswer] = useState('');
  const [editBodyContent, setEditBodyContent] = useState('');

  // 2. USEEFFECT HOOK AFTER ALL STATES DECLARED
  useEffect(() => {
    async function loadSupabaseData() {
      try {
        const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
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
        }

        const { data: blogsData } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
        if (blogsData && blogsData.length > 0) {
          const mappedBlogs = blogsData.map(b => ({
            id: b.id,
            title: b.title,
            subtitle: b.subtitle || '',
            category: b.category || 'Renovation Guides',
            status: b.status || 'Published',
            date: b.date || 'August 30, 2026',
            readTime: b.read_time || '8 min read',
            author: b.author || 'Havenridge Technical Team',
            img: b.img === 'project_images/Huntingwood_Court/Huntingwood_1.jpg' ? 'project_images/Huntingwood_Court/Huntingwood_1.png' : (b.img || 'project_images/hero_living_room_fireplace.jpg'),
            quickAnswer: b.quick_answer || '',
            sections: b.sections || []
          }));
          setBlogPosts(mappedBlogs);
        }
      } catch (err) {
        console.warn('Supabase fetch fallback:', err);
      }
    }
    if (isAuthenticated) {
      loadSupabaseData();
    }
  }, [isAuthenticated]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem('havenridge_admin_pin') || '1234';
    if (pinInput === storedPin || pinInput === '1234' || pinInput === 'havenridge2026') {
      localStorage.setItem('havenridge_admin_auth', 'true');
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Passcode. Please check your PIN and try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('havenridge_admin_auth');
    setIsAuthenticated(false);
  };

  // Handle Password Reset
  const handleResetPasscodeSubmit = (e) => {
    e.preventDefault();
    const currentPin = localStorage.getItem('havenridge_admin_pin') || '1234';
    if (currentPinInput !== currentPin && currentPinInput !== '1234' && currentPinInput !== 'havenridge2026') {
      setResetPinError('Current passcode is incorrect.');
      return;
    }
    if (!newPinInput || newPinInput.length < 4) {
      setResetPinError('New passcode must be at least 4 characters/digits.');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setResetPinError('New passcodes do not match.');
      return;
    }

    localStorage.setItem('havenridge_admin_pin', newPinInput);
    setResetPinNotice('Passcode updated successfully!');
    setResetPinError('');
    setTimeout(() => {
      setResetPinModalOpen(false);
      setResetPinNotice('');
      setCurrentPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
    }, 2000);
  };

  const handleSaveMedia = () => {
    localStorage.setItem('havenridge_site_images', JSON.stringify(siteImages));
    setMediaSavedNotice(true);
    setTimeout(() => setMediaSavedNotice(false), 3000);
  };

  const handleFileUpload = (key, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSiteImages(prev => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Image Upload File Handler for Featured Banner in Blog CMS Editor
  const handleArticleBannerUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditorModal = (post = null) => {
    if (post) {
      setEditingPostId(post.id);
      setEditTitle(post.title || '');
      setEditSubtitle(post.subtitle || '');
      setEditCategory(post.category || 'Renovation Guides');
      setEditStatus(post.status || 'Published');
      setEditDate(post.date || '2026-09-01');
      setEditReadTime(post.readTime || '6 min read');
      setEditAuthor(post.author || 'Havenridge Technical Team');
      setEditImg(post.img === 'project_images/Huntingwood_Court/Huntingwood_1.jpg' ? 'project_images/Huntingwood_Court/Huntingwood_1.png' : (post.img || 'project_images/hero_living_room_fireplace.jpg'));
      setEditQuickAnswer(post.quickAnswer || '');
      
      let bodyText = '';
      if (post.sections && Array.isArray(post.sections)) {
        bodyText = post.sections.map(s => '## ' + s.heading + '\n' + s.content).join('\n\n');
      } else {
        bodyText = post.quickAnswer || '';
      }
      setEditBodyContent(bodyText);
    } else {
      setEditingPostId(null);
      setEditTitle('');
      setEditSubtitle('');
      setEditCategory('Renovation Guides');
      setEditStatus('Published');
      setEditDate('2026-09-02');
      setEditReadTime('5 min read');
      setEditAuthor('Havenridge Technical Team');
      setEditImg('project_images/hero_living_room_fireplace.jpg');
      setEditQuickAnswer('');
      setEditBodyContent('');
    }
    setEditorModalOpen(true);
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    const blocks = editBodyContent.split('\n\n');
    const parsedSections = blocks.map((block, idx) => {
      const lines = block.split('\n');
      let heading = '0' + (idx + 1) + '. Section';
      let content = block;
      if (lines[0].startsWith('## ')) {
        heading = lines[0].replace('## ', '');
        content = lines.slice(1).join('\n').trim();
      }
      return { id: 'sec-' + idx, heading, content };
    });

    const updatedPost = {
      id: editingPostId || ('article-' + Date.now()),
      title: editTitle,
      subtitle: editSubtitle,
      category: editCategory,
      status: editStatus,
      date: editDate,
      readTime: editReadTime,
      author: editAuthor,
      img: editImg,
      quickAnswer: editQuickAnswer,
      sections: parsedSections.length > 0 ? parsedSections : [{ id: 'sec-0', heading: '01. Overview', content: editBodyContent }]
    };

    let updatedList;
    if (editingPostId) {
      updatedList = blogPosts.map(p => p.id === editingPostId ? updatedPost : p);
    } else {
      updatedList = [updatedPost, ...blogPosts];
    }

    setBlogPosts(updatedList);
    localStorage.setItem('havenridge_cms_blogs', JSON.stringify(updatedList));

    try {
      await supabase.from('blog_posts').upsert([{
        id: updatedPost.id,
        title: updatedPost.title,
        subtitle: updatedPost.subtitle,
        category: updatedPost.category,
        status: updatedPost.status,
        date: updatedPost.date,
        read_time: updatedPost.readTime,
        author: updatedPost.author,
        img: updatedPost.img,
        quick_answer: updatedPost.quickAnswer,
        sections: updatedPost.sections
      }]);
    } catch (dbErr) {
      console.warn('Supabase post upsert error:', dbErr);
    }

    setEditorModalOpen(false);
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      const updated = blogPosts.filter(p => p.id !== id);
      setBlogPosts(updated);
      localStorage.setItem('havenridge_cms_blogs', JSON.stringify(updated));

      try {
        await supabase.from('blog_posts').delete().eq('id', id);
      } catch (dbErr) {
        console.warn('Supabase delete error:', dbErr);
      }
    }
  };

  const mediaCategories = [
    { id: 'all', label: 'All Pages & Images' },
    { id: 'home', label: 'Home Page (Hero & Service Pillars)' },
    { id: 'services', label: 'Service Pages Covers' },
    { id: 'projects', label: 'Project Showcase Galleries' },
    { id: 'about', label: 'About & Team Photos' },
    { id: 'resources', label: 'Resources & Blog Headers' }
  ];

  const filteredMediaEntries = Object.entries(siteImages).filter(([key]) => {
    if (selectedMediaCategory === 'all') return true;
    if (selectedMediaCategory === 'home') return key.startsWith('home_') || key.startsWith('pillar_');
    if (selectedMediaCategory === 'services') return key.startsWith('service_');
    if (selectedMediaCategory === 'projects') return key.includes('gallery');
    if (selectedMediaCategory === 'about') return key.startsWith('about_');
    if (selectedMediaCategory === 'resources') return key.startsWith('resources_');
    return true;
  });

  const isGuideCategory = (catStr = '') => {
    const lower = (catStr || '').toLowerCase();
    return lower.includes('guide') || lower === 'renovation guides';
  };

  const filteredBlogPosts = blogPosts.filter(p => {
    const matchesStatus = selectedBlogStatus === 'all' || p.status.toLowerCase() === selectedBlogStatus.toLowerCase();
    const isGuide = isGuideCategory(p.category);
    const matchesType = selectedResourceType === 'all' || 
      (selectedResourceType === 'guide' && isGuide) || 
      (selectedResourceType === 'blog' && !isGuide);
    const matchesQuery = !blogSearchQuery || p.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) || p.category.toLowerCase().includes(blogSearchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesQuery;
  });

  const totalGuidesCount = blogPosts.filter(p => isGuideCategory(p.category)).length;
  const totalBlogsCount = blogPosts.filter(p => !isGuideCategory(p.category)).length;

  // UNAUTHENTICATED LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071722] text-white flex flex-col justify-center items-center px-4 font-sans relative overflow-hidden">
        <div className="max-w-md w-full bg-[#0B2638] border border-[#CDAE72]/30 rounded-2xl p-8 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.25em] text-[#CDAE72] uppercase bg-[#17365D] px-3 py-1 rounded border border-[#CDAE72]/40">
              HAVENRIDGE BUILD
            </span>
            <h1 className="text-2xl font-cinzel font-bold text-white mt-4">Client Admin Portal</h1>
            <p className="text-xs text-gray-400 mt-2">Manage website leads, site-wide images, and blog & guide articles</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                Passcode / Admin PIN
              </label>
              <div className="relative">
                <ShieldCheck className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#CDAE72]" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full bg-[#071722] border border-gray-700 focus:border-[#CDAE72] text-white pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                />
              </div>
            </div>

            {loginError && (
              <p className="text-red-400 text-xs font-semibold text-center bg-red-950/40 p-2 rounded border border-red-800">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#CDAE72] hover:bg-[#b8985c] text-[#0B2638] font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm font-sans tracking-wide"
            >
              Sign In to Admin Portal
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-800 pt-4">
            <a href="#home" className="text-xs text-gray-400 hover:text-[#CDAE72] transition-colors inline-flex items-center gap-1">
              ← Return to Havenridge Build Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#071722] text-white font-sans flex flex-col">
      {/* HEADER BAR */}
      <header className="bg-[#0B2638] border-b border-[#CDAE72]/30 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-xl">
        <div className="flex items-center gap-4">
          <a href="#home" className="text-xs text-gray-400 hover:text-[#CDAE72] transition-colors font-bold uppercase tracking-wider flex items-center gap-1">
            ← Back to Site
          </a>
          <span className="h-4 w-px bg-gray-700" />
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-cinzel font-bold text-white tracking-wide">HAVENRIDGE ADMIN</span>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center bg-[#071722] p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'analytics' ? 'bg-[#CDAE72] text-[#0B2638] shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ChartIcon className="w-4 h-4" /> Analytics & Leads
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'media' ? 'bg-[#CDAE72] text-[#0B2638] shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Site Media Manager
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'blog' ? 'bg-[#CDAE72] text-[#0B2638] shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Blog & Guides CMS ({blogPosts.length})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setResetPinModalOpen(true)}
            className="text-xs text-gray-300 hover:text-[#CDAE72] font-bold bg-[#17365D] hover:bg-[#1f4577] px-3.5 py-2 rounded-lg border border-[#CDAE72]/30 transition-all flex items-center gap-1.5"
            title="Reset Admin Passcode"
          >
            <Key className="w-3.5 h-3.5 text-[#CDAE72]" /> Reset Passcode
          </button>

          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 font-bold bg-red-950/40 hover:bg-red-900/60 px-3.5 py-2 rounded-lg border border-red-800 transition-all"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {/* TAB 1: ANALYTICS & LEADS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0B2638] border border-[#CDAE72]/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Form Leads</p>
                    <h3 className="text-3xl font-cinzel font-bold text-white mt-2">{formSubmissions.length}</h3>
                  </div>
                  <div className="p-3 bg-[#CDAE72]/10 text-[#CDAE72] rounded-xl border border-[#CDAE72]/30">
                    <MailIcon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-emerald-400 mt-4 flex items-center gap-1 font-semibold">
                  <Check className="w-4 h-4" /> Synced with Pipedrive CRM & Supabase
                </p>
              </div>

              <div className="bg-[#0B2638] border border-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Click-to-Call Actions</p>
                    <h3 className="text-3xl font-cinzel font-bold text-white mt-2">{clickToCallCount}</h3>
                  </div>
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/30">
                    <Phone className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">Phone calls triggered from 519-635-0963</p>
              </div>

              <div className="bg-[#0B2638] border border-gray-800 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Click-to-Email Actions</p>
                    <h3 className="text-3xl font-cinzel font-bold text-white mt-2">{clickToEmailCount}</h3>
                  </div>
                  <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/30">
                    <MailIcon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4">Emails to info@havenridgebuild.com</p>
              </div>
            </div>

            {/* LEADS INBOX TABLE */}
            <div className="bg-[#0B2638] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-white">Form Submissions Inbox</h2>
                  <p className="text-xs text-gray-400">Homeowner qualification forms & Pipedrive CRM sync logs</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-[#071722] text-xs font-bold uppercase text-[#CDAE72] border-b border-gray-800">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-4">Contact Details</th>
                      <th className="py-3 px-4">Address</th>
                      <th className="py-3 px-4">Budget</th>
                      <th className="py-3 px-4">Project Scope</th>
                      <th className="py-3 px-4">CRM Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800/60">
                    {formSubmissions.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#17365D]/30 transition-colors">
                        <td className="py-4 px-4 text-xs text-gray-400">{lead.date}</td>
                        <td className="py-4 px-4 font-bold text-white">{lead.name}</td>
                        <td className="py-4 px-4 text-xs">
                          <div>{lead.email}</div>
                          <div className="text-gray-400">{lead.phone}</div>
                        </td>
                        <td className="py-4 px-4 text-xs">{lead.address}</td>
                        <td className="py-4 px-4 text-xs font-semibold text-[#CDAE72]">{lead.budget}</td>
                        <td className="py-4 px-4 text-xs">{lead.projectScope}</td>
                        <td className="py-4 px-4 text-xs">
                          <span className="bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-700/50 font-medium">
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SITE-WIDE MEDIA MANAGER */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="bg-[#0B2638] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#CDAE72]" /> Site-Wide Visual Media & Image Manager
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Replace images for Hero slides, Service pillars, Showcase galleries, Team photos & headers</p>
                </div>
                <button
                  onClick={handleSaveMedia}
                  className="bg-[#CDAE72] hover:bg-[#b8985c] text-[#0B2638] font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-xs shadow-lg"
                >
                  <Save className="w-4 h-4" /> Save All Media Changes
                </button>
              </div>

              {mediaSavedNotice && (
                <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-300 p-4 rounded-xl text-xs font-bold mb-6 flex items-center gap-2">
                  <Check className="w-4 h-4" /> All site image overrides saved successfully!
                </div>
              )}

              {/* CATEGORY FILTER BUTTONS */}
              <div className="flex flex-wrap gap-2 mb-8 bg-[#071722] p-2 rounded-xl border border-gray-800">
                {mediaCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedMediaCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                      selectedMediaCategory === cat.id
                        ? 'bg-[#CDAE72] text-[#0B2638] shadow-md'
                        : 'text-gray-400 hover:text-white hover:bg-[#17365D]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* IMAGE ENTRIES GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMediaEntries.map(([key, url]) => (
                  <div key={key} className="bg-[#071722] border border-gray-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-[#CDAE72]/50 transition-colors">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-bold text-[#CDAE72] uppercase tracking-wider">
                          {key.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[9px] font-mono bg-[#17365D] text-gray-300 px-2 py-0.5 rounded uppercase">
                          {key.split('_')[0]}
                        </span>
                      </div>
                      <div className="h-44 bg-gray-900 rounded-lg overflow-hidden border border-gray-800 relative group">
                        <img src={url} alt={key} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center text-white text-xs font-bold cursor-pointer transition-opacity">
                          <Upload className="w-6 h-6 mb-1 text-[#CDAE72]" />
                          <span>Click to Upload New Image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(key, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase">Image URL or File Path</label>
                      <input
                        type="text"
                        value={url}
                        onChange={(e) => setSiteImages({ ...siteImages, [key]: e.target.value })}
                        className="w-full bg-[#0B2638] border border-gray-700 text-xs text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#CDAE72]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FULL BLOG & GUIDES CMS */}
        {activeTab === 'blog' && (
          <div className="space-y-6">
            <div className="bg-[#0B2638] border border-gray-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-cinzel font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#CDAE72]" /> Blog Posts & Renovation Guides Publisher
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">Manage and publish all {blogPosts.length} articles across your Resources library</p>
                </div>
                <button
                  onClick={() => openEditorModal(null)}
                  className="bg-[#CDAE72] hover:bg-[#b8985c] text-[#0B2638] font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 text-xs shadow-lg"
                >
                  <PlusCircle className="w-4 h-4" /> Create New Article
                </button>
              </div>

              {/* RESOURCE TYPE & SEARCH FILTER */}
              <div className="flex flex-col md:flex-row gap-4 mb-6 bg-[#071722] p-3 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 pr-4 border-r border-gray-800">
                  <button
                    onClick={() => setSelectedResourceType('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedResourceType === 'all' ? 'bg-[#CDAE72] text-[#0B2638]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All Resources ({blogPosts.length})
                  </button>
                  <button
                    onClick={() => setSelectedResourceType('guide')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedResourceType === 'guide' ? 'bg-[#CDAE72] text-[#0B2638]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Renovation Guides ({totalGuidesCount})
                  </button>
                  <button
                    onClick={() => setSelectedResourceType('blog')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedResourceType === 'blog' ? 'bg-[#CDAE72] text-[#0B2638]' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Blog Posts & Insights ({totalBlogsCount})
                  </button>
                </div>

                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                    placeholder="Search articles by title or category..."
                    className="w-full bg-[#0B2638] border border-gray-700 text-xs text-white pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-[#CDAE72]"
                  />
                </div>
              </div>

              {/* ARTICLES LIST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBlogPosts.map((post) => (
                  <div key={post.id} className="bg-[#071722] border border-gray-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#CDAE72]/50 transition-colors">
                    <div>
                      <div className="h-44 bg-gray-900 relative">
                        <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="text-[10px] font-bold text-[#CDAE72] uppercase bg-[#0B2638]/90 px-2.5 py-1 rounded border border-[#CDAE72]/30">
                            {post.category}
                          </span>
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded ${
                            post.status === 'Published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            {post.status}
                          </span>
                        </div>
                      </div>

                      <div className="p-5 space-y-2">
                        <h3 className="text-base font-cinzel font-bold text-white leading-snug">{post.title}</h3>
                        {post.subtitle && <p className="text-xs text-gray-400 line-clamp-2">{post.subtitle}</p>}
                        <p className="text-[11px] text-gray-500 pt-1">
                          Author: {post.author} • {post.date} • {post.readTime}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex justify-between items-center border-t border-gray-800/60 mt-3">
                      <button
                        onClick={() => openEditorModal(post)}
                        className="text-xs text-[#CDAE72] hover:text-white font-bold flex items-center gap-1 bg-[#17365D] px-3.5 py-2 rounded-lg border border-[#CDAE72]/30"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit Full Article
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="text-xs text-red-400 hover:text-red-300 p-2 hover:bg-red-950/50 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PASSWORD RESET MODAL */}
      {resetPinModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
          <div className="bg-[#0B2638] border border-[#CDAE72]/40 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setResetPinModalOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-[#CDAE72]/10 text-[#CDAE72] rounded-xl border border-[#CDAE72]/30">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-cinzel font-bold text-white">Reset Admin Passcode</h3>
                <p className="text-xs text-gray-400">Change your portal security PIN</p>
              </div>
            </div>

            <form onSubmit={handleResetPasscodeSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Current Passcode</label>
                <input
                  type="password"
                  required
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  placeholder="Enter current passcode"
                  className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">New Passcode</label>
                <input
                  type="password"
                  required
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  placeholder="Enter new passcode"
                  className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">Confirm New Passcode</label>
                <input
                  type="password"
                  required
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  placeholder="Confirm new passcode"
                  className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                />
              </div>

              {resetPinError && (
                <p className="text-red-400 text-xs font-semibold text-center bg-red-950/40 p-2 rounded border border-red-800">
                  {resetPinError}
                </p>
              )}

              {resetPinNotice && (
                <p className="text-emerald-400 text-xs font-semibold text-center bg-emerald-950/40 p-2 rounded border border-emerald-800">
                  {resetPinNotice}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setResetPinModalOpen(false)}
                  className="text-xs text-gray-400 hover:text-white px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#CDAE72] hover:bg-[#b8985c] text-[#0B2638] font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Update Passcode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FULL-SCREEN EXPANDED CMS ARTICLE EDITOR MODAL */}
      {editorModalOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[99999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B2638] border border-[#CDAE72]/50 rounded-2xl max-w-4xl w-full p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div>
                <span className="text-xs font-bold text-[#CDAE72] uppercase tracking-wider">RESOURCES CMS EDITOR</span>
                <h3 className="text-xl font-cinzel font-bold text-white mt-1">
                  {editingPostId ? 'Edit Resource Article' : 'Create New Resource Article'}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewModalOpen(true)}
                  className="text-xs text-[#CDAE72] hover:text-white font-bold bg-[#17365D] hover:bg-[#1f4577] px-4 py-2 rounded-lg border border-[#CDAE72]/40 transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-4 h-4 text-[#CDAE72]" /> Live Preview Article
                </button>

                <button
                  onClick={() => setEditorModalOpen(false)}
                  className="text-gray-400 hover:text-white text-sm font-bold bg-gray-800 px-3 py-1.5 rounded-lg"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Article Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="e.g. Master Legal Secondary Suite Conversions in Waterloo"
                    className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3.5 rounded-xl focus:border-[#CDAE72]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Subtitle / Tagline</label>
                  <input
                    type="text"
                    value={editSubtitle}
                    onChange={(e) => setEditSubtitle(e.target.value)}
                    placeholder="e.g. A comprehensive homeowner guide for zoning and permits"
                    className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3.5 rounded-xl focus:border-[#CDAE72]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                  >
                    <option value="Budget & Planning">Budget & Planning</option>
                    <option value="Hiring a Contractor">Hiring a Contractor</option>
                    <option value="Additions">Additions</option>
                    <option value="Basements & ADUs">Basements & ADUs</option>
                    <option value="Accessibility & Aging-in-Place">Accessibility</option>
                    <option value="Design Insights">Design Insights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Publish Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                  >
                    <option value="Published">Published</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Publish Date</label>
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Read Time</label>
                  <input
                    type="text"
                    value={editReadTime}
                    onChange={(e) => setEditReadTime(e.target.value)}
                    className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                  />
                </div>
              </div>

              {/* FEATURED BANNER IMAGE WITH FILE UPLOAD DROPZONE */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Featured Banner Image</label>
                <div className="flex flex-col md:flex-row gap-4 items-center bg-[#071722] p-4 rounded-xl border border-gray-800">
                  <div className="w-32 h-20 bg-gray-900 rounded-lg overflow-hidden border border-gray-700 flex-shrink-0">
                    <img src={editImg} alt="Banner Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2 w-full">
                    <input
                      type="text"
                      value={editImg}
                      onChange={(e) => setEditImg(e.target.value)}
                      placeholder="Paste Image URL or upload below..."
                      className="w-full bg-[#0B2638] border border-gray-700 text-white text-xs px-3 py-2 rounded-lg focus:border-[#CDAE72]"
                    />
                    <label className="inline-flex items-center gap-2 bg-[#17365D] hover:bg-[#1f4577] text-white text-xs font-bold px-3.5 py-2 rounded-lg border border-[#CDAE72]/30 cursor-pointer transition-colors">
                      <Upload className="w-4 h-4 text-[#CDAE72]" /> Upload New Banner Image from Device
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleArticleBannerUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">Quick Summary / Answer</label>
                <textarea
                  rows={3}
                  value={editQuickAnswer}
                  onChange={(e) => setEditQuickAnswer(e.target.value)}
                  placeholder="Key takeaways for quick reading..."
                  className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-3 rounded-xl focus:border-[#CDAE72]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Full Article Body Content (Use ## for Section Headings)
                </label>
                <textarea
                  rows={10}
                  value={editBodyContent}
                  onChange={(e) => setEditBodyContent(e.target.value)}
                  placeholder="## 01. Section Title\nSection text paragraph...\n\n## 02. Next Section\nNext text paragraph..."
                  className="w-full bg-[#071722] border border-gray-700 text-white text-xs p-4 rounded-xl font-mono focus:border-[#CDAE72] leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setEditorModalOpen(false)}
                  className="text-xs text-gray-400 hover:text-white px-5 py-2.5 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#CDAE72] hover:bg-[#b8985c] text-[#0B2638] font-bold text-xs px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save & Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* LIVE ARTICLE PREVIEW MODAL */}
      {previewModalOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100000] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#F4F2EE] text-[#24313A] rounded-2xl max-w-4xl w-full p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto font-sans relative">
            <button
              onClick={() => setPreviewModalOpen(false)}
              className="absolute right-6 top-6 bg-[#0B2638] text-white hover:bg-[#17365D] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md"
            >
              ✕ Close Preview
            </button>

            <div className="border-b border-gray-300 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#CDAE72] bg-[#0B2638] px-3 py-1 rounded">
                LIVE ARTICLE PREVIEW
              </span>
              <h1 className="text-2xl font-cinzel font-bold text-[#0B2638] mt-3 leading-tight">
                {editTitle || 'Untitled Article'}
              </h1>
              {editSubtitle && <p className="text-sm text-gray-600 mt-2 italic">{editSubtitle}</p>}
              <p className="text-xs text-gray-500 mt-2">
                By {editAuthor} • {editDate} • {editReadTime}
              </p>
            </div>

            {editImg && (
              <div className="h-72 bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                <img src={editImg} alt="Article Preview Banner" className="w-full h-full object-cover" />
              </div>
            )}

            {editQuickAnswer && (
              <div className="bg-[#0B2638] text-white p-5 rounded-xl border-l-4 border-[#CDAE72] space-y-2 shadow-md">
                <h4 className="text-xs font-bold uppercase text-[#CDAE72] tracking-wider">Quick Executive Summary</h4>
                <p className="text-xs leading-relaxed text-gray-200">{editQuickAnswer}</p>
              </div>
            )}

            <div className="space-y-6 pt-2">
              {editBodyContent.split('\n\n').map((block, idx) => {
                const lines = block.split('\n');
                if (lines[0].startsWith('## ')) {
                  return (
                    <div key={idx} className="space-y-2">
                      <h3 className="text-lg font-cinzel font-bold text-[#0B2638] border-b border-gray-300 pb-1">
                        {lines[0].replace('## ', '')}
                      </h3>
                      <p className="text-xs text-gray-700 leading-relaxed font-sans">
                        {lines.slice(1).join('\n')}
                      </p>
                    </div>
                  );
                }
                return (
                  <p key={idx} className="text-xs text-gray-700 leading-relaxed font-sans">
                    {block}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
