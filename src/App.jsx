import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Star, MessageSquare, Ruler, ClipboardCheck, Smartphone, ShieldCheck, Laptop, Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

  // Hero Slideshow State
  const [heroIndex, setHeroIndex] = useState(0);
  const heroImages = [
    'project_images/hero_living_room_fireplace.jpg',
    'project_images/piccadilly/1.png',
    'project_images/d_costa/exterior_facade_stone_driveway.jpg'
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
      title: "Additions & ADUs",
      headline: "Expanding a dated home with a carefully planned second-storey addition and a renewed exterior.",
      desc: "This project transformed the home through structural reconfiguration and a new upper level. Havenridge coordinated framing, masonry and trade work so the addition connected naturally in appearance and function.",
      img: "project_images/mcdougall/1.png",
      hash: "#project-additions"
    },
    {
      title: "Whole Home Renovations",
      headline: "Reworking the layout, function and finishes of a multi-level home through one coordinated renovation process.",
      desc: "The renovation brought several levels of the home together through coordinated planning and construction. Work included main-floor layout changes, a new kitchen, bathroom renovations and a finished lower level with family-focused spaces.",
      img: "project_images/knox/1.png",
      hash: "#project-whole-home"
    },
    {
      title: "Multi-Unit Conversions",
      headline: "Creating a safe, functional secondary suite through coordinated planning, code review, permits and construction.",
      desc: "Havenridge converted the lower level into a functional two-bedroom living space with a kitchenette, bathroom and egress. Life-safety, egress, and code compliance were fully coordinated throughout construction.",
      img: "project_images/natchez/1.png",
      hash: "#project-multi-unit"
    },
    {
      title: "Accessible & Barrier-Free",
      headline: "Improving safety, comfort and independence through thoughtful accessible design.",
      desc: "This bathroom renovation focused on reducing barriers and making everyday use easier. The project included a widened doorway, an accessible shower configuration, integrated seating, grab bars, reachable storage and improved lighting.",
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
    { name: 'West Forest Trail Whole Home Renovation', cat: 'Kitchen & Whole Home', hash: '#project-kitchens', img: 'project_images/piccadilly/1.png' },
    { name: 'John Street Bathroom Retreat', cat: 'Custom Bathroom Renovation', hash: '#project-bathrooms', img: 'project_images/mcnamara/1.png' },
    { name: 'Alderview Living Space', cat: 'Architectural Living Space', hash: '#project-living-spaces', img: 'project_images/paisley/living_room_wood_beam.jpg' },
    { name: 'Joan Lane Main Floor Addition', cat: 'Main Floor Addition & ADU', hash: '#project-additions', img: 'project_images/kuntz/3.jpg' },
    { name: 'Courtland Basement Renovation', cat: 'Finished Basement Suite', hash: '#project-basements', img: 'project_images/verhoeve/basement_media_lounge.jpg' },
    { name: 'Young Street Workshop', cat: 'Detached Workshop & Garage', hash: '#project-garages', img: 'project_images/borkhoff/10.png' },
  ];

    const inspirationItems = [
    { title: 'BATHROOMS', subtitle: 'Spa-Like Retreats & Custom Vanities', img: 'project_images/mcnamara/1.png', link: '#project-bathrooms' },
    { title: 'KITCHENS', subtitle: 'Master Cabinetry & Quartz Islands', img: 'project_images/piccadilly/1.png', link: '#project-kitchens' },
    { title: 'LIVING SPACES', subtitle: 'Custom Fireplaces & Oak Built-Ins', img: 'project_images/paisley/living_room_wood_beam.jpg', link: '#project-living-spaces' },
    { title: 'ADDITIONS', subtitle: 'Multi-Story Extensions & ADU Suites', img: 'project_images/kuntz/3.jpg', link: '#project-additions' },
    { title: 'BASEMENTS', subtitle: 'Lower-Level Bars & Media Lounges', img: 'project_images/verhoeve/basement_media_lounge.jpg', link: '#project-basements' },
    { title: 'GARAGES', subtitle: 'Executive Workshops & Storage Lofts', img: 'project_images/borkhoff/10.png', link: '#project-garages' },
    { title: 'CUSTOM MILLWORK', subtitle: 'Custom Architectural Trim & Cabinetry', img: 'project_images/piccadilly/ChatGPT_Image_Aug_12__2026__09_34_48_AM.png', link: '#project-millwork' },
    { title: 'EXTERIORS', subtitle: 'Covered Porches & Structural Framing', img: 'project_images/d_costa/exterior_facade_stone_driveway.jpg', link: '#project-additions' }
  ];

  const galleryCategories = [
    { title: 'BATHROOMS', hash: '#project-bathrooms', img: 'project_images/mcnamara/1.png' },
    { title: 'KITCHENS', hash: '#project-kitchens', img: 'project_images/piccadilly/1.png' },
    { title: 'LIVING SPACES', hash: '#project-living-spaces', img: 'project_images/paisley/living_room_wood_beam.jpg' },
    { title: 'ADDITIONS', hash: '#project-additions', img: 'project_images/kuntz/3.jpg' },
    { title: 'BASEMENTS', hash: '#project-basements', img: 'project_images/verhoeve/basement_media_lounge.jpg' },
    { title: 'GARAGES', hash: '#project-garages', img: 'project_images/borkhoff/10.png' },
  ];

  // Project pages details configuration (Cass Construction Editorial style layout)
  const projectDetails = {
    '#project-whole-home': {
      title: "Knox Court — Whole-Home Transformation",
      category: "Whole-home multi-level renovation",
      location: "Kitchener, ON",
      subtitle: "Reworking the layout, function and finishes of a multi-level home through one coordinated renovation process.",
      img1: "project_images/knox/1.png",
      img2: "project_images/knox/2.png",
      img3: "project_images/knox/3.png",
      overview: "The renovation brought several levels of the home together through coordinated planning and construction. Work included main-floor layout changes, a new kitchen, bathroom renovations and a finished lower level with family-focused spaces.",
      prevHash: "#project-millwork",
      nextHash: "#project-multi-unit"
    },
    '#project-multi-unit': {
      title: "Natchez Road — Secondary Suite Conversion",
      category: "Secondary-suite / multi-unit conversion",
      location: "Kitchener, ON",
      subtitle: "Creating a safe, functional secondary suite through coordinated planning, code review, permits and construction.",
      img1: "project_images/natchez/1.png",
      img2: "project_images/natchez/2.png",
      img3: "project_images/natchez/3.png",
      overview: "Havenridge converted the lower level into a functional two-bedroom living space with a kitchenette, bathroom and egress. Life-safety, egress, and code compliance were fully coordinated throughout construction.",
      prevHash: "#project-whole-home",
      nextHash: "#project-millwork"
    },
    '#project-millwork': {
      title: "Appledale Crescent — Custom Millwork & Whole Home",
      category: "Whole-home transformation + custom millwork",
      location: "Waterloo, ON",
      subtitle: "A coordinated multi-level renovation focused on better flow, storage and finish consistency.",
      img1: "project_images/appledale/1.png",
      img2: "project_images/appledale/2.png",
      img3: "project_images/appledale/3.png",
      overview: "The main floor was opened and refreshed around a custom kitchen and dedicated coffee storage, while bathroom and lower-level improvements carried the same design language through the home.",
      prevHash: "#project-multi-unit",
      nextHash: "#project-kitchens"
    },
    '#project-kitchens': {
      title: "Wellington Street — Main-Floor Transformation",
      category: "Main-floor renovation + structural reconfiguration",
      location: "Kitchener, ON",
      subtitle: "Improving circulation and creating a more functional kitchen and gathering space.",
      img1: "project_images/wellington/1.png",
      img2: "project_images/wellington/2.png",
      img3: "project_images/wellington/3.png",
      overview: "Working with the project design, Havenridge coordinated the layout changes, cabinetry, finishes, building systems and restoration details required to bring the older home forward without losing its character.",
      prevHash: "#project-millwork",
      nextHash: "#project-bathrooms"
    },
    '#project-bathrooms': {
      title: "Paisley Heights — Heritage Bathroom & Interior",
      category: "Heritage-sensitive whole-home renovation",
      location: "Cambridge, ON",
      subtitle: "A renovation that balanced updates with the character of an older home.",
      img1: "project_images/paisley/1.png",
      img2: "project_images/paisley/2.png",
      img3: "project_images/paisley/3.png",
      overview: "The project included a rebuilt staircase, new kitchen and bathroom, wall repairs and new finishes while retaining important original details such as stained glass and woodwork.",
      prevHash: "#project-kitchens",
      nextHash: "#project-additions"
    },
    '#project-additions': {
      title: "McDougall Road — Second-Storey Addition",
      category: "Whole-home reconstruction + second-storey addition",
      location: "Waterloo, ON",
      subtitle: "Expanding a dated home with a carefully planned second-storey addition and a renewed exterior.",
      img1: "project_images/mcdougall/1.png",
      img2: "project_images/mcdougall/2.png",
      img3: "project_images/mcdougall/3.png",
      overview: "This project transformed the home through structural reconfiguration and a new upper level. Havenridge coordinated framing, masonry and trade work so the addition connected naturally in appearance and function.",
      prevHash: "#project-bathrooms",
      nextHash: "#project-basements"
    },
    '#project-basements': {
      title: "Huntingwood Court — Structural & Lower Level",
      category: "Whole-home transformation + structural reconfiguration",
      location: "Vaughan, ON",
      subtitle: "A large multi-level renovation combining layout changes with highly customized interior details.",
      img1: "project_images/huntingwood/1.png",
      img2: "project_images/huntingwood/2.png",
      img3: "project_images/huntingwood/3.png",
      overview: "The finished home includes a new kitchen, built-in library, feature fireplace, staircase improvements and a lower level planned for fitness and entertaining.",
      prevHash: "#project-additions",
      nextHash: "#project-accessibility"
    },
    '#project-accessibility': {
      title: "Isherwood Ave — Accessible & Barrier-Free Washroom",
      category: "Accessible / aging-in-place bathroom renovation",
      location: "Cambridge, ON",
      subtitle: "Improving safety, comfort and independence through thoughtful accessible design.",
      img1: "project_images/isherwood/1.png",
      img2: "project_images/isherwood/2.png",
      img3: "project_images/isherwood/3.png",
      overview: "This bathroom renovation focused on reducing barriers and making everyday use easier. The project included a widened doorway, an accessible shower configuration, integrated seating, grab bars, reachable storage and improved lighting.",
      prevHash: "#project-basements",
      nextHash: "#project-whole-home"
    },
  };

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
                    <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Barrier-Free</a>
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
              <div className="w-full aspect-[16/10] overflow-hidden shadow-md rounded-lg">
                <img src={proj.img2} alt="Project detail visual" className="w-full h-full object-cover" />
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
              {proj.gallery.map((g, i) => (
                <div key={i} className="aspect-[4/3] overflow-hidden shadow-sm hover:scale-[1.02] transition-transform duration-500">
                  <img src={g} alt="Gallery view" className="w-full h-full object-cover" />
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
              <a href="#contact-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>

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
                    <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Barrier-Free</a>
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
                    <h3 className={`font-cinzel text-xl font-bold tracking-wide ${item.title === 'KITCHENS' ? 'text-[#CDAE72]' : 'text-white'}`}>
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
              <a href="#contact-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>

      
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
                        <option value="journeyman">Journeyman Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="supervisor">Site Supervisor</option>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">01 / PRE-CONSTRUCTION</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Disciplined Planning & Scope Clarity</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    Detailed scopes, selection schedules and construction planning help reduce uncertainty, manage allowances and identify important decisions before construction begins.
                  </p>
                </div>

                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">02 / CRAFTSMANSHIP</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Quality & Code Compliance</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    Our team coordinates each phase of construction to meet applicable Ontario Building Code requirements and Havenridge Build's quality standards.
                  </p>
                </div>

                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">03 / ACCOUNTABILITY</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Transparent Client Portal Communication</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    Homeowners enjoy 24/7 access to daily job logs, site photos, selection approvals, and real-time schedules through transparent client portal communication.
                  </p>
                </div>

                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">04 / RESPECT & AFTERCARE</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Respectful Job Sites & Dependable Aftercare</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    We use practical dust-control measures, regular cleanup and courteous site practices, then complete an organized closeout and provide the warranty information applicable to the project.
                  </p>
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
                      Micheal leads Havenridge Build with over 15 years of residential construction expertise. His hands-on leadership ensures every design-build addition, main floor extension, and whole-home renovation is executed with disciplined project management and finish quality.
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
                      David brings hands-on framing experience and formal construction training from Conestoga College’s Pre-Apprenticeship Program. As Havenridge Build’s Site Supervisor and a second-year carpentry apprentice, he helps coordinate daily jobsite activities, maintain quality standards and keep projects organized.
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
              <a href="#contact-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>
      
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
                        <option value="journeyman">Journeyman Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="supervisor">Site Supervisor</option>
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
                    <a href="#project-kitchens" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Whole Home Renovations</a>
                    <a href="#project-living-spaces" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Multi-Unit Conversions</a>
                    <a href="#project-accessibility" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Accessible & Barrier-Free</a>
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
                {selectedBlogArticle.content.map((paragraph, pIdx) => (
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
              <a href="#contact-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>
      
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
                        <option value="journeyman">Journeyman Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="supervisor">Site Supervisor</option>
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
                    <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Barrier-Free</a>
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
                  Professionally managed renovation projects generally begin at $20,000.
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
                    <span>Qualified projects move to a phone consultation.</span>
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
                            'Accessible / Barrier-Free',
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
                        <button 
                          type="submit" 
                          className="bg-[#0B2638] text-[#CDAE72] hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                        >
                          SUBMIT YOUR PROJECT →
                        </button>
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
              <a href="#contact-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
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
                <a href="#project-kitchens" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Whole Home Renovations</a>
                <a href="#project-living-spaces" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Multi-Unit Conversions</a>
                <a href="#project-accessibility" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Accessible & Barrier-Free</a>
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
                  <a href="#project-accessibility" onClick={() => setMobileMenuOpen(false)} className="text-white/90 hover:text-[#CDAE72] transition-colors py-1">Accessible & Barrier-Free</a>
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
                <div className="space-y-2 max-w-sm px-2">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#0B2638] uppercase tracking-wide leading-snug min-h-[52px] flex items-center justify-center text-center group-hover:text-[#CDAE72] transition-colors">{s.title}</h3>
                  <p className="text-xs text-[#24313A]/90 font-medium leading-relaxed min-h-[40px]">{s.headline}</p>
                </div>
                
                <div className="relative w-full aspect-[2/3] overflow-hidden cursor-pointer shadow-md">
                  <img 
                    src={s.img} 
                    alt={s.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
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

      {/* SINGLE-ROW CLIENT REVIEWS SLIDER — BRAND BLUE DARK THEME WITH BEIGE CARDS & UNCROPPED SHADOWS */}
      <section id="testimonials" className="scroll-mt-28 py-20 sm:py-24 bg-[#0B2638] font-sans text-white border-t border-[#CDAE72]/20 relative">
        <div className="max-w-7xl mx-auto px-6 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-2">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CLIENT REVIEWS</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wider">Verified Feedback From Havenridge Homeowners</h2>
              <p className="text-sm font-light text-white/70">Real feedback from homeowners across Kitchener, Waterloo, Cambridge, Guelph & Puslinch.</p>
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

          {/* SINGLE HORIZONTAL ROW SLIDER WITH BEIGE CARDS & UNCROPPED HOVER SHADOW CLEARANCE */}
          <div 
            ref={testimonialRef}
            className="flex overflow-x-auto gap-8 pt-6 pb-16 px-4 -mx-4 scroll-smooth scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="w-[320px] sm:w-[380px] shrink-0 bg-[#F4F2EE] text-[#24313A] p-8 rounded-2xl border border-[#CDAE72]/30 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between space-y-6 relative group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-[#CDAE72] text-sm tracking-widest font-bold">
                    ★★★★★
                  </div>
                  <p className="font-drama text-base sm:text-lg text-[#24313A]/90 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#0B2638]/10">
                  <h3 className="font-cinzel text-sm font-bold text-[#0B2638] uppercase tracking-wide">{t.name}</h3>
                  <p className="text-[11px] text-[#CDAE72] font-sans font-semibold mt-0.5">{t.location} · {t.project}</p>
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
                  className="relative w-full aspect-[2/3] overflow-hidden group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer shadow-md bg-[#0B2638] font-sans"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638]/90 via-[#0B2638]/40 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300">
                    <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.2em] uppercase block mb-1">INSPIRATION</span>
                    <h3 className={`font-cinzel text-xl font-bold tracking-wide ${item.title === 'KITCHENS' ? 'text-[#CDAE72]' : 'text-white'}`}>
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
            <div className="h-36 flex items-center justify-center w-full">
              <img src="renomark.png" alt="RenoMark Certified" className="h-26 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-36 flex items-center justify-center w-full">
              <img src="baumler.png" alt="Baeumler Approved" className="h-26 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-36 flex items-center justify-center w-full">
              <img src="wrhba.png" alt="WRHBA Member" className="h-24 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-36 flex items-center justify-center w-full">
              <img src="cambridge_chamber.png" alt="Cambridge Chamber of Commerce" className="h-26 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
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
              <a href="#contact-page" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-white/30">•</span>
              <a href="https://app.buildern.com/signin?key=0d059222-2c59-41f0-b0a2-1f280b52ba40" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Client Portal</a>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-1">
              <p className="text-white/50 text-[11px]">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
              <p className="text-white/40 text-[11px]">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
            </div>
          </div>
        </footer>


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
                        <option value="journeyman">Journeyman Carpenter</option>
                        <option value="apprentice">Apprentice Carpenter (1st / 2nd Year)</option>
                        <option value="supervisor">Site Supervisor</option>
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
