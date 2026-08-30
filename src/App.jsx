import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Star, MessageSquare, Ruler, ClipboardCheck, Smartphone, ShieldCheck, Laptop, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);




const HouzzIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.6 1.2L1.8 8.4v14.4h6.6v-7.2h7.2v7.2h6.6V8.4L12.6 1.2zm3.6 10.8h-4.8V7.2l4.8 3.2v1.6z"/>
  </svg>
);

const YelpIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.95 2C10.45 2 9.5 3.32 9.77 5.12l.68 4.45c.08.52.48.91.99.91.52 0 .93-.39 1.01-.91l.68-4.45C13.4 3.32 12.45 2 11.95 2zM6.9 10.38c-1.22-.88-2.6-.5-3.08 1.06-.48 1.56.24 2.82 1.46 3.7l4.03 2.91c.42.31.99.21 1.28-.21.29-.42.2-.98-.22-1.29L6.9 10.38zm10.2 0l-3.47 6.17c-.29.42-.2.98.22 1.29.42.31.99.21 1.28-.21l4.03-2.91c1.22-.88 1.94-2.14 1.46-3.7-.48-1.56-1.86-1.94-3.08-1.06zM9.77 17.5l-4.52 2.05c-1.37.62-1.7 1.95-.73 2.97.97 1.02 2.37.91 3.74.29l4.52-2.05c.47-.21.68-.76.47-1.23-.21-.47-.76-.68-1.23-.47l-2.25 1.02zm4.36.42l2.25 1.02c.47.21 1.02 0 1.23-.47.21-.47 0-1.02-.47-1.23l-4.52-2.05c-1.37-.62-2.77-.73-3.74.29-.97 1.02-.64 2.35.73 2.97l4.52-2.05z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.525 3.545 12 3.545 12 3.545s-7.525 0-9.388.511a3.003 3.003 0 00-2.11 2.107C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 002.11 2.107c1.863.514 9.388.514 9.388.514s7.525 0 9.388-.514a3.003 3.003 0 002.11-2.107C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);


const TiktokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.82.12V9.38a6.33 6.33 0 00-1-.08 6.34 6.34 0 106.34 6.34V8.41a8.3 8.3 0 004.95 1.63v-3.35a4.85 4.85 0 01-1-.01z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export default function App() {
  // Mobile Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form qualification state
  const [formStep, setFormStep] = useState(1);
  const [formQualified, setFormQualified] = useState(true);
  
  // Lead fields
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formCity, setFormCity] = useState('Cambridge');
  const [formPostalCode, setFormPostalCode] = useState('');
  
  const [formInvestment, setFormInvestment] = useState('$50,000–$99,999');
  const [formDesignStatus, setFormDesignStatus] = useState('I need Havenridge to provide or coordinate design');
  const [formTiming, setFormTiming] = useState('3–6 months');
  const [formDecisionMakers, setFormDecisionMakers] = useState('Yes, all decision-makers are aligned');
  
  const [formProjectTypes, setFormProjectTypes] = useState(['Kitchen']);
  const [formDescription, setFormDescription] = useState('');
  const [formHomeOccupied, setFormHomeOccupied] = useState('Yes');
  const [formUploadedFile, setFormUploadedFile] = useState('');
  const [formSource, setFormSource] = useState('Google');
  const [formSourceDetail, setFormSourceDetail] = useState('');
  const [formConsent, setFormConsent] = useState(false);

  const toggleProjectType = (type) => {
    if (formProjectTypes.includes(type)) {
      setFormProjectTypes(formProjectTypes.filter(t => t !== type));
    } else {
      setFormProjectTypes([...formProjectTypes, type]);
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (formInvestment === 'Under $20,000') {
      setFormQualified(false);
    } else {
      setFormQualified(true);
    }
    setFormSubmitted(true);
  };

  const compRef = useRef(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', projectType: 'Renovations', notes: ''
  });
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Global Lightbox State & Controls
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images, index = 0) => {
    if (!images || images.length === 0) return;
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextLightboxImage = () => {
    if (!lightboxImages || lightboxImages.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
  };

  const prevLightboxImage = () => {
    if (!lightboxImages || lightboxImages.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxImages]);

  // Global Lightbox Portal Renderer
  const renderLightbox = () => {
    if (!lightboxOpen || !lightboxImages || lightboxImages.length === 0) return null;
    return createPortal(
      <div 
        className="fixed inset-0 top-0 left-0 w-screen h-screen z-[999999] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8"
        onClick={closeLightbox}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 999999 }}
      >
        {/* TOP BAR: COUNTER & CLOSE BUTTON */}
        <div className="flex justify-between items-center text-white z-[1000000] max-w-7xl mx-auto w-full pt-2" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans tracking-[0.25em] text-[#CDAE72] uppercase font-bold bg-[#0B2638]/90 px-3.5 py-2 rounded border border-[#CDAE72]/50 shadow-lg">
              HAVENRIDGE GALLERY • {lightboxIndex + 1} / {lightboxImages.length}
            </span>
          </div>
          <button 
            type="button"
            onClick={closeLightbox}
            className="p-3 text-white/80 hover:text-white bg-white/10 hover:bg-[#CDAE72] hover:text-[#0B2638] rounded-full transition-all cursor-pointer shadow-2xl border border-white/20"
            aria-label="Close Lightbox"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* CENTER IMAGE & NAVIGATION ARROWS */}
        <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
          {/* PREVIOUS BUTTON */}
          {lightboxImages.length > 1 && (
            <button 
              type="button"
              onClick={prevLightboxImage}
              className="absolute left-2 sm:left-8 z-[1000001] p-4 bg-[#0B2638]/90 hover:bg-[#CDAE72] text-white hover:text-[#0B2638] border border-white/30 hover:border-[#CDAE72] rounded-full transition-all cursor-pointer shadow-2xl"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9" />
            </button>
          )}

          {/* MAIN IMAGE DISPLAY */}
          <div className="relative max-h-[82vh] max-w-[90vw] flex items-center justify-center">
            <img 
              src={typeof lightboxImages[lightboxIndex] === 'string' ? lightboxImages[lightboxIndex] : (lightboxImages[lightboxIndex].img || lightboxImages[lightboxIndex].src)} 
              alt={`Craftsmanship Detail ${lightboxIndex + 1}`}
              className="max-h-[82vh] max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/20 select-none" 
            />
          </div>

          {/* NEXT BUTTON */}
          {lightboxImages.length > 1 && (
            <button 
              type="button"
              onClick={nextLightboxImage}
              className="absolute right-2 sm:right-8 z-[1000001] p-4 bg-[#0B2638]/90 hover:bg-[#CDAE72] text-white hover:text-[#0B2638] border border-white/30 hover:border-[#CDAE72] rounded-full transition-all cursor-pointer shadow-2xl"
              aria-label="Next Image"
            >
              <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9" />
            </button>
          )}
        </div>

        {/* BOTTOM CAPTION BAR */}
        <div className="text-center text-white/80 text-xs font-light font-sans max-w-2xl mx-auto z-[1000000] pb-2" onClick={(e) => e.stopPropagation()}>
          {typeof lightboxImages[lightboxIndex] === 'object' && lightboxImages[lightboxIndex].title ? (
            <div className="space-y-1 bg-[#0B2638]/90 px-6 py-3.5 rounded-xl border border-white/15 shadow-2xl">
              <span className="text-[#CDAE72] font-bold tracking-widest uppercase block text-sm">{lightboxImages[lightboxIndex].title}</span>
              {lightboxImages[lightboxIndex].caption && <p className="text-white/90 text-xs leading-relaxed">{lightboxImages[lightboxIndex].caption}</p>}
            </div>
          ) : (
            <p className="text-white/70 bg-[#0B2638]/80 px-5 py-2 rounded-full inline-block border border-white/15 shadow-lg">
              Click outside image or press ESC to exit. Use left & right arrows to browse gallery.
            </p>
          )}
        </div>
      </div>,
      document.body
    );
  };


  // Hash-based Page Router
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAppliedSubmitted, setIsAppliedSubmitted] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [applicantFileName, setApplicantFileName] = useState('');
  const inspirationRef = useRef(null);
  const testimonialRef = useRef(null);

  const scrollSlider = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');
  const [selectedBlogArticle, setSelectedBlogArticle] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      const sectionAnchors = ['#services', '#about', '#process', '#process-section', '#our-process', '#testimonials', '#projects', '#partners', '#inspiration-section'];
      
      if (sectionAnchors.includes(hash)) {
        setCurrentPath('#home');
        setTimeout(() => {
          let targetHash = hash;
          if (['#about', '#process', '#our-process'].includes(hash)) {
            targetHash = '#process-section';
          }
          const el = document.querySelector(targetHash);
          if (el) {
            const yOffset = -100; // Offset for sticky 80px header + breathing room
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
          }
        }, 50);
      } else {
        setCurrentPath(hash);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic NiceJob SDK script loader for #reviews-page SPA routing
  useEffect(() => {
    if (currentPath === '#reviews-page') {
      const existingScript = document.getElementById('nicejob-sdk-dynamic');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement('script');
      script.id = 'nicejob-sdk-dynamic';
      script.type = 'text/javascript';
      script.src = 'https://cdn.nicejob.co/js/sdk.min.js?id=6309960057618432';
      script.async = true;
      document.body.appendChild(script);

      if (window.NiceJob && typeof window.NiceJob.init === 'function') {
        try {
          window.NiceJob.init();
        } catch (e) {
          console.log('NiceJob init re-trigger:', e);
        }
      }
    }
  }, [currentPath]);

  // Hero Slideshow State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [
    'project_images/hero_living_room_fireplace.jpg',
    'project_images/piccadilly/1.png',
    'project_images/mcdougall/3.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.cass-hero-fade', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      });

      gsap.utils.toArray('.cass-reveal').forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        });
      });
    }, compRef);

    return () => ctx.revert();
  }, [currentPath]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
  };

  const servicePillars = [
    {
      title: "ADDITIONS & ADUs",
      headline: "Expanding a dated home with a carefully planned second-storey addition and a renewed exterior.",
      desc: "This project transformed the home through structural reconfiguration and a new upper level. Havenridge coordinated framing, masonry and trade work so the addition connected naturally in appearance and function.",
      img: "project_images/mcdougall/addition_adu_stone_facade.jpg",
      hash: "#project-additions"
    },
    {
      title: "WHOLE HOME RENOVATIONS",
      headline: "Reworking the layout, function and finishes of a multi-level home through one coordinated renovation process.",
      desc: "The renovation brought several levels of the home together through coordinated planning and construction. Work included main-floor layout changes, a new kitchen, bathroom renovations and a finished lower level.",
      img: "project_images/knox/whole_home_white_kitchen.jpg",
      hash: "#project-whole-home"
    },
    {
      title: "MULTI-UNIT CONVERSIONS",
      headline: "Creating a safe, functional secondary suite through coordinated planning, code review, permits and construction.",
      desc: "Havenridge converted the lower level into a functional two-bedroom living space with a kitchenette, bathroom and egress. Life-safety, egress, and code compliance were fully coordinated throughout construction.",
      img: "project_images/natchez/secondary_suite_exterior_entrance.jpg",
      hash: "#project-multi-unit"
    },
    {
      title: "ACCESSIBLE & AGING-IN-PLACE RENOVATIONS",
      headline: "Improving safety, comfort, movement and independence through thoughtful accessible and aging-in-place design.",
      desc: "This bathroom renovation focused on reducing barriers and making everyday use easier with a widened doorway, accessible shower configuration, integrated seating, grab bars, reachable storage and improved lighting.",
      img: "project_images/isherwood/1.png",
      hash: "#project-accessibility"
    }
  ];

  const blogPosts = [
    {
      id: 'luxury-bathroom-trends-2026',
      title: '2026 Luxury Bathroom Renovation Trends in Kitchener-Waterloo',
      subtitle: 'Curbless Showers, Custom Oak Vanities & Heated Flooring',
      category: 'DESIGN TRENDS',
      date: 'August 12, 2026',
      readTime: '5 min read',
      img: 'project_images/mcnamara/2.png',
      excerpt: 'Discover how curbless walk-in showers, custom white oak double vanities, and heated herringbone tile transform daily routines into spa-like home retreats.',
      author: 'Micheal Smith',
      content: [
        'Luxury bathroom renovations in Kitchener, Waterloo, and Cambridge have evolved far beyond basic utility. Today’s homeowners prioritize daily wellness, architectural elegance, and low-maintenance materials that stand the test of time.',
        'Zero-Threshold Curbless Showers: Eliminating traditional shower curbs creates a seamless visual floor plane, expanding perceived bathroom space while offering future-proof accessibility. Paired with integrated linear drains, non-slip textured porcelain, and frameless 10mm glass, curbless showers represent the pinnacle of modern ensuite design.',
        'Custom White Oak Vanities: Factory-built particleboard cabinetry is rapidly being replaced by custom solid white oak millwork. Master carpenters build vanities with soft-close dovetail drawers, integrated electrical outlets for hair styling tools, and custom quartz undermount sinks.',
        'Radiant Floor Heating & Heated Towel Bars: Programmable underfloor heating ensures warmth underfoot on cold Ontario winter mornings, while architectural towel warmers provide clean, dry towels year-round.'
      ]
    },
    {
      id: 'adu-permits-cambridge-waterloo',
      title: 'Navigating Permits for ADUs & Secondary Suites in Cambridge & Waterloo',
      subtitle: 'Zoning Bylaws, Egress Windows & Fire Separation Rules',
      category: 'PERMITS & ADUS',
      date: 'August 05, 2026',
      readTime: '7 min read',
      img: 'project_images/verhoeve/16.jpg',
      excerpt: 'A complete guide to municipal zoning bylaws, permit submission timelines, ceiling height minimums, and fire-separation requirements for secondary basement suites.',
      author: 'Micheal Smith',
      content: [
        'Adding an Additional Dwelling Unit (ADU) or secondary basement suite in Cambridge, Kitchener, or Waterloo is one of the most effective ways to increase property value and generate rental income.',
        'Zoning & Municipal Requirements: Under Bill 23, Ontario municipalities permit up to three residential units per urban lot. However, each municipality enforces specific parking offsets, setback limits, and utility capacity guidelines.',
        'Fire & Sound Separation: Secondary suites require 45-minute fire-rated drywall assemblies between units, resilient channels, and acoustic mineral wool insulation (Roxul Safe ’n’ Sound) to meet building code decibel targets.',
        'Egress Windows & Headroom: Bedrooms in secondary suites must feature egress windows with an unobstructed opening area of at least 3.8 sq. ft. Minimum ceiling height under the Ontario Building Code is 6ft 11in over at least 75% of the floor area.'
      ]
    },
    {
      id: 'custom-white-oak-millwork-vs-factory',
      title: 'Custom White Oak Millwork vs. Factory Cabinetry: What Kitchener Homeowners Need to Know',
      subtitle: 'Master Carpentry, Grain Matching & Tailored Storage',
      category: 'MILLWORK',
      date: 'July 28, 2026',
      readTime: '6 min read',
      img: 'project_images/piccadilly/2.png',
      excerpt: 'Why master carpentry, solid wood mortise-and-tenon joints, and custom storage solutions offer unmatched durability and character over mass-produced cabinetry.',
      author: 'Micheal Smith',
      content: [
        'When planning a whole-home kitchen or living room remodel, the debate between pre-fabricated factory cabinetry and custom bench-built millwork is critical.',
        'Precision Fit Without Fillers: Factory cabinets come in fixed 3-inch increments, requiring wide filler strips that waste valuable space. Custom millwork is built precisely to your wall dimensions, maximizing every square inch of kitchen storage.',
        'Solid Wood Joinery: Factory cabinets frequently rely on stapled particleboard boxes that swell when exposed to moisture. Bench-crafted cabinets utilize 3/4-inch furniture-grade plywood boxes, solid hardwood face frames, and mortise-and-tenon joints built for generations.',
        'Custom Appliance Integration: Integrated panel-ready refrigerators, hidden pantry doors, pull-out spice racks, and custom range hoods can only be seamlessly executed through custom carpentry.'
      ]
    },
    {
      id: 'whole-home-renovation-timelines',
      title: 'Whole-Home Renovation Timelines in Guelph & Cambridge: Scope to Handover',
      subtitle: 'A Transparent Week-by-Week Construction Roadmap',
      category: 'BUILDING PROCESS',
      date: 'July 15, 2026',
      readTime: '8 min read',
      img: 'project_images/paisley/11.png',
      excerpt: 'From initial 3D scope consultations to permit approvals, material lead times, and final quality audits—here is what to expect during a major renovation.',
      author: 'Micheal Smith',
      content: [
        'Embarking on a whole-home renovation requires clear planning, transparent milestones, and open communication. Here is a realistic timeline breakdown for a major residential project in Waterloo Region.',
        'Weeks 1–4 (Feasibility & Design): On-site structural inspections, 3D floor plan development, fixed-cost budgeting, and material selections.',
        'Weeks 5–8 (Permitting & Procurement): Submitting architectural drawings to municipal building departments while pre-ordering long-lead items like custom windows, structural steel beams, and custom oak millwork.',
        'Weeks 9–16 (Structural Demolition & Framing): Site protection setup, structural wall removal, steel beam installation, rough plumbing, electrical upgrades, and HVAC duct rerouting.',
        'Weeks 17–24 (Finishes & Handover): Insulation, drywall taping, custom tile installation, cabinetry fitting, trim carpentry, painting, 100-point quality inspection, and written warranty handover.'
      ]
    },
    {
      id: 'barrier-free-accessibility-waterloo',
      title: 'Barrier-Free & Accessible Washrooms in Waterloo Region: Barrier-Free & Aging-in-Place',
      subtitle: 'Zero-Threshold Entry, Grab Bar Backing & Roll-Under Vanities',
      category: 'ACCESSIBILITY',
      date: 'July 02, 2026',
      readTime: '6 min read',
      img: 'project_images/ouellette/2.png',
      excerpt: 'Essential architectural guidelines for curbless showers, solid wood wall backing, 36"+ widened doorways, and stylish barrier-free fixtures.',
      author: 'Micheal Smith',
      content: [
        'Creating an accessible bathroom does not mean sacrificing high-end luxury aesthetics. With thoughtful design, barrier-free washrooms provide independent living without looking institutional.',
        'Solid Wood Wall Backing: Before drywall is installed, 2x10 solid lumber backing is fitted inside shower and toilet walls. This allows grab bars to be securely anchored anywhere required, now or in the future.',
        'Widened Doorways & Zero-Threshold Transfers: Doorways are widened to 36 inches with pocket or barn door hardware, eliminating swing obstructions for wheelchairs or walkers.',
        'Custom Roll-Under Vanities: Floating wall-hung vanities designed with open lower clearance allow comfortable wheel-in access while concealing plumbing pipes inside decorative wooden shrouds.'
      ]
    }
  ];

  const valuePillars = [
    {
      title: 'Be Informed',
      desc: 'Choices are easier if you know all of the facts. We work to educate and inform our clients throughout the build process so that they can be confident while making decisions.'
    },
    {
      title: 'Cut Once',
      desc: 'No detail is left behind. No matter the size or style of the building project, we work to a high level of finish, ensuring that each job is done properly, and beautifully, the first time.'
    },
    {
      title: 'Trusted Process',
      desc: 'Our years of experience help us to foresee and communicate about potential problems, making work more efficient. Communication is the key to our good service and excellent final results.'
    }
  ];

  const stillInspirationGallery = [
    { title: 'John Street Ensuite', subtitle: 'Spa-Like Double Vanity Retreat', img: 'project_images/mcnamara/1.png', cat: 'BATHROOMS' },
    { title: 'West Forest Trail Kitchen', subtitle: 'Master Oak Cabinetry & Island', img: 'project_images/piccadilly/1.png', cat: 'KITCHENS' },
    { title: 'Alderview Living Space', subtitle: 'Fireplace & Custom Bookshelves', img: 'project_images/paisley/living_room_wood_beam.jpg', cat: 'LIVING SPACES' },
    { title: 'Joan Lane Sunroom Addition', subtitle: 'Sunroom & Multi-Story Addition', img: 'project_images/kuntz/3.jpg', cat: 'ADDITIONS' },
    { title: 'Courtland Basement Suite', subtitle: 'Lower-Level Bar & Media Suite', img: 'project_images/verhoeve/basement_media_lounge.jpg', cat: 'BASEMENTS' },
    { title: 'Young Street Executive Workshop', subtitle: 'Executive Workshop & Storage Loft', img: 'project_images/borkhoff/10.png', cat: 'GARAGES' },
    { title: 'Ouellette Ensuite', subtitle: 'Herringbone Tile & Soaker Tub', img: 'project_images/ouellette/2.png', cat: 'BATHROOMS' },
    { title: 'West Forest Trail Kitchen', subtitle: 'Open-Concept Family Hub', img: 'project_images/piccadilly/ChatGPT_Image_Aug_12__2026__09_44_30_AM.png', cat: 'KITCHENS' },
    { title: 'Alderview Family Suite', subtitle: 'Open Family Living Layouts', img: 'project_images/paisley/11.png', cat: 'LIVING SPACES' }
  ];

  const processSteps = [
    { step: '01', title: 'Initial Consultation & Feasibility', desc: 'We meet on-site to review your vision, inspect structural conditions, discuss investment expectations, and establish initial feasibility goals.' },
    { step: '02', title: 'Architectural Scope & Detailed Costing', desc: 'Developing comprehensive 3D layouts, exact scope clarification, material selections, and a fixed-price transparent quote ' },
    { step: '03', title: 'Municipal Permits & Sourcing', desc: 'We handle all building permit submissions, engineering approvals, and pre-order long-lead custom millwork and stone before site work begins.' },
    { step: '04', title: 'Quality Craftsmanship & Skilled Trades', desc: 'Clean daily job sites, active communication from Micheal Smith, and precision construction executed by Red Seal master carpenters.' },
    { step: '05', title: 'Quality Audit & Handover Guarantee', desc: 'Thorough 100-point quality audit, final client walkthrough, detailed care manuals, and our Havenridge written warranty.' }
  ];

  const testimonials = [
    {
      name: 'Sarah & David M.',
      location: 'Kitchener Homeowner',
      project: 'Whole-Home Renovation & Custom Kitchen',
      quote: 'We are just thrilled with everything done thus far and look forward to the work yet to come. Micheal Smith and team, thank you most sincerely. You guys really are the best!',
      rating: 5
    },
    {
      name: 'Robert & Clara K.',
      location: 'Waterloo Resident',
      project: 'Ensuite Bathroom & Bedroom Expansion',
      quote: 'The Havenridge team was efficient, worked hard and were here when they said they would be. When they left every day the worksite was clean and ready for us. The daily communication Micheal provided was amazing.',
      rating: 5
    },
    {
      name: 'Elena & Marcus P.',
      location: 'Cambridge Client',
      project: 'Secondary Suite & Main Floor Remodel',
      quote: 'From initial scope clarity to final handover, the craftsmanship is unmatched. They transformed our main floor and kitchen effortlessly. ',
      rating: 5
    },
    {
      name: 'Mark & Jennifer T.',
      location: 'Guelph Homeowner',
      project: 'Custom Main Floor Addition & Sunroom',
      quote: 'Exceptional attention to detail and scope clarity. Their red-seal carpenters were professional, punctual, and delivered a beautiful extension ',
      rating: 5
    },
    {
      name: 'Greg & Amanda S.',
      location: 'Puslinch Resident',
      project: 'Detached Executive Workshop & Garage',
      quote: 'High quality finishings, clear communication, and outstanding carpentry. We could not be happier with our new workshop space!',
      rating: 5
    }
  ];


  const portfolioProjects = [
    { name: 'Appledale Crescent — Total Transformation', cat: 'Whole-Home & Custom Millwork', hash: '#project-millwork', img: 'project_images/appledale/1.png' },
    { name: 'Huntingwood Court — Total Estate Reconstruction', cat: 'Whole-Home & Basement Retreat', hash: '#project-basements', img: 'project_images/huntingwood/1.png' },
    { name: 'Morningdale Crescent — Total Property Overhaul', cat: 'Whole-Home Interior & Exterior', hash: '#project-living-spaces', img: 'project_images/Morningdale_Crescent/morningdale_exterior_front_landscape.jpg' },
    { name: 'Wellington Street — Designer Main Floor Reconstruction', cat: 'Main-Floor Transformation', hash: '#project-kitchens', img: 'project_images/Wellington_Street/wellington_sage_kitchen_hero.jpg' },
    { name: 'Paisley Heights — Heritage Restoration & Modernization', cat: 'Heritage Restoration', hash: '#project-bathrooms', img: 'project_images/paisley/1.png' },
    { name: 'The Moore Street Estate — 1908 Flagship Restoration', cat: 'Flagship Heritage Restoration', hash: '#project-garages', img: 'project_images/moore/1.png' },
  ];

    const inspirationItems = [
    { title: 'BATHROOMS', subtitle: 'Spa-Like Wet Rooms, Zero-Clearance Glass & Custom Tile Layouts', img: 'project_images/paisley/1.png', link: '#inspiration-bathrooms' },
    { title: 'KITCHENS', subtitle: 'Master Cabinetry & Quartz Islands', img: 'project_images/wellington/1.png', link: '#inspiration-kitchens' },
    { title: 'LIVING SPACES', subtitle: 'Structural Wall Removals, Linear Fireplaces & Custom Libraries', img: 'project_images/inspiration/inspiration_living_spaces.jpg', link: '#inspiration-living-spaces' },
    { title: 'ADDITIONS', subtitle: 'Multi-Story Extensions & ADU Suites', img: 'project_images/inspiration/inspiration_additions.jpg', link: '#inspiration-additions' },
    { title: 'BASEMENTS', subtitle: 'Sub-Grade Wellness Gyms, Custom Playhouses & Media Lounges', img: 'project_images/inspiration/inspiration_basements.jpg', link: '#inspiration-basements' },
    { title: 'GARAGES & OUTBUILDINGS', subtitle: 'Executive Workshops & Storage Lofts', img: 'project_images/moore/1.png', link: '#inspiration-garages' },
    { title: 'CUSTOM MILLWORK', subtitle: 'Custom Architectural Trim & Cabinetry', img: 'project_images/inspiration/inspiration_custom_millwork.jpg', link: '#inspiration-millwork' },
    { title: 'EXTERIORS', subtitle: 'Covered Porches & Structural Framing', img: 'project_images/d_costa/exterior_facade_stone_driveway.jpg', link: '#inspiration-exteriors' }
  ];

  const galleryCategories = [
    { title: 'BATHROOMS', hash: '#inspiration-bathrooms', img: 'project_images/paisley/1.png' },
    { title: 'KITCHENS', hash: '#inspiration-kitchens', img: 'project_images/wellington/1.png' },
    { title: 'LIVING SPACES', hash: '#inspiration-living-spaces', img: 'project_images/inspiration/inspiration_living_spaces.jpg' },
    { title: 'ADDITIONS', hash: '#inspiration-additions', img: 'project_images/inspiration/inspiration_additions.jpg' },
    { title: 'BASEMENTS', hash: '#inspiration-basements', img: 'project_images/inspiration/inspiration_basements.jpg' },
    { title: 'GARAGES & OUTBUILDINGS', hash: '#inspiration-garages', img: 'project_images/moore/1.png' },
    { title: 'CUSTOM MILLWORK', hash: '#inspiration-millwork', img: 'project_images/inspiration/inspiration_custom_millwork.jpg' },
    { title: 'EXTERIORS', hash: '#inspiration-exteriors', img: 'project_images/d_costa/exterior_facade_stone_driveway.jpg' },
  ];


  // Dedicated Inspiration Gallery Subpages Configuration
  const inspirationSubpages = {
    '#inspiration-bathrooms': {
      title: "SPA-LIKE RETREATS & ACCESSIBLE WET ROOMS",
      subtitle: "Combining elite sub-surface structural waterproofing with precision tile artistry to deliver bathrooms built for longevity and luxury.",
      divSpecs: "LUXURY BATHROOM SUITES & WET ROOMS",
      specs: [
        { label: "ENGINEERING STANDARDS", val: "Zero-Clearance Drainage & Structural Framing Upgrades" },
        { label: "WATERPROOFING SYSTEM", val: "100% WEDI Certified Schluter & Liquid Membrane Assemblies" },
        { label: "MATERIAL STANDARDS", val: "Solid Wood Vanities, Custom Frameless Glass & Premium Stone Masonry" },
        { label: "ACCESSIBILITY CAPABILITIES", val: "Universal ADA/OBC Barrier-Free Bathrooms & Integrated Seating" },
        { label: "STANDARDS & WARRANTY", val: "Fully Insured, Havenridge Written Lifetime Waterproofing Warranty" }
      ],
      heroImg: "project_images/paisley/1.png",
      overview: "At Havenridge, we believe a premium bathroom must perform flawlessly beneath the surface before it can look beautiful on top. Our bathroom division specializes in top-tier transformations, spanning luxurious custom master suites, vintage-inspired restorations, and fully compliant barrier-free accessible walk-in suites. We entirely replace dated mechanical infrastructure, install advanced structural framing subfloors to prevent tile deflection, and utilize 100% certified WEDI and Schluter waterproofing systems to offer a lifetime barrier against moisture.\n\nFrom the layout design to the final architectural trim, our craftsmanship shines through in every detail. We specialize in custom zero-threshold roll-in showers, frame-free sliding glass partitions, niche tile-setting, and complex mosaic layouts including herringbone and classic basketweave styles. Complemented by premium floating vanities, integrated makeup decks, and high-output architectural lighting, we construct spaces that perfectly balance everyday utility with a refined, spa-like aesthetic.",
      grid: [
      "inspiration/bathrooms/bath_custom_1.jpg",
      "inspiration/bathrooms/bath_custom_2.jpg",
      "inspiration/bathrooms/bath_custom_3.jpg",
      "inspiration/bathrooms/bath_custom_4.jpg",
      "inspiration/bathrooms/bath_custom_5.jpg",
      "inspiration/bathrooms/bath_custom_6.jpg",
      "inspiration/bathrooms/bath_custom_7.jpg",
      "inspiration/bathrooms/bath_custom_8.jpg"
    ],
      showcase: [
        { title: "Appledale Crescent Walk-In Shower", caption: "Precision herringbone subway tile layout & custom frameless glass enclosure.", img: "project_images/appledale/1.png", link: "#project-millwork" },
        { title: "Huntingwood Court Basement Suite", caption: "Luxury wellness basement bathroom with custom quartz vanity & deep charcoal wainscoting.", img: "project_images/huntingwood/11.jpg", link: "#project-basements" },
        { title: "Paisley Heights Heritage Suite", caption: "Vintage black-and-white basketweave tile floor, sloped-glass tub partition & dark oak vanity.", img: "project_images/paisley/1.png", link: "#project-bathrooms" },
        { title: "Isherwood Ave Universal Suite", caption: "Barrier-free accessible roll-in shower with integrated sitting bench & safety grab bars.", img: "project_images/isherwood/1.png", link: "#project-accessibility" }
      ]
    },
    '#inspiration-kitchens': {
      title: "GOURMET CHEF KITCHENS & DESIGNER ENTERTAINMENT HUBS",
      subtitle: "Opening up structural footprints to deliver custom-milled, high-function culinary spaces that serve as the anchor of the home.",
      divSpecs: "GOURMET KITCHENS & ARCHITECTURAL MILLWORK",
      specs: [
        { label: "STRUCTURAL CAPABILITIES", val: "Load-Bearing Wall Removals, Engineered Shoring & Steel Beam Installations" },
        { label: "MILLWORK STANDARDS", val: "Custom Full-Height Shaker Cabinets, Dovetail Joints & Soft-Close Hardware" },
        { label: "SURFACE SELECTIONS", val: "Book-Matched Quartz Slabs, Solid Quartz Backsplashes & Cascade Butcher Block" },
        { label: "INTEGRATED FEATURES", val: "Hidden Kickplate Drawers, Roll-Out Coffee Hubs & Custom Hood Range Boxes" },
        { label: "STANDARDS & WARRANTY", val: "ESA Electrical Code Certified, Havenridge Written Workmanship Warranty" }
      ],
      heroImg: "project_images/wellington/1.png",
      overview: "A true luxury kitchen requires a master-level understanding of both heavy structural re-engineering and fine architectural finish carpentry. Our kitchen division specializes in full-scale space optimization, frequently executing complex load-bearing wall removals and installing engineered support beams to completely open up dated, enclosed floor plans. We coordinate directly with professional interior designers to reposition plumbing and electrical infrastructure, upgrading lines to handle modern high-efficiency chef appliances, double wall-ovens, and integrated under-counter beverage centers.\n\nEvery kitchen we build is characterized by highly tailored, premium millwork features built to fit your home's exact dimensions. From full-height custom shaker cabinets in bold designer colorways to massive 12-foot islands featuring waterfall quartz or butcher-block extensions, we optimize every inch of storage. Our builds integrate clever, high-utility storage systems like hidden toe-kick drawers, slide-out spice racks, overhead refrigerator pull-outs, and custom roll-out coffee cupboard stations. Finished with solid-slab quartz backsplashes, custom architectural hood ranges, and elegant floating shelves, a Havenridge kitchen is engineered for peak utility and built to be a show-stopper.",
      grid: [
      "inspiration/kitchens/kitchen_custom_1.png",
      "inspiration/kitchens/kitchen_custom_2.png",
      "inspiration/kitchens/kitchen_custom_3.png",
      "inspiration/kitchens/kitchen_custom_4.jpg",
      "inspiration/kitchens/kitchen_custom_5.png",
      "inspiration/kitchens/kitchen_custom_6.jpg",
      "inspiration/kitchens/kitchen_custom_7.jpg",
      "inspiration/kitchens/kitchen_custom_8.jpg"
    ],
      showcase: [
        { title: "The Moore Street Estate Island", caption: "Massive 12-foot central island with waterfall butcher-block top, solid quartz slab backsplash & hidden toe-kick drawers.", img: "project_images/moore/1.png", link: "#project-garages" },
        { title: "Wellington Street Designer Kitchen", caption: "Sage green cabinets with unique dual-level quartz island dining table extension.", img: "project_images/wellington/1.png", link: "#project-kitchens" },
        { title: "Huntingwood Court Culinary Suite", caption: "Custom forest green cabinets, custom-built hood range box & dedicated dry bar setup.", img: "project_images/huntingwood/1.png", link: "#project-basements" },
        { title: "Appledale Crescent Open Kitchen", caption: "Crisp open kitchen with quartz waterfall island, seamless flooring & dedicated coffee cupboard station.", img: "project_images/appledale/1.png", link: "#project-millwork" }
      ]
    },
    '#inspiration-living-spaces': {
      title: "OPEN-CONCEPT LIVING ROOMS & ARCHITECTURAL LIBRARIES",
      subtitle: "Elevating interior volumes through heavy structural framing, premium media wall integration, and master-level finishing carpentry.",
      divSpecs: "STRUCTURAL LIVING SPACES & CUSTOM MILLWORK",
      specs: [
        { label: "FRAMING ENGINEERING", val: "Load-Bearing Wall Deconstruction, Steel I-Beam Shoring & Ceiling Elevations" },
        { label: "ARCHITECTURAL CARPENTRY", val: "Historic 12-Inch Baseboards, Wall Paneling & Floor-to-Ceiling Bookcases" },
        { label: "MEDIA CLADDING", val: "Multi-Sided Built-In Linear Fireplaces & Minimalist Floating Shelving" },
        { label: "TRANSITION OVERHAULS", val: "Grand Architectural Staircase Reconstruction & Solid Oak Railings" },
        { label: "STANDARDS & WARRANTY", val: "Aria Flush Vent Integration, Havenridge Written Structural Warranty" }
      ],
      heroImg: "project_images/inspiration/inspiration_living_spaces.jpg",
      overview: "Transforming a standard living area into a high-end, cohesive architectural space requires a team that can execute heavy structural engineering and delicate finish details in equal measure. Our living spaces division excels at completely changing the physical atmosphere and scale of your home. We specialize in complex open-concept conversions, safely executing partition wall removals and jacking up settled framing structures to create seamless transitions. From raising ceiling heights to create dramatic, airy vaults to wrapping exposed structural support beams in rich, custom-finished timber, we optimize both the physical space and structural flow.\n\nEvery living space we build features meticulously detailed finish carpentry designed to inject timeless character or clean modern lines. We craft striking media feature walls anchored by built-in multi-sided linear fireplaces, minimalist flush-mount architectural shelving, and seamless LED strip accent lighting. For historical estates and modern studies alike, we engineer custom floor-to-ceiling built-in libraries complete with authentic rolling ladder track assemblies, bold wainscoting, and towering 12-inch historic profile baseboards. We round out these grand living spaces by completely overhauling structural staircases—replacing aged frameworks with solid oak treads, architectural newel posts, modern glass railings, or sleek wrought-iron spindles. Every room is finished with continuous high-end flooring, seamlessly integrated modern flush-mount Aria vents, and a flawless, professional multi-tone paint package.",
      grid: [
      "inspiration/living_spaces/living_custom_1.png",
      "inspiration/living_spaces/living_custom_2.png",
      "inspiration/living_spaces/living_custom_3.jpg",
      "inspiration/living_spaces/living_custom_4.png",
      "inspiration/living_spaces/living_custom_5.png",
      "inspiration/living_spaces/living_custom_6.jpg",
      "inspiration/living_spaces/living_custom_7.jpg",
      "inspiration/living_spaces/living_custom_8.png"
    ],
      showcase: [
        { title: "Huntingwood Court Stained Oak Library", caption: "Traditional stained-oak floor-to-ceiling library bookcase with sliding ladder & built-in 3-sided linear fireplace.", img: "project_images/huntingwood/10.png", link: "#project-basements" },
        { title: "Morningdale Crescent Elevated Living Room", caption: "Elevated ceiling volume with custom wrapped structural timber beam.", img: "project_images/morningdale/1.png", link: "#project-living-spaces" },
        { title: "The Moore Street Estate Heritage Lounge", caption: "Exposed brick feature wall, custom wall paneling & historic 12-inch baseboards.", img: "project_images/moore/2.png", link: "#project-garages" },
        { title: "Wellington Street Accent Lounge", caption: "Deep forest green accent feature wall & custom glass-paneled double French door entry transitions.", img: "project_images/wellington/2.png", link: "#project-kitchens" }
      ]
    },
    '#inspiration-additions': {
      title: "MULTI-STORY ADDITIONS, VERTICAL EXTENSIONS & ADU SUITES",
      subtitle: "Expanding your home's footprint with flawless structural framing, perimeter foundation engineering, and seamless multi-level integrations.",
      divSpecs: "STRUCTURAL ADDITIONS & HOME EXTENSIONS",
      specs: [
        { label: "ENGINEERING BREAKDOWN", val: "Second-Story Vertical Additions, Lateral Footprint Extensions & ADU Suites" },
        { label: "FOUNDATION CAPABILITIES", val: "Foundation Excavation, Underpinning & Commercial Drainage Lines" },
        { label: "STRUCTURAL FRAMING", val: "Timber-Framed Porticos, Exposed Trusses & Engineered Roof Vaults" },
        { label: "PERMITTING & COMPLIANCE", val: "Full Municipal Permit Handling & Zoning Bylaw Compliance" },
        { label: "STANDARDS & WARRANTY", val: "Tarion-Level Structural Compliance, Havenridge Written Structural Warranty" }
      ],
      heroImg: "project_images/inspiration/inspiration_additions.jpg",
      overview: "Executing a successful home addition requires extensive architectural foresight, strict engineering discipline, and a deep understanding of municipal zoning bylaws. Our additions division specializes in expanding living footprints where standard renovations cannot, taking projects completely from the excavation phase up to the final roof peak. Whether constructing a lateral main-floor extension, building a detached Accessory Dwelling Unit (ADU), or completely engineering a brand-new second-story vertical addition with striking, high-pitched A-frame gables, we seamlessly stitch new structural framing into your existing home.\n\nOur additions are built from the ground up to protect your investment and optimize daily living. We begin with precision excavation around property perimeters, implementing advanced sub-grade waterproofing membranes and commercial-grade drainage lines to guarantee structural longevity. We handle all complex structural steel shoring and timber framing, building out grand vaulted ceiling spaces, large-format window openings, and custom timber-framed entry porticos with exposed truss detailing. By completely modernizing mechanical, plumbing, and electrical lines to feed the new square footage, we deliver fully permitted, energy-efficient expansions that blend perfectly with your home's original character.",
      grid: [
      "inspiration/additions/addition_custom_1.png",
      "inspiration/additions/addition_custom_2.png",
      "inspiration/additions/addition_custom_3.png",
      "inspiration/additions/addition_custom_4.png",
      "inspiration/additions/addition_custom_5.png",
      "inspiration/additions/addition_custom_6.png",
      "inspiration/additions/addition_custom_7.png",
      "inspiration/additions/addition_custom_8.png"
    ],
      showcase: [
        { title: "McDougall Road Vertical Addition", caption: "Second-story vertical addition, high-pitched A-frame gables & custom timber-framed front portico.", img: "project_images/mcdougall/1.png", link: "#project-additions" },
        { title: "Morningdale Crescent Structural Expansion", caption: "Seamless roofline modifications & heavy structural beam integrations.", img: "project_images/morningdale/1.png", link: "#project-living-spaces" },
        { title: "The Moore Street Estate Framing Shoring", caption: "Leveling & shoring historic home frame before layout expansion.", img: "project_images/moore/1.png", link: "#project-garages" }
      ]
    },
    '#inspiration-basements': {
      title: "MULTI-FUNCTIONAL BASEMENTS & HIGH-PERFORMANCE RETREATS",
      subtitle: "Transforming lower-level footprints into fully insulated entertainment zones, private wellness centers, and clever custom living spaces.",
      divSpecs: "OPTIMIZED BASEMENTS & SUB-GRADE SUITES",
      specs: [
        { label: "STRUCTURAL CONVERSIONS", val: "Cistern/Masonry Demolition, Underpinning & Structural Walkouts" },
        { label: "MOISTURE MANAGEMENT", val: "Sub-Floor Thermal Barriers, Advanced Insulation & Backwater Valves" },
        { label: "WELLNESS AMENITIES", val: "Custom Infrared/Timber Saunas & Commercial Cold Plunge Stations" },
        { label: "ENTERTAINMENT MILLWORK", val: "Wet Bars, Custom Under-Counter Cooling & Built-In Playhouses" },
        { label: "STANDARDS & WARRANTY", val: "ESA & Plumbing Code Compliant, Havenridge Written Warranty" }
      ],
      heroImg: "project_images/inspiration/inspiration_basements.jpg",
      overview: "Maximizing a home's sub-grade square footage requires specialized knowledge in structural space-planning, rigorous mechanical ventilation, and bulletproof moisture management. Our basements division goes far beyond basic framing and drywall; we specialize in completely restructuring lower levels to fit premium, high-utility lifestyle zones. We handle heavy structural modifications below grade, including the demolition of obsolete masonry fireplaces or old concrete cisterns to reclaim hidden space, converting standard foundations into bright structural walkouts, and roughing in full plumbing manifolds for future secondary kitchenette suites.\n\nEvery basement project we build is engineered for maximum thermal comfort and superior sound dampening. We wrap sub-floor and framing assemblies in advanced insulation systems and sub-grade moisture barriers, laying down continuous premium flooring that withstands lower-level demands. Our teams craft beautifully customized, multi-functional spaces tailored to your family's exact needs. We design and build dedicated home wellness gyms finished with commercial rubber flooring and full-height mirrors, custom timber saunas, independent cold plunge zones, and recessed water bottle filling stations. For entertainment, we construct media recreation rooms centered around sleek linear fireplaces with accent LED lighting, complete with modern wet bars featuring floating open tile shelves and integrated beverage centers. We even specialize in unique finish carpentry like custom indoor children's playhouses and integrated space-saving laundry suites with elevated appliance roll-outs.",
      grid: [
      "inspiration/basements/basement_custom_1.png",
      "inspiration/basements/basement_custom_2.png",
      "inspiration/basements/basement_custom_3.png",
      "inspiration/basements/basement_custom_4.png",
      "inspiration/basements/basement_custom_5.png",
      "inspiration/basements/basement_custom_6.png",
      "inspiration/basements/basement_custom_7.png",
      "inspiration/basements/basement_custom_8.png"
    ],
      showcase: [
        { title: "The Moore Street Estate Wellness Retreat", caption: "Custom timber sauna, dedicated cold plunge station, fitness gym & herringbone tile bath.", img: "project_images/moore/10.png", link: "#project-garages" },
        { title: "Huntingwood Court Lower Level", caption: "Deep charcoal basement retreat with glass-enclosed training gym & entertainment kitchenette.", img: "project_images/huntingwood/1.png", link: "#project-basements" },
        { title: "Appledale Crescent Laundry Suite", caption: "Basement bathroom & laundry room with elevated washer/dryer platforms & roll-out bins.", img: "project_images/appledale/2.png", link: "#project-millwork" },
        { title: "Knox Court Finished Basement", caption: "Media family room, linear fireplace wall & custom children's playhouse.", img: "project_images/knox/1.png", link: "#project-whole-home" }
      ]
    },
    '#inspiration-garages': {
      title: "EXECUTIVE OUTBUILDINGS, HOME OFFICES & WORKSHOPS",
      subtitle: "Taking detached structures from raw utility storage to premium, climate-controlled workspaces and secure architectural workshops.",
      divSpecs: "EXECUTIVE WORKSHOPS & CLIMATE-CONTROLLED GARAGES",
      specs: [
        { label: "STRUCTURAL CONVERSIONS", val: "Detached Outbuilding Framing, Structural Concrete Pads & Roof Framing Updates" },
        { label: "CLIMATE ENGINEERING", val: "Ductless Mini-Split Installations, Premium Insulation & Ventilation Upgrades" },
        { label: "ELECTRICAL SYSTEMS", val: "60-Amp Sub-Panel Upgrades & Dedicated Machinery Circuit Overhauls" },
        { label: "MILLWORK & CABINETRY", val: "Heavy-Duty Plywood Wall Cladding, Custom Tool Storage & Dry Bar Insets" },
        { label: "STANDARDS & WARRANTY", val: "ESA Code Certified, Havenridge Written Workmanship Warranty" }
      ],
      heroImg: "project_images/moore/1.png",
      overview: "A modern detached garage or workshop should serve as a high-functioning extension of your lifestyle, not just a storage space for tools. Our garages division excels at taking standard outbuildings and completely transforming them into premium, dual-purpose environments. We handle every structural and envelope update required to maximize utility, beginning with pouring new engineered concrete structural pads and reinforcing wall frameworks. We strip away weathered original materials to upgrade the entire exterior envelope—installing high-efficiency modern garage doors, matching windows, low-maintenance premium siding, and integrated roof vents with clean soffit and fascia lines.\n\nInside the workshop footprint, we re-engineer the mechanical and architectural environment for year-round operational comfort. Our teams perform comprehensive insulation upgrades across all walls and attic spaces, cladding the main shop walls in heavy-duty, impact-resistant plywood for versatile utility. To support heavy machinery and modern office equipment, we upgrade electrical capabilities by running dedicated lines to install independent 60-amp sub-panels.\n\nWe excel at slicing out dedicated interior footprints within the structure to craft custom climate-controlled back offices. These executive zones are beautifully finished with durable luxury vinyl plank (LVP) flooring, energy-efficient ductless mini-split heating and cooling units, custom-built cabinetry storage, and integrated dry bar setups. A Havenridge garage transformation seamlessly merges heavy trade capability with refined, quiet workspaces.",
      grid: [
      "inspiration/garages/garage_custom_1.png",
      "inspiration/garages/garage_custom_2.png",
      "inspiration/garages/garage_custom_3.png",
      "inspiration/garages/garage_custom_4.png",
      "inspiration/garages/garage_custom_5.png",
      "inspiration/garages/garage_custom_6.png",
      "inspiration/garages/garage_custom_7.png",
      "inspiration/garages/garage_custom_8.png"
    ],
      showcase: [
        { title: "The Moore Street Flagship Office", caption: "Detached garage exterior transformation & premium interior office with custom cabinets, LVP & mini-split.", img: "project_images/moore/3.png", link: "#project-garages" },
        { title: "McDougall Road Auxiliary Structure", caption: "Detached outbuilding with matching blue-gray siding, roof trim & timber decking.", img: "project_images/mcdougall/3.png", link: "#project-additions" },
        { title: "Morningdale Crescent Exterior Envelope", caption: "Clean modern garage door installations & weather-resistant siding tie-ins.", img: "project_images/morningdale/2.png", link: "#project-living-spaces" }
      ]
    },
    '#inspiration-millwork': {
      title: "FINE FINISH CARPENTRY & TAILORED ARCHITECTURAL WOODWORK",
      subtitle: "Elevating interior architecture with bespoke cabinetry engineering, historic molding restoration, and precision-fitted timber features.",
      divSpecs: "FINE MILLWORK & ARCHITECTURAL FINISHES",
      specs: [
        { label: "PROFILING STANDARDS", val: "Historic 12-Inch Baseboards, Stacked Crown Molding & Shiplap Accent Cladding" },
        { label: "CUSTOM JOINERY", val: "Stained Oak Handrails, Square Block Spindles & Pocket Door Restorations" },
        { label: "FUNCTIONAL DETAILS", val: "Hidden Above-Fridge Pull-outs, Integrated Toe-Kick Drawers & Drop-Level Tables" },
        { label: "AESTHETIC UPGRADES", val: "Built-In Floor-to-Ceiling Libraries, Shaker Wainscoting & Custom Mantels" },
        { label: "STANDARDS & WARRANTY", val: "Aria Flush-Mount Vent Integration, Havenridge Written Finish Warranty" }
      ],
      heroImg: "project_images/inspiration/inspiration_custom_millwork.jpg",
      overview: "The final phase of any elite construction project depends entirely on the precision and quality of its finish carpentry. Our custom millwork division specializes in designing, fabricating, and installing architectural wood details that define the unique character of your home. Whether matching the grand proportions of a century-old estate or crafting clean lines for a sleek modern remodel, we approach finish carpentry with furniture-grade accuracy. We specialize in extensive interior profiling, seamlessly cutting and installing stacked crown moldings, crisp wainscoting paneling, premium shiplap accent walls, and towering 12-inch historic profile baseboards that tie a room together.\n\nOur carpentry expertise blends fine aesthetic style with highly creative functional engineering. We build completely customized, floor-to-ceiling libraries and studies equipped with authentic rolling ladder track systems. In the culinary space, our millwork stretches far beyond standard shelving; we craft hidden storage features built directly into the cabinet architecture—including overhead refrigerator pull-out trays, integrated hidden toe-kick drawers, slide-out spice racks, custom-finished range hood boxes, and custom drop-level quartz-capped dining island tables. We meticulously preserve historic integrity by restoring original solid wood doors, matching custom-stained oak handrails to premium floor finishes, and flawlessly integrating modern, flush-mount Aria vents directly into your flooring for a perfectly seamless finish.",
      grid: [
      "inspiration/millwork/millwork_custom_1.png",
      "inspiration/millwork/millwork_custom_2.png",
      "inspiration/millwork/millwork_custom_3.png",
      "inspiration/millwork/millwork_custom_4.png",
      "inspiration/millwork/millwork_custom_5.png",
      "inspiration/millwork/millwork_custom_6.png",
      "inspiration/millwork/millwork_custom_7.png",
      "inspiration/millwork/millwork_custom_8.png"
    ],
      showcase: [
        { title: "The Moore Street Historic Millwork", caption: "12-inch historic baseboards, wall paneling, built-in library & hidden kitchen drawers.", img: "project_images/moore/2.png", link: "#project-garages" },
        { title: "Huntingwood Court Oak Library", caption: "Stained-oak floor-to-ceiling bookcase with authentic sliding rolling ladder.", img: "project_images/huntingwood/10.png", link: "#project-basements" },
        { title: "Wellington Street Custom Shaker Cabinets", caption: "Sage green shaker cabinets, mudroom storage & drop-level island table extension.", img: "project_images/wellington/1.png", link: "#project-kitchens" },
        { title: "Appledale Crescent Coffee Station", caption: "Custom coffee station & elevated laundry platforms with structural roll-out bins.", img: "project_images/appledale/1.png", link: "#project-millwork" }
      ]
    },
    '#inspiration-exteriors': {
      title: "PREMIUM OUTDOOR LIVING, TIMBER PERGOLAS & CURB APPEAL LANDSCAPING",
      subtitle: "Transforming your property's outer envelope with durable modern siding, engineered interlocking stone systems, and custom backyard entertainment oases.",
      divSpecs: "PREMIUM EXTERIORS & CUSTOM HARDSCAPING",
      specs: [
        { label: "ENVELOPE SYSTEMS", val: "Low-Maintenance Vertical Board-and-Batten, Horizontal Siding & Fascia Upgrades" },
        { label: "OUTDOOR STRUCTURES", val: "Heavy Timber 17'x17' Pergolas, Multi-Tiered Decks & Integrated Privacy Screens" },
        { label: "LANDSCAPE ENGINEERING", val: "Multi-Level Interlock Retaining Walls, Paved Stone Approaches & LED Lighting" },
        { label: "FENESTRATION STANDARDS", val: "High-Efficiency Window Replacements & Insured Exterior Entry Porticos" },
        { label: "STANDARDS & WARRANTY", val: "OBC & Drainage Code Compliant, Havenridge Written Structural Warranty" }
      ],
      heroImg: "project_images/d_costa/exterior_facade_stone_driveway.jpg",
      overview: "An exceptional property transformation must be as durable and visually commanding on the outside as it is luxurious on the inside. Our exteriors division handles everything required to completely rewrite your home's curb appeal and outdoor living utility, executing both heavy civil landscaping and complex structural carpentry. We specialize in completely updating weathered exterior envelopes—stripping old materials to install high-efficiency window replacements, modern insulated garage doors, and low-maintenance premium vertical board-and-batten siding with clean, updated soffit, fascia, and oversized eavestrough systems.\n\nMoving onto the grounds, our teams engineer multi-level interlocking stone masonry landscapes, crafting robust retaining walls, tiered front entryways, and wide stone driveways equipped with low-voltage ambient LED ledge lighting for stunning night visibility. In the backyard, we design and build full-scale custom entertainment spaces meant to act as true extensions of the home. We build massive, multi-tiered premium pressure-treated timber decks complete with under-soffit LED pot lighting, built-in horizontal privacy screening, sleek modern metal railing panels, and limestone flagstone landing pads. From crafting artisan-engineered 17'x17' structural timber pergolas over heavy concrete patios to building matching detached accessory structures and custom perimeter fencing, we build outdoor spaces optimized for style and engineered to withstand the elements.",
      grid: [
      "inspiration/exteriors/exteriors_custom_1.png",
      "inspiration/exteriors/exteriors_custom_2.png",
      "inspiration/exteriors/exteriors_custom_3.png",
      "inspiration/exteriors/exteriors_custom_4.png",
      "inspiration/exteriors/exteriors_custom_5.png",
      "inspiration/exteriors/exteriors_custom_6.png",
      "inspiration/exteriors/exteriors_custom_7.png",
      "inspiration/exteriors/exteriors_custom_8.png"
    ],
      showcase: [
        { title: "Morningdale Crescent Hardscaping & Deck", caption: "Multi-level front interlock stone driveway with LED lighting & multi-tiered backyard timber deck.", img: "project_images/morningdale/1.png", link: "#project-living-spaces" },
        { title: "The Moore Street Estate Pergola & Envelope", caption: "17'x17' outdoor timber pergola, concrete pad & full exterior siding/window overhaul.", img: "project_images/moore/1.png", link: "#project-garages" },
        { title: "McDougall Road Portico & Stone Veneer", caption: "Timber-framed front portico with exposed truss detailing & split-face stone masonry veneer.", img: "project_images/mcdougall/1.png", link: "#project-additions" }
      ]
    }
  };

  // Project pages details configuration (Cass Construction Editorial style layout)
  const projectDetails = {
    '#project-whole-home': {
      title: "KNOX COURT WHOLE-HOME TRANSFORMATION",
      category: "Whole-Home Multi-Level Renovation",
      cat: "Whole-Home Multi-Level Renovation",
      location: "Kitchener, ON (Knox Court)",
      timeline: "12 - 16 Weeks",
      subtitle: "Reworking the entire layout, structural flow, and interior finishes of a multi-level residence through one unified design-build process.",
      leadDesc: "Reworking the entire layout, structural flow, and interior finishes of a multi-level residence through one unified design-build process.",
      scope: "Structural Wall Removal, Custom Kitchen Cabinetry, Multi-Level Premium Bathroom Tile Work & Finished Basement Overhaul",
      standards: "WEDI Certified, Havenridge Written Warranty",
      certifications: "WEDI Certified, Havenridge Written Warranty",
      img1: "project_images/Knox_Court/Knox_1.png",
      img2: "project_images/Knox_Court/Knox_2.png",
      img3: "project_images/Knox_Court/Knox_3.png",
      gallery: [
        "project_images/Knox_Court/Knox_1.png",
        "project_images/Knox_Court/Knox_2.png",
        "project_images/Knox_Court/Knox_3.png",
        "project_images/Knox_Court/Knox_4.png",
        "project_images/Knox_Court/Knox_5.png",
        "project_images/Knox_Court/Knox_6.png",
        "project_images/Knox_Court/Knox_7.png",
        "project_images/Knox_Court/Knox_8.png",
        "project_images/Knox_Court/Knox_9.png",
        "project_images/Knox_Court/Knox_10.png",
        "project_images/Knox_Court/Knox_11.png",
        "project_images/Knox_Court/Knox_12.png"
      ],
      overview: "A true multi-level whole-home renovation requires disciplined project management, precision engineering foresight, and seamless trade coordination. From re-framing structural load-bearing walls on the main floor to upgrading mechanical plumbing infrastructure across three levels, we rebuilt this home to satisfy modern living standards. The massive scope of work spanned a fully integrated gourmet kitchen overhaul, a luxurious master suite and upper-level guest bathroom redesign, and a comprehensive sub-grade basement finish featuring a custom children's playhouse, home fitness zone, and dedicated laundry room.",
      desc1: "A true multi-level whole-home renovation requires disciplined project management, precision engineering foresight, and seamless trade coordination. From re-framing structural load-bearing walls on the main floor to upgrading mechanical plumbing infrastructure across three levels, we rebuilt this home to satisfy modern living standards. The massive scope of work spanned a fully integrated gourmet kitchen overhaul, a luxurious master suite and upper-level guest bathroom redesign, and a comprehensive sub-grade basement finish featuring a custom children's playhouse, home fitness zone, and dedicated laundry room.",
      desc2: "This comprehensive transformation integrated a custom floor-to-ceiling kitchen, bespoke stone and geometric tile work across multiple bathroom retreats, structural wall removals for open-concept living, and a fully optimized lower level with a playhouse and workout area.",
      prevHash: "#project-garages",
      nextHash: "#project-multi-unit"
    },
    '#project-multi-unit': {
      title: "NATCHEZ ROAD MULTI-UNIT CONVERSION",
      category: "Multi-Unit Rental Conversion",
      cat: "Multi-Unit Rental Conversion",
      location: "Kitchener, ON (Natchez Road)",
      timeline: "8 - 12 Weeks",
      subtitle: "Maximizing property value and converting existing footprints into fully compliant, high-yield legal secondary suites.",
      leadDesc: "Maximizing property value and converting existing footprints into fully compliant, high-yield legal secondary suites.",
      scope: "Legal 2-Bedroom Suite Layout, Egress Window Installation, Custom Kitchenette, Mechanical Upgrades & Fire-Separation Assemblies",
      standards: "ESA & Building Code Compliant, Havenridge Written Warranty",
      certifications: "ESA & Building Code Compliant, Havenridge Written Warranty",
      img1: "project_images/Natchez_Road/Natchez_1.png",
      img2: "project_images/Natchez_Road/Natchez_2.png",
      img3: "project_images/Natchez_Road/Natchez_3.png",
      gallery: [
        "project_images/Natchez_Road/Natchez_1.png",
        "project_images/Natchez_Road/Natchez_2.png",
        "project_images/Natchez_Road/Natchez_3.png",
        "project_images/Natchez_Road/Natchez_4.png",
        "project_images/Natchez_Road/Natchez_5.png",
        "project_images/Natchez_Road/Natchez_6.png",
        "project_images/Natchez_Road/Natchez_7.png",
        "project_images/Natchez_Road/Natchez_8.png",
        "project_images/Natchez_Road/Natchez_9.png",
        "project_images/Natchez_Road/Natchez_10.png",
        "project_images/Natchez_Road/Natchez_11.png",
        "project_images/Natchez_Road/Natchez_12.png"
      ],
      overview: "Executing a legal multi-unit conversion demands a thorough mastery of municipal zoning bylaws, Ontario Building Code compliance, and rigorous fire safety regulations. For this duplex optimization project on Natchez Road, we transformed a raw lower level into a fully legal, highly functional two-bedroom rental suite. The comprehensive conversion required structural modifications to install a code-compliant egress window, ensuring necessary natural light and emergency exit pathways. Our team completely overhauled the sub-grade footprint to integrate an efficient modern kitchenette, two private bedrooms, a full bathroom, and independent mechanical considerations. From fire-rated drywall assemblies and soundproofing to strict electrical compliance, this project seamlessly blends investor utility with premium tenant living.",
      desc1: "Executing a legal multi-unit conversion demands a thorough mastery of municipal zoning bylaws, Ontario Building Code compliance, and rigorous fire safety regulations. For this duplex optimization project on Natchez Road, we transformed a raw lower level into a fully legal, highly functional two-bedroom rental suite. The comprehensive conversion required structural modifications to install a code-compliant egress window, ensuring necessary natural light and emergency exit pathways. Our team completely overhauled the sub-grade footprint to integrate an efficient modern kitchenette, two private bedrooms, a full bathroom, and independent mechanical considerations. From fire-rated drywall assemblies and soundproofing to strict electrical compliance, this project seamlessly blends investor utility with premium tenant living.",
      desc2: "This strategic conversion integrated a legal two-bedroom layout, custom-built kitchenette millwork, dedicated egress windows, and complete fire-separation barriers to deliver a fully permitted, turnkey rental property.",
      prevHash: "#project-whole-home",
      nextHash: "#project-millwork"
    },
        '#project-millwork': {
      title: "APPLEDALE CRESCENT TOTAL TRANSFORMATION",
      category: "Whole-Home Transformation & Custom Millwork",
      cat: "Whole-Home Transformation & Custom Millwork",
      location: "Waterloo, ON (Appledale Crescent)",
      timeline: "1 - 2 Months",
      subtitle: "A masterclass in modernizing multi-level living through structural flow, high-end custom millwork, and cohesive architectural finishes.",
      leadDesc: "A masterclass in modernizing multi-level living through structural flow, high-end custom millwork, and cohesive architectural finishes.",
      scope: "Open-Concept Kitchen Reconfiguration, Custom Coffee Station, Multi-Level Flooring & Feature Walls, Custom Laundry Suite & Premium Tile Bathrooms",
      standards: "WEDI Certified, Havenridge Written Warranty",
      certifications: "WEDI Certified, Havenridge Written Warranty",
      img1: "project_images/Appledale_Crescent/Appledale_1.png",
      img2: "project_images/Appledale_Crescent/appledale_coffee_station_cabinet.jpg",
      img3: "project_images/Appledale_Crescent/Appledale_3.jpg",
      overview: `This extensive whole-house renovation on Appledale Crescent showcases a seamless blend of spatial re-engineering and highly specialized finish carpentry. On the main floor, we removed dividing barriers to open up a gourmet chef's kitchen, anchored by a massive quartz waterfall-edge island, integrated full-height pantry walls, and a dedicated custom coffee cupboard. Premium engineered flooring runs continuously across the entire level, tying into a striking architectural feature wall and freshly painted main and upper levels.

Upstairs, the main washroom was completely reimagined with a modern tub-to-shower conversion featuring precision herringbone subway tile layouts and contrasting matte black plumbing fixtures. The sub-grade transformation features a brilliant dual-purpose layout optimization: a high-end custom bathroom that transitions seamlessly via space-saving pocket doors into a luxury laundry suite. This mechanical space features elevated washer and dryer platforms with integrated structural roll-out bins for maximum ergonomic utility.

From the frameless glass shower enclosures to the final architectural trim, this project is defined by smart utility and tailored luxury.`,
      desc1: `This extensive whole-house renovation on Appledale Crescent showcases a seamless blend of spatial re-engineering and highly specialized finish carpentry. On the main floor, we removed dividing barriers to open up a gourmet chef's kitchen, anchored by a massive quartz waterfall-edge island, integrated full-height pantry walls, and a dedicated custom coffee cupboard. Premium engineered flooring runs continuously across the entire level, tying into a striking architectural feature wall and freshly painted main and upper levels.

Upstairs, the main washroom was completely reimagined with a modern tub-to-shower conversion featuring precision herringbone subway tile layouts and contrasting matte black plumbing fixtures. The sub-grade transformation features a brilliant dual-purpose layout optimization: a high-end custom bathroom that transitions seamlessly via space-saving pocket doors into a luxury laundry suite. This mechanical space features elevated washer and dryer platforms with integrated structural roll-out bins for maximum ergonomic utility.

From the frameless glass shower enclosures to the final architectural trim, this project is defined by smart utility and tailored luxury.`,
      desc2: "This complete multi-level overhaul integrated custom floor-to-ceiling kitchen millwork, a specialized coffee cupboard, premium continuous flooring, and a highly engineered basement washroom/laundry suite combination with pocket doors and elevated appliance roll-outs.",
      prevHash: "#project-multi-unit",
      nextHash: "#project-kitchens",
      gallery: [
        "project_images/Appledale_Crescent/Appledale_1.png",
        "project_images/Appledale_Crescent/Appledale_2.jpg",
        "project_images/Appledale_Crescent/appledale_kitchen_full_wide.jpg",
        "project_images/Appledale_Crescent/Appledale_4.jpg",
        "project_images/Appledale_Crescent/Appledale_5.jpg",
        "project_images/Appledale_Crescent/Appledale_6.jpg",
        "project_images/Appledale_Crescent/Appledale_7.jpg",
        "project_images/Appledale_Crescent/Appledale_8.jpg",
        "project_images/Appledale_Crescent/Appledale_9.jpg",
        "project_images/Appledale_Crescent/appledale_staircase_flooring.jpg",
        "project_images/Appledale_Crescent/Appledale_11.jpg",
        "project_images/Appledale_Crescent/Appledale_12.jpg"
      ]
    },
            '#project-kitchens': {
      title: "WELLINGTON STREET DESIGNER MAIN FLOOR RECONSTRUCTION",
      category: "Designer Main Floor Renovation & Structural Reconfiguration",
      cat: "Designer Main Floor Renovation & Structural Reconfiguration",
      location: "Kitchener, ON (Wellington Street)",
      timeline: "4-6 Weeks",
      subtitle: "Overhauling a classic footprint through complex structural wall removal, historical plumbing remediation, and high-end designer millwork.",
      leadDesc: "Overhauling a classic footprint through complex structural wall removal, historical plumbing remediation, and high-end designer millwork.",
      scope: "Load-Bearing Wall Removal for Open-Concept Living, Gourmet Kitchen Overhaul with Sage Shaker Millwork, Custom Drop-Level Dining Island, Matching Architectural Range Hood, Built-In Storage Mudroom Inset, Re-Engineering Pocket Doors, Cast-Iron Plumbing Remediation & Electrical System Upgrades, Luxury Continuous Flooring & Capped Staircase Transitions",
      standards: "ESA & OBC Compliant, Havenridge Written Warranty",
      certifications: "ESA & OBC Compliant, Havenridge Written Warranty",
      img1: "project_images/Wellington_Street/wellington_sage_kitchen_hero.jpg",
      img2: "project_images/Wellington_Street/wellington_mudroom_alcove_cabinet.jpg",
      img3: "project_images/Wellington_Street/Wellington_3.png",
      overview: `The Wellington Street project is a premier example of balancing advanced hidden engineering with meticulous interior design execution. To modernize the layout and maximize flow, we began by removing a primary load-bearing wall, opening up the entire main level footprint into a spacious, light-filled open-concept environment. Because of the home's age, our team performed comprehensive mechanical remediation, completely replacing old cast-iron plumbing stacks with modern drainage lines and executing a total electrical panel and wiring overhaul. We laid down premium continuous warm-toned flooring across the entire main floor, beautifully completing the structural transitions by capping the lower staircase treads and risers to ensure visual harmony.

Working alongside a professional interior designer, the kitchen was relocated and entirely custom-built. The culinary space showcases high-end, full-height sage green shaker cabinets, pristine quartz countertops, a modern horizontal stack tiled backsplash, and an integrated under-counter beverage cooler station. The center of the room is anchored by a massive, highly innovative island unit featuring an integrated, drop-level custom breakfast table extension wrapped in matching quartz. Nearby, a custom architectural range hood box coordinates flawlessly with the cabinetry profile, flanked by rustic floating wood corner shelving. We carefully repaired and restored the home's original pocket doors and installed premium double French doors to transition gracefully into a cozy living room accented by a deep forest-green feature wall. Additionally, the foyer layout was optimized to include a smart, inset mudroom storage alcove featuring custom floor-to-ceiling cabinetry, integrated brass hardware, and built-in tiered open shoe shelving. The entire level was finished with a clean, professional multi-tone paint package.`,
      desc1: `The Wellington Street project is a premier example of balancing advanced hidden engineering with meticulous interior design execution. To modernize the layout and maximize flow, we began by removing a primary load-bearing wall, opening up the entire main level footprint into a spacious, light-filled open-concept environment. Because of the home's age, our team performed comprehensive mechanical remediation, completely replacing old cast-iron plumbing stacks with modern drainage lines and executing a total electrical panel and wiring overhaul. We laid down premium continuous warm-toned flooring across the entire main floor, beautifully completing the structural transitions by capping the lower staircase treads and risers to ensure visual harmony.

Working alongside a professional interior designer, the kitchen was relocated and entirely custom-built. The culinary space showcases high-end, full-height sage green shaker cabinets, pristine quartz countertops, a modern horizontal stack tiled backsplash, and an integrated under-counter beverage cooler station. The center of the room is anchored by a massive, highly innovative island unit featuring an integrated, drop-level custom breakfast table extension wrapped in matching quartz. Nearby, a custom architectural range hood box coordinates flawlessly with the cabinetry profile, flanked by rustic floating wood corner shelving. We carefully repaired and restored the home's original pocket doors and installed premium double French doors to transition gracefully into a cozy living room accented by a deep forest-green feature wall. Additionally, the foyer layout was optimized to include a smart, inset mudroom storage alcove featuring custom floor-to-ceiling cabinetry, integrated brass hardware, and built-in tiered open shoe shelving. The entire level was finished with a clean, professional multi-tone paint package.`,
      desc2: "This sophisticated main floor renovation integrated a massive load-bearing wall removal, an elite designer sage-green kitchen with a custom tiered table island, historical cast-iron plumbing replacement, fully updated electrical systems, restored pocket doors, and a bespoke hallway mudroom storage inset.",
      prevHash: "#project-millwork",
      nextHash: "#project-bathrooms",
      gallery: [
        "project_images/Wellington_Street/Wellington_1.png",
        "project_images/Wellington_Street/Wellington_2.png",
        "project_images/Wellington_Street/Wellington_3.png",
        "project_images/Wellington_Street/Wellington_4.jpg",
        "project_images/Wellington_Street/Wellington_5.jpg",
        "project_images/Wellington_Street/Wellington_6.jpg",
        "project_images/Wellington_Street/Wellington_7.jpg",
        "project_images/Wellington_Street/Wellington_8.jpg",
        "project_images/Wellington_Street/Wellington_9.jpg",
        "project_images/Wellington_Street/Wellington_10.jpg",
        "project_images/Wellington_Street/Wellington_11.jpg",
        "project_images/Wellington_Street/Wellington_12.jpg"
      ]
    },
            '#project-bathrooms': {
      title: "PAISLEY HEIGHTS HERITAGE RESTORATION & MODERNIZATION",
      category: "Whole-Home Heritage Restoration & Modernization",
      cat: "Whole-Home Heritage Restoration & Modernization",
      location: "Cambridge, ON (Paisley Heights)",
      timeline: "10 - 14 Weeks",
      subtitle: "Honoring historical craftsmanship through meticulous architectural carpentry, custom structural woodwork, and timeless modern updates.",
      leadDesc: "Honoring historical craftsmanship through meticulous architectural carpentry, custom structural woodwork, and timeless modern updates.",
      scope: "Structural Staircase Reconstruction & Custom Guardrails, Heritage Woodwork & Stained Glass Preservation, Slate Blue Shaker Kitchen & Peninsula, Luxury Continuous Flooring, Classic Basketweave & Subway Tile Bathroom Overhaul, Custom Sloped-Glass Tub Enclosure, Premium French Entry Door, Comprehensive Lathe-and-Plaster Drywall Remediation",
      standards: "WEDI Certified, Havenridge Written Warranty",
      certifications: "WEDI Certified, Havenridge Written Warranty",
      img1: "project_images/Paisley_Heights/Paisley_1.png",
      img2: "project_images/Paisley_Heights/Paisley_2.png",
      img3: "project_images/Paisley_Heights/Paisley_3.png",
      overview: `The Paisley Heights project is a premier demonstration of balancing structural heritage preservation with high-performance modern living. Working within the challenging framework of a classic old home, we began by addressing compromised structural elements, executing comprehensive drywall and framing remediation to completely fix aged, failing walls. The central core of the home was elevated by entirely replacing a deteriorated upper staircase with a beautifully engineered, solid oak stair layout. This grand structural pathway is bounded by custom-stained wood handrails and square block spindles, meticulously color-matched to the premium, wide-plank continuous flooring running across the main level. At the base of the stairs, the foyer was refreshed with a premium glass-paneled white French entry door and architectural crown trim that seamlessly frames the home's historic, original stained-glass window.

The main level expands into a custom-built gourmet kitchen designed to maximize storage and workflow. The space features full-height slate blue beadboard-shaker cabinetry, crisp white quartz countertops, a stone-mosaic subway tile backsplash, and a functional peninsula island setup. Upstairs, the main bathroom underwent a complete transformation into a timeless, spa-like sanctuary. Paying homage to vintage design, we installed classic black-and-white basketweave mosaic floor tiles paired with an expansive deep soaking tub wrapped in a flawless white subway tile surround and an integrated niche. The tub suite is completed with premium matte-black fixtures, a custom-fitted fixed frosted glass privacy shield, and a rich, dark-stained oak double-sink vanity layout. The entire home was brought together by preserving the original rich wood paneled doors and applying a flawless, cohesive historical paint package.`,
      desc1: `The Paisley Heights project is a premier demonstration of balancing structural heritage preservation with high-performance modern living. Working within the challenging framework of a classic old home, we began by addressing compromised structural elements, executing comprehensive drywall and framing remediation to completely fix aged, failing walls. The central core of the home was elevated by entirely replacing a deteriorated upper staircase with a beautifully engineered, solid oak stair layout. This grand structural pathway is bounded by custom-stained wood handrails and square block spindles, meticulously color-matched to the premium, wide-plank continuous flooring running across the main level. At the base of the stairs, the foyer was refreshed with a premium glass-paneled white French entry door and architectural crown trim that seamlessly frames the home's historic, original stained-glass window.

The main level expands into a custom-built gourmet kitchen designed to maximize storage and workflow. The space features full-height slate blue beadboard-shaker cabinetry, crisp white quartz countertops, a stone-mosaic subway tile backsplash, and a functional peninsula island setup. Upstairs, the main bathroom underwent a complete transformation into a timeless, spa-like sanctuary. Paying homage to vintage design, we installed classic black-and-white basketweave mosaic floor tiles paired with an expansive deep soaking tub wrapped in a flawless white subway tile surround and an integrated niche. The tub suite is completed with premium matte-black fixtures, a custom-fitted fixed frosted glass privacy shield, and a rich, dark-stained oak double-sink vanity layout. The entire home was brought together by preserving the original rich wood paneled doors and applying a flawless, cohesive historical paint package.`,
      desc2: "This exquisite heritage restoration integrated a fully rebuilt solid oak staircase, a custom slate-blue shaker kitchen peninsula, an elegant vintage-inspired basketweave and subway tile bathroom with custom glass, and a complete wall remediation package-all while preserving the home's historic stained glass and original woodwork.",
      prevHash: "#project-kitchens",
      nextHash: "#project-additions",
      gallery: [
        "project_images/Paisley_Heights/Paisley_1.png",
        "project_images/Paisley_Heights/Paisley_2.png",
        "project_images/Paisley_Heights/Paisley_3.png",
        "project_images/Paisley_Heights/Paisley_4.png",
        "project_images/Paisley_Heights/Paisley_5.png",
        "project_images/Paisley_Heights/Paisley_6.png",
        "project_images/Paisley_Heights/Paisley_7.png",
        "project_images/Paisley_Heights/Paisley_8.png",
        "project_images/Paisley_Heights/Paisley_9.png",
        "project_images/Paisley_Heights/Paisley_10.png",
        "project_images/Paisley_Heights/Paisley_11.png",
        "project_images/Paisley_Heights/Paisley_12.png"
      ]
    },
    '#project-additions': {
      title: "MCDOUGALL RD TOTAL TRANSFORMATION",
      category: "Whole-Home Reconstruction & Second Story Addition",
      cat: "Whole-Home Reconstruction & Second Story Addition",
      location: "Waterloo, ON (McDougall Rd)",
      timeline: "6 - 10 Months",
      subtitle: "Turn a dated footprint into an engineered architectural masterpiece with multi-level extensions built to last.",
      leadDesc: "Turn a dated footprint into an engineered architectural masterpiece with multi-level extensions built to last.",
      scope: "Structural Reconfiguration, Vertical Additions, Custom Stone Masonry & Architectural Trim",
      standards: "WEDI Certified, Havenridge Written Warranty",
      certifications: "WEDI Certified, Havenridge Written Warranty",
      img1: "project_images/McDougall_Road/McDougall_1.png",
      img2: "project_images/McDougall_Road/McDougall_2.png",
      img3: "project_images/McDougall_Road/McDougall_3.png",
      gallery: [
        "project_images/McDougall_Road/McDougall_1.png",
        "project_images/McDougall_Road/McDougall_2.png",
        "project_images/McDougall_Road/McDougall_3.png",
        "project_images/McDougall_Road/McDougall_4.png",
        "project_images/McDougall_Road/McDougall_5.png",
        "project_images/McDougall_Road/McDougall_6.png",
        "project_images/McDougall_Road/McDougall_7.png",
        "project_images/McDougall_Road/McDougall_8.png",
        "project_images/McDougall_Road/McDougall_9.png",
        "project_images/McDougall_Road/McDougall_10.png",
        "project_images/McDougall_Road/McDougall_11.png",
        "project_images/McDougall_Road/McDougall_12.png"
      ],
      overview: "True transformations require flawless structural engineering and uncompromising design vision. For this comprehensive whole-home reconstruction, we stripped the original structure to its core to completely reconfigure the layout, adding an entirely new engineered vertical story with striking A-frame gables. From extensive foundation excavation and advanced modern waterproofing systems to wrapping the exterior in high-end, custom split-face stone masonry, every phase of this build was executed to elevate both structural integrity and architectural aesthetic.",
      desc1: "True transformations require flawless structural engineering and uncompromising design vision. For this comprehensive whole-home reconstruction, we stripped the original structure to its core to completely reconfigure the layout, adding an entirely new engineered vertical story with striking A-frame gables. From extensive foundation excavation and advanced modern waterproofing systems to wrapping the exterior in high-end, custom split-face stone masonry, every phase of this build was executed to elevate both structural integrity and architectural aesthetic.",
      desc2: "We began with perimeter foundation excavation and structural shoring, opening up the footprint for expansive timber framing, custom masonry finishes, and high-efficiency modern glazing, completing the estate with a matching detached auxiliary structure.",
      prevHash: "#project-bathrooms",
      nextHash: "#project-basements"
    },
        '#project-basements': {
      title: "HUNTINGWOOD COURT TOTAL ESTATE RECONSTRUCTION",
      category: "Whole-Home Transformation & Structural Reconfiguration",
      cat: "Whole-Home Transformation & Structural Reconfiguration",
      location: "Vaughan, ON (Huntingwood Court)",
      timeline: "2-3 Months",
      subtitle: "An uncompromising top-to-bottom transformation merging bold architectural character, complex structural engineering, and elite functional zones.",
      leadDesc: "An uncompromising top-to-bottom transformation merging bold architectural character, complex structural engineering, and elite functional zones.",
      scope: "Load-Bearing Wall Removal, Custom Kitchen Millwork & Dry Bar, Floor-to-Ceiling Fireplace Media Wall, Bespoke Library Bookcase & Sliding Ladder, Custom Powder Room, Grand Staircase Reconstruction, Engineered Hardwood & Aria Flush Vent Integration, Sub-Grade Basement Gym & Kitchenette",
      standards: "WEDI Certified, Havenridge Written Warranty",
      certifications: "WEDI Certified, Havenridge Written Warranty",
      img1: "project_images/Huntingwood_Court/Huntingwood_1.png",
      img2: "project_images/Huntingwood_Court/huntingwood_living_fireplace_media.jpg",
      img3: "project_images/Huntingwood_Court/Huntingwood_3.png",
      overview: `The Huntingwood Court estate stands as a definitive showcase of complex multi-level design-build execution. On the main floor, we executed a major structural reconfiguration by removing a principal load-bearing wall, entirely opening the floor plan into a sprawling chef's kitchen. This gourmet culinary space is anchored by custom forest green shaker-style millwork, a massive central quartz-capped island, a bespoke custom-built range hood enclosure, an integrated dry bar, and a dedicated roll-out coffee cupboard station. Seamlessly flowing from the kitchen is the expansive living room, centered around an ultra-sleek, built-in three-sided linear fireplace media unit flanked by minimalist architectural shelving.

No detail was spared in the structural or visual continuity of the home; we installed premium wide-plank engineered hardwood flooring across both upper levels, seamlessly integrating modern flush-mount Aria vents. Off the main foyer, a sophisticated private library features a custom floor-to-ceiling stained oak bookcase equipped with an authentic rolling library ladder system. Nearby, a show-stopping powder room makes a bold statement with deep, dramatic wainscoting topped by a vibrant botanical wallcovering and a luxury marble vanity. Structural transitions were completely elevated by fully replacing the main architectural staircase and professionally capping the secondary staircase to match the premium floor finishes.

Upstairs, all bedrooms were completely modernized, including a fully customized, walk-in closet dressing room and completely revitalized, high-end bathroom suites. Below grade, the lower level was fully optimized into a high-performance basement retreat. This multi-functional sub-grade footprint includes a luxury wellness zone featuring a custom home fitness gym with commercial-grade rubber flooring, an advanced glass-enclosed training area, a private lower-level bathroom, and a sleek modern entertainment kitchenette complete with under-counter beverage cooling, open mosaic-tile floating shelves, and integrated ambient LED strip accent lighting.

The entire estate was brought together with a flawless whole-home professional paint package and tailored architectural trim.`,
      desc1: `The Huntingwood Court estate stands as a definitive showcase of complex multi-level design-build execution. On the main floor, we executed a major structural reconfiguration by removing a principal load-bearing wall, entirely opening the floor plan into a sprawling chef's kitchen. This gourmet culinary space is anchored by custom forest green shaker-style millwork, a massive central quartz-capped island, a bespoke custom-built range hood enclosure, an integrated dry bar, and a dedicated roll-out coffee cupboard station. Seamlessly flowing from the kitchen is the expansive living room, centered around an ultra-sleek, built-in three-sided linear fireplace media unit flanked by minimalist architectural shelving.

No detail was spared in the structural or visual continuity of the home; we installed premium wide-plank engineered hardwood flooring across both upper levels, seamlessly integrating modern flush-mount Aria vents. Off the main foyer, a sophisticated private library features a custom floor-to-ceiling stained oak bookcase equipped with an authentic rolling library ladder system. Nearby, a show-stopping powder room makes a bold statement with deep, dramatic wainscoting topped by a vibrant botanical wallcovering and a luxury marble vanity. Structural transitions were completely elevated by fully replacing the main architectural staircase and professionally capping the secondary staircase to match the premium floor finishes.

Upstairs, all bedrooms were completely modernized, including a fully customized, walk-in closet dressing room and completely revitalized, high-end bathroom suites. Below grade, the lower level was fully optimized into a high-performance basement retreat. This multi-functional sub-grade footprint includes a luxury wellness zone featuring a custom home fitness gym with commercial-grade rubber flooring, an advanced glass-enclosed training area, a private lower-level bathroom, and a sleek modern entertainment kitchenette complete with under-counter beverage cooling, open mosaic-tile floating shelves, and integrated ambient LED strip accent lighting.

The entire estate was brought together with a flawless whole-home professional paint package and tailored architectural trim.`,
      desc2: "This masterful estate transformation integrated a massive open-concept structural layout, premium engineered flooring with flush Aria vents, an elegant custom library with a rolling ladder, a striking designer powder room, a high-performance sub-grade home fitness gym, and a custom entertainment kitchenette.",
      prevHash: "#project-additions",
      nextHash: "#project-accessibility",
      gallery: [
        "project_images/Huntingwood_Court/Huntingwood_1.png",
        "project_images/Huntingwood_Court/huntingwood_green_kitchen_pool.jpg",
        "project_images/Huntingwood_Court/Huntingwood_3.png",
        "project_images/Huntingwood_Court/Huntingwood_4.png",
        "project_images/Huntingwood_Court/Huntingwood_5.jpg",
        "project_images/Huntingwood_Court/Huntingwood_6.jpg",
        "project_images/Huntingwood_Court/huntingwood_dining_room.jpg",
        "project_images/Huntingwood_Court/Huntingwood_8.jpg",
        "project_images/Huntingwood_Court/huntingwood_staircase_foyer.jpg",
        "project_images/Huntingwood_Court/huntingwood_basement_wetbar.jpg",
        "project_images/Huntingwood_Court/Huntingwood_11.jpg",
        "project_images/Huntingwood_Court/Huntingwood_12.jpg"
      ]
    },
    '#project-accessibility': {
      title: "ACCESSIBLE & AGING-IN-PLACE RENOVATIONS",
      category: "Universal Design & Accessible Bathroom Renovation",
      cat: "Universal Design & Accessible Bathroom Renovation",
      location: "Kitchener-Waterloo, ON",
      timeline: "2 - 3 Weeks",
      subtitle: "Enhancing independence and safety through smart universal design, structural widening, and premium barrier-free bathroom renovations.",
      leadDesc: "Enhancing independence and safety through smart universal design, structural widening, and premium barrier-free bathroom renovations.",
      scope: "Structural Doorway Widening, Zero-Threshold Barrier-Free Shower, Integrated Bench Seating, Custom Vanity Storage, Heavy-Duty Grab Bars & High-Output Lighting",
      standards: "ADA / OBC Compliant, Havenridge Written Warranty",
      certifications: "ADA / OBC Compliant, Havenridge Written Warranty",
      img1: "project_images/Isherwood_Ave/Isherwood_1.png",
      img2: "project_images/Isherwood_Ave/Isherwood_2.png",
      img3: "project_images/Isherwood_Ave/Isherwood_3.png",
      gallery: [
        "project_images/Isherwood_Ave/Isherwood_1.png",
        "project_images/Isherwood_Ave/Isherwood_2.png",
        "project_images/Isherwood_Ave/Isherwood_3.png",
        "project_images/Isherwood_Ave/Isherwood_4.png",
        "project_images/Isherwood_Ave/Isherwood_5.png"
      ],
      overview: "Creating a safe, beautiful, and accessible living space within a retirement community requires a deep understanding of universal design principles and structural adaptability. For this comprehensive bathroom renovation, our primary focus was eliminating physical barriers to maximize safety and independence for independent senior living. We began by structurally widening the doorway framework to comfortably accommodate walkers and mobility aids. The original layout was completely overhauled to feature a zero-threshold, barrier-free roll-in shower complete with a heavy-duty integrated bench for sitting and strategically anchored safety grab bars. Every detail was meticulously planned to balance utility and style—including custom-designed vanity storage positioned for easy reach, a comfort-height toilet, and high-output, shadow-free architectural lighting to drastically improve visibility.",
      desc1: "Creating a safe, beautiful, and accessible living space within a retirement community requires a deep understanding of universal design principles and structural adaptability. For this comprehensive bathroom renovation, our primary focus was eliminating physical barriers to maximize safety and independence for independent senior living. We began by structurally widening the doorway framework to comfortably accommodate walkers and mobility aids. The original layout was completely overhauled to feature a zero-threshold, barrier-free roll-in shower complete with a heavy-duty integrated bench for sitting and strategically anchored safety grab bars. Every detail was meticulously planned to balance utility and style—including custom-designed vanity storage positioned for easy reach, a comfort-height toilet, and high-output, shadow-free architectural lighting to drastically improve visibility.",
      desc2: "This specialized universal design project integrated a structural doorway expansion, a barrier-free zero-clearance shower with built-in seating, accessible custom storage, and code-compliant safety grab bars.",
      prevHash: "#project-basements",
      nextHash: "#project-living-spaces"
    },
            '#project-living-spaces': {
      title: "MORNINGDALE CRESCENT TOTAL PROPERTY OVERHAUL",
      category: "Whole-Home Interior & Exterior Transformation",
      cat: "Whole-Home Interior & Exterior Transformation",
      location: "Waterloo, ON (Morningdale Crescent)",
      timeline: "1-2 Months",
      subtitle: "An incredible inside-out estate transformation fusing structural ceiling volume, high-impact custom tilework, and luxury exterior hardscaping.",
      leadDesc: "An incredible inside-out estate transformation fusing structural ceiling volume, high-impact custom tilework, and luxury exterior hardscaping.",
      scope: "Living Room Ceiling Elevation & Exposed Timber Wrap, Custom Kitchen Overhaul with White Shaker Cabinets, Premium Engineered Hardwood Flooring, Bold Mediterranean Graphic Tile Bathroom, Architectural Staircases & Wrought-Iron Spindles, Deep-Tone Finished Basement Rec Room & Custom Gym, Exterior Siding & High-Efficiency Windows, Multi-Tiered Backyard Entertainment Deck & Privacy Fencing, Multi-Level Front Interlock Stone Retaining Driveway with Ambient Lighting",
      standards: "WEDI Certified, Havenridge Written Warranty",
      certifications: "WEDI Certified, Havenridge Written Warranty",
      img1: "project_images/Morningdale_Crescent/morningdale_exterior_front_landscape.jpg",
      img2: "project_images/Morningdale_Crescent/morningdale_vaulted_living_room.jpg",
      img3: "project_images/Morningdale_Crescent/Morningdale_3.png",
      overview: `The Morningdale Crescent estate stands as a definitive blueprint for an extensive, top-tier interior and exterior renovation. Inside the main living spaces, we structurally raised the ceiling heights into an open architectural vault, perfectly grounded by a massive, rich-toned custom wrapped timber beam. The main level flows seamlessly into a bright, modern gourmet kitchen featuring custom full-height white shaker cabinets, premium concrete-tone countertops, a professional chimney-style stainless hood range, and a geometric tiled backsplash. The entire level is wrapped in premium wide-plank engineered hardwood flooring that runs continuously down a newly overhauled foyer staircase, complete with solid oak handrails, a stately squared newel post, and modern matte black wrought-iron spindles. Every room was further elevated with crisp white solid-core doors, sleek black architectural hardware, and a flawless whole-home professional paint package.

A standout interior feature is the show-stopping main level bathroom, showcasing bold Mediterranean-inspired black-and-white graphic porcelain floor tiles that climb seamlessly up a magnificent walk-in shower enclosure, secured by premium matte-black framed glass sliding doors and high-end plumbing fixtures. Below grade, the home opens into an ultra-sleek, deep charcoal-finished basement retreat. This multi-functional sub-grade footprint features an expansive theater-style recreation room with under-glow LED media lighting, a modern full bathroom, and a dedicated high-performance home gym complete with commercial rubber floor protection, an expansive full-height framed workout mirror, and a vibrant custom faux-ivy green wall display.

The exterior transformations are equally spectacular, delivering world-class curb appeal and private outdoor living. The front yard was entirely re-graded and engineered with a multi-level interlocking stone retaining wall system, a beautifully paved stone approach, and integrated low-voltage ambient masonry ledge lighting. The entire exterior envelope was stripped and modernized with dark charcoal horizontal siding, matching fascia, and high-efficiency white-trimmed windows. In the backyard, we constructed a massive, multi-tiered premium pressure-treated timber entertainment deck. This expansive outdoor living footprint is meticulously designed with integrated under-soffit LED pot lighting, built-in horizontal privacy screening, modern black metal railing panels, and a tailored limestone flagstone landing pad leading onto a manicured green lawn.`,
      desc1: `The Morningdale Crescent estate stands as a definitive blueprint for an extensive, top-tier interior and exterior renovation. Inside the main living spaces, we structurally raised the ceiling heights into an open architectural vault, perfectly grounded by a massive, rich-toned custom wrapped timber beam. The main level flows seamlessly into a bright, modern gourmet kitchen featuring custom full-height white shaker cabinets, premium concrete-tone countertops, a professional chimney-style stainless hood range, and a geometric tiled backsplash. The entire level is wrapped in premium wide-plank engineered hardwood flooring that runs continuously down a newly overhauled foyer staircase, complete with solid oak handrails, a stately squared newel post, and modern matte black wrought-iron spindles. Every room was further elevated with crisp white solid-core doors, sleek black architectural hardware, and a flawless whole-home professional paint package.

A standout interior feature is the show-stopping main level bathroom, showcasing bold Mediterranean-inspired black-and-white graphic porcelain floor tiles that climb seamlessly up a magnificent walk-in shower enclosure, secured by premium matte-black framed glass sliding doors and high-end plumbing fixtures. Below grade, the home opens into an ultra-sleek, deep charcoal-finished basement retreat. This multi-functional sub-grade footprint features an expansive theater-style recreation room with under-glow LED media lighting, a modern full bathroom, and a dedicated high-performance home gym complete with commercial rubber floor protection, an expansive full-height framed workout mirror, and a vibrant custom faux-ivy green wall display.

The exterior transformations are equally spectacular, delivering world-class curb appeal and private outdoor living. The front yard was entirely re-graded and engineered with a multi-level interlocking stone retaining wall system, a beautifully paved stone approach, and integrated low-voltage ambient masonry ledge lighting. The entire exterior envelope was stripped and modernized with dark charcoal horizontal siding, matching fascia, and high-efficiency white-trimmed windows. In the backyard, we constructed a massive, multi-tiered premium pressure-treated timber entertainment deck. This expansive outdoor living footprint is meticulously designed with integrated under-soffit LED pot lighting, built-in horizontal privacy screening, modern black metal railing panels, and a tailored limestone flagstone landing pad leading onto a manicured green lawn.`,
      desc2: "This masterful multi-level transformation integrated an elevated vaulted living room ceiling with a wrapped timber beam, a custom white shaker kitchen, an elite graphic-tile walk-in shower suite, a high-end finished media basement and fitness gym, an engineered front interlock retaining landscape with integrated ledge lighting, and a massive multi-tiered backyard custom timber deck.",
      prevHash: "#project-accessibility",
      nextHash: "#project-garages",
      gallery: [
        "project_images/Morningdale_Crescent/morningdale_kitchen_corner.jpg",
        "project_images/Morningdale_Crescent/morningdale_backyard_deck_twilight.jpg",
        "project_images/Morningdale_Crescent/morningdale_tile_bathroom_tub.jpg",
        "project_images/Morningdale_Crescent/Morningdale_4.png",
        "project_images/Morningdale_Crescent/Morningdale_5.png",
        "project_images/Morningdale_Crescent/Morningdale_6.png",
        "project_images/Morningdale_Crescent/Morningdale_7.png",
        "project_images/Morningdale_Crescent/morningdale_teal_shower_suite.jpg",
        "project_images/Morningdale_Crescent/Morningdale_9.png",
        "project_images/Morningdale_Crescent/Morningdale_10.png",
        "project_images/Morningdale_Crescent/Morningdale_11.png",
        "project_images/Morningdale_Crescent/morningdale_charcoal_basement_theater.jpg"
      ]
    },
            '#project-garages': {
      title: "THE MOORE STREET ESTATE: A 1908 FLAGSHIP RESTORATION",
      category: "Whole-Home Historic Restoration & Structural Re-Engineering",
      cat: "Whole-Home Historic Restoration & Structural Re-Engineering",
      location: "Cambridge, ON (Moore Street)",
      timeline: "Custom Flagship Build",
      subtitle: "A monumental century-home transformation blending heavy structural leveling, custom architectural millwork, and an elite multi-structure footprint.",
      leadDesc: "A monumental century-home transformation blending heavy structural leveling, custom architectural millwork, and an elite multi-structure footprint.",
      scope: "Structural House Jacking (2\" Leveling), Sub-Grade Steel Beam Shoring, 200-Amp Electrical Upgrade & Whole-Home Ductwork/HVAC Overhaul, 3-Bed/1.5-Bath to 4-Bed/2.5-Bath Expansion, 12-Foot Waterfall Butcher Block Island & Solid Quartz Backsplash, 800 sq ft Master Suite with Tray Ceiling & Custom Glass Railings, Premium Basement Wellness Center (Sauna, Cold Plunge, Gym), Cistern Demolition & Walkout Structural Conversion, Detached Office & Shop Garage Overhaul with Ductless Split, 17'x17' Outdoor Timber Pergola & Hardscaping",
      standards: "ESA & OBC Compliant, Havenridge Written Warranty",
      certifications: "ESA & OBC Compliant, Havenridge Written Warranty",
      img1: "project_images/Moore_Street_State_Flagship/Moore_1.png",
      img2: "project_images/Moore_Street_State_Flagship/Moore_2.png",
      img3: "project_images/Moore_Street_State_Flagship/Moore_3.png",
      overview: `The Moore Street estate stands as the definitive flagship showcase of Havenridge's engineering depth and uncompromising craftsmanship. As only the second owners of this historic 1908 home, we executed a complete top-to-bottom reconstruction that preserved its timeless heritage while embedding world-class modern luxury. Structurally, the project began deep underground, where we remediated significant century-old settling issues by installing structural steel beams in the basement and safely jacking the entire house up two inches to perfect level. We stripped the home to its bones, removed restrictive partition walls to establish an open-concept main floor, updated the infrastructure to a modern 200-amp electrical service, and replaced the entire HVAC system with brand-new custom trunk lines, venting, and a high-efficiency furnace. Every wall and attic cavity was fully insulated to modern code before being finished with precision drywall, mud, tape, and a flawless custom paint package.

The main level is a masterclass in architectural finishing and clever utility. The heart of the home is a custom chef's kitchen featuring an oversized 12-foot central island wrapped in a spectacular waterfall-edge butcher block countertop, complemented by perimeter quartz surfaces, a solid quartz slab backsplash, and high-end hidden features like an overhead refrigerator pull-out and an integrated toe-kick drawer. The living areas showcase an exposed brick feature wall, elegant custom wall paneling, towering 12-inch historic profile baseboards, and a bespoke built-in library bookcase. To honor the home's heritage, we meticulously restored the original solid-wood interior doors, retaining their rich stained finishes and fully operational skeleton key hardware. The main floor layout was expanded to include a new solid oak staircase, a bedroom, and a stunning full bathroom boasting 9-foot ceilings, a deep soaking tub, a sleek floating vanity, and a custom tile shower.

By re-engineering the floor plan, we successfully converted the home from a 3-bedroom, 1.5-bathroom layout into an expansive 4-bedroom, 2.5-bathroom luxury estate. The upper level was transformed into an elite, 800-square-foot primary master suite. This private sanctuary features an architectural tray ceiling, an expansive custom walk-in closet, a dedicated makeup deck vanity, and a barrier-free, zero-threshold wet room washroom. The transition to the upper level is framed by a modern custom staircase guardrail complete with low-profile architectural glass panels.

Below grade, the basement underwent an incredible spatial transformation. We demolished an old, defunct concrete water cistern to reclaim valuable square footage, allowing us to build a premium commercial-grade home wellness center. This lower level now features a custom home fitness gym, a traditional timber sauna, a dedicated cold plunge station, a built-in recessed water bottle filling fountain, and a luxury bathroom laid out in a flawless herringbone tile pattern. The mechanical room was centralized with a modern water distribution manifold system and a whole-home water softener. The basement was also upgraded to a structural walkout with architectural wall paneling transitioning seamlessly to the exterior, and we integrated a full kitchen plumbing rough-in for future secondary suite adaptability.

The exterior envelope and surrounding property were entirely reborn to match the caliber of the interior. The main house and the detached garage were fully stripped and updated with high-efficiency windows, premium insulated doors, durable modern siding, new soffit, fascia, and oversized eavestroughs with integrated roof vents. The detached garage was structurally converted into a dual-purpose workspace: the main shop area features an independent 60-amp electrical sub-panel and heavy-duty, clean plywood walls, while the rear footprint was insulated and turned into a private, executive back office finished with premium luxury vinyl plank (LVP) flooring, custom built-in cabinetry, a dedicated dry bar, and a ductless mini-split climate system. The outdoor living experience is completed by extensive, freshly graded landscaping, a massive rear concrete entertainment pad, and an artisan-crafted 17'x17' timber pergola structure.`,
      desc1: `The Moore Street estate stands as the definitive flagship showcase of Havenridge's engineering depth and uncompromising craftsmanship. As only the second owners of this historic 1908 home, we executed a complete top-to-bottom reconstruction that preserved its timeless heritage while embedding world-class modern luxury. Structurally, the project began deep underground, where we remediated significant century-old settling issues by installing structural steel beams in the basement and safely jacking the entire house up two inches to perfect level. We stripped the home to its bones, removed restrictive partition walls to establish an open-concept main floor, updated the infrastructure to a modern 200-amp electrical service, and replaced the entire HVAC system with brand-new custom trunk lines, venting, and a high-efficiency furnace. Every wall and attic cavity was fully insulated to modern code before being finished with precision drywall, mud, tape, and a flawless custom paint package.

The main level is a masterclass in architectural finishing and clever utility. The heart of the home is a custom chef's kitchen featuring an oversized 12-foot central island wrapped in a spectacular waterfall-edge butcher block countertop, complemented by perimeter quartz surfaces, a solid quartz slab backsplash, and high-end hidden features like an overhead refrigerator pull-out and an integrated toe-kick drawer. The living areas showcase an exposed brick feature wall, elegant custom wall paneling, towering 12-inch historic profile baseboards, and a bespoke built-in library bookcase. To honor the home's heritage, we meticulously restored the original solid-wood interior doors, retaining their rich stained finishes and fully operational skeleton key hardware. The main floor layout was expanded to include a new solid oak staircase, a bedroom, and a stunning full bathroom boasting 9-foot ceilings, a deep soaking tub, a sleek floating vanity, and a custom tile shower.

By re-engineering the floor plan, we successfully converted the home from a 3-bedroom, 1.5-bathroom layout into an expansive 4-bedroom, 2.5-bathroom luxury estate. The upper level was transformed into an elite, 800-square-foot primary master suite. This private sanctuary features an architectural tray ceiling, an expansive custom walk-in closet, a dedicated makeup deck vanity, and a barrier-free, zero-threshold wet room washroom. The transition to the upper level is framed by a modern custom staircase guardrail complete with low-profile architectural glass panels.

Below grade, the basement underwent an incredible spatial transformation. We demolished an old, defunct concrete water cistern to reclaim valuable square footage, allowing us to build a premium commercial-grade home wellness center. This lower level now features a custom home fitness gym, a traditional timber sauna, a dedicated cold plunge station, a built-in recessed water bottle filling fountain, and a luxury bathroom laid out in a flawless herringbone tile pattern. The mechanical room was centralized with a modern water distribution manifold system and a whole-home water softener. The basement was also upgraded to a structural walkout with architectural wall paneling transitioning seamlessly to the exterior, and we integrated a full kitchen plumbing rough-in for future secondary suite adaptability.

The exterior envelope and surrounding property were entirely reborn to match the caliber of the interior. The main house and the detached garage were fully stripped and updated with high-efficiency windows, premium insulated doors, durable modern siding, new soffit, fascia, and oversized eavestroughs with integrated roof vents. The detached garage was structurally converted into a dual-purpose workspace: the main shop area features an independent 60-amp electrical sub-panel and heavy-duty, clean plywood walls, while the rear footprint was insulated and turned into a private, executive back office finished with premium luxury vinyl plank (LVP) flooring, custom built-in cabinetry, a dedicated dry bar, and a ductless mini-split climate system. The outdoor living experience is completed by extensive, freshly graded landscaping, a massive rear concrete entertainment pad, and an artisan-crafted 17'x17' timber pergola structure.`,
      desc2: "This historic 1908 flagship project integrated a 2-inch structural house leveling and steel shoring package, an 800 sq ft master suite with custom glass railings, a premium sub-grade gym and sauna wellness retreat, an elite custom kitchen with a 12-foot waterfall island, and a complete exterior overhaul featuring a detached climate-controlled back office and a custom 17'x17' courtyard pergola.",
      prevHash: "#project-living-spaces",
      nextHash: "#project-whole-home",
      gallery: [
        "project_images/Moore_Street_State_Flagship/Moore_1.png",
        "project_images/Moore_Street_State_Flagship/Moore_2.png",
        "project_images/Moore_Street_State_Flagship/Moore_3.png",
        "project_images/Moore_Street_State_Flagship/Moore_4.png",
        "project_images/Moore_Street_State_Flagship/Moore_5.png",
        "project_images/Moore_Street_State_Flagship/Moore_6.png",
        "project_images/Moore_Street_State_Flagship/Moore_7.png",
        "project_images/Moore_Street_State_Flagship/Moore_8.png",
        "project_images/Moore_Street_State_Flagship/Moore_9.png",
        "project_images/Moore_Street_State_Flagship/Moore_10.png",
        "project_images/Moore_Street_State_Flagship/Moore_11.png",
        "project_images/Moore_Street_State_Flagship/Moore_12.png"
      ]
    }
  };


  // Render Dedicated Inspiration Subpages (CASS STYLE)
  if (currentPath !== '#home' && inspirationSubpages[currentPath]) {
    const item = inspirationSubpages[currentPath];
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        
        {/* NAV HEADER */}
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <div className="flex items-center gap-4">
              <a href="#inspiration-section" className="text-xs font-sans font-bold tracking-widest uppercase text-[#CDAE72] hover:text-white transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> BACK TO INSPIRATION GALLERY
              </a>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#CDAE72] hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION DRAWER */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0B2638] z-50 overflow-y-auto border-t border-[#CDAE72]/20 flex flex-col justify-between p-6">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block">INSPIRATION DIVISIONS</span>
                  <div className="grid grid-cols-1 gap-2.5 pt-1 text-sm font-semibold">
                    <a href="#inspiration-bathrooms" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Bathroom Retreats</a>
                    <a href="#inspiration-kitchens" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Gourmet Kitchens</a>
                    <a href="#inspiration-living-spaces" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Structural Living Spaces</a>
                    <a href="#inspiration-additions" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Multi-Story Additions</a>
                    <a href="#inspiration-basements" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Sub-Grade Basements</a>
                    <a href="#inspiration-garages" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Executive Workshops & Garages</a>
                    <a href="#inspiration-millwork" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Custom Millwork & Trim</a>
                    <a href="#inspiration-exteriors" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Exteriors & Hardscaping</a>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-bold font-cinzel tracking-wider uppercase border-b border-white/10 pb-6">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Home</a>
                  <a href="#inspiration-section" onClick={() => setMobileMenuOpen(false)} className="block text-[#CDAE72] hover:text-white transition-colors">Inspiration Gallery</a>
                  <a href="#projects-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Work & Projects</a>
                  <a href="#about-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">About Us</a>
                  <a href="#contact-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Contact Us</a>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* HERO IMAGE */}
        <section className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden bg-[#0B2638]">
          <img src={item.heroImg} alt={item.title} className="w-full h-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638] via-[#0B2638]/40 to-transparent flex flex-col justify-end p-8 sm:p-16">
            <div className="max-w-7xl mx-auto w-full">
              <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block mb-2">INSPIRATION GALLERY DIVISION</span>
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide leading-tight">{item.title}</h1>
            </div>
          </div>
        </section>

        {/* EDITORIAL CONTENT + BLUE SIDEBAR SPECIFICATION CARD */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* LEFT COLUMN: EDITORIAL OVERVIEW STORY (2 COLS) */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">DIVISION PROFILE & STANDARDS</span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B2638] leading-tight">{item.title}</h2>
                <p className="font-drama text-xl text-[#24313A]/70 italic leading-relaxed pt-1">{item.subtitle}</p>
              </div>
              
              <div className="text-sm sm:text-base text-[#24313A]/80 leading-relaxed space-y-6 font-light">
                {item.overview.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: BLUE SIDEBAR SPECIFICATION CARD (1 COL) */}
            <div className="lg:col-span-1 sticky top-28">
              <div className="bg-[#0B2638] text-white p-8 rounded-2xl border border-[#CDAE72]/30 shadow-xl space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block mb-1">HAVENRIDGE STANDARDS</span>
                  <h3 className="font-cinzel text-base font-bold text-white tracking-wide uppercase leading-snug">{item.divSpecs}</h3>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  {item.specs.map((spec, specIdx) => (
                    <div key={specIdx} className={`space-y-1 ${specIdx < item.specs.length - 1 ? 'border-b border-white/10 pb-3' : 'pb-1'}`}>
                      <span className="text-[#CDAE72] font-bold uppercase tracking-wider block">{spec.label}</span>
                      <p className="text-white/90 font-light leading-relaxed">{spec.val}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <a 
                    href="#contact-page" 
                    className="block w-full text-center bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold py-3.5 text-xs font-sans tracking-widest uppercase transition-all shadow-md rounded-sm"
                  >
                    CONSULT WITH OUR TEAM
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* 2x4 GALLERY GRID SECTION */}
        {item.grid && item.grid.length > 0 && (
          <section className="py-16 bg-white border-t border-[#24313A]/10">
            <div className="max-w-7xl mx-auto px-6 space-y-10">
              <div className="text-center space-y-3">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">PORTFOLIO GALLERY</span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638] tracking-wider">{item.title} GALLERY</h2>
                <p className="text-[#24313A]/70 text-sm font-light max-w-2xl mx-auto leading-relaxed">
                  High-resolution craftsmanship photography showcasing custom details, materials, and spatial engineering from real Havenridge Build projects.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {item.grid.map((imgSrc, gIdx) => (
                  <div 
                    key={gIdx} 
                    onClick={() => openLightbox(item.grid, gIdx)}
                    className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-md bg-[#0B2638] border border-[#0B2638]/10 cursor-pointer"
                  >
                    <img 
                      src={imgSrc} 
                      alt={`${item.title} detail ${gIdx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-[#0B2638]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-xs font-sans font-bold text-white tracking-widest uppercase bg-[#0B2638]/90 px-4 py-2 rounded border border-[#CDAE72]/70 shadow-lg hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all">
                        VIEW DETAIL
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* REAL-PROJECT FEATURED SHOWCASE GALLERY GRID */}
        <section className="py-20 bg-[#F4F2EE] border-t border-[#24313A]/10">
          <div className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">REAL-PROJECT CRAFTSMANSHIP</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638] tracking-wider">FEATURED PROJECT SHOWCASE</h2>
              <p className="text-[#24313A]/70 text-sm font-light max-w-2xl mx-auto leading-relaxed">
                Explore real project features built by Havenridge master trades across Waterloo Region & surrounding areas.
              </p>
            </div>

            <div className={`grid grid-cols-1 ${item.showcase.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'} gap-6 sm:gap-8`}>
              {item.showcase.map((card, cIdx) => (
                <div 
                  key={cIdx} 
                  onClick={() => openLightbox(item.showcase, cIdx)}
                  className="relative group bg-[#0B2638] rounded-xl overflow-hidden shadow-lg border border-[#0B2638]/20 flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638] via-transparent to-transparent opacity-60"></div>
                  </div>
                  <div className="p-6 text-left space-y-2 flex-1 flex flex-col justify-between bg-[#0B2638]">
                    <div>
                      <span className="text-[#CDAE72] text-[9px] font-sans font-bold tracking-[0.2em] uppercase block mb-1">FEATURED ESTATE</span>
                      <h4 className="font-cinzel text-lg font-bold text-white tracking-wide">{card.title}</h4>
                      <p className="text-white/80 text-xs font-light leading-relaxed mt-2">{card.caption}</p>
                    </div>
                    <div className="pt-4 flex items-center gap-2 text-[10px] font-sans font-bold tracking-widest text-[#CDAE72] uppercase group-hover:text-white transition-colors">
                      <span>VIEW PROJECT</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER CALL TO ACTION */}
        <section className="py-16 bg-[#0B2638] text-white text-center border-t border-[#CDAE72]/20">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">START YOUR TRANSFORMATION</span>
            <h3 className="font-cinzel text-3xl font-bold text-white tracking-wider">READY TO ELEVATE YOUR HOME?</h3>
            <p className="text-white/80 text-sm font-light max-w-xl mx-auto leading-relaxed">
              Connect with Micheal Smith and the Havenridge Build master carpentry team to discuss your project vision, timeline, and structural requirements.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="#contact-page" 
                className="bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
              >
                REQUEST CONSULTATION
              </a>
              <a 
                href="tel:5196350963" 
                className="border border-[#CDAE72] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all rounded-sm cursor-pointer"
              >
                CALL 519-635-0963
              </a>
            </div>
          </div>
        </section>
        {renderLightbox()}
      </div>
    );
  }

  // Render individual project detail sub-pages (CASS STYLE)
  if (currentPath !== '#home' && currentPath !== '#contact-page' && currentPath !== '#projects-page' && currentPath !== '#about-page' && projectDetails[currentPath]) {
    const proj = projectDetails[currentPath];
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        
        {/* NAV HEADER */}
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <div className="flex items-center gap-4">
              <a href="#projects-page" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> BACK TO PROJECTS
              </a>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#CDAE72] hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION DRAWER */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0B2638] z-50 overflow-y-auto border-t border-[#CDAE72]/20 flex flex-col justify-between p-6">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block">SERVICES & SHOWCASES</span>
                  <div className="grid grid-cols-1 gap-2.5 pt-1 text-sm font-semibold">
                    <a href="#project-additions" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Additions and ADUs</a>
                    <a href="#project-whole-home" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Whole Home Renovations</a>
                    <a href="#project-multi-unit" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Multi-Unit Conversions</a>
                    <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Aging-in-Place Renovations</a>
                    <a href="#project-kitchens" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Kitchen Renovations</a>
                    <a href="#project-bathrooms" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Bathroom Retreats</a>
                    <a href="#project-basements" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Basement Suites</a>
                    <a href="#project-millwork" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Custom Millwork</a>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-bold font-cinzel tracking-wider uppercase border-b border-white/10 pb-6">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Home</a>
                  <a href="#process-section" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Process</a>
                  <a href="#projects-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Work & Projects</a>
                  <a href="#about-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">About Us</a>
                  <a href="#blog-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Renovation Blog</a>
                  <a href="#contact-page" onClick={() => setMobileMenuOpen(false)} className="block text-[#CDAE72] hover:text-white transition-colors">Contact Us</a>
                </div>

                <div>
                  <a 
                    href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full text-center bg-[#CDAE72] text-[#0B2638] font-bold py-3.5 text-xs font-sans tracking-widest uppercase rounded-sm shadow-md"
                  >
                    Client Portal Access
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-center space-y-1 text-xs text-white/70">
                <p className="font-semibold text-white">Havenridge Build | Cambridge & Waterloo Region</p>
                <p><a href="tel:5196350963" className="text-[#CDAE72] font-bold underline">519-635-0963</a> | Info@HavenridgeBuild.com</p>
              </div>
            </div>
          )}
        </nav>

        {/* HERO IMAGE */}
        <section className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden bg-[#0B2638]">
          <img src={proj.img1} alt={proj.title} className="w-full h-full object-cover opacity-90" />
        </section>

        {/* EDITORIAL CONTENT + PROJECT SPECIFICATIONS CARD LAYOUT */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* LEFT COLUMN: EDITORIAL STORY & IMAGERY (2 COLS) */}
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">PROJECT PROFILE</span>
                <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2638] leading-tight">{proj.title}</h1>
                <p className="font-drama text-2xl text-[#24313A]/70 italic leading-relaxed pt-2">{proj.leadDesc}</p>
              </div>
              
              <div className="text-sm text-[#24313A]/80 leading-relaxed space-y-6 font-light">
                <p>{proj.desc1}</p>
              </div>

              {/* In-feed large detail image */}
              <div 
                onClick={() => openLightbox([proj.img1, proj.img2, proj.img3].filter(Boolean), 1)}
                className="group relative w-full aspect-[16/10] overflow-hidden shadow-md rounded-lg cursor-pointer bg-[#0B2638]"
              >
                <img src={proj.img2} alt="Project detail visual" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#0B2638]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs font-sans font-bold text-white tracking-widest uppercase bg-[#0B2638]/90 px-4 py-2 rounded border border-[#CDAE72]/60">
                    CLICK TO ENLARGE
                  </span>
                </div>
              </div>

              <div className="text-sm text-[#24313A]/80 leading-relaxed space-y-6 font-light">
                <p>{proj.desc2}</p>
              </div>
            </div>

            {/* RIGHT COLUMN: PROJECT SPECIFICATIONS CARD (1 COL) */}
            <div className="lg:col-span-1 sticky top-28">
              <div className="bg-[#0B2638] text-white p-8 rounded-2xl border border-[#CDAE72]/30 shadow-xl space-y-6">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block mb-1">PROJECT SPECIFICATIONS</span>
                  <h3 className="font-cinzel text-xl font-bold text-white tracking-wide">{proj.title}</h3>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <span className="text-[#CDAE72] font-bold uppercase tracking-wider">LOCATION</span>
                    <span className="text-white/90 font-medium text-right">{proj.location || 'Waterloo Region, ON'}</span>
                  </div>

                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <span className="text-[#CDAE72] font-bold uppercase tracking-wider">CATEGORY</span>
                    <span className="text-white/90 font-medium text-right max-w-[180px]">{proj.cat}</span>
                  </div>

                  <div className="flex justify-between items-start border-b border-white/10 pb-3">
                    <span className="text-[#CDAE72] font-bold uppercase tracking-wider">TIMELINE</span>
                    <span className="text-white/90 font-medium text-right">{proj.timeline || '6 – 10 Weeks'}</span>
                  </div>

                  <div className="space-y-1 border-b border-white/10 pb-3">
                    <span className="text-[#CDAE72] font-bold uppercase tracking-wider block mb-1">SCOPE OF WORK</span>
                    <p className="text-white/80 font-light leading-relaxed">{proj.scope || 'Custom Cabinetry, Architectural Trim & Structural Reconfiguration'}</p>
                  </div>

                  <div className="space-y-1 pb-2">
                    <span className="text-[#CDAE72] font-bold uppercase tracking-wider block mb-1">STANDARDS & WARRANTY</span>
                    <p className="text-white/80 font-light leading-relaxed">{proj.certifications || 'WEDI Certified, Havenridge Written Warranty'}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="#contact-page" 
                    className="w-full bg-[#CDAE72] text-[#0B2638] font-bold py-3.5 px-4 text-xs font-sans tracking-widest uppercase block text-center rounded-sm hover:bg-white transition-all shadow-md"
                  >
                    START A SIMILAR PROJECT →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-16 bg-[#F4F2EE]">
          <div className="max-w-5xl mx-auto px-6 space-y-10">
            <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block text-center">GALLERY</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {(proj.gallery || [proj.img1, proj.img2, proj.img3].filter(Boolean)).map((g, i) => (
                <div 
                  key={i} 
                  onClick={() => openLightbox(proj.gallery || [proj.img1, proj.img2, proj.img3].filter(Boolean), i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-sm hover:scale-[1.02] transition-all duration-500 cursor-pointer bg-[#0B2638]"
                >
                  <img src={g} alt={`Gallery view ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-[#0B2638]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-sans font-bold text-white tracking-widest uppercase bg-[#0B2638]/90 px-3 py-1.5 rounded border border-[#CDAE72]/60">
                      ENLARGE IMAGE
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BACK / NEXT NAVIGATION */}
        <section className="py-12 bg-white border-y border-[#0B2638]/10">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center text-xs font-sans font-bold tracking-widest uppercase text-[#CDAE72]">
            <a href={proj.prevHash} className="hover:text-[#0B2638] transition-colors flex items-center gap-2">
              ← PREVIOUS
            </a>
            <a href="#projects-page" className="hover:text-[#0B2638] transition-colors">
              VIEW ALL PROJECTS
            </a>
            <a href={proj.nextHash} className="hover:text-[#0B2638] transition-colors flex items-center gap-2">
              NEXT →
            </a>
          </div>
        </section>

        {/* BOTTOM CONTACT CALLOUT */}
        <section className="py-20 bg-[#0B2638] text-white text-center">
          <div className="max-w-3xl mx-auto px-6 space-y-6">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#CDAE72]">CONTACT US</h2>
            <p className="text-sm font-light text-white/80 max-w-lg mx-auto leading-relaxed">
              Planning a similar renovation? Complete our project inquiry form with your goals, location, expected investment, timing and design status. We will review the details and recommend the right next step.
            </p>
            <div className="pt-4">
              <a href="#contact-page" className="bg-[#CDAE72] text-[#0B2638] font-bold px-10 py-4 text-xs font-sans tracking-widest uppercase hover:bg-white transition-all shadow-lg">
                CONTACT US
              </a>
            </div>
          </div>
        </section>

  
            {/* FOOTER */}
        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-sans font-bold uppercase tracking-wider text-[#CDAE72] pt-1 pb-2">
              <a href="#contact-page" className="hover:text-white transition-colors">Start Your Project</a>
              <span className="text-white/30">•</span>
              <a href="#projects-page" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/30">•</span>
              <a href="#process-section" className="hover:text-white transition-colors">Our Process</a>
              <span className="text-white/30">•</span>
              <a href="#privacy-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            {/* COMPLETE 7-ICON SOCIAL MEDIA BAR */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 pb-2 text-[#CDAE72]">
              <a 
                href="https://www.facebook.com/carpentersotg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/carpentersonthego/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@havenridge.build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                title="TikTok"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/havenridgebuild/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@Havenridgebuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                title="YouTube"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.houzz.com/pro/webuser-117372779/__public" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Houzz"
                title="Houzz"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm p-1.5"
              >
                <img src="houzz.avif" className="w-full h-full object-contain" alt="Houzz" />
              </a>
              <a 
                href="https://www.yelp.ca/biz/havenridge-build-cambridge?osq=Havenridge+Build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Yelp"
                title="Yelp"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-0.5"
              >
                <img src="yelp_custom.png" className="w-full h-full object-contain rounded-full" alt="Yelp" />
              </a>
              <a 
                href="#reviews-page" 
                aria-label="Client Reviews"
                title="Verified Client Reviews"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm text-[#CDAE72] hover:text-[#0B2638] font-bold text-sm"
              >
                ★
              </a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>
        {renderLightbox()}
      </div>
    );
  }

  // Render projects-page (CASS PROJECTS DIRECTORY)
  // Dedicated Reviews Page (#reviews-page)
  if (currentPath === '#reviews-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md font-sans">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <div className="flex items-center gap-4">
              <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
              </a>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#CDAE72] hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </nav>

        <section className="bg-[#0B2638] text-white py-16 text-center border-b border-[#CDAE72]/20">
          <div className="max-w-4xl mx-auto px-6 space-y-3">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CLIENT TESTIMONIALS</span>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">What Our Clients Say</h1>
            <p className="text-sm font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
              Feedback from homeowners across Waterloo Region, Guelph and surrounding communities.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F4F2EE]">
          <div className="max-w-6xl mx-auto px-6">
            <div className="bg-white p-6 sm:p-10 rounded-sm shadow-md border border-[#0B2638]/10 min-h-[450px]">
              <div className="nj-stories"></div>
            </div>
          </div>
        </section>

        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-sans font-bold uppercase tracking-wider text-[#CDAE72] pt-1 pb-2">
              <a href="#contact-page" className="hover:text-white transition-colors">Start Your Project</a>
              <span className="text-white/30">•</span>
              <a href="#projects-page" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/30">•</span>
              <a href="#privacy-page" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </footer>
        {renderLightbox()}
      </div>
    );
  }

  // Dedicated Privacy Policy Page (#privacy-page)
  if (currentPath === '#privacy-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md font-sans">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <div className="flex items-center gap-4">
              <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
              </a>
            </div>
          </div>
        </nav>

        <section className="bg-[#0B2638] text-white py-16 text-center border-b border-[#CDAE72]/20">
          <div className="max-w-4xl mx-auto px-6 space-y-3">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">LEGAL & PRIVACY</span>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Privacy Policy</h1>
            <p className="text-xs font-light text-white/70">Effective Date: August 26, 2026</p>
          </div>
        </section>

        <section className="py-16 bg-white border-b border-[#0B2638]/10">
          <div className="max-w-4xl mx-auto px-6 space-y-8 text-sm text-[#24313A]/90 font-light leading-relaxed">
            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">1. Information We Collect</h2>
              <p>When you contact Havenridge Build, submit a project inquiry, apply for a position, or otherwise interact with our website, we may collect information you provide such as your name, email address, phone number, project address or service area, project details, budget information, preferred timing, referral source, uploaded information and any message you send us. We may also receive basic technical information about website use through cookies, analytics or similar technologies where enabled.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">2. How We Use Information</h2>
              <p>We use information to respond to inquiries, assess project fit, arrange consultations, prepare and manage prospective client relationships, communicate about projects, improve our website and services, maintain business records, recruit team members or trade partners, protect our systems, and meet legal or regulatory requirements.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">3. Service Providers</h2>
              <p>We may use trusted service providers to operate our website and business systems, including website hosting, email, customer relationship management, project management/client portal, analytics and other administrative tools. Information may be processed by these providers only as needed to provide their services to Havenridge Build.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">4. Sharing of Information</h2>
              <p>Havenridge Build does not sell personal information. We may share information with service providers, professional advisors, consultants or trade partners where reasonably necessary for an inquiry or project, or where required or permitted by law.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">5. Retention and Security</h2>
              <p>We retain personal information only as long as reasonably necessary for the purposes for which it was collected, our business and record-keeping needs, and applicable legal requirements. We use reasonable administrative, technical and physical safeguards appropriate to the information we hold.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">6. Cookies and Analytics</h2>
              <p>Our website may use cookies or analytics tools to understand site performance and visitor activity. If advertising, remarketing or additional tracking tools are added, this policy and any consent tools should be updated accordingly.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">7. Your Choices</h2>
              <p>You may contact us to ask questions about your personal information or request access or correction where applicable. You may also ask us to stop sending non-essential marketing communications.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">8. Contact</h2>
              <p>Questions about this Privacy Policy or Havenridge Build's privacy practices can be directed to <a href="mailto:Info@HavenridgeBuild.com" className="font-bold text-[#0B2638] underline">Info@HavenridgeBuild.com</a>.</p>
            </div>

            <div>
              <h2 className="font-cinzel text-xl font-bold text-[#0B2638] mb-2">9. Updates</h2>
              <p>We may update this Privacy Policy from time to time. The website displays the effective date of the current version.</p>
            </div>
          </div>
        </section>

        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
          </div>
        </footer>
        {renderLightbox()}
      </div>
    );
  }

  if (currentPath === '#projects-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        
        {/* NAV HEADER */}
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <div className="flex items-center gap-4">
              <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
              </a>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#CDAE72] hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION DRAWER */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0B2638] z-50 overflow-y-auto border-t border-[#CDAE72]/20 flex flex-col justify-between p-6">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block">SERVICES & SHOWCASES</span>
                  <div className="grid grid-cols-1 gap-2.5 pt-1 text-sm font-semibold">
                    <a href="#project-additions" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Additions and ADUs</a>
                    <a href="#project-whole-home" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Whole Home Renovations</a>
                    <a href="#project-multi-unit" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Multi-Unit Conversions</a>
                    <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Aging-in-Place Renovations</a>
                    <a href="#project-kitchens" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Kitchen Renovations</a>
                    <a href="#project-bathrooms" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Bathroom Retreats</a>
                    <a href="#project-basements" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Basement Suites</a>
                    <a href="#project-millwork" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Custom Millwork</a>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-bold font-cinzel tracking-wider uppercase border-b border-white/10 pb-6">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Home</a>
                  <a href="#process-section" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Process</a>
                  <a href="#projects-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Work & Projects</a>
                  <a href="#about-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">About Us</a>
                  <a href="#blog-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Renovation Blog</a>
                  <a href="#contact-page" onClick={() => setMobileMenuOpen(false)} className="block text-[#CDAE72] hover:text-white transition-colors">Contact Us</a>
                </div>

                <div>
                  <a 
                    href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full text-center bg-[#CDAE72] text-[#0B2638] font-bold py-3.5 text-xs font-sans tracking-widest uppercase rounded-sm shadow-md"
                  >
                    Client Portal Access
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-center space-y-1 text-xs text-white/70">
                <p className="font-semibold text-white">Havenridge Build | Cambridge & Waterloo Region</p>
                <p><a href="tel:5196350963" className="text-[#CDAE72] font-bold underline">519-635-0963</a> | Info@HavenridgeBuild.com</p>
              </div>
            </div>
          )}
        </nav>

        {/* HERO SPLIT IMAGE BANNER (CASS STYLE) */}
        <section className="grid grid-cols-2 gap-2 h-[250px] sm:h-[350px] overflow-hidden bg-[#0B2638]">
          <img src="project_images/piccadilly/1.png" alt="Kitchen highlight" className="w-full h-full object-cover opacity-80" />
          <img src="project_images/hero_living_room_fireplace.jpg" alt="Living Room highlight" className="w-full h-full object-cover opacity-80" />
        </section>

        {/* HERO TITLE SECTION ON LIGHT BACKGROUND (CASS STYLE) */}
        <section className="bg-[#F4F2EE] text-[#24313A] py-16 text-center border-b border-[#0B2638]/10">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">FULL PROJECTS</span>
            <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wider text-[#0B2638]">View our work</h1>
            <p className="text-sm font-light text-[#24313A]/80 max-w-xl mx-auto leading-relaxed pt-2">
              Explore completed Havenridge renovations and additions across Waterloo Region and Guelph. Each project highlights the homeowner’s goals, the work completed and the details that shaped the final result.
            </p>
            <div className="pt-4">
              <a href="#contact-page" className="inline-block bg-[#0B2638] text-white hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all shadow-md">
                CONTACT US
              </a>
            </div>
          </div>
        </section>

        {/* CASS-STYLE HOVER OVERLAY PROJECTS LIST */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {portfolioProjects.map((p, idx) => (
              <a href={p.hash} key={idx} className="relative aspect-[3/4] w-full overflow-hidden group shadow-xl cursor-pointer block rounded-sm min-h-[480px] sm:min-h-[540px]">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-[#0B2638]/85 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-between p-8 text-center backdrop-blur-[2px]">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block">PROJECT</span>
                  <div className="flex-1 flex flex-col justify-center items-center my-auto">
                    <h3 className="text-white text-xl sm:text-2xl font-cinzel font-bold leading-tight mb-2 tracking-wide">
                      {p.name}
                    </h3>
                    <p className="text-white/80 text-base font-drama italic">
                      {p.cat}
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-3 text-xs font-sans tracking-[0.2em] text-[#CDAE72] uppercase font-bold">
                    <span className="w-6 h-px bg-[#CDAE72]/60"></span>
                    <span>VIEW PROJECT DETAILS</span>
                    <span className="w-6 h-px bg-[#CDAE72]/60"></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

                {/* INSPIRATION GALLERY GRID SECTION */}
        <section id="inspiration-section" className="scroll-mt-28 py-20 sm:py-24 bg-[#F4F2EE] text-[#24313A] overflow-hidden relative border-t border-[#0B2638]/10 font-sans">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center space-y-3">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">DESIGN INSPIRATION</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638] tracking-wider">INSPIRATION GALLERY</h2>
            <p className="text-[#24313A]/70 text-sm font-light max-w-xl mx-auto leading-relaxed">
              Click on any photo below to explore custom designs and specifications from real Havenridge Build projects.
            </p>
          </div>

          {/* 4-COLUMN GRID OF ROUNDED CARDS */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {inspirationItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  className="relative w-full aspect-[2/3] overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer shadow-md bg-[#0B2638] font-sans"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638]/90 via-[#0B2638]/40 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300">
                    <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.2em] uppercase block mb-1">INSPIRATION</span>
                    <h3 className={"font-cinzel text-xl font-bold tracking-wide text-white"}>
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs font-light italic mt-1 leading-normal">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

  
      {/* WORK WITH US CAREERS SECTION */}
          <section id="work-with-us" className="py-20 bg-[#0B2638] text-white text-center">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CAREERS & TRADES</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wider">WORK WITH US</h2>
              <p className="text-white/80 text-sm font-light max-w-xl mx-auto leading-relaxed">
                Interested in working with Havenridge Build? We welcome applications from skilled carpenters, site supervisors, apprentices and qualified trade partners who value craftsmanship, communication, organization and accountability.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setIsApplyModalOpen(true)} 
                  className="inline-block bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </section>

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-sans font-bold uppercase tracking-wider text-[#CDAE72] pt-1 pb-2">
              <a href="#contact-page" className="hover:text-white transition-colors">Start Your Project</a>
              <span className="text-white/30">•</span>
              <a href="#projects-page" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/30">•</span>
              <a href="#process-section" className="hover:text-white transition-colors">Our Process</a>
              <span className="text-white/30">•</span>
              <a href="#privacy-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            {/* COMPLETE 7-ICON SOCIAL MEDIA BAR */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 pb-2 text-[#CDAE72]">
              <a 
                href="https://www.facebook.com/carpentersotg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/carpentersonthego/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@havenridge.build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                title="TikTok"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/havenridgebuild/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@Havenridgebuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                title="YouTube"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.houzz.com/pro/webuser-117372779/__public" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Houzz"
                title="Houzz"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm p-1.5"
              >
                <img src="houzz.avif" className="w-full h-full object-contain" alt="Houzz" />
              </a>
              <a 
                href="https://www.yelp.ca/biz/havenridge-build-cambridge?osq=Havenridge+Build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Yelp"
                title="Yelp"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-0.5"
              >
                <img src="yelp_custom.png" className="w-full h-full object-contain rounded-full" alt="Yelp" />
              </a>
              <a 
                href="#reviews-page" 
                aria-label="Client Reviews"
                title="Verified Client Reviews"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm text-[#CDAE72] hover:text-[#0B2638] font-bold text-sm"
              >
                ★
              </a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>

      
      {renderLightbox()}

      {/* GLOBAL CAREERS POPUP MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#0B2638]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white text-[#24313A] max-w-xl w-full rounded-sm shadow-2xl overflow-hidden relative my-8">
            
            {/* MODAL HEADER */}
            <div className="bg-[#0B2638] text-white p-6 flex justify-between items-center border-b border-[#CDAE72]/20">
              <div className="flex items-center gap-4">
                <img src="logo_mark_h_only.svg" alt="Havenridge Build Logo" className="h-8 sm:h-9 w-auto object-contain" />
                <div className="border-l border-white/20 pl-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">JOIN HAVENRIDGE BUILD</span>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">Work With Us Application</h3>
                </div>
              </div>
              <button 
                onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                className="text-white/70 hover:text-[#CDAE72] text-2xl font-bold transition-colors p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 sm:p-8 space-y-6 text-left">
              {isAppliedSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#CDAE72]/20 text-[#CDAE72] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                  <h4 className="font-cinzel text-2xl font-bold text-[#0B2638]">Application Received!</h4>
                  <p className="text-sm text-[#24313A]/80 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in joining Havenridge Build. Our hiring team will review your resume and reach out to qualified candidates.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                      className="bg-[#0B2638] text-white hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all"
                    >
                      CLOSE WINDOW
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsAppliedSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Full Name *</label>
                    <input type="text" required placeholder="John Doe" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Email Address *</label>
                      <input type="email" required placeholder="john@example.com" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Phone Number *</label>
                      <input type="tel" required placeholder="(519) 555-0199" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Role / Specialty *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Position...</option>
                        <option value="lead-carpenter">Lead Carpenter</option>
                        <option value="framing">Framing Carpenter</option>
                        <option value="finish">Finish Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="project-manager">Project Manager</option>
                        <option value="architectural-interior-designer">Architectural Designer / Interior Designer</option>
                        <option value="admin-assistant">Admin / Assistant</option>
                        <option value="subcontractor">Subcontractor / Licensed Trade Partner</option>
                        <option value="general">General Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Years of Experience *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Experience...</option>
                        <option value="1-3">1 - 3 Years</option>
                        <option value="3-5">3 - 5 Years</option>
                        <option value="5+">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Upload Resume (PDF, DOC, DOCX) *</label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-[#CDAE72] p-4 text-center rounded-sm bg-gray-50 cursor-pointer relative">
                      <input 
                        type="file" 
                        required 
                        accept=".pdf,.doc,.docx" 
                        onChange={(e) => setApplicantFileName(e.target.files[0]?.name || '')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                      <p className="text-xs text-[#24313A]/70">
                        {applicantFileName ? (
                          <span className="font-bold text-[#0B2638]">{applicantFileName}</span>
                        ) : (
                          'Click or drag your resume file here to attach'
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Brief Introduction / Message</label>
                    <textarea rows="3" placeholder="Tell us about your woodworking, building experience, or background..." className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]"></textarea>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button 
                      type="button" 
                      onClick={() => setIsApplyModalOpen(false)} 
                      className="text-xs font-bold uppercase tracking-wider text-[#24313A]/70 hover:text-[#0B2638]"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit" 
                      className="bg-[#0B2638] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all shadow-md"
                    >
                      SUBMIT APPLICATION
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      </div>
    );
  }

  // Render dedicated About page (NEW HERO + RESTORED ORIGINAL LAYOUT + AWARDS)
  if (currentPath === '#about-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased flex flex-col justify-between">
        <div>
          {/* NAV HEADER */}
          <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md font-sans">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
              <a href="#home" className="flex items-center group">
                <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
              </a>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-white/90">
                <a href="#services" className="hover:text-[#CDAE72] transition-colors">Services</a>
                <a href="#process-section" className="hover:text-[#CDAE72] transition-colors">Our Process</a>
                <a href="#projects-page" className="hover:text-[#CDAE72] transition-colors">Our Work</a>
                <a href="#about-page" className="text-[#CDAE72] font-bold border-b border-[#CDAE72] pb-0.5">About</a>
                <a href="#contact-page" className="hover:text-[#CDAE72] transition-colors">Contact</a>
                <a href="#blog-page" className="hover:text-[#CDAE72] transition-colors">Blog</a>
                <a 
                  href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#CDAE72] hover:text-white transition-colors"
                >
                  Client Portal
                </a>
              </div>
              <div className="w-12 hidden md:block"></div>
            </div>
          </nav>

          {/* NEW HERO SECTION (USER LIKED) */}
          <section className="relative bg-[#0B2638] text-white py-24 px-6 overflow-hidden border-b border-[#CDAE72]/20">
            <div className="absolute inset-0 z-0">
              <img 
                src="project_images/paisley/11.png" 
                alt="Havenridge Craftsmanship" 
                className="w-full h-full object-cover opacity-15"
              />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.3em] uppercase block">SINCE 2014 · WATERLOO REGION</span>
              <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider text-white leading-tight">
                Experienced Craftsmanship.<br />Accountable Project Leadership.
              </h1>
              <p className="font-drama text-lg sm:text-xl text-white/85 italic max-w-2xl mx-auto leading-relaxed">
                Full-service design-build general contracting serving Cambridge, Kitchener, Waterloo, Guelph, and surrounding communities with detailed building standards.
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-sans font-bold tracking-wider uppercase text-[#CDAE72]">
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">Serving Homeowners Since 2014</span>
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">Baeumler Approved</span>
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">RenoMark Certified</span>
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">Written Warranty & Aftercare</span>
              </div>
            </div>
          </section>

          {/* RESTORED ORIGINAL COMPANY VALUES SECTION WITH MERGED COPY */}
          <section id="company-values" className="py-20 bg-white border-b border-[#0B2638]/10">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              {/* BRAND TRANSITION NOTICE (SECTION 7 OF MIGRATION BRIEF) */}
              <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-[#0B2638] text-white rounded-lg border border-[#CDAE72]/40 shadow-lg text-center space-y-3">
                <span className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.25em] uppercase block">BRAND TRANSITION NOTICE</span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
                  Carpenters On The Go is becoming Havenridge Build
                </h3>
                <p className="text-sm text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
                  Havenridge Build is the next chapter of Carpenters On The Go. Founded and led by Micheal Smith, the company has served homeowners in Waterloo Region and surrounding communities since 2014. Our new name better reflects the full-service design-build renovation company we have become, while the ownership, commitment to our clients and craftsmanship behind the company remain the same.
                </p>
              </div>

              <div className="max-w-6xl mx-auto text-center space-y-4 pt-4">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">BUILDING STANDARDS</span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638] leading-tight">
                  Professional Building Standards & Code-Compliant Construction
                </h2>
                <div className="space-y-4 text-sm sm:text-base text-[#24313A]/85 font-light leading-relaxed max-w-4xl mx-auto text-left sm:text-center">
                  <p>
                    Havenridge Build — serving homeowners since 2014 across Cambridge, Kitchener, Waterloo, Guelph, and surrounding communities with full-service design-build renovations, additions, and whole-home transformations.
                  </p>
                  <p>
                    Led by <strong>Micheal Smith</strong> with over 15 years of residential construction experience, Havenridge Build provides one accountable team to guide your renovation from initial planning and design through construction and completion. We believe a great renovation is about more than quality craftsmanship — it’s about clear communication, organized project management, realistic expectations, and making the entire experience easier for the homeowner.
                  </p>
                  <p>
                    Our clients stay informed throughout their project with regular updates and access to their project information through our online client portal. As a <strong>Baeumler Approved</strong> and <strong>RenoMark</strong> renovator, we stand behind our work with a two-year structural warranty and one-year workmanship warranty.
                  </p>
                </div>
              </div>

              {/* REVISED 4 GRID CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">01 / PRE-CONSTRUCTION</span>
                    <h3 className="font-cinzel text-base font-bold text-[#0B2638] leading-snug">DISCIPLINED PLANNING & SCOPE CLARITY</h3>
                    <p className="text-xs sm:text-sm text-[#24313A]/80 leading-relaxed">
                      Every successful residential renovation begins with clear pre-construction planning. By establishing detailed scope documents, selection schedules, and fixed permit layouts early, we eliminate mid-project surprises and budget creep.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">02 / CRAFTSMANSHIP</span>
                    <h3 className="font-cinzel text-base font-bold text-[#0B2638] leading-snug">UNCOMPROMISING QUALITY & MILLWORK</h3>
                    <p className="text-xs sm:text-sm text-[#24313A]/80 leading-relaxed">
                      From structural timber roof additions to custom white-oak cabinetry, heated bathroom floors, and quartz island installations, we hold every trade phase to exact Ontario Building Code and high-end finish standards.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">03 / ACCOUNTABILITY</span>
                    <h3 className="font-cinzel text-base font-bold text-[#0B2638] leading-snug">TRANSPARENT CLIENT PORTAL COMMUNICATION</h3>
                    <p className="text-xs sm:text-sm text-[#24313A]/80 leading-relaxed">
                      Through our Buildertrend client portal, homeowners enjoy 24/7 access to daily job logs, site photos, selection approvals, and real-time schedules. Communication is direct, documented, and proactive.
                    </p>
                  </div>
                </div>

                <div className="p-6 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">04 / RESPECT & WARRANTY</span>
                    <h3 className="font-cinzel text-base font-bold text-[#0B2638] leading-snug">CLEAN JOB SITES & WARRANTY DEFENSE</h3>
                    <p className="text-xs sm:text-sm text-[#24313A]/80 leading-relaxed">
                      We respect your sanctuary. Our teams enforce strict dust containment, daily jobsite cleanup, and courteous site management — standing behind all completed work with dedicated homeowner warranty support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RESTORED ORIGINAL 2-COLUMN TEAM MEMBERS GRID */}
          <section id="team" className="py-24 bg-[#F4F2EE]">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">LEADERSHIP & TRADES</span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Meet Our Team</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Micheal Smith */}
                <div className="space-y-6 text-left bg-white p-8 rounded-sm shadow-md border border-[#0B2638]/10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="aspect-[4/5] overflow-hidden bg-[#0B2638]/10 shadow-sm rounded-sm">
                      <img src="michael_smith.jpg" alt="Micheal Smith - Owner & General Contractor" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase block">OWNER & GENERAL CONTRACTOR</span>
                      <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">Micheal Smith</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#24313A]/80 font-light leading-relaxed">
                      Bringing a strong background in mechanical engineering, Micheal has led Havenridge Build since 2014. Originally launching his career crafting custom decks and exterior carpentry, his 12 years of technical expertise and hands-on leadership ensure that every design-build addition, structural extension, and whole-home renovation is executed with disciplined project management and elite finishing quality.
                    </p>
                  </div>
                </div>

                {/* David Woo */}
                <div className="space-y-6 text-left bg-white p-8 rounded-sm shadow-md border border-[#0B2638]/10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="aspect-[4/5] overflow-hidden bg-[#0B2638]/10 shadow-sm rounded-sm">
                      <img src="david_woo.jpg" alt="David Woo - Site Supervisor" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase block">SITE SUPERVISOR</span>
                      <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">David Woo</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#24313A]/80 font-light leading-relaxed">
                      David brings extensive on-site framing experience alongside formal construction training from Conestoga College's Pre-Apprenticeship Program. After spending two years specializing in structural framing, David joined Havenridge Build four years ago and has advanced into his vital role as Site Supervisor. Currently a second-year carpentry apprentice, his hands-on background ensures that daily jobsite activities are perfectly coordinated, strict building quality standards are maintained, and complex renovations remain flawlessly organized.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AWARDS & COMMUNITY RECOGNITION SECTION (MATCHES DESIGN MOCKUP) */}
          <section className="bg-[#F4F2EE] py-20 px-6 border-t border-[#0B2638]/10 text-center">
            <div className="max-w-6xl mx-auto space-y-10">
              <div className="space-y-3 max-w-3xl mx-auto">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">
                  RECOGNITION
                </span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638] tracking-wider leading-snug">
                  AWARDS & COMMUNITY RECOGNITION
                </h2>
              </div>

              {/* 4 WHITE CARDS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {/* Card 1 */}
                <div className="bg-white p-8 border border-[#0B2638]/10 shadow-sm flex flex-col items-center justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#B8975A]">
                    <Star className="w-5 h-5 fill-[#B8975A]" />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-center">
                    <h3 className="font-cinzel text-sm font-bold text-[#0B2638] leading-tight uppercase">
                      2025 Community Votes Winner
                    </h3>
                    <p className="text-[10px] font-sans font-bold tracking-widest text-[#24313A]/60 uppercase">
                      Cambridge
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white p-8 border border-[#0B2638]/10 shadow-sm flex flex-col items-center justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#B8975A]">
                    <Star className="w-5 h-5 fill-[#B8975A]" />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-center">
                    <h3 className="font-cinzel text-sm font-bold text-[#0B2638] leading-tight uppercase">
                      2024 Community Votes Winner
                    </h3>
                    <p className="text-[10px] font-sans font-bold tracking-widest text-[#24313A]/60 uppercase">
                      Cambridge
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white p-8 border border-[#0B2638]/10 shadow-sm flex flex-col items-center justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#B8975A]">
                    <Star className="w-5 h-5 fill-[#B8975A]" />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-center">
                    <h3 className="font-cinzel text-sm font-bold text-[#0B2638] leading-tight uppercase">
                      Readers Choice 2025 Winner
                    </h3>
                    <p className="text-[10px] font-sans font-bold tracking-widest text-[#24313A]/60 uppercase">
                      Best General Contracting Services — Waterloo Region
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="bg-white p-8 border border-[#0B2638]/10 shadow-sm flex flex-col items-center justify-between space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#B8975A]">
                    <Star className="w-5 h-5 fill-[#B8975A]" />
                  </div>
                  <div className="space-y-2 flex-1 flex flex-col justify-center">
                    <h3 className="font-cinzel text-sm font-bold text-[#0B2638] leading-tight uppercase">
                      Readers Choice 2022 Gold Winner
                    </h3>
                    <p className="text-[10px] font-sans font-bold tracking-widest text-[#24313A]/60 uppercase">
                      The Record
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WORK WITH US CAREERS SECTION */}
          <section id="work-with-us" className="py-20 bg-[#0B2638] text-white text-center">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CAREERS & TRADES</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wider">WORK WITH US</h2>
              <p className="text-white/80 text-sm font-light max-w-xl mx-auto leading-relaxed">
                Interested in working with Havenridge Build? We welcome applications from skilled carpenters, site supervisors, apprentices and qualified trade partners who value craftsmanship, communication, organization and accountability.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setIsApplyModalOpen(true)} 
                  className="inline-block bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-sans font-bold uppercase tracking-wider text-[#CDAE72] pt-1 pb-2">
              <a href="#contact-page" className="hover:text-white transition-colors">Start Your Project</a>
              <span className="text-white/30">•</span>
              <a href="#projects-page" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/30">•</span>
              <a href="#process-section" className="hover:text-white transition-colors">Our Process</a>
              <span className="text-white/30">•</span>
              <a href="#privacy-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            {/* COMPLETE 7-ICON SOCIAL MEDIA BAR */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 pb-2 text-[#CDAE72]">
              <a 
                href="https://www.facebook.com/carpentersotg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/carpentersonthego/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@havenridge.build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                title="TikTok"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/havenridgebuild/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@Havenridgebuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                title="YouTube"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.houzz.com/pro/webuser-117372779/__public" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Houzz"
                title="Houzz"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm p-1.5"
              >
                <img src="houzz.avif" className="w-full h-full object-contain" alt="Houzz" />
              </a>
              <a 
                href="https://www.yelp.ca/biz/havenridge-build-cambridge?osq=Havenridge+Build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Yelp"
                title="Yelp"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-0.5"
              >
                <img src="yelp_custom.png" className="w-full h-full object-contain rounded-full" alt="Yelp" />
              </a>
              <a 
                href="#reviews-page" 
                aria-label="Client Reviews"
                title="Verified Client Reviews"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm text-[#CDAE72] hover:text-[#0B2638] font-bold text-sm"
              >
                ★
              </a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>
      
      {renderLightbox()}

      {/* GLOBAL CAREERS POPUP MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#0B2638]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white text-[#24313A] max-w-xl w-full rounded-sm shadow-2xl overflow-hidden relative my-8">
            
            {/* MODAL HEADER */}
            <div className="bg-[#0B2638] text-white p-6 flex justify-between items-center border-b border-[#CDAE72]/20">
              <div className="flex items-center gap-4">
                <img src="logo_mark_h_only.svg" alt="Havenridge Build Logo" className="h-8 sm:h-9 w-auto object-contain" />
                <div className="border-l border-white/20 pl-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">JOIN HAVENRIDGE BUILD</span>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">Work With Us Application</h3>
                </div>
              </div>
              <button 
                onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                className="text-white/70 hover:text-[#CDAE72] text-2xl font-bold transition-colors p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 sm:p-8 space-y-6 text-left">
              {isAppliedSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#CDAE72]/20 text-[#CDAE72] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                  <h4 className="font-cinzel text-2xl font-bold text-[#0B2638]">Application Received!</h4>
                  <p className="text-sm text-[#24313A]/80 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in joining Havenridge Build. Our hiring team will review your resume and reach out to qualified candidates.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                      className="bg-[#0B2638] text-white hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all"
                    >
                      CLOSE WINDOW
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsAppliedSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Full Name *</label>
                    <input type="text" required placeholder="John Doe" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Email Address *</label>
                      <input type="email" required placeholder="john@example.com" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Phone Number *</label>
                      <input type="tel" required placeholder="(519) 555-0199" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Role / Specialty *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Position...</option>
                        <option value="lead-carpenter">Lead Carpenter</option>
                        <option value="framing">Framing Carpenter</option>
                        <option value="finish">Finish Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="project-manager">Project Manager</option>
                        <option value="architectural-interior-designer">Architectural Designer / Interior Designer</option>
                        <option value="admin-assistant">Admin / Assistant</option>
                        <option value="subcontractor">Subcontractor / Licensed Trade Partner</option>
                        <option value="general">General Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Years of Experience *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Experience...</option>
                        <option value="1-3">1 - 3 Years</option>
                        <option value="3-5">3 - 5 Years</option>
                        <option value="5+">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Upload Resume (PDF, DOC, DOCX) *</label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-[#CDAE72] p-4 text-center rounded-sm bg-gray-50 cursor-pointer relative">
                      <input 
                        type="file" 
                        required 
                        accept=".pdf,.doc,.docx" 
                        onChange={(e) => setApplicantFileName(e.target.files[0]?.name || '')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                      <p className="text-xs text-[#24313A]/70">
                        {applicantFileName ? (
                          <span className="font-bold text-[#0B2638]">{applicantFileName}</span>
                        ) : (
                          'Click or drag your resume file here to attach'
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Brief Introduction / Message</label>
                    <textarea rows="3" placeholder="Tell us about your woodworking, building experience, or background..." className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]"></textarea>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button 
                      type="button" 
                      onClick={() => setIsApplyModalOpen(false)} 
                      className="text-xs font-bold uppercase tracking-wider text-[#24313A]/70 hover:text-[#0B2638]"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit" 
                      className="bg-[#0B2638] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all shadow-md"
                    >
                      SUBMIT APPLICATION
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      </div>
    );
  }


  if (currentPath === '#blog-page') {
    return (
      <div className="bg-[#F4F2EE] text-[#24313A] font-sans antialiased min-h-screen flex flex-col justify-between">
        <div>
          {/* HEADER NAV */}
          <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md font-sans">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
              <a href="#home" className="flex items-center group">
                <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
              </a>

              {/* Nav list with dropdowns */}
              <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-white/90">
                {/* 1. Services Dropdown */}
                <div className="relative group">
                  <a href="#services" className="hover:text-[#CDAE72] transition-colors py-7 flex items-center gap-1">
                    Services <ChevronDown className="w-3 h-3 text-[#CDAE72]" />
                  </a>
                  <div className="absolute top-full left-0 bg-[#0B2638] border border-[#CDAE72]/20 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl py-2 z-50">
                    <a href="#project-additions" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Additions and ADUs</a>
                    <a href="#project-whole-home" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Whole Home Renovations</a>
                    <a href="#project-multi-unit" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Multi-Unit Conversions</a>
                    <a href="#project-accessibility" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Accessible & Aging-in-Place Renovations</a>
                  </div>
                </div>

                {/* 2. Our Process */}
                <a href="#process-section" className="hover:text-[#CDAE72] transition-colors">Our Process</a>

                {/* 3. Our Work Dropdown */}
                <div className="relative group">
                  <a href="#projects" className="hover:text-[#CDAE72] transition-colors py-7 flex items-center gap-1">
                    Our Work <ChevronDown className="w-3 h-3 text-[#CDAE72]" />
                  </a>
                  <div className="absolute top-full left-0 bg-[#0B2638] border border-[#CDAE72]/20 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl py-2 z-50">
                    <a href="#inspiration-section" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Inspiration</a>
                    <a href="#projects-page" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Projects</a>
                  </div>
                </div>

                {/* 4. About */}
                <a href="#about-page" className="hover:text-[#CDAE72] transition-colors">About</a>

                {/* 5. Contact */}
                <a href="#contact-page" className="hover:text-[#CDAE72] transition-colors">Contact</a>

                {/* 6. Blog */}
                <a href="#blog-page" className="text-[#CDAE72] font-bold border-b border-[#CDAE72] pb-0.5">Blog</a>

                {/* 7. Client Portal */}
                <a 
                  href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#CDAE72] hover:text-white transition-colors"
                >
                  Client Portal
                </a>
              </div>

              <div className="w-12 hidden md:block"></div>
            </div>
          </nav>

          {/* HERO BANNER */}
          <section className="bg-[#0B2638] text-white py-20 px-6 text-center border-b border-[#CDAE72]/20">
            <div className="max-w-4xl mx-auto space-y-4">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">INSIGHTS & JOURNAL</span>
              <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wider text-white">Renovation Guides & Trends</h1>
              <p className="text-sm font-light text-white/80 max-w-2xl mx-auto leading-relaxed">
                Expert advice on residential construction, municipal permits, custom millwork, and luxury interior design across Kitchener, Waterloo, Cambridge & Guelph.
              </p>
            </div>
          </section>

          {/* BLOG POSTS GRID */}
          <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div 
                  key={post.id} 
                  onClick={() => setSelectedBlogArticle(post)}
                  className="bg-white border border-[#0B2638]/10 shadow-sm flex flex-col justify-between overflow-hidden cursor-pointer group hover:shadow-xl hover:border-[#CDAE72]/50 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.img} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-4 left-4 bg-[#0B2638] text-[#CDAE72] text-[10px] font-sans font-bold px-3 py-1 uppercase tracking-widest shadow-md">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] text-[#CDAE72] font-semibold">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="font-cinzel text-lg font-bold text-[#0B2638] group-hover:text-[#CDAE72] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#24313A]/80 font-light leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#0B2638]/10 flex items-center justify-between text-xs font-bold text-[#0B2638] group-hover:text-[#CDAE72]">
                      <span>READ FULL ARTICLE</span>
                      <span>→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ARTICLE READER MODAL */}
        {selectedBlogArticle && (
          <div className="fixed inset-0 z-50 bg-[#061622]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="bg-white max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#CDAE72]/30 shadow-2xl space-y-6 p-6 sm:p-8 relative">
              <button 
                onClick={() => setSelectedBlogArticle(null)}
                className="absolute top-6 right-6 text-[#0B2638] hover:text-[#CDAE72] font-bold text-xl"
              >
                ✕
              </button>

              <div className="space-y-3">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase block">{selectedBlogArticle.category}</span>
                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#0B2638]">{selectedBlogArticle.title}</h2>
                <p className="text-xs text-[#CDAE72] font-bold">{selectedBlogArticle.subtitle}</p>
                <div className="flex items-center gap-4 text-xs text-[#24313A]/70 border-b border-[#0B2638]/10 pb-4">
                  <span>By {selectedBlogArticle.author}</span>
                  <span>•</span>
                  <span>{selectedBlogArticle.date}</span>
                  <span>•</span>
                  <span>{selectedBlogArticle.readTime}</span>
                </div>
              </div>

              <img src={selectedBlogArticle.img} alt={selectedBlogArticle.title} className="w-full h-72 object-cover border border-[#0B2638]/10 shadow-md" />

              <div className="space-y-4 text-xs sm:text-sm font-light text-[#24313A]/90 leading-relaxed">
                {(selectedBlogArticle?.content || []).map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-[#0B2638]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <a 
                  href="#contact-page" 
                  onClick={() => setSelectedBlogArticle(null)}
                  className="w-full sm:w-auto bg-[#0B2638] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all text-center shadow-md"
                >
                  Book a Consultation for Your Project
                </a>
                <button 
                  onClick={() => setSelectedBlogArticle(null)}
                  className="text-xs font-bold text-[#0B2638] hover:text-[#CDAE72] uppercase tracking-wider"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
                  {/* WORK WITH US CAREERS SECTION */}
          <section id="work-with-us" className="py-20 bg-[#0B2638] text-white text-center">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CAREERS & TRADES</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wider">WORK WITH US</h2>
              <p className="text-white/80 text-sm font-light max-w-xl mx-auto leading-relaxed">
                Interested in working with Havenridge Build? We welcome applications from skilled carpenters, site supervisors, apprentices and qualified trade partners who value craftsmanship, communication, organization and accountability.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setIsApplyModalOpen(true)} 
                  className="inline-block bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </section>

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-sans font-bold uppercase tracking-wider text-[#CDAE72] pt-1 pb-2">
              <a href="#contact-page" className="hover:text-white transition-colors">Start Your Project</a>
              <span className="text-white/30">•</span>
              <a href="#projects-page" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/30">•</span>
              <a href="#process-section" className="hover:text-white transition-colors">Our Process</a>
              <span className="text-white/30">•</span>
              <a href="#privacy-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            {/* COMPLETE 7-ICON SOCIAL MEDIA BAR */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 pb-2 text-[#CDAE72]">
              <a 
                href="https://www.facebook.com/carpentersotg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/carpentersonthego/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@havenridge.build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                title="TikTok"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/havenridgebuild/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@Havenridgebuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                title="YouTube"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.houzz.com/pro/webuser-117372779/__public" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Houzz"
                title="Houzz"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm p-1.5"
              >
                <img src="houzz.avif" className="w-full h-full object-contain" alt="Houzz" />
              </a>
              <a 
                href="https://www.yelp.ca/biz/havenridge-build-cambridge?osq=Havenridge+Build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Yelp"
                title="Yelp"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-0.5"
              >
                <img src="yelp_custom.png" className="w-full h-full object-contain rounded-full" alt="Yelp" />
              </a>
              <a 
                href="#reviews-page" 
                aria-label="Client Reviews"
                title="Verified Client Reviews"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm text-[#CDAE72] hover:text-[#0B2638] font-bold text-sm"
              >
                ★
              </a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>
      
      {renderLightbox()}

      {/* GLOBAL CAREERS POPUP MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#0B2638]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white text-[#24313A] max-w-xl w-full rounded-sm shadow-2xl overflow-hidden relative my-8">
            
            {/* MODAL HEADER */}
            <div className="bg-[#0B2638] text-white p-6 flex justify-between items-center border-b border-[#CDAE72]/20">
              <div className="flex items-center gap-4">
                <img src="logo_mark_h_only.svg" alt="Havenridge Build Logo" className="h-8 sm:h-9 w-auto object-contain" />
                <div className="border-l border-white/20 pl-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">JOIN HAVENRIDGE BUILD</span>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">Work With Us Application</h3>
                </div>
              </div>
              <button 
                onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                className="text-white/70 hover:text-[#CDAE72] text-2xl font-bold transition-colors p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 sm:p-8 space-y-6 text-left">
              {isAppliedSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#CDAE72]/20 text-[#CDAE72] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                  <h4 className="font-cinzel text-2xl font-bold text-[#0B2638]">Application Received!</h4>
                  <p className="text-sm text-[#24313A]/80 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in joining Havenridge Build. Our hiring team will review your resume and reach out to qualified candidates.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                      className="bg-[#0B2638] text-white hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all"
                    >
                      CLOSE WINDOW
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsAppliedSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Full Name *</label>
                    <input type="text" required placeholder="John Doe" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Email Address *</label>
                      <input type="email" required placeholder="john@example.com" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Phone Number *</label>
                      <input type="tel" required placeholder="(519) 555-0199" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Role / Specialty *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Position...</option>
                        <option value="lead-carpenter">Lead Carpenter</option>
                        <option value="framing">Framing Carpenter</option>
                        <option value="finish">Finish Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="project-manager">Project Manager</option>
                        <option value="architectural-interior-designer">Architectural Designer / Interior Designer</option>
                        <option value="admin-assistant">Admin / Assistant</option>
                        <option value="subcontractor">Subcontractor / Licensed Trade Partner</option>
                        <option value="general">General Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Years of Experience *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Experience...</option>
                        <option value="1-3">1 - 3 Years</option>
                        <option value="3-5">3 - 5 Years</option>
                        <option value="5+">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Upload Resume (PDF, DOC, DOCX) *</label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-[#CDAE72] p-4 text-center rounded-sm bg-gray-50 cursor-pointer relative">
                      <input 
                        type="file" 
                        required 
                        accept=".pdf,.doc,.docx" 
                        onChange={(e) => setApplicantFileName(e.target.files[0]?.name || '')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                      <p className="text-xs text-[#24313A]/70">
                        {applicantFileName ? (
                          <span className="font-bold text-[#0B2638]">{applicantFileName}</span>
                        ) : (
                          'Click or drag your resume file here to attach'
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Brief Introduction / Message</label>
                    <textarea rows="3" placeholder="Tell us about your woodworking, building experience, or background..." className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]"></textarea>
                  </div>

                  <div className="pt-2 flex justify-between items-center">
                    <button 
                      type="button" 
                      onClick={() => setIsApplyModalOpen(false)} 
                      className="text-xs font-bold uppercase tracking-wider text-[#24313A]/70 hover:text-[#0B2638]"
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit" 
                      className="bg-[#0B2638] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all shadow-md"
                    >
                      SUBMIT APPLICATION
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      </div>
    );
  }


  if (currentPath === '#contact-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        
        {/* NAV HEADER */}
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <div className="flex items-center gap-4">
              <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> BACK TO HOME
              </a>
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#CDAE72] hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* MOBILE NAVIGATION DRAWER */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0B2638] z-50 overflow-y-auto border-t border-[#CDAE72]/20 flex flex-col justify-between p-6">
              <div className="space-y-6">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block">SERVICES & SHOWCASES</span>
                  <div className="grid grid-cols-1 gap-2.5 pt-1 text-sm font-semibold">
                    <a href="#project-additions" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Additions and ADUs</a>
                    <a href="#project-whole-home" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Whole Home Renovations</a>
                    <a href="#project-multi-unit" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Multi-Unit Conversions</a>
                    <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Aging-in-Place Renovations</a>
                    <a href="#project-kitchens" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Kitchen Renovations</a>
                    <a href="#project-bathrooms" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Bathroom Retreats</a>
                    <a href="#project-basements" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Basement Suites</a>
                    <a href="#project-millwork" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Custom Millwork</a>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-bold font-cinzel tracking-wider uppercase border-b border-white/10 pb-6">
                  <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Home</a>
                  <a href="#process-section" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Process</a>
                  <a href="#projects-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Work & Projects</a>
                  <a href="#about-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">About Us</a>
                  <a href="#blog-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Renovation Blog</a>
                  <a href="#contact-page" onClick={() => setMobileMenuOpen(false)} className="block text-[#CDAE72] hover:text-white transition-colors">Contact Us</a>
                </div>

                <div>
                  <a 
                    href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block w-full text-center bg-[#CDAE72] text-[#0B2638] font-bold py-3.5 text-xs font-sans tracking-widest uppercase rounded-sm shadow-md"
                  >
                    Client Portal Access
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 text-center space-y-1 text-xs text-white/70">
                <p className="font-semibold text-white">Havenridge Build | Cambridge & Waterloo Region</p>
                <p><a href="tel:5196350963" className="text-[#CDAE72] font-bold underline">519-635-0963</a> | Info@HavenridgeBuild.com</p>
              </div>
            </div>
          )}
        </nav>

        {/* HERO SECTION MATCHING SPEC & MOCKUP */}
        <section className="relative bg-[#0B2638] text-white py-20 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.3em] uppercase block">HAVENRIDGE BUILD</span>
            <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wider text-white">START YOUR PROJECT</h1>
            <p className="text-sm sm:text-base font-light text-white/85 max-w-2xl mx-auto leading-relaxed">
              Tell us about your home, your goals and where you are in the planning process.<br className="hidden sm:inline" />
              We review every inquiry before arranging an initial phone consultation.
            </p>
          </div>
        </section>

        {/* CONTACT & QUALIFICATION FORM SECTION */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT SIDEBAR: CONTACT INFO & INVESTMENT GUIDELINES (4 COLS) */}
            <div className="lg:col-span-4 space-y-8">
              <div className="space-y-3">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase">CONTACT INFO</span>
                <h2 className="font-cinzel text-3xl font-bold text-[#0B2638]">HAVENRIDGE BUILD</h2>
                <div className="h-1 w-12 bg-[#CDAE72]"></div>
              </div>
              
              <div className="space-y-4 text-sm leading-relaxed text-[#24313A]/80 font-sans border-b border-[#0B2638]/10 pb-6">
                <p className="flex items-center gap-3">
                  <span className="font-bold text-[#0B2638] min-w-[70px]">Office</span>
                  <a href="tel:5196350963" className="text-[#0B2638] font-bold hover:text-[#CDAE72] transition-colors">(519) 635-0963</a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-bold text-[#0B2638] min-w-[70px]">Email</span>
                  <a href="mailto:Info@HavenridgeBuild.com" className="text-[#0B2638] font-bold hover:text-[#CDAE72] transition-colors">Info@HavenridgeBuild.com</a>
                </p>
                <div className="pt-2">
                  <span className="font-bold text-[#0B2638] block mb-1">Service area</span>
                  <p className="text-xs text-[#24313A]/80">Cambridge · Kitchener · Waterloo · Guelph</p>
                </div>
              </div>

              {/* PROJECT INVESTMENT NOTICE */}
              <div className="space-y-2 border-b border-[#0B2638]/10 pb-6">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#0B2638]">PROJECT INVESTMENT</h3>
                <p className="text-xs text-[#24313A]/80 leading-relaxed font-light">
                  Havenridge Build specializes in professionally planned and managed design-build renovations and additions, with projects generally starting at $20,000.
                </p>
              </div>

              {/* WHAT HAPPENS NEXT CARD MATCHING MOCKUP */}
              <div className="bg-[#F4F2EE] p-6 rounded-sm space-y-4 border-l-4 border-[#0B2638]">
                <h3 className="font-sans text-xs font-bold uppercase tracking-wider text-[#0B2638]">WHAT HAPPENS NEXT</h3>
                <ol className="space-y-3 text-xs text-[#24313A]/85 font-light">
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0B2638] text-white flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                    <span>We review your project details.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0B2638] text-white flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                    <span>We confirm fit, location and timing.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#0B2638] text-white flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                    <span>If the project appears to be a good fit, we'll contact you to arrange an initial phone consultation.</span>
                  </li>
                </ol>
              </div>
            </div>

            {/* RIGHT COLUMN: MULTI-STEP QUALIFICATION FORM (8 COLS) */}
            <div className="lg:col-span-8 bg-[#F4F2EE] p-6 sm:p-10 border border-[#0B2638]/10 rounded-sm shadow-sm">
              {formSubmitted ? (
                <div className="py-12 space-y-6 text-center">
                  {formQualified ? (
                    <div className="space-y-6 max-w-xl mx-auto text-left bg-white p-6 sm:p-8 rounded-sm shadow-md border border-[#CDAE72]/30">
                      <div className="text-center space-y-2">
                        <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
                        <span className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase block">INQUIRY RECEIVED</span>
                        <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">Project Inquiry Received</h3>
                      </div>

                      <div className="space-y-4 text-xs sm:text-sm text-[#24313A]/90 font-light leading-relaxed border-t border-b border-[#0B2638]/10 py-5">
                        <p className="font-semibold text-[#0B2638] text-center sm:text-left">
                          What happens next (Initial Review & Consultation Process):
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#0B2638] text-[#CDAE72] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                            <div>
                              <strong className="text-[#0B2638] block font-semibold">Initial Scope & Feasibility Review (1–2 Business Days)</strong>
                              <span>Micheal Smith and our team review your project details, location, zoning requirements, and target timeline to confirm alignment.</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#0B2638] text-[#CDAE72] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                            <div>
                              <strong className="text-[#0B2638] block font-semibold">Initial Phone Discovery Call (15–20 Mins)</strong>
                              <span>If your project aligns with our service capacity, we will reach out via phone/email to schedule an initial consultation to discuss your vision, preliminary budget expectations, and process.</span>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-[#0B2638] text-[#CDAE72] font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                            <div>
                              <strong className="text-[#0B2638] block font-semibold">On-Site Consultation & Scope Scoping</strong>
                              <span>Following a successful initial phone call, we arrange an on-site consultation to inspect structural conditions, discuss design goals, and outline pre-construction planning.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-[#24313A]/70 text-center italic">
                        Need immediate assistance? Call us directly at <a href="tel:5196350963" className="font-bold text-[#0B2638] underline hover:text-[#CDAE72]">519-635-0963</a>.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-w-lg mx-auto">
                      <CheckCircle2 className="w-16 h-16 text-[#CDAE72] mx-auto" />
                      <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">Thank You For Reaching Out</h3>
                      <p className="text-sm text-[#24313A]/90 leading-relaxed font-light">
                        Thank you for considering Havenridge Build. We currently focus on professionally managed renovation projects with construction investments beginning around $20,000. Based on the information provided, your project may be below our present service range. We appreciate the opportunity and wish you the best with your project.
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <button 
                      onClick={() => { setFormSubmitted(false); setFormStep(1); }} 
                      className="text-xs font-bold uppercase tracking-widest text-[#0B2638] underline hover:text-[#CDAE72]"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="space-y-8">
                  
                  {/* FORM HEADER & PROGRESS BAR */}
                  <div className="space-y-4 border-b border-[#0B2638]/10 pb-6">
                    <h3 className="font-cinzel text-2xl font-bold text-[#0B2638] uppercase tracking-wider">TELL US ABOUT YOUR PROJECT</h3>
                    
                    <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase text-[#0B2638]/70">
                      <span>STEP {formStep} OF 3 · {formStep === 1 ? 'CONTACT & LOCATION' : formStep === 2 ? 'INVESTMENT AND TIMING' : 'PROJECT DETAILS'}</span>
                    </div>

                    {/* SEGMENTED PROGRESS BARS MATCHING MOCKUP */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className={`h-1.5 rounded-full transition-colors ${formStep >= 1 ? 'bg-[#0B2638]' : 'bg-gray-300'}`}></div>
                      <div className={`h-1.5 rounded-full transition-colors ${formStep >= 2 ? 'bg-[#0B2638]' : 'bg-gray-300'}`}></div>
                      <div className={`h-1.5 rounded-full transition-colors ${formStep >= 3 ? 'bg-[#0B2638]' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>

                  {/* STEP 1: CONTACT & LOCATION */}
                  {formStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">First Name *</label>
                          <input 
                            type="text" 
                            required 
                            value={formFirstName}
                            onChange={(e) => setFormFirstName(e.target.value)}
                            placeholder="John" 
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Last Name *</label>
                          <input 
                            type="text" 
                            required 
                            value={formLastName}
                            onChange={(e) => setFormLastName(e.target.value)}
                            placeholder="Smith" 
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white" 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Email Address *</label>
                          <input 
                            type="email" 
                            required 
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="john@example.com" 
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Phone Number *</label>
                          <input 
                            type="tel" 
                            required 
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            placeholder="(519) 000-0000" 
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white" 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Project Address *</label>
                        <input 
                          type="text" 
                          required 
                          value={formAddress}
                          onChange={(e) => setFormAddress(e.target.value)}
                          placeholder="Street address of the property to be renovated" 
                          className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white" 
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Project City *</label>
                          <select 
                            required 
                            value={formCity} 
                            onChange={(e) => setFormCity(e.target.value)}
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white"
                          >
                            <option value="Cambridge">Cambridge</option>
                            <option value="Kitchener">Kitchener</option>
                            <option value="Waterloo">Waterloo</option>
                            <option value="Guelph">Guelph</option>
                            <option value="Other">Other Surrounding Area</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Postal Code *</label>
                          <input 
                            type="text" 
                            required 
                            value={formPostalCode}
                            onChange={(e) => setFormPostalCode(e.target.value)}
                            placeholder="N2H 2B5" 
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white" 
                          />
                        </div>
                      </div>

                      <div className="pt-4 text-right">
                        <button 
                          type="button" 
                          onClick={() => {
                            if (formFirstName && formLastName && formEmail && formPhone && formAddress && formPostalCode) {
                              setFormStep(2);
                            } else {
                              alert('Please complete all required contact fields before continuing.');
                            }
                          }}
                          className="bg-[#0B2638] text-white hover:bg-[#17365D] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
                        >
                          CONTINUE →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: INVESTMENT AND TIMING MATCHING SCREENSHOT */}
                  {formStep === 2 && (
                    <div className="space-y-6">
                      
                      {/* PLANNED CONSTRUCTION INVESTMENT DROPDOWN & PILLS */}
                      <div className="space-y-3">
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638]">PLANNED CONSTRUCTION INVESTMENT *</label>
                        <select 
                          required 
                          value={formInvestment} 
                          onChange={(e) => setFormInvestment(e.target.value)}
                          className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white font-medium"
                        >
                          <option value="Under $20,000">Under $20,000</option>
                          <option value="$20,000–$49,999">$20,000–$49,999</option>
                          <option value="$50,000–$99,999">$50,000–$99,999</option>
                          <option value="$100,000–$249,999">$100,000–$249,999</option>
                          <option value="$250,000–$499,999">$250,000–$499,999</option>
                          <option value="$500,000+">$500,000+</option>
                          <option value="Not sure—need guidance">Not sure—need guidance</option>
                        </select>

                        <div className="pt-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#0B2638]/70 block mb-2">AVAILABLE INVESTMENT RANGES</span>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              'Under $20,000',
                              '$20,000–$49,999',
                              '$50,000–$99,999',
                              '$100,000–$249,999',
                              '$250,000–$499,999',
                              '$500,000+'
                            ].map((rng) => (
                              <button
                                key={rng}
                                type="button"
                                onClick={() => setFormInvestment(rng)}
                                className={`py-3 px-4 text-xs font-medium rounded-full border transition-all text-center ${
                                  formInvestment === rng
                                    ? 'bg-[#0B2638] text-white border-[#0B2638] shadow-sm font-bold'
                                    : 'bg-white/80 text-[#0B2638] border-gray-200 hover:border-[#0B2638]'
                                }`}
                              >
                                {rng}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* DESIGN AND PLANS STATUS */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">DESIGN AND PLANS STATUS *</label>
                        <select 
                          required 
                          value={formDesignStatus} 
                          onChange={(e) => setFormDesignStatus(e.target.value)}
                          className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white font-medium"
                        >
                          <option value="I need Havenridge to provide or coordinate design">I need Havenridge to provide or coordinate design</option>
                          <option value="I have a designer/architect and preliminary plans">I have a designer/architect and preliminary plans</option>
                          <option value="I have permit-ready plans">I have permit-ready plans</option>
                          <option value="Permits submitted/approved">Permits submitted/approved</option>
                          <option value="Not sure—need guidance">Not sure—need guidance</option>
                        </select>
                      </div>

                      {/* START TIMING */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">CONSTRUCTION START TIMING *</label>
                          <select 
                            required 
                            value={formTiming} 
                            onChange={(e) => setFormTiming(e.target.value)}
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white"
                          >
                            <option value="0–3 months">0 – 3 months</option>
                            <option value="3–6 months">3 – 6 months</option>
                            <option value="6–12 months">6 – 12 months</option>
                            <option value="12–24 months">12 – 24 months</option>
                            <option value="Flexible/not sure">Flexible / not sure</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">DECISION-MAKERS ALIGNED? *</label>
                          <select 
                            required 
                            value={formDecisionMakers} 
                            onChange={(e) => setFormDecisionMakers(e.target.value)}
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white"
                          >
                            <option value="Yes, all decision-makers are aligned">Yes, all decision-makers are aligned</option>
                            <option value="Not yet">Not yet</option>
                            <option value="I am the sole decision-maker">I am the sole decision-maker</option>
                          </select>
                        </div>
                      </div>

                      <div className="pt-4 flex justify-between items-center">
                        <button 
                          type="button" 
                          onClick={() => setFormStep(1)}
                          className="text-xs font-bold uppercase tracking-wider text-[#0B2638] hover:underline"
                        >
                          ← BACK
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setFormStep(3)}
                          className="bg-[#0B2638] text-white hover:bg-[#17365D] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer"
                        >
                          CONTINUE →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: PROJECT DETAILS & CONSENT */}
                  {formStep === 3 && (
                    <div className="space-y-6">
                      
                      {/* MULTI-SELECT PROJECT TYPES */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-2">WHAT TYPE OF PROJECT ARE YOU PLANNING? *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            'Kitchen',
                            'Bathroom',
                            'Basement',
                            'Whole-home',
                            'Addition',
                            'ADU / In-Law Suite',
                            'Multi-Unit Conversion',
                            'Accessible & Aging-in-Place Renovations',
                            'Design Only',
                            'Other'
                          ].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => toggleProjectType(t)}
                              className={`py-2.5 px-3 text-xs font-bold rounded-sm border transition-all text-center ${
                                formProjectTypes.includes(t)
                                  ? 'bg-[#0B2638] text-white border-[#0B2638]'
                                  : 'bg-white text-[#0B2638] border-gray-300 hover:border-[#0B2638]'
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* PROJECT DESCRIPTION */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">PROJECT DESCRIPTION & GOALS *</label>
                        <textarea 
                          required 
                          rows="4" 
                          value={formDescription}
                          onChange={(e) => setFormDescription(e.target.value)}
                          placeholder="What would you like to change, what problems should the project solve, and what result are you hoping to achieve?" 
                          className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">HOME OCCUPIED DURING BUILD?</label>
                          <select 
                            value={formHomeOccupied} 
                            onChange={(e) => setFormHomeOccupied(e.target.value)}
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white"
                          >
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Not sure">Not sure</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">HOW DID YOU HEAR ABOUT US? *</label>
                          <select 
                            required 
                            value={formSource} 
                            onChange={(e) => setFormSource(e.target.value)}
                            className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white"
                          >
                            <option value="Referral">Referral</option>
                            <option value="Google">Google Search</option>
                            <option value="Social media">Social Media</option>
                            <option value="Sign/vehicle">Sign / Job Site Vehicle</option>
                            <option value="Baeumler Approved">Baeumler Approved</option>
                            <option value="RenoMark">RenoMark</option>
                            <option value="Chamber">Chamber of Commerce</option>
                            <option value="Returning client">Returning Client</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {/* UPLOAD FILE ATTACHMENT */}
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">UPLOAD PHOTOS, SKETCHES OR PLANS (OPTIONAL)</label>
                        <div className="border-2 border-dashed border-gray-300 hover:border-[#0B2638] p-4 text-center rounded-sm bg-white cursor-pointer relative">
                          <input 
                            type="file" 
                            accept=".jpg,.jpeg,.png,.pdf" 
                            onChange={(e) => setFormUploadedFile(e.target.files[0]?.name || '')}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                          />
                          <p className="text-xs text-[#24313A]/70">
                            {formUploadedFile ? (
                              <span className="font-bold text-[#0B2638]">{formUploadedFile}</span>
                            ) : (
                              'Click or drag photos, sketches or drawing PDFs here to upload (max 10MB)'
                            )}
                          </p>
                        </div>
                      </div>

                      {/* CONSENT CHECKBOX & PRIVACY ACKNOWLEDGEMENT */}
                      <div className="space-y-3 pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            required 
                            checked={formConsent} 
                            onChange={(e) => setFormConsent(e.target.checked)}
                            className="mt-1 h-4 w-4 text-[#0B2638] focus:ring-[#CDAE72] border-gray-300 rounded" 
                          />
                          <span className="text-xs text-[#24313A]/80 leading-relaxed font-light">
                            I agree to allow Havenridge Build to contact me regarding my project inquiry in accordance with the <a href="#privacy-page" className="text-[#0B2638] font-bold underline hover:text-[#CDAE72]">Privacy Policy</a>.
                          </span>
                        </label>
                      </div>

                      <div className="pt-4 flex justify-between items-center">
                        <button 
                          type="button" 
                          onClick={() => setFormStep(2)}
                          className="text-xs font-bold uppercase tracking-wider text-[#0B2638] hover:underline"
                        >
                          ← BACK
                        </button>
                        <div className="flex flex-col items-end space-y-2">
                          <button 
                            type="submit" 
                            className="bg-[#0B2638] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                          >
                            SUBMIT YOUR PROJECT →
                          </button>
                          <p className="text-[11px] text-[#24313A]/70 font-light text-right leading-relaxed max-w-sm">
                            By submitting this form, you agree that Havenridge Build may contact you regarding your project inquiry. We respect your privacy and do not sell your information.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                </form>
              )}
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-sans font-bold uppercase tracking-wider text-[#CDAE72] pt-1 pb-2">
              <a href="#contact-page" className="hover:text-white transition-colors">Start Your Project</a>
              <span className="text-white/30">•</span>
              <a href="#projects-page" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/30">•</span>
              <a href="#process-section" className="hover:text-white transition-colors">Our Process</a>
              <span className="text-white/30">•</span>
              <a href="#privacy-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            {/* COMPLETE 7-ICON SOCIAL MEDIA BAR */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 pb-2 text-[#CDAE72]">
              <a 
                href="https://www.facebook.com/carpentersotg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/carpentersonthego/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@havenridge.build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                title="TikTok"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/havenridgebuild/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@Havenridgebuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                title="YouTube"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.houzz.com/pro/webuser-117372779/__public" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Houzz"
                title="Houzz"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm p-1.5"
              >
                <img src="houzz.avif" className="w-full h-full object-contain" alt="Houzz" />
              </a>
              <a 
                href="https://www.yelp.ca/biz/havenridge-build-cambridge?osq=Havenridge+Build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Yelp"
                title="Yelp"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-0.5"
              >
                <img src="yelp_custom.png" className="w-full h-full object-contain rounded-full" alt="Yelp" />
              </a>
              <a 
                href="#reviews-page" 
                aria-label="Client Reviews"
                title="Verified Client Reviews"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm text-[#CDAE72] hover:text-[#0B2638] font-bold text-sm"
              >
                ★
              </a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>

      </div>
    );
  }  // Home Page View
  return (
    <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
      
{/* TOP ANNOUNCEMENT BAR REMOVED */}

      {/* MAIN NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md font-sans">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#home" className="flex items-center group">
            <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
          </a>

          {/* Nav list with dropdowns */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-bold tracking-widest uppercase text-white/90">
            {/* 1. Services Dropdown */}
            <div className="relative group">
              <a href="#services" className="hover:text-[#CDAE72] transition-colors py-7 flex items-center gap-1">
                Services <ChevronDown className="w-3 h-3 text-[#CDAE72]" />
              </a>
              <div className="absolute top-full left-0 bg-[#0B2638] border border-[#CDAE72]/20 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl py-2 z-50">
                <a href="#project-additions" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Additions and ADUs</a>
                <a href="#project-whole-home" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Whole Home Renovations</a>
                <a href="#project-multi-unit" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Multi-Unit Conversions</a>
                <a href="#project-accessibility" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Accessible & Aging-in-Place Renovations</a>
              </div>
            </div>

            {/* 2. Our Process */}
            <a href="#process-section" className="hover:text-[#CDAE72] transition-colors">Our Process</a>

            {/* 3. Our Work Dropdown */}
            <div className="relative group">
              <a href="#projects" className="hover:text-[#CDAE72] transition-colors py-7 flex items-center gap-1">
                Our Work <ChevronDown className="w-3 h-3 text-[#CDAE72]" />
              </a>
              <div className="absolute top-full left-0 bg-[#0B2638] border border-[#CDAE72]/20 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl py-2 z-50">
                <a href="#inspiration-section" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Inspiration</a>
                <a href="#projects-page" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Projects</a>
              </div>
            </div>

            {/* 4. About */}
            <a href="#about-page" className="hover:text-[#CDAE72] transition-colors">About</a>

            {/* 5. Contact */}
            <a href="#contact-page" className="hover:text-[#CDAE72] transition-colors">Contact</a>

            {/* 6. Blog */}
            <a href="#blog-page" className="hover:text-[#CDAE72] transition-colors">Blog</a>

            {/* 6. Client Portal */}
            <a 
              href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#CDAE72] hover:text-white transition-colors"
            >
              Client Portal
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#CDAE72] hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          <div className="w-12 hidden md:block"></div>
        </div>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0B2638] z-50 overflow-y-auto border-t border-[#CDAE72]/20 flex flex-col justify-between p-6">
            <div className="space-y-6">
              <div className="space-y-2 border-b border-white/10 pb-4">
                <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block">SERVICES & SHOWCASES</span>
                <div className="grid grid-cols-1 gap-2.5 pt-1 text-sm font-semibold">
                  <a href="#project-additions" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Additions and ADUs</a>
                  <a href="#project-whole-home" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Whole Home Renovations</a>
                  <a href="#project-multi-unit" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Multi-Unit Conversions</a>
                  <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Aging-in-Place Renovations</a>
                  <a href="#project-kitchens" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Kitchen Renovations</a>
                  <a href="#project-bathrooms" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Bathroom Retreats</a>
                  <a href="#project-basements" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Basement Suites</a>
                  <a href="#project-millwork" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Custom Millwork</a>
                </div>
              </div>

              <div className="space-y-4 text-sm font-bold font-cinzel tracking-wider uppercase border-b border-white/10 pb-6">
                <a href="#process-section" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Process</a>
                <a href="#projects-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Our Work & Projects</a>
                <a href="#about-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">About Us</a>
                <a href="#blog-page" onClick={() => setMobileMenuOpen(false)} className="block text-white hover:text-[#CDAE72] transition-colors">Renovation Blog</a>
                <a href="#contact-page" onClick={() => setMobileMenuOpen(false)} className="block text-[#CDAE72] hover:text-white transition-colors">Contact Us</a>
              </div>

              <div>
                <a 
                  href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full text-center bg-[#CDAE72] text-[#0B2638] font-bold py-3.5 text-xs font-sans tracking-widest uppercase rounded-sm shadow-md"
                >
                  Client Portal Access
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-center space-y-1 text-xs text-white/70">
              <p className="font-semibold text-white">Havenridge Build | Cambridge & Waterloo Region</p>
              <p><a href="tel:5196350963" className="text-[#CDAE72] font-bold underline">519-635-0963</a> | Info@HavenridgeBuild.com</p>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative bg-[#0B2638] text-white min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-end pb-16 sm:pb-24 md:pb-28 overflow-hidden">
        {/* Background Image Slideshow */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt="Havenridge Custom Projects"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                idx === heroIndex ? 'opacity-80 z-10' : 'opacity-0 z-0'
              }`}
            />
          ))}
        </div>

        {/* Subtle Dark Gradient Overlay for Maximum Text Contrast & Legibility */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B2638]/75 via-[#0B2638]/40 to-[#0B2638]/10 pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-left">
          <div className="max-w-3xl">
            <h1 className="cass-hero-fade font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.2] text-white mb-4 drop-shadow-lg">
              Professionally Planned Renovations, Built to Last
            </h1>

            <p className="cass-hero-fade text-sm sm:text-base md:text-lg font-light text-white mb-8 max-w-2xl leading-relaxed drop-shadow-md">
              Havenridge Build provides design-build renovations, additions and custom residential construction with clear planning, accountable project management and quality craftsmanship.
            </p>

            <div className="cass-hero-fade">
              <a href="#contact-page" className="bg-[#CDAE72] text-[#0B2638] font-bold px-10 py-4 text-xs font-sans tracking-widest uppercase hover:bg-white transition-all shadow-lg">
                START YOUR PROJECT
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PILLARS */}
      <section id="services" className="scroll-mt-28 py-24 bg-[#F4F2EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 cass-reveal text-center">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block mb-2">SERVICES</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Design-Build Renovation Services for Waterloo Region and Guelph</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicePillars.map((s, idx) => (
              <a 
                key={idx} 
                href={s.hash} 
                className="cass-reveal flex flex-col items-center text-center space-y-4 group cursor-pointer block no-underline text-inherit"
              >
                <div className="flex flex-col justify-end w-full min-h-[120px] px-2 mb-2 space-y-2">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#0B2638] tracking-wide leading-snug text-center group-hover:text-[#CDAE72] transition-colors flex items-center justify-center min-h-[48px]">{s.title}</h3>
                  <p className="text-xs text-[#24313A]/80 font-normal leading-relaxed text-center flex items-start justify-center min-h-[60px]">{s.headline}</p>
                </div>
                
                <div className="relative w-full aspect-[2/3] overflow-hidden cursor-pointer shadow-md">
                  <img 
                    src={s.img} 
                    alt={s.title} 
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${s.title.toUpperCase().includes('ADDITIONS') ? 'object-left' : ''}`} 
                  />
                  <div className="absolute inset-0 bg-[#0B2638]/85 flex flex-col justify-center items-center p-8 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm sm:text-base md:text-lg text-white leading-relaxed font-normal max-w-xs">
                      {s.desc}
                    </p>
                    <span 
                      className="flex items-center justify-center space-x-4 text-xs font-sans tracking-widest text-[#CDAE72] uppercase mt-10 group-hover:text-white transition-colors"
                    >
                      <span className="w-12 h-px bg-[#CDAE72]/50"></span>
                      <span>VIEW PROJECT DETAILS</span>
                      <span className="w-12 h-px bg-[#CDAE72]/50"></span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CASS-STYLE BRAND INTERSTITIAL */}
      <section className="relative py-28 bg-[#0B2638] text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1600" 
            alt="Atmosphere" 
            className="w-full h-full object-cover opacity-15"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 cass-reveal">
          <h2 className="font-cinzel text-2xl sm:text-4xl text-[#CDAE72] font-bold tracking-wider leading-relaxed">
            Thoughtfully planned. Carefully built.<br className="hidden sm:block" /> Made to feel like home.
          </h2>
        </div>
      </section>


                  



                  {/* THE HAVENRIDGE PROCESS SECTION */}
      <section id="process-section" className="scroll-mt-28 py-20 sm:py-24 bg-[#F4F2EE] font-sans text-[#24313A] border-t border-[#0B2638]/10">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          
          {/* SECTION HEADER WITH 2-LINE TITLE */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">THE HAVENRIDGE PROCESS</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B2638] leading-tight">
              A Better Renovation Experience<br className="hidden sm:block" /> From Start To Finish
            </h2>
            <div className="w-24 h-0.5 bg-[#CDAE72]/60 mx-auto my-3"></div>
            <p className="text-sm sm:text-base font-light text-[#24313A]/80 leading-relaxed max-w-2xl mx-auto">
              Our five-step design-build process establishes the scope, design, selections, pricing and schedule before construction begins, then keeps you informed through the Buildern client portal.
            </p>
          </div>

          {/* MAIN CONTENT GRID: 5-STEP VERTICAL TIMELINE + FEATURED PROJECT & MOCKUP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-6">
            
            {/* LEFT COLUMN: 5-STEP VERTICAL TIMELINE WITH NUMBERS AS VISUAL ANCHORS */}
            <div className="lg:col-span-6 space-y-8 relative pl-2 sm:pl-0">
              
              {/* VERTICAL CONNECTING LINE */}
              <div className="absolute left-6 sm:left-6 top-6 bottom-6 w-0.5 bg-[#CDAE72]/40 -z-0 hidden sm:block"></div>

              {/* STEP 01 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  01
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">CONNECT & DISCOVER</span>
                  <p className="text-xs text-[#24313A]/90 font-light leading-relaxed">
                    Understand goals, priorities, property and budget range through initial consultation and discovery.
                  </p>
                </div>
              </div>

              {/* STEP 02 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  02
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">DESIGN & PLAN</span>
                  <p className="text-xs text-[#24313A]/90 font-light leading-relaxed">
                    Develop layout direction, design details and required professional/permit coordination before construction.
                  </p>
                </div>
              </div>

              {/* STEP 03 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  03
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">SCOPE & PREPARE</span>
                  <p className="text-xs text-[#24313A]/90 font-light leading-relaxed">
                    Finalize selections, scope, pricing, schedule and construction readiness prior to starting work.
                  </p>
                </div>
              </div>

              {/* STEP 04 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  04
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">BUILD & COMMUNICATE</span>
                  <p className="text-xs text-[#24313A]/90 font-light leading-relaxed">
                    Manage trades, site activity, updates, decisions and project information through transparent client portal communication.
                  </p>
                </div>
              </div>

              {/* STEP 05 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  05
                </div>
                <div className="space-y-1.5 pt-1">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">FINAL WALKTHROUGH & AFTERCARE</span>
                  <p className="text-xs text-[#24313A]/90 font-light leading-relaxed">
                    Complete closeout, outstanding items and project-specific written warranty information.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: FEATURED PROJECT PHOTO + LAPTOP/SMARTPHONE PORTAL MOCKUP + TRUST BADGES (6 COLS) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* RECENT PROJECT PHOTO CONTAINER */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[250px] sm:h-[280px] border border-[#0B2638]/10 group max-w-lg mx-auto lg:max-w-none">
                <img 
                  src="wellington_process_kitchen.jpg" 
                  alt="Wellington Street North Kitchen Renovation" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638]/90 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.25em] uppercase block mb-1">RECENT PROJECT</span>
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide">
                    WELLINGTON STREET NORTH · KITCHENER, ON
                  </h4>
                </div>
              </div>

                                          {/* BUILDERN CLIENT PORTAL LAPTOP & PHONE MOCKUP (TRANSPARENT / NO BACKGROUND BOX) */}
              <div className="pt-4 flex flex-col md:flex-row items-center gap-8">
                
                {/* COMPUTER AND PHONE HARDWARE MOCKUP */}
                <div className="w-full md:w-3/5 flex items-center justify-center">
                  <img 
                    src="buildern_portal_mockup_transparent.png" 
                    alt="Buildern Client Portal Laptop and Phone Mockup" 
                    className="w-full h-auto object-contain max-h-[380px] drop-shadow-2xl" 
                  />
                </div>

                {/* RIGHT COPY */}
                <div className="w-full md:w-2/5 space-y-3 text-left">
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#0B2638] leading-snug">
                    YOUR RENOVATION.<br />ALWAYS WITHIN REACH.
                  </h4>
                  <p className="text-xs text-[#24313A]/80 font-light leading-relaxed">
                    Follow progress, view photos, review selections and stay connected to your project from anywhere.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SINGLE-ROW CLIENT REVIEWS SLIDER */}
      <section id="testimonials" className="scroll-mt-28 py-20 sm:py-24 bg-[#0B2638] font-sans text-white border-t border-[#CDAE72]/20 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-3">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CLIENT REVIEWS</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wider">Verified Feedback From Havenridge Homeowners</h2>
              <p className="text-sm font-light text-white/70">Real feedback from homeowners across Kitchener, Waterloo, Cambridge, Guelph & Puslinch.</p>
              <div className="pt-1">
                <a 
                  href="#reviews-page" 
                  className="bg-[#CDAE72] text-[#0B2638] font-bold px-6 py-2.5 text-xs font-sans tracking-widest uppercase hover:bg-white transition-all shadow-md rounded-sm inline-flex items-center gap-2"
                >
                  <span>SEE MORE REVIEWS</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* SLIDE CONTROL BUTTONS */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => scrollSlider(testimonialRef, 'left')}
                className="w-11 h-11 bg-[#17365D] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all flex items-center justify-center shadow-md border border-[#CDAE72]/40 rounded-sm cursor-pointer"
                aria-label="Previous Reviews"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollSlider(testimonialRef, 'right')}
                className="w-11 h-11 bg-[#17365D] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all flex items-center justify-center shadow-md border border-[#CDAE72]/40 rounded-sm cursor-pointer"
                aria-label="Next Reviews"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* SINGLE HORIZONTAL ROW SLIDER WITH BEIGE CARDS */}
          <div 
            ref={testimonialRef}
            className="flex overflow-x-auto gap-8 pt-6 pb-16 px-4 -mx-4 scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="w-[300px] sm:w-[360px] shrink-0 bg-[#F4F2EE] text-[#24313A] p-6 sm:p-8 rounded-sm shadow-xl border border-[#CDAE72]/30 flex flex-col justify-between space-y-4 transform hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#CDAE72]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#CDAE72]" />
                    ))}
                  </div>
                  <h3 className="font-cinzel text-base font-bold text-[#0B2638] tracking-wide">{t.title}</h3>
                  <p className="text-xs text-[#24313A]/90 font-light leading-relaxed italic">"{t.quote}"</p>
                </div>
                <div className="border-t border-[#0B2638]/10 pt-3 flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0B2638]">{t.author}</span>
                  <span className="text-[#24313A]/60 font-light">{t.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* INSPIRATION GALLERY GRID SECTION */}
      <section id="inspiration-section" className="scroll-mt-28 py-20 sm:py-24 bg-[#F4F2EE] text-[#24313A] overflow-hidden relative border-t border-[#0B2638]/10 font-sans">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center space-y-3">
          <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">DESIGN INSPIRATION</span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638] tracking-wider">INSPIRATION GALLERY</h2>
          <p className="text-[#24313A]/70 text-sm font-light max-w-xl mx-auto leading-relaxed">
            Click on any photo below to explore custom designs and specifications from real Havenridge Build projects.
          </p>
        </div>

        {/* 4-COLUMN GRID OF ROUNDED CARDS */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {inspirationItems.map((item, idx) => (
              <a 
                key={idx} 
                href={item.link} 
                className="relative w-full aspect-[2/3] overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer shadow-md bg-[#0B2638] font-sans rounded-2xl"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638]/90 via-[#0B2638]/40 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.2em] uppercase block mb-1">INSPIRATION</span>
                  <h3 className={"font-cinzel text-xl font-bold tracking-wide text-white"}>
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs font-light italic mt-1 leading-normal">
                    {item.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNERS (LOGOS SIZED UP BY 30% AGAIN - cell h-36, logos h-26/h-24) */}
      <section id="partners" className="scroll-mt-28 py-16 md:py-20 bg-[#0B2638] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block mb-10">TRUSTED PARTNERS</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-4xl mx-auto opacity-95">
            <a 
              href="https://renomark.ca/renovator/carpenters-on-the-go-inc/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="RenoMark Certified Renovator"
              className="h-36 flex items-center justify-center w-full hover:scale-105 transition-transform cursor-pointer group"
            >
              <img src="renomark.png" alt="RenoMark Certified" className="h-26 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://www.baeumlerapproved.ca/contractors/carpenters-on-the-go/" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Baeumler Approved Contractor"
              className="h-36 flex items-center justify-center w-full hover:scale-105 transition-transform cursor-pointer group"
            >
              <img src="baumler.png" alt="Baeumler Approved" className="h-26 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://wrhba.com/pages/renomark" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Waterloo Region Home Builders' Association Member"
              className="h-36 flex items-center justify-center w-full hover:scale-105 transition-transform cursor-pointer group"
            >
              <img src="wrhba.png" alt="WRHBA Member" className="h-24 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
            <a 
              href="https://www.cambridgechamber.com/Business-Directory-Online.htm#/action/Listing/value/20025/searchID/1301714/cid/232/id/1/Havenridge-Build" 
              target="_blank" 
              rel="noopener noreferrer" 
              title="Cambridge Chamber of Commerce Member"
              className="h-36 flex items-center justify-center w-full hover:scale-105 transition-transform cursor-pointer group"
            >
              <img src="cambridge_chamber.png" alt="Cambridge Chamber of Commerce" className="h-26 w-auto object-contain brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER (WITH SOCIAL ICONS) */}
      {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-12 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-5xl mx-auto px-6 space-y-4">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.2em] uppercase">DESIGN-BUILD RENOVATIONS · ADDITIONS · CUSTOM RESIDENTIAL CONSTRUCTION</p>
            <p className="text-white/80 text-xs font-light">519-635-0963 | Info@HavenridgeBuild.com | Cambridge, Kitchener, Waterloo, Guelph &amp; surrounding communities</p>
            
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-[11px] font-sans font-bold uppercase tracking-wider text-[#CDAE72] pt-1 pb-2">
              <a href="#contact-page" className="hover:text-white transition-colors">Start Your Project</a>
              <span className="text-white/30">•</span>
              <a href="#projects-page" className="hover:text-white transition-colors">Projects</a>
              <span className="text-white/30">•</span>
              <a href="#process-section" className="hover:text-white transition-colors">Our Process</a>
              <span className="text-white/30">•</span>
              <a href="#privacy-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            {/* COMPLETE 7-ICON SOCIAL MEDIA BAR */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 pt-2 pb-2 text-[#CDAE72]">
              <a 
                href="https://www.facebook.com/carpentersotg/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/carpentersonthego/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.tiktok.com/@havenridge.build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok"
                title="TikTok"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <TiktokIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.linkedin.com/company/havenridgebuild/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                title="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/@Havenridgebuild" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                title="YouTube"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://www.houzz.com/pro/webuser-117372779/__public" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Houzz"
                title="Houzz"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm p-1.5"
              >
                <img src="houzz.avif" className="w-full h-full object-contain" alt="Houzz" />
              </a>
              <a 
                href="https://www.yelp.ca/biz/havenridge-build-cambridge?osq=Havenridge+Build" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Yelp"
                title="Yelp"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:scale-110 transition-transform shadow-sm overflow-hidden p-0.5"
              >
                <img src="yelp_custom.png" className="w-full h-full object-contain rounded-full" alt="Yelp" />
              </a>
              <a 
                href="#reviews-page" 
                aria-label="Client Reviews"
                title="Verified Client Reviews"
                className="w-9 h-9 rounded-full bg-[#17365D] border border-[#CDAE72]/30 flex items-center justify-center hover:bg-[#CDAE72] hover:text-[#0B2638] transition-all shadow-sm text-[#CDAE72] hover:text-[#0B2638] font-bold text-sm"
              >
                ★
              </a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>


      {renderLightbox()}

      {/* GLOBAL CAREERS POPUP MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#0B2638]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white text-[#24313A] max-w-xl w-full rounded-sm shadow-2xl overflow-hidden relative my-8">
            
            {/* MODAL HEADER */}
            <div className="bg-[#0B2638] text-white p-6 flex justify-between items-center border-b border-[#CDAE72]/20">
              <div className="flex items-center gap-4">
                <img src="logo_mark_h_only.svg" alt="Havenridge Build Logo" className="h-8 sm:h-9 w-auto object-contain" />
                <div className="border-l border-white/20 pl-4">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">JOIN HAVENRIDGE BUILD</span>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">Work With Us Application</h3>
                </div>
              </div>
              <button 
                onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                className="text-white/70 hover:text-[#CDAE72] text-2xl font-bold transition-colors p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="p-6 sm:p-8 space-y-6 text-left">
              {isAppliedSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#CDAE72]/20 text-[#CDAE72] rounded-full flex items-center justify-center mx-auto text-3xl font-bold">✓</div>
                  <h4 className="font-cinzel text-2xl font-bold text-[#0B2638]">Application Received!</h4>
                  <p className="text-sm text-[#24313A]/80 max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in joining Havenridge Build. Our hiring team will review your resume and reach out to qualified candidates.
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => { setIsApplyModalOpen(false); setIsAppliedSubmitted(false); }} 
                      className="bg-[#0B2638] text-white hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-8 py-3 text-xs tracking-widest uppercase transition-all"
                    >
                      CLOSE WINDOW
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsAppliedSubmitted(true); }} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Full Name *</label>
                    <input type="text" required placeholder="John Doe" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Email Address *</label>
                      <input type="email" required placeholder="john@example.com" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Phone Number *</label>
                      <input type="tel" required placeholder="(519) 555-0199" className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Role / Specialty *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Position...</option>
                        <option value="lead-carpenter">Lead Carpenter</option>
                        <option value="framing">Framing Carpenter</option>
                        <option value="finish">Finish Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="project-manager">Project Manager</option>
                        <option value="architectural-interior-designer">Architectural Designer / Interior Designer</option>
                        <option value="admin-assistant">Admin / Assistant</option>
                        <option value="subcontractor">Subcontractor / Licensed Trade Partner</option>
                        <option value="general">General Application</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Years of Experience *</label>
                      <select required className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72] bg-white">
                        <option value="">Select Experience...</option>
                        <option value="1-3">1 - 3 Years</option>
                        <option value="3-5">3 - 5 Years</option>
                        <option value="5+">5+ Years</option>
                      </select>
                    </div>
                  </div>

                  {/* RESUME UPLOAD FIELD */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Upload Resume (PDF, DOC, DOCX) *</label>
                    <div className="border-2 border-dashed border-gray-300 hover:border-[#CDAE72] p-4 text-center rounded-sm bg-gray-50 cursor-pointer relative">
                      <input 
                        type="file" 
                        required 
                        accept=".pdf,.doc,.docx" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setUploadedFileName(e.target.files[0].name);
                          }
                        }} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      />
                      <div className="space-y-1">
                        <span className="text-[#CDAE72] font-bold text-sm block">
                          {uploadedFileName ? `✓ Selected: ${uploadedFileName}` : "Click or Drag Resume File Here"}
                        </span>
                        <span className="text-xs text-gray-500 block">Accepted formats: PDF, DOC, DOCX (Max 10MB)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0B2638] mb-1">Brief Note / Experience Summary</label>
                    <textarea rows="3" placeholder="Tell us briefly about your carpentry background, recent projects, or qualifications..." className="w-full border border-gray-300 p-3 text-sm rounded-sm focus:outline-none focus:border-[#CDAE72]"></textarea>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full bg-[#0B2638] text-white hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold py-3.5 text-xs tracking-widest uppercase transition-all shadow-md cursor-pointer">
                      SUBMIT APPLICATION
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
