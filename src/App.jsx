import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, ArrowLeft, ChevronDown } from 'lucide-react';

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
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      const sectionAnchors = ['#services', '#about', '#testimonials', '#projects', '#partners'];
      
      if (sectionAnchors.includes(hash)) {
        setCurrentPath('#home');
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
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

  const testimonials = [
    {
      quote: "Renovating your house is not an easy process, but working with Havenridge Build made it feel relatively painless. We are so happy with our finished space and will definitely hire Havenridge again for our future plans.",
      author: "KELLY S."
    },
    {
      quote: "We are just thrilled with everything done thus far and look forward to the work yet to come. Micheal Smith and team, thank you most sincerely. You guys really are the best and we can honestly say you have made our house a home.",
      author: "PAULA & KEVIN D."
    },
    {
      quote: "The Havenridge team was efficient, worked hard and were here when they said they would be. When they left every day the worksite was clean and ready for us. The daily communication Micheal provided was amazing.",
      author: "DAN & JULIE G."
    },
    {
      quote: "What separates Havenridge Build from other companies is the last 10%. Every detail is attended to, with no loose ends at the finish! In thirty years of dealing with contractors, this is rare. We highly recommend their services.",
      author: "LORI & GEORGE R."
    }
  ];

  const portfolioProjects = [
    { name: '190 Piccadilly Square', cat: 'Kitchen Renovation', hash: '#project-kitchens', img: '/project_images/piccadilly/1.png' },
    { name: 'McNamara Bathrooms', cat: 'Bespoke Bathroom Retreat', hash: '#project-bathrooms', img: '/project_images/mcnamara/1.png' },
    { name: '23 Paisley Heights', cat: 'Architectural Living Space', hash: '#project-living-spaces', img: '/project_images/paisley/10.png' },
    { name: 'Kuntz House', cat: 'Main Floor Addition & ADU', hash: '#project-additions', img: '/project_images/kuntz/3.jpg' },
    { name: 'Verhoeve House', cat: 'Premium Finished Basement', hash: '#project-basements', img: '/project_images/verhoeve/6.jpg' },
    { name: 'Borkhoff Garage', cat: 'Detached Workshop & Garage', hash: '#project-garages', img: '/project_images/borkhoff/10.png' },
  ];

    const inspirationItems = [
    { title: 'BATHROOMS', subtitle: 'Spa-Like Retreats & Custom Vanities', img: '/project_images/mcnamara/2.png', link: '#project-bathrooms' },
    { title: 'KITCHENS', subtitle: 'Master Cabinetry & Quartz Islands', img: '/project_images/piccadilly/2.png', link: '#project-kitchens' },
    { title: 'LIVING SPACES', subtitle: 'Custom Fireplaces & Oak Built-Ins', img: '/project_images/paisley/11.png', link: '#project-living-spaces' },
    { title: 'ADDITIONS', subtitle: 'Multi-Story Extensions & ADU Suites', img: '/project_images/kuntz/4.jpg', link: '#project-additions' },
    { title: 'BASEMENTS', subtitle: 'Lower-Level Bars & Media Lounges', img: '/project_images/verhoeve/16.jpg', link: '#project-basements' },
    { title: 'GARAGES', subtitle: 'Executive Workshops & Storage Lofts', img: '/project_images/borkhoff/11.png', link: '#project-garages' },
    { title: 'BATHROOMS', subtitle: 'Double Showers & Soaking Tubs', img: '/project_images/ouellette/2.png', link: '#project-bathrooms' },
    { title: 'KITCHENS', subtitle: 'Open-Concept Culinary Hubs', img: '/project_images/piccadilly/3.png', link: '#project-kitchens' },
    { title: 'LIVING SPACES', subtitle: 'Open Family Living Layouts', img: '/project_images/paisley/12.png', link: '#project-living-spaces' },
    { title: 'ADDITIONS', subtitle: 'Sunrooms & Garden Suites', img: '/project_images/kuntz/19.jpg', link: '#project-additions' },
    { title: 'BASEMENTS', subtitle: 'Private Gyms & Guest Suites', img: '/project_images/verhoeve/24.jpg', link: '#project-basements' },
    { title: 'GARAGES', subtitle: 'Automotive Storage & Workshop Loft', img: '/project_images/borkhoff/12.png', link: '#project-garages' }
  ];

  const galleryCategories = [
    { title: 'BATHROOMS', hash: '#project-bathrooms', img: '/project_images/mcnamara/1.png' },
    { title: 'KITCHENS', hash: '#project-kitchens', img: '/project_images/piccadilly/1.png' },
    { title: 'LIVING SPACES', hash: '#project-living-spaces', img: '/project_images/paisley/10.png' },
    { title: 'ADDITIONS', hash: '#project-additions', img: '/project_images/kuntz/3.jpg' },
    { title: 'BASEMENTS', hash: '#project-basements', img: '/project_images/verhoeve/6.jpg' },
    { title: 'GARAGES', hash: '#project-garages', img: '/project_images/borkhoff/10.png' },
  ];

  // Project pages details configuration (Cass Construction Editorial style layout)
  const projectDetails = {
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
              <img src="/logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
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

        {/* EDITORIAL BLOCKS (CASS-STYLE INLINE LAYOUT) */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 space-y-12">
            <div className="space-y-4">
              <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">PROJECT PROFILE</span>
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2638] leading-tight">{proj.title}</h1>
              <p className="font-drama text-2xl text-[#24313A]/70 italic leading-relaxed pt-2">{proj.leadDesc}</p>
            </div>
            
            <div className="text-sm text-[#24313A]/80 leading-relaxed space-y-6 font-light">
              <p>{proj.desc1}</p>
            </div>

            {/* In-feed large detail image */}
            <div className="w-full aspect-[16/10] overflow-hidden shadow-md py-4">
              <img src={proj.img2} alt="Project detail visual" className="w-full h-full object-cover" />
            </div>

            <div className="text-sm text-[#24313A]/80 leading-relaxed space-y-6 font-light">
              <p>{proj.desc2}</p>
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
        <footer className="bg-[#0B2638] text-white/40 py-10 text-center text-xs font-sans">
          <p className="text-[#CDAE72] mb-2">DESIGN · BUILD · RENOVATE</p>
          <p>© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
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
              <img src="/logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </a>
          </div>
        </nav>

        {/* HERO SPLIT IMAGE BANNER (CASS STYLE) */}
        <section className="grid grid-cols-2 gap-2 h-[250px] sm:h-[350px] overflow-hidden bg-[#0B2638]">
          <img src="/project_images/piccadilly/1.png" alt="Kitchen highlight" className="w-full h-full object-cover opacity-80" />
          <img src="/project_images/mcnamara/1.png" alt="Bathroom highlight" className="w-full h-full object-cover opacity-80" />
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

        {/* INSPIRATION GALLERY ANIMATED CAROUSEL SECTION */}
        <section id="inspiration-section" className="py-24 bg-[#0B2638] text-white overflow-hidden relative border-t border-[#CDAE72]/20">
          <div className="max-w-7xl mx-auto px-6 mb-12 text-center space-y-3">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">DESIGN INSPIRATION</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-white">Inspiration Gallery</h2>
            <p className="text-white/70 text-sm font-light max-w-xl mx-auto">
              Explore bespoke designs and specifications. Hover over any image to pause the carousel and expand the preview.
            </p>
          </div>

          {/* INFINITE ANIMATED MARQUEE ROW */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="flex space-x-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {inspirationItems.map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.link} 
                  className="relative w-72 sm:w-80 h-[440px] shrink-0 overflow-hidden rounded-md group transition-all duration-500 hover:scale-105 hover:z-20 cursor-pointer shadow-2xl border border-white/10"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638] via-[#0B2638]/40 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300">
                    <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.2em] uppercase">INSPIRATION</span>
                    <h3 className="text-white font-cinzel text-xl font-bold tracking-wide mt-1 group-hover:text-[#CDAE72] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs font-drama italic mt-1 opacity-80 group-hover:opacity-100">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              ))}
              {/* DUPLICATE ARRAY FOR SEAMLESS INFINITE LOOP */}
              {inspirationItems.map((item, idx) => (
                <a 
                  key={`dup-${idx}`} 
                  href={item.link} 
                  className="relative w-72 sm:w-80 h-[440px] shrink-0 overflow-hidden rounded-md group transition-all duration-500 hover:scale-105 hover:z-20 cursor-pointer shadow-2xl border border-white/10"
                >
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638] via-[#0B2638]/40 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300">
                    <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.2em] uppercase">INSPIRATION</span>
                    <h3 className="text-white font-cinzel text-xl font-bold tracking-wide mt-1 group-hover:text-[#CDAE72] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs font-drama italic mt-1 opacity-80 group-hover:opacity-100">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/40 py-10 text-center text-xs font-sans border-t border-white/10">
          <p className="text-[#CDAE72] mb-2">DESIGN · BUILD · RENOVATE</p>
          <p>© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
          <p className="text-white/40 text-[11px] mt-2 font-sans">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] hover:underline font-semibold">BoostMyLeads</a></p>
        </footer>

      </div>
    );
  }

  // Render dedicated About page (CASS STYLE WITH SEO VALUES & CAREERS MODAL)
  if (currentPath === '#about-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        
        {/* NAV HEADER */}
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="/logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
            </a>
            <a href="#home" className="text-xs font-sans font-bold tracking-widest uppercase hover:text-[#CDAE72] transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> BACK TO HOME
            </a>
          </div>
        </nav>

        {/* HERO TITLE SECTION */}
        <section className="bg-[#0B2638] text-white py-24 text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">ABOUT HAVENRIDGE BUILD</span>
            <h1 className="font-cinzel text-4xl sm:text-5xl font-bold tracking-wider text-white">Our Story & Core Values</h1>
            <p className="text-white/80 text-base font-light max-w-2xl mx-auto leading-relaxed pt-2">
              Premier residential renovation and custom construction general contractor serving Kitchener-Waterloo, Cambridge, and surrounding regions.
            </p>
          </div>
        </section>

        {/* SEO-OPTIMIZED COMPANY VALUES SECTION (BEFORE TEAM PROFILES) */}
        <section id="company-values" className="py-20 bg-white border-b border-[#0B2638]/10">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">BUILDING STANDARDS</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Why Homeowners Trust Havenridge</h2>
              <p className="text-sm text-[#24313A]/80 leading-relaxed">
                We combine personal owner-level accountability with disciplined project management systems. As a leading general contractor serving Kitchener-Waterloo, Cambridge, and Oxford County, here is how we deliver a superior residential renovation experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              
              <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left">
                <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">01 / PRE-CONSTRUCTION</span>
                <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Disciplined Planning & Scope Clarity</h3>
                <p className="text-sm text-[#24313A]/80 leading-relaxed">
                  Every successful residential renovation begins with clear pre-construction planning. By establishing detailed scope documents, selection schedules, and fixed permit layouts early, we eliminate mid-project surprises and budget creep.
                </p>
              </div>

              <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left">
                <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">02 / CRAFTSMANSHIP</span>
                <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Uncompromising Quality & Millwork</h3>
                <p className="text-sm text-[#24313A]/80 leading-relaxed">
                  From structural timber roof additions to custom white-oak cabinetry, heated bathroom floors, and quartz island installations, we hold every trade phase to exact Ontario Building Code and high-end finish standards.
                </p>
              </div>

              <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left">
                <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">03 / ACCOUNTABILITY</span>
                <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Transparent Client Portal Communication</h3>
                <p className="text-sm text-[#24313A]/80 leading-relaxed">
                  Through our Buildern client portal, homeowners enjoy 24/7 access to daily job logs, site photos, selection approvals, and real-time schedules. Communication is direct, documented, and proactive.
                </p>
              </div>

              <div className="p-8 bg-[#F4F2EE] rounded-sm space-y-3 border-l-4 border-[#CDAE72] text-left">
                <span className="text-xs font-sans font-bold tracking-widest text-[#CDAE72] uppercase block">04 / RESPECT & WARRANTY</span>
                <h3 className="font-cinzel text-xl font-bold text-[#0B2638]">Clean Job Sites & Warranty Defense</h3>
                <p className="text-sm text-[#24313A]/80 leading-relaxed">
                  We respect your sanctuary. Our teams enforce strict dust containment, daily jobsite cleanup, and courteous site management—standing behind all completed work with dedicated homeowner warranty support.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* TEAM MEMBERS GRID */}
        <section id="team" className="py-24 bg-[#F4F2EE]">
          <div className="max-w-6xl mx-auto px-6 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">LEADERSHIP & TRADES</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Meet Our Team</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              
              {/* Michael Smith */}
              <div className="space-y-6 text-left bg-white p-8 rounded-sm shadow-md">
                <div className="aspect-[4/5] overflow-hidden bg-[#0B2638]/10 shadow-sm rounded-sm">
                  <img src="/michael_smith.jpg" alt="Michael Smith - Founder & General Contractor" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase">FOUNDER & GENERAL CONTRACTOR</span>
                  <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">Michael Smith</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed pt-2">
                    Michael leads Havenridge Build with over 15 years of residential construction expertise. His hands-on leadership ensures every custom build, main floor addition, and whole-home renovation is executed with disciplined project management and finish quality.
                  </p>
                </div>
              </div>

              {/* David Woo */}
              <div className="space-y-6 text-left bg-white p-8 rounded-sm shadow-md">
                <div className="aspect-[4/5] overflow-hidden bg-[#0B2638]/10 shadow-sm rounded-sm">
                  <img src="/david_woo.jpg" alt="David Woo - Site Supervisor" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2">
                  <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase">SITE SUPERVISOR</span>
                  <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">David Woo</h3>
                  <p className="text-sm text-[#24313A]/80 leading-relaxed pt-2">
                    I started my career as a framer and went back to school at Conestoga College for the pre-apprenticeship program and am a second year apprentice.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WORK WITH US SECTION */}
        <section id="work-with-us" className="py-20 bg-[#0B2638] text-white text-center">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">CAREERS & TRADES</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-white">Work With Us</h2>
            <p className="text-white/80 text-sm font-light max-w-xl mx-auto leading-relaxed">
              We are expanding our team of skilled carpenters, site supervisors, apprentices, and licensed trade partners. If you take pride in craftsmanship and accountability, apply today.
            </p>
            <div>
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
        <footer className="bg-[#0B2638] text-white/40 py-10 text-center text-xs font-sans border-t border-white/10">
          <p className="text-[#CDAE72] mb-2">DESIGN · BUILD · RENOVATE</p>
          <p>© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
          <p className="text-white/40 text-[11px] mt-2 font-sans">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] hover:underline font-semibold">BoostMyLeads</a></p>
        </footer>

      </div>
    );
  }

  // Render contact page
  if (currentPath === '#contact-page') {
    return (
      <div ref={compRef} className="min-h-screen bg-[#F4F2EE] text-[#24313A] font-sans antialiased selection:bg-[#CDAE72] selection:text-[#0B2638]">
        
        {/* NAV HEADER */}
        <nav className="sticky top-0 z-50 bg-[#0B2638] text-white shadow-md">
          <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            <a href="#home" className="flex items-center">
              <img src="/logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
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
                  <strong>Email Address:</strong> <a href="mailto:info@havenridgebuild.ca" className="text-[#0B2638] font-bold hover:text-[#CDAE72] transition-colors">info@havenridgebuild.ca</a>
                </p>
                <p>
                  <strong>Service Area:</strong> Serving Kitchener, Waterloo, Cambridge, and surrounding Oxford County communities.
                </p>
              </div>

              <div className="pt-6 border-t border-[#0B2638]/10 space-y-3">
                <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase block">CERTIFICATIONS</span>
                <div className="flex flex-wrap gap-4 text-xs font-sans font-bold text-[#0B2638] uppercase">
                  <span>RENOMARK CERTIFIED</span>
                  <span className="text-white/20">|</span>
                  <span>BAEUMLER APPROVED</span>
                  <span className="text-white/20">|</span>
                  <span>WRHBA MEMBER</span>
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

        {/* FOOTER */}
        <footer className="bg-[#0B2638] text-white/40 py-10 text-center text-xs font-sans border-t border-white/10">
          <p className="text-[#CDAE72] mb-2">DESIGN · BUILD · RENOVATE</p>
          <p>© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</p>
          <p className="text-white/40 text-[11px] mt-2 font-sans">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] hover:underline font-semibold">BoostMyLeads</a></p>
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
            <img src="/logo_horizontal_dark.svg" className="h-11 sm:h-13 md:h-16 w-auto transition-transform hover:scale-105" alt="Havenridge Build Logo" />
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
              </div>
            </div>

            {/* 2. Our Process */}
            <a href="#about" className="hover:text-[#CDAE72] transition-colors">Our Process</a>

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
      <section id="services" className="py-24 bg-[#F4F2EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 cass-reveal text-center">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block mb-2">SERVICES</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Havenridge Build's Residential Renovation and Construction Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {servicePillars.map((s, idx) => (
              <div key={idx} className="cass-reveal flex flex-col items-center text-center space-y-4 group">
                <div className="space-y-2 max-w-sm px-2">
                  <h3 className="font-cinzel text-xl font-bold text-[#0B2638] uppercase tracking-wider whitespace-nowrap">{s.title}</h3>
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
                    <a 
                      href={s.hash} 
                      className="flex items-center justify-center space-x-4 text-xs font-sans tracking-widest text-[#CDAE72] uppercase mt-10 hover:text-white transition-colors"
                    >
                      <span className="w-12 h-px bg-[#CDAE72]/50"></span>
                      <span>LEARN MORE</span>
                      <span className="w-12 h-px bg-[#CDAE72]/50"></span>
                    </a>
                  </div>
                </div>
              </div>
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


      {/* ABOUT US / OUR PROCESS */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block mb-2">OUR PROCESS</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Crafting Spaces Made To Last</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {valuePillars.map((v, idx) => (
              <div key={idx} className="cass-reveal space-y-3">
                <h3 className="font-cinzel text-2xl font-bold text-[#0B2638]">{v.title}</h3>
                <p className="text-xs text-[#24313A]/75 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#F4F2EE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 cass-reveal">
            <div>
              <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block mb-2">FROM OUR CLIENTS</span>
              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[#0B2638]">Client Experiences</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {testimonials.map((t, idx) => (
              <div key={idx} className="cass-reveal space-y-4">
                <p className="text-xs text-[#24313A]/80 leading-relaxed font-light">"{t.quote}"</p>
                <div className="text-xs font-sans font-bold text-[#0B2638] uppercase">
                  \ - {t.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANIMATED INSPIRATION GALLERY SECTION (ANCHOR) */}
      <section id="inspiration-section" className="py-24 bg-[#0B2638] text-white overflow-hidden relative border-t border-[#CDAE72]/20">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center space-y-3">
          <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block">DESIGN INSPIRATION</span>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-white">Inspiration Gallery</h2>
          <p className="text-white/70 text-sm font-light max-w-xl mx-auto">
            Click on any project type below to explore bespoke designs and specifications. Hover over any image to pause the carousel and expand the preview.
          </p>
        </div>

        {/* INFINITE ANIMATED MARQUEE ROW */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="flex space-x-6 w-max animate-marquee hover:[animation-play-state:paused]">
            {inspirationItems.map((item, idx) => (
              <a 
                key={idx} 
                href={item.link} 
                className="relative w-72 sm:w-80 h-[440px] shrink-0 overflow-hidden rounded-md group transition-all duration-500 hover:scale-105 hover:z-20 cursor-pointer shadow-2xl border border-white/10"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638] via-[#0B2638]/40 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.2em] uppercase">INSPIRATION</span>
                  <h3 className="text-white font-cinzel text-xl font-bold tracking-wide mt-1 group-hover:text-[#CDAE72] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs font-drama italic mt-1 opacity-80 group-hover:opacity-100">
                    {item.subtitle}
                  </p>
                </div>
              </a>
            ))}
            {/* DUPLICATE ARRAY FOR SEAMLESS INFINITE LOOP */}
            {inspirationItems.map((item, idx) => (
              <a 
                key={`dup-${idx}`} 
                href={item.link} 
                className="relative w-72 sm:w-80 h-[440px] shrink-0 overflow-hidden rounded-md group transition-all duration-500 hover:scale-105 hover:z-20 cursor-pointer shadow-2xl border border-white/10"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2638] via-[#0B2638]/40 to-transparent flex flex-col justify-end p-6 text-left transition-opacity duration-300">
                  <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-[0.2em] uppercase">INSPIRATION</span>
                  <h3 className="text-white font-cinzel text-xl font-bold tracking-wide mt-1 group-hover:text-[#CDAE72] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs font-drama italic mt-1 opacity-80 group-hover:opacity-100">
                    {item.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED PARTNERS (LOGOS SIZED UP BY 30% AGAIN - cell h-36, logos h-26/h-24) */}
      <section id="partners" className="py-16 md:py-20 bg-[#0B2638] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#CDAE72] text-xs font-sans font-bold tracking-[0.25em] uppercase block mb-10">TRUSTED PARTNERS</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12 justify-items-center max-w-4xl mx-auto opacity-95">
            <div className="h-36 flex items-center justify-center w-full">
              <img src="/renomark.png" alt="RenoMark Certified" className="h-26 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-36 flex items-center justify-center w-full">
              <img src="/baumler.png" alt="Baeumler Approved" className="h-26 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-36 flex items-center justify-center w-full">
              <img src="/wrhba.png" alt="WRHBA Member" className="h-24 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-36 flex items-center justify-center w-full">
              <img src="/cambridge_chamber.png" alt="Cambridge Chamber of Commerce" className="h-26 w-auto object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (WITH SOCIAL ICONS) */}
      <footer className="bg-[#0B2638] text-white pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-3">
            <span className="font-cinzel text-xl font-bold tracking-widest text-white block">HAVENRIDGE BUILD</span>
            <span className="text-[#CDAE72] text-xs font-sans tracking-widest uppercase block">DESIGN · BUILD · RENOVATE</span>
            <p className="text-xs text-white/70 leading-relaxed pt-2">
              Serving Kitchener, Waterloo, Cambridge, and Oxford County with exceptional craftsmanship.
            </p>
          </div>

          <div>
            <h5 className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase mb-4">Navigation</h5>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li><a href="#services" className="hover:text-[#CDAE72]">Services</a></li>
              <li><a href="#about" className="hover:text-[#CDAE72]">Our Process</a></li>
              <li><a href="#projects" className="hover:text-[#CDAE72]">Our Work</a></li>
              <li><a href="#contact-page" className="hover:text-[#CDAE72]">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase mb-4">Services</h5>
            <ul className="space-y-2 text-xs font-sans text-white/70">
              <li>Additions and ADU's</li>
              <li>Whole Home Renovations</li>
              <li>Multi-Unit Conversions</li>
            </ul>
          </div>

          <div>
            <h5 className="text-[#CDAE72] text-xs font-sans font-bold tracking-widest uppercase mb-4">Stay Connected</h5>
            {newsletterSubmitted ? (
              <p className="text-xs font-sans text-[#CDAE72]">Subscribed successfully!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <p className="text-[11px] text-white/70">Subscribe to our newsletter for project highlights & inspiration.</p>
                <input 
                  type="email" 
                  required 
                  placeholder="Email Address" 
                  className="w-full bg-[#17365D] border-b border-[#CDAE72]/50 px-3 py-2 text-xs text-white placeholder-white/50 outline-none focus:border-[#CDAE72]" 
                />
                <button type="submit" className="w-full bg-[#CDAE72] text-[#0B2638] font-bold py-2 text-xs font-sans tracking-widest uppercase hover:bg-white transition-all">
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* SOCIAL LINKS ROW */}
        <div className="max-w-7xl mx-auto px-6 mb-8 border-t border-white/5 pt-8 flex justify-center space-x-6 text-[#CDAE72] opacity-80">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Facebook">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1H13c-3 0-4 2-4 4v3z"/></svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051c-.058 1.28-.072 1.688-.072 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.26-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Linkedin">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Youtube">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.107C19.525 3.545 12 3.545 12 3.545s-7.525 0-9.388.511a3.003 3.003 0 00-2.11 2.107C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 002.11 2.107c1.863.514 9.388.514 9.388.514s7.525 0 9.388-.514a3.003 3.003 0 002.11-2.107C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="https://houzz.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Houzz"><img src="/houzz.avif" className="w-5 h-5 object-contain" alt="Houzz" /></a>
          <a href="https://yelp.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" title="Yelp"><img src="/yelp.avif" className="w-5 h-5 object-contain" alt="Yelp" /></a>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-2 flex flex-col md:flex-row justify-between items-center text-[11px] font-sans text-white/40 gap-2">
          <span>DESIGN · BUILD · RENOVATE</span>
          <span>© 2026 Carpenters On The Go Inc., operating as Havenridge Build. All rights reserved.</span>
          <span className="text-white/40 font-sans">Developed by <a href="https://boostmyleads.ca" target="_blank" rel="noopener noreferrer" className="text-[#CDAE72] hover:underline font-semibold">BoostMyLeads</a></span>
        </div>
      </footer>


      {/* GLOBAL CAREERS POPUP MODAL */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#0B2638]/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white text-[#24313A] max-w-xl w-full rounded-sm shadow-2xl overflow-hidden relative my-8">
            
            {/* MODAL HEADER */}
            <div className="bg-[#0B2638] text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-[#CDAE72] text-[10px] font-sans font-bold tracking-widest uppercase block">JOIN HAVENRIDGE BUILD</span>
                <h3 className="font-cinzel text-xl font-bold">Work With Us Application</h3>
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
