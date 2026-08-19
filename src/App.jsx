import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Star, MessageSquare, Ruler, ClipboardCheck, Smartphone, ShieldCheck, Laptop } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1920',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1920'
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
      title: "Additions and ADU's",
      headline: 'Expand your footprint with modern guest suites and home additions.',
      desc: 'Additions allow you to update and expand your existing house to make your dream home without the time, expense, and complexity of a move or a new build.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
      hash: '#project-additions'
    },
    {
      title: 'Whole Home Renovations',
      headline: 'Transform your interior layout with open concept high-end updates.',
      desc: 'If you love the home you are in, but it just needs some updates, our renovation service can help you enhance or even create charm and character.',
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
      hash: '#project-kitchens'
    },
    {
      title: 'Multi-Unit Conversions',
      headline: 'Convert and optimize layouts for secondary suites and multi-unit living.',
      desc: 'Starting from scratch allows you to design a unique living space centered around your family’s needs and tailored to your design style.',
      img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000',
      hash: '#project-living-spaces'
    },
    {
      title: 'Accessible & Barrier-Free',
      headline: 'AODA-compliant zero-threshold showers, solid backing & widened entries.',
      desc: 'Creating luxurious, independent living environments with zero-threshold curbless showers, solid wood wall backing, widened 36"+ doorways, and custom roll-under vanities.',
      img: 'project_images/ouellette/2.png',
      hash: '#project-accessibility'
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
        'Custom Appliance Integration: Integrated panel-ready refrigerators, hidden pantry doors, pull-out spice racks, and custom range hoods can only be seamlessly executed through bespoke carpentry.'
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
        'Weeks 17–24 (Finishes & Handover): Insulation, drywall taping, custom tile installation, cabinetry fitting, trim carpentry, painting, 100-point quality inspection, and 5-year warranty handover.'
      ]
    },
    {
      id: 'barrier-free-accessibility-waterloo',
      title: 'Barrier-Free & Accessible Washrooms in Waterloo Region: AODA & Aging-in-Place',
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
    { title: 'McNamara Suite', subtitle: 'Spa-Like Double Vanity Retreat', img: 'project_images/mcnamara/2.png', cat: 'BATHROOMS' },
    { title: '190 Piccadilly', subtitle: 'Master Oak Cabinetry & Island', img: 'project_images/piccadilly/2.png', cat: 'KITCHENS' },
    { title: '23 Paisley Heights', subtitle: 'Fireplace & Custom Bookshelves', img: 'project_images/paisley/11.png', cat: 'LIVING SPACES' },
    { title: 'Kuntz Extension', subtitle: 'Sunroom & Multi-Story Addition', img: 'project_images/kuntz/4.jpg', cat: 'ADDITIONS' },
    { title: 'Verhoeve Lounge', subtitle: 'Lower-Level Bar & Media Suite', img: 'project_images/verhoeve/16.jpg', cat: 'BASEMENTS' },
    { title: 'Borkhoff Workshop', subtitle: 'Executive Workshop & Storage Loft', img: 'project_images/borkhoff/11.png', cat: 'GARAGES' },
    { title: 'Ouellette Ensuite', subtitle: 'Herringbone Tile & Soaker Tub', img: 'project_images/ouellette/2.png', cat: 'BATHROOMS' },
    { title: 'Piccadilly Culinary', subtitle: 'Open-Concept Family Hub', img: 'project_images/piccadilly/3.png', cat: 'KITCHENS' },
    { title: 'Paisley Living Suite', subtitle: 'Open Family Living Layouts', img: 'project_images/paisley/12.png', cat: 'LIVING SPACES' }
  ];

  const processSteps = [
    { step: '01', title: 'Initial Consultation & Feasibility', desc: 'We meet on-site to review your vision, inspect structural conditions, discuss investment expectations, and establish initial feasibility goals.' },
    { step: '02', title: 'Architectural Scope & Detailed Costing', desc: 'Developing comprehensive 3D layouts, exact scope clarification, material selections, and a fixed-price transparent quote with zero hidden surprises.' },
    { step: '03', title: 'Municipal Permits & Sourcing', desc: 'We handle all building permit submissions, engineering approvals, and pre-order long-lead custom millwork and stone before site work begins.' },
    { step: '04', title: 'Master Craftsmanship & Build', desc: 'Clean daily job sites, active communication from Micheal Smith, and precision construction executed by Red Seal master carpenters.' },
    { step: '05', title: 'Quality Audit & Handover Guarantee', desc: 'Thorough 100-point quality audit, final client walkthrough, detailed care manuals, and our signature 5-year workmanship warranty.' }
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
      quote: 'From initial scope clarity to final handover, the craftsmanship is unmatched. They transformed our main floor and kitchen effortlessly. Fixed budget, no hidden surprises.',
      rating: 5
    },
    {
      name: 'Mark & Jennifer T.',
      location: 'Guelph Homeowner',
      project: 'Custom Main Floor Addition & Sunroom',
      quote: 'Exceptional attention to detail and scope clarity. Their red-seal carpenters were professional, punctual, and delivered a beautiful extension ahead of schedule.',
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
    { name: '190 Piccadilly Square', cat: 'Kitchen Renovation', hash: '#project-kitchens', img: 'project_images/piccadilly/1.png' },
    { name: 'McNamara Bathrooms', cat: 'Bespoke Bathroom Retreat', hash: '#project-bathrooms', img: 'project_images/mcnamara/1.png' },
    { name: '23 Paisley Heights', cat: 'Architectural Living Space', hash: '#project-living-spaces', img: 'project_images/paisley/10.png' },
    { name: 'Kuntz House', cat: 'Main Floor Addition & ADU', hash: '#project-additions', img: 'project_images/kuntz/3.jpg' },
    { name: 'Verhoeve House', cat: 'Premium Finished Basement', hash: '#project-basements', img: 'project_images/verhoeve/6.jpg' },
    { name: 'Borkhoff Garage', cat: 'Detached Workshop & Garage', hash: '#project-garages', img: 'project_images/borkhoff/10.png' },
  ];

    const inspirationItems = [
    { title: 'BATHROOMS', subtitle: 'Spa-Like Retreats & Custom Vanities', img: 'project_images/mcnamara/2.png', link: '#project-bathrooms' },
    { title: 'KITCHENS', subtitle: 'Master Cabinetry & Quartz Islands', img: 'project_images/piccadilly/2.png', link: '#project-kitchens' },
    { title: 'LIVING SPACES', subtitle: 'Custom Fireplaces & Oak Built-Ins', img: 'project_images/paisley/11.png', link: '#project-living-spaces' },
    { title: 'ADDITIONS', subtitle: 'Multi-Story Extensions & ADU Suites', img: 'project_images/kuntz/4.jpg', link: '#project-additions' },
    { title: 'BASEMENTS', subtitle: 'Lower-Level Bars & Media Lounges', img: 'project_images/verhoeve/16.jpg', link: '#project-basements' },
    { title: 'GARAGES', subtitle: 'Executive Workshops & Storage Lofts', img: 'project_images/borkhoff/11.png', link: '#project-garages' },
    { title: 'CUSTOM MILLWORK', subtitle: 'Bespoke Architectural Trim & Cabinetry', img: 'project_images/piccadilly/3.png', link: '#project-kitchens' },
    { title: 'EXTERIORS', subtitle: 'Covered Porches & Structural Framing', img: 'project_images/kuntz/19.jpg', link: '#project-additions' }
  ];

  const galleryCategories = [
    { title: 'BATHROOMS', hash: '#project-bathrooms', img: 'project_images/mcnamara/1.png' },
    { title: 'KITCHENS', hash: '#project-kitchens', img: 'project_images/piccadilly/1.png' },
    { title: 'LIVING SPACES', hash: '#project-living-spaces', img: 'project_images/paisley/10.png' },
    { title: 'ADDITIONS', hash: '#project-additions', img: 'project_images/kuntz/3.jpg' },
    { title: 'BASEMENTS', hash: '#project-basements', img: 'project_images/verhoeve/6.jpg' },
    { title: 'GARAGES', hash: '#project-garages', img: 'project_images/borkhoff/10.png' },
  ];

  // Project pages details configuration (Cass Construction Editorial style layout)
  const projectDetails = {
        '#project-accessibility': {
      title: 'Waterloo Barrier-Free & Accessible Washroom Suite',
      cat: 'Accessible & Barrier-Free Construction',
      leadDesc: 'Creating luxurious, independent living environments with zero-threshold curbless showers, solid wall backing, and widened entries.',
      desc1: 'Creating an accessible bathroom or living suite does not mean sacrificing high-end luxury aesthetics. With thoughtful design, barrier-free washrooms provide independent living without looking institutional.',
      desc2: 'Before drywall is installed, 2x10 solid lumber backing is fitted inside shower and toilet walls for grab bar anchoring. Doorways are widened to 36"+ with zero-threshold transfers and custom roll-under floating vanities.',
      img1: 'project_images/ouellette/2.png',
      img2: 'project_images/mcnamara/2.png',
      prevHash: '#project-garages',
      nextHash: '#project-bathrooms',
      gallery: [
        'project_images/ouellette/2.png',
        'project_images/mcnamara/2.png',
        'project_images/piccadilly/1.png'
      ]
    },
    '#project-bathrooms': {
      title: 'John Street Bathroom Retreat',
      cat: 'Bespoke Bathroom Retreat',
      leadDesc: 'Transform your daily routine into a spa-like experience with our bespoke bathroom renovations.',
      desc1: 'We create calming, luxurious bathrooms that serve as personal sanctuaries. From custom walk-in double showers and freestanding soaking tubs to premium stone vanities and heated flooring, every detail is engineered for luxury and longevity.',
      desc2: 'Next came the ensuite, reimagined as a true spa retreat with a freestanding soaker tub, oversized glass shower, herringbone tile floors, and a double vanity bathed in natural light. We coordinate all municipal permit layouts and layout phases, making the build experience completely hands-free for you.',
      img1: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920',
      img2: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=1920',
      prevHash: '#projects-page',
      nextHash: '#project-kitchens',
      gallery: [
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800'
      ]
    },
    '#project-kitchens': {
      title: 'West Forest Trail Whole Home Renovation',
      cat: 'Whole Home Renovation',
      leadDesc: 'The culinary heart of the home, crafted with master millwork and premium materials.',
      desc1: 'Our kitchens combine high-performance culinary workspace design with open-concept family styling. We focus on master cabinetry, custom range hoods, integrated smart appliances, and expansive islands finished with high-durability stone.',
      desc2: 'We began with the main floor, transforming the kitchen with updated cabinetry, a textured tile backsplash, two-tone island, and glass-front built-ins, all flowing into a refreshed living room anchored by a classic fireplace. We coordinate all custom trim matching.',
      img1: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1920',
      img2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1920',
      prevHash: '#project-bathrooms',
      nextHash: '#project-living-spaces',
      gallery: [
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1565538810844-1e119412e8d6?auto=format&fit=crop&q=80&w=800'
      ]
    },
    '#project-living-spaces': {
      title: 'Alderview Living Space',
      cat: 'Architectural Living Space',
      leadDesc: 'Convert and optimize layouts for secondary suites and multi-unit living.',
      desc1: 'Starting from scratch allows you to design a unique living space centered around your family’s needs and tailored to your design style. We create warm, open-concept family environments.',
      desc2: 'Custom white-oak built-in bookshelving, custom gas fireplace surrounds detailed with cast stone, and hidden wire management channels complete this minimal aesthetic.',
      img1: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1920',
      img2: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1920',
      prevHash: '#project-kitchens',
      nextHash: '#project-additions',
      gallery: [
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=800'
      ]
    },
    '#project-additions': {
      title: "Joan Lane Main Floor Addition",
      cat: 'Main Floor Addition & ADU',
      leadDesc: 'Expand your footprint with seamless structural extensions that match your home\'s original lines.',
      desc1: 'Additions demand absolute engineering precision. We construct master suites, multi-story additions, sunrooms, and garage-top extensions that flow perfectly from your existing layout.',
      desc2: 'We began with foundation tie-ins, timber roof framing, and matched external profiles perfectly to create an expanded main floor kitchen and adjacent garden suite ADU.',
      img1: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
      img2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920',
      prevHash: '#project-living-spaces',
      nextHash: '#project-basements',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800'
      ]
    },
    '#project-basements': {
      title: 'Courtland Basement Renovation',
      cat: 'Premium Finished Basement',
      leadDesc: 'Unlock the potential of your lower level with luxury family suites, bars, and theaters.',
      desc1: 'We convert dark, underutilized basements into premium, dry, and warm living areas. By emphasizing insulation breaks, custom acoustic framing, waterproofing seals, and premium lighting layouts.',
      desc2: 'The basement became the finishing touch — a dedicated workout space, a sleek entertainment lounge, a wet bar, and enough room for the grandkids to run wild, with built-in storage to match.',
      img1: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1920',
      img2: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=1920',
      prevHash: '#project-additions',
      nextHash: '#project-garages',
      gallery: [
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800'
      ]
    },
    '#project-garages': {
      title: 'Young Street Workshop',
      cat: 'Detached Workshop & Garage',
      leadDesc: 'Custom built workshop structures, loft garden suites, and high-end automotive storage.',
      desc1: 'Garages should match the architectural precision of the main home. We build custom hobby workshops, garage-top executive offices, and luxury storage structures matching your home’s existing layout.',
      desc2: 'We constructed this multi-functional workspace complete with dust collection ports, a custom timber stairwell to a storage loft, and double insulated overhead carriage doors.',
      img1: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&q=80&w=1920',
      img2: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=1920',
      prevHash: '#project-basements',
      nextHash: '#projects-page',
      gallery: [
        'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&q=80&w=800'
      ]
    }
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
            <a href="#projects-page" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> BACK TO PROJECTS
            </a>
          </div>
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
                    <p className="text-white/80 font-light leading-relaxed">{proj.certifications || 'WEDI Certified, 2-Year Structural Warranty'}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a 
                    href="#contact-page" 
                    className="w-full bg-[#CDAE72] text-[#0B2638] font-bold py-3.5 px-4 text-xs font-sans tracking-widest uppercase block text-center rounded-sm hover:bg-white transition-all shadow-md"
                  >
                    REQUEST CONSULTATION →
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
              We would love to chat with you about your project. Please fill out our contact form to tell us about your project and to get the process started.
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
        <footer className="bg-[#0B2638] text-white/70 py-10 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-2">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.25em] uppercase">DESIGN · BUILD · RENOVATE</p>
            <p className="text-white/60 text-xs">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
            <p className="text-white/50 text-xs">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
          </div>
        </footer>

      </div>
    );
  }

  // Render projects-page (CASS PROJECTS DIRECTORY)
  if (currentPath === '#projects-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        
        {/* NAV HEADER */}
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </a>
          </div>
        </nav>

        {/* HERO SPLIT IMAGE BANNER (CASS STYLE) */}
        <section className="grid grid-cols-2 gap-2 h-[250px] sm:h-[350px] overflow-hidden bg-[#0B2638]">
          <img src="project_images/piccadilly/1.png" alt="Kitchen highlight" className="w-full h-full object-cover opacity-80" />
          <img src="project_images/mcnamara/1.png" alt="Bathroom highlight" className="w-full h-full object-cover opacity-80" />
        </section>

        {/* HERO TITLE SECTION ON LIGHT BACKGROUND (CASS STYLE) */}
        <section className="bg-[#F4F2EE] text-[#24313A] py-16 text-center border-b border-[#0B2638]/10">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">FULL PROJECTS</span>
            <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wider text-[#0B2638]">View our work</h1>
            <p className="text-sm font-light text-[#24313A]/80 max-w-xl mx-auto leading-relaxed pt-2">
              Here is a collection of some of our favourite projects. Check back soon to see new work.<br />
              Contact us to see what is possible in your home.
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
                    <span>LEARN MORE</span>
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
              Click on any photo below to explore bespoke designs and specifications from real Havenridge Build projects.
            </p>
          </div>

          {/* 4-COLUMN GRID OF ROUNDED CARDS */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {inspirationItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  className="relative w-full aspect-square overflow-hidden rounded-2xl group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer shadow-lg border border-[#0B2638]/10 bg-[#0B2638]"
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
                We are expanding our team of skilled carpenters, site supervisors, apprentices, and licensed trade partners. If you take pride in craftsmanship and accountability, apply today.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setIsApplyModalOpen(true)} 
                  className="bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </section>

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-10 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-2">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.25em] uppercase">DESIGN · BUILD · RENOVATE</p>
            <p className="text-white/60 text-xs">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
            <p className="text-white/50 text-xs">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
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
                Master Craftsmanship &<br />Accountable Leadership
              </h1>
              <p className="font-drama text-lg sm:text-xl text-white/85 italic max-w-2xl mx-auto leading-relaxed">
                Full-service design-build general contracting serving Cambridge, Kitchener, Waterloo, Guelph, and surrounding communities with uncompromising building standards.
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs font-sans font-bold tracking-wider uppercase text-[#CDAE72]">
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">15+ Years Experience</span>
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">Baeumler Approved</span>
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">RenoMark Certified</span>
                <span className="bg-[#17365D] px-4 py-2 border border-[#CDAE72]/30 shadow-md">Warranty Guarantee</span>
              </div>
            </div>
          </section>

          {/* RESTORED ORIGINAL COMPANY VALUES SECTION WITH MERGED COPY */}
          <section id="company-values" className="py-20 bg-white border-b border-[#0B2638]/10">
            <div className="max-w-6xl mx-auto px-6 space-y-12">
              <div className="max-w-6xl mx-auto text-center space-y-4">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">BUILDING STANDARDS</span>
                <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638] leading-tight">
                  Professional Building Standards & Code-Compliant Construction
                </h2>
                <p className="text-sm sm:text-base text-[#24313A]/85 font-light leading-relaxed">
                  Havenridge Build is a full-service design-build general contractor serving Cambridge, Kitchener, Waterloo, Guelph, and surrounding communities. Since 2014, we have helped homeowners improve their homes through carefully planned kitchens, bathrooms, basements, additions, and complete home renovations. Led by owner <strong>Micheal Smith</strong>, our team coordinates the entire renovation process with clear communication, organized project updates through the <strong>Buildern client portal</strong>, and one accountable team. As a <strong>Baeumler Approved</strong> and <strong>RenoMark</strong> renovator, our work is backed by a two-year structural warranty plus a one-year workmanship warranty.
                </p>
              </div>

              {/* ORIGINAL 4 GRID CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">01 / PRE-CONSTRUCTION</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Disciplined Planning & Scope Clarity</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    Every successful residential renovation begins with clear pre-construction planning. By establishing detailed scope documents, selection schedules, and fixed permit layouts early, we eliminate mid-project surprises and budget creep.
                  </p>
                </div>

                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">02 / CRAFTSMANSHIP</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Uncompromising Quality & Millwork</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    From structural timber roof additions to custom white-oak cabinetry, heated bathroom floors, and quartz island installations, we hold every trade phase to exact Ontario Building Code and high-end finish standards.
                  </p>
                </div>

                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">03 / ACCOUNTABILITY</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Transparent Client Portal Communication</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    Through our Buildern client portal, homeowners enjoy 24/7 access to daily job logs, site photos, selection approvals, and real-time schedules. Communication is direct, documented, and proactive.
                  </p>
                </div>

                <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">04 / RESPECT & WARRANTY</span>
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Clean Job Sites & Warranty Defense</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed">
                    We respect your sanctuary. Our teams enforce strict dust containment, daily jobsite cleanup, and courteous site management—standing behind all completed work with dedicated homeowner warranty support.
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
                      Micheal leads Havenridge Build with over 15 years of residential construction expertise. His hands-on leadership ensures every custom build, main floor addition, and whole-home renovation is executed with disciplined project management and finish quality.
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
                      I started my career as a framer and went back to school at Conestoga College for the pre-apprenticeship program and am a second year apprentice.
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
                We are expanding our team of skilled carpenters, site supervisors, apprentices, and licensed trade partners. If you take pride in craftsmanship and accountability, apply today.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setIsApplyModalOpen(true)} 
                  className="bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-10 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-2">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.25em] uppercase">DESIGN · BUILD · RENOVATE</p>
            <p className="text-white/60 text-xs">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
            <p className="text-white/50 text-xs">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
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
                    <a href="#project-additions" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Additions and ADU's</a>
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
                We are expanding our team of skilled carpenters, site supervisors, apprentices, and licensed trade partners. If you take pride in craftsmanship and accountability, apply today.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setIsApplyModalOpen(true)} 
                  className="bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </section>

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-10 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-2">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.25em] uppercase">DESIGN · BUILD · RENOVATE</p>
            <p className="text-white/60 text-xs">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
            <p className="text-white/50 text-xs">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
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
            <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </a>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section className="relative bg-[#0B2638] text-white py-24 text-center overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wider text-white">Get In Touch</h1>
            <p className="text-sm font-light text-white/80 max-w-xl mx-auto leading-relaxed">
              We look forward to hearing about your project goals. Please contact us to coordinate a phone consultation.
            </p>
          </div>
        </section>

        {/* CONTACT CONTENT SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase">CONTACT INFO</span>
                <h2 className="font-cinzel text-3xl font-bold text-[#0B2638]">Havenridge Build</h2>
              </div>
              
              <div className="space-y-4 text-sm leading-relaxed text-[#24313A]/80 font-sans">
                <p>
                  <strong>Founder & Lead builder:</strong> Micheal Smith
                </p>
                <p>
                  <strong>Office Phone:</strong> <span className="text-[#0B2638] font-bold">(519) 635-0963</span>
                </p>
                <p>
                  <strong>Email Address:</strong> <a href="mailto:Info@havenridgebuild.ca" className="text-[#0B2638] font-bold hover:text-[#CDAE72] transition-colors">Info@havenridgebuild.ca</a>
                </p>
                <p>
                  <strong>Service Area:</strong> Serving Kitchener, Waterloo, Cambridge, and surrounding Oxford County communities.
                </p>
              </div>

                            <div className="pt-6 border-t border-[#0B2638]/10 space-y-4">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase block">CERTIFICATIONS & ACCREDITATIONS</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-sans font-bold text-[#0B2638]">
                  <div className="bg-[#F4F2EE] p-3 rounded-lg border border-[#0B2638]/10 text-center shadow-2xs">
                    <span className="text-[#CDAE72] block text-[9px] uppercase font-bold tracking-wider mb-0.5">WATERPROOFING</span>
                    <span>WEDI CERTIFIED</span>
                  </div>
                  <div className="bg-[#F4F2EE] p-3 rounded-lg border border-[#0B2638]/10 text-center shadow-2xs">
                    <span className="text-[#CDAE72] block text-[9px] uppercase font-bold tracking-wider mb-0.5">TILE SYSTEMS</span>
                    <span>SCHLUTER CERTIFIED</span>
                  </div>
                  <div className="bg-[#F4F2EE] p-3 rounded-lg border border-[#0B2638]/10 text-center shadow-2xs">
                    <span className="text-[#CDAE72] block text-[9px] uppercase font-bold tracking-wider mb-0.5">AODA STANDARDS</span>
                    <span>ACCESSIBILITY CERTIFIED</span>
                  </div>
                  <div className="bg-[#F4F2EE] p-3 rounded-lg border border-[#0B2638]/10 text-center shadow-2xs">
                    <span className="text-[#CDAE72] block text-[9px] uppercase font-bold tracking-wider mb-0.5">QUALITY STANDARDS</span>
                    <span>RENOMARK CERTIFIED</span>
                  </div>
                  <div className="bg-[#F4F2EE] p-3 rounded-lg border border-[#0B2638]/10 text-center shadow-2xs">
                    <span className="text-[#CDAE72] block text-[9px] uppercase font-bold tracking-wider mb-0.5">TRUSTED PRO</span>
                    <span>BAEUMLER APPROVED</span>
                  </div>
                  <div className="bg-[#F4F2EE] p-3 rounded-lg border border-[#0B2638]/10 text-center shadow-2xs">
                    <span className="text-[#CDAE72] block text-[9px] uppercase font-bold tracking-wider mb-0.5">INDUSTRY MEMBER</span>
                    <span>WRHBA MEMBER</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F4F2EE] p-8 border border-[#0B2638]/10 font-sans">
              {formSubmitted ? (
                <div className="py-12 space-y-4 text-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                  <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">Message Sent</h3>
                  <p className="text-xs text-[#24313A]/80">Micheal Smith or a senior project manager will contact you within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638] uppercase tracking-wider mb-6">Send an Inquiry</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase text-[#0B2638] mb-1">First Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        placeholder="John" 
                        className="w-full bg-transparent border-b border-[#0B2638]/40 focus:border-[#CDAE72] outline-none py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase text-[#0B2638] mb-1">Last Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        placeholder="Smith" 
                        className="w-full bg-transparent border-b border-[#0B2638]/40 focus:border-[#CDAE72] outline-none py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase text-[#0B2638] mb-1">Phone Number *</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="(519) 000-0000" 
                        className="w-full bg-transparent border-b border-[#0B2638]/40 focus:border-[#CDAE72] outline-none py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans font-bold uppercase text-[#0B2638] mb-1">Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="john@example.com" 
                        className="w-full bg-transparent border-b border-[#0B2638]/40 focus:border-[#CDAE72] outline-none py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold uppercase text-[#0B2638] mb-1">Project Details</label>
                    <textarea 
                      rows="4" 
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                      placeholder="Tell us about your home and project goals..." 
                      className="w-full bg-transparent border-b border-[#0B2638]/40 focus:border-[#CDAE72] outline-none py-2 text-sm"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#0B2638] text-white hover:bg-[#CDAE72] hover:text-[#0B2638] font-bold py-4 text-xs font-sans tracking-widest uppercase transition-all"
                  >
                    SEND MESSAGE →
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

  
      {/* WORK WITH US CAREERS SECTION */}
          <section id="work-with-us" className="py-20 bg-[#0B2638] text-white text-center">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CAREERS & TRADES</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wider">WORK WITH US</h2>
              <p className="text-white/80 text-sm font-light max-w-xl mx-auto leading-relaxed">
                We are expanding our team of skilled carpenters, site supervisors, apprentices, and licensed trade partners. If you take pride in craftsmanship and accountability, apply today.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => setIsApplyModalOpen(true)} 
                  className="bg-[#CDAE72] text-[#0B2638] hover:bg-white hover:text-[#0B2638] font-bold px-10 py-4 text-xs tracking-widest uppercase transition-all shadow-lg rounded-sm cursor-pointer"
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          </section>

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/70 py-10 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-2">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.25em] uppercase">DESIGN · BUILD · RENOVATE</p>
            <p className="text-white/60 text-xs">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
            <p className="text-white/50 text-xs">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
          </div>
        </footer>

      </div>
    );
  }

  // Home Page View
  return (
    <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#17365D] text-white text-[11px] font-sans font-medium tracking-[0.15em] py-2.5 px-6 uppercase flex justify-center items-center">
        <div className="flex items-center space-x-2 text-center">
          <span className="w-2 h-2 bg-[#CDAE72] rounded-full animate-pulse"></span>
          <span>SERVING KITCHENER, WATERLOO, CAMBRIDGE & OXFORD COUNTY</span>
        </div>
      </div>

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
                <a href="#project-additions" className="block px-4 py-3 text-[11px] tracking-wider text-white hover:bg-[#17365D] hover:text-[#CDAE72] transition-colors">Additions and ADU's</a>
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

          <div className="w-12 hidden md:block"></div>
        </div>
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

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-left">
          <div className="max-w-3xl">
            <h1 className="cass-hero-fade font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold leading-[1.2] text-white mb-4 drop-shadow-lg">
              Residential Renovations<br />
              & Custom Homes
            </h1>

            <p className="cass-hero-fade text-sm sm:text-base md:text-lg font-light text-white mb-8 max-w-xl leading-relaxed drop-shadow-md">
              We craft spaces that you will fall in love with. Serving Kitchener, Waterloo, and Cambridge.
            </p>

            <div className="cass-hero-fade">
              <a href="#contact-page" className="bg-[#CDAE72] text-[#0B2638] font-bold px-10 py-4 text-xs font-sans tracking-widest uppercase hover:bg-white transition-all shadow-lg">
                CONTACT US
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
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Havenridge Build's Residential Renovation and Construction Services</h2>
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
                      <span>LEARN MORE</span>
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

        <div className="relative z-10 max-w-4xl mx-auto px-6 cass-reveal space-y-3">
          <p className="text-sm font-sans font-light text-white/80 tracking-wide">At Havenridge we build so you can</p>
          <h2 className="font-drama text-6xl sm:text-8xl text-[#CDAE72] font-normal tracking-wider">
            FEEL AT HOME
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
              A proven 5-step process designed to deliver exceptional results, clear communication and a renovation experience you can trust.
            </p>
          </div>

          {/* MAIN CONTENT GRID: 5-STEP VERTICAL TIMELINE WITH ICONS + FEATURED PROJECT & COMPUTER/PHONE MOCKUP */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-6">
            
            {/* LEFT COLUMN: 5-STEP VERTICAL TIMELINE WITH NUMBER + ICON BADGES (6 COLS) */}
            <div className="lg:col-span-6 space-y-8 relative pl-2 sm:pl-0">
              
              {/* VERTICAL CONNECTING LINE */}
              <div className="absolute left-6 sm:left-6 top-6 bottom-6 w-0.5 bg-[#CDAE72]/40 -z-0 hidden sm:block"></div>

              {/* STEP 01 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  01
                </div>
                <div className="w-11 h-11 rounded-full bg-white border border-[#CDAE72] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <MessageSquare className="w-5 h-5 text-[#CDAE72]" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">CONSULT & DISCOVER</span>
                  <p className="text-sm font-semibold text-[#CDAE72] leading-snug">
                    We start by understanding your home, your goals and what you want to achieve.
                  </p>
                  <p className="text-xs text-[#24313A]/80 font-light leading-relaxed">
                    We meet with you to discuss your renovation, priorities, ideas, budget expectations and the possibilities for your space.
                  </p>
                </div>
              </div>

              {/* STEP 02 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  02
                </div>
                <div className="w-11 h-11 rounded-full bg-white border border-[#CDAE72] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Ruler className="w-5 h-5 text-[#CDAE72]" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">DESIGN & PLAN</span>
                  <p className="text-sm font-semibold text-[#CDAE72] leading-snug">
                    We turn the vision into a clear plan before construction begins.
                  </p>
                  <p className="text-xs text-[#24313A]/80 font-light leading-relaxed">
                    We work through the project details, design, scope, materials, selections and required planning so everyone understands what is being built.
                  </p>
                </div>
              </div>

              {/* STEP 03 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  03
                </div>
                <div className="w-11 h-11 rounded-full bg-white border border-[#CDAE72] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <ClipboardCheck className="w-5 h-5 text-[#CDAE72]" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">APPROVE & PREPARE</span>
                  <p className="text-sm font-semibold text-[#CDAE72] leading-snug">
                    The details are finalized before we begin construction.
                  </p>
                  <p className="text-xs text-[#24313A]/80 font-light leading-relaxed">
                    We confirm pricing, selections, scheduling, permits and long-lead materials so the project is properly prepared before work starts.
                  </p>
                </div>
              </div>

              {/* STEP 04 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  04
                </div>
                <div className="w-11 h-11 rounded-full bg-white border border-[#CDAE72] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <Smartphone className="w-5 h-5 text-[#CDAE72]" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">BUILD & STAY CONNECTED</span>
                  <p className="text-sm font-semibold text-[#CDAE72] leading-snug">
                    Expert craftsmanship backed by organized project management and clear communication.
                  </p>
                  <p className="text-xs text-[#24313A]/80 font-light leading-relaxed">
                    Our skilled team brings the plan to life while keeping the jobsite organized and the homeowner informed. Clients have <strong>24/7 online access</strong> to progress photos, updates, selections and important project information—making it easy to follow your renovation from anywhere.
                  </p>
                </div>
              </div>

              {/* STEP 05 */}
              <div className="flex gap-4 sm:gap-5 relative z-10 items-start">
                <div className="w-12 h-12 rounded-full bg-[#0B2638] text-[#CDAE72] font-cinzel text-base font-bold flex items-center justify-center shrink-0 shadow-md border-2 border-[#CDAE72]">
                  05
                </div>
                <div className="w-11 h-11 rounded-full bg-white border border-[#CDAE72] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <ShieldCheck className="w-5 h-5 text-[#CDAE72]" />
                </div>
                <div className="space-y-1.5 pt-0.5">
                  <span className="text-[#0B2638] font-bold text-xs font-sans tracking-widest uppercase block">REVIEW & PROTECT</span>
                  <p className="text-sm font-semibold text-[#CDAE72] leading-snug">
                    We finish with the same attention to detail we started with.
                  </p>
                  <p className="text-xs text-[#24313A]/80 font-light leading-relaxed">
                    We walk through every detail with you and ensure complete satisfaction. Our work is backed by a <strong>two-year warranty</strong> covering structural defects and water penetration, plus a <strong>one-year workmanship warranty</strong>.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: FEATURED PROJECT PHOTO + LAPTOP/SMARTPHONE PORTAL MOCKUP + TRUST BADGES (6 COLS) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* RECENT PROJECT PHOTO CONTAINER */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[250px] sm:h-[280px] border border-[#0B2638]/10 group max-w-lg mx-auto lg:max-w-none">
                <img 
                  src="wellington_recent.jpg" 
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
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white tracking-wider">What Our Clients Say</h2>
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
              Click on any photo below to explore bespoke designs and specifications from real Havenridge Build projects.
            </p>
          </div>

          {/* 4-COLUMN GRID OF ROUNDED CARDS */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {inspirationItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  className="relative w-full aspect-square overflow-hidden rounded-2xl group transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer shadow-lg border border-[#0B2638]/10 bg-[#0B2638]"
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
              <img src="baumler.png" alt="Baeumler Approved" className="h-26 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
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
        <footer className="bg-[#0B2638] text-white/70 py-10 border-t border-white/10 font-sans text-xs text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-2">
            <p className="text-[#CDAE72] text-[11px] font-sans font-bold tracking-[0.25em] uppercase">DESIGN · BUILD · RENOVATE</p>
            <p className="text-white/60 text-xs">© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
            <p className="text-white/50 text-xs">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] font-semibold hover:underline">BoostMyLeads</a></p>
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
