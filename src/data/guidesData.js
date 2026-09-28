export const guideCategories = [
  { id: "all", name: "All Guides" },
  { id: "budget-planning", name: "Budget & Planning" },
  { id: "hiring", name: "Hiring a Contractor" },
  { id: "additions", name: "Additions" },
  { id: "basements-adus", name: "Basements & ADUs" },
  { id: "accessibility", name: "Accessibility & Aging-in-Place" },
  { id: "permits", name: "Permits & Regulations" }
];

export const guidesData = [
  {
    id: "aging-in-place",
    slug: "aging-in-place-renovations-waterloo-region",
    category: "accessibility",
    categoryLabel: "Adaptiv / Accessibility",
    priority: "Priority 1",
    title: "Aging-in-Place Renovations in Waterloo Region",
    subtitle: "Creating a safe, accessible, and elegant home for long-term mobility and comfort.",
    author: "Havenridge Technical Team",
    date: "August 30, 2026",
    readTime: "8 min read",
    img: "/project_images/Appledale_Crescent/Appledale_3.jpg",
    quickAnswer: "Aging-in-place renovation is about making a home safer and easier to use without making it feel institutional. Common priorities include step-free or safer entries, better lighting, wider clearances, accessible bathrooms, easier kitchen storage, improved flooring transitions, safer stairs and planning for future mobility needs. The best time to incorporate these ideas is during a renovation that is already opening walls or changing layouts.",
    tableOfContents: [
      { id: "entry-circulation", title: "01. Entry and Circulation" },
      { id: "bathroom-safety", title: "02. Bathroom Safety & Accessibility" },
      { id: "kitchen-usability", title: "03. Kitchen Usability & Access" },
      { id: "lighting-flooring", title: "04. Lighting, Flooring & Stairs" },
      { id: "phased-planning", title: "05. Phased Planning for Future Needs" }
    ],
    sections: [
      {
        id: "entry-circulation",
        heading: "01. Entry and Circulation",
        content: "Navigating the home comfortably starts at the front threshold. Eliminating step barriers, widening interior doorways to a minimum 32–36 inches, and providing clear hallway turning radiuses allow full mobility without architectural constriction. When planning entry threshold updates, integrated low-profile thresholds and ramped entryways can be finished with natural stone or hardwood to blend seamlessly with surrounding architecture."
      },
      {
        id: "bathroom-safety",
        heading: "02. Bathroom Safety & Accessibility",
        content: "Bathrooms represent one of the most high-priority areas for accessibility updates. A curbless (zero-threshold) walk-in shower with linear drain, thermostatic anti-scald valves, custom blocking for reinforced grab bars concealed behind luxury tile, and comfort-height toilets create a resort-style bathroom that simultaneously supports mobility and fall prevention."
      },
      {
        id: "kitchen-usability",
        heading: "03. Kitchen Usability & Access",
        content: "Modern kitchen accessibility focuses on ergonomics and reachability. Pull-down cabinet hardware, deep full-extension drawer banks instead of lower doors, side-swing wall ovens, and varied countertop heights ensure that prep space remains comfortable for all family members regardless of height or mobility."
      },
      {
        id: "lighting-flooring",
        heading: "04. Lighting, Flooring & Stairs",
        content: "Enhanced illumination and slip-resistant surfaces significantly improve daily safety. Low-glare LED step lighting along staircases, continuous flush flooring transitions (avoiding raised transition strips), and high-contrast stair nosing improve spatial awareness without aesthetic compromise."
      },
      {
        id: "phased-planning",
        heading: "05. Phased Planning for Future Needs",
        content: "Incorporating structural backing in bathroom walls, roughing in elevator shafts or main-floor bedroom suite plumbing during a main renovation phase saves substantial cost if future adaptations become necessary."
      }
    ]
  },

  {
    id: "verify-contractor",
    slug: "how-to-verify-renovation-contractor-ontario",
    category: "hiring",
    categoryLabel: "Hiring a Contractor",
    priority: "Priority 1",
    title: "How to Verify a Renovation Contractor in Ontario",
    subtitle: "A homeowner's essential checklist for checking licensing, WSIB, insurance, and reputation.",
    author: "Havenridge Technical Team",
    date: "August 30, 2026",
    readTime: "10 min read",
    img: "/project_images/mcdougall/addition_adu_stone_facade.jpg",
    quickAnswer: "Ontario does not have a general provincial licensing regime for renovation contractors. Verification therefore means checking the legal business identity, current liability insurance, WSIB clearance where applicable, municipal licensing where required, relevant private credentials or memberships, references, written contracts, and a documented change-order process. Do not rely on unverified claims of being 'provincially licensed'.",
    tableOfContents: [
      { id: "business-identity", title: "01. Verify Legal Business Identity" },
      { id: "liability-insurance", title: "02. Commercial Liability Insurance" },
      { id: "wsib-clearance", title: "03. WSIB Clearance Certificate" },
      { id: "municipal-licensing", title: "04. Municipal Contractor Licensing" },
      { id: "private-credentials", title: "05. Credentials & Member Bodies" },
      { id: "contracts-change-orders", title: "06. Written Contracts & Change Orders" }
    ],
    sections: [
      {
        id: "business-identity",
        heading: "01. Verify Legal Business Identity",
        content: "Ensure the contractor operates under a registered legal corporation or business name in Ontario. Verify their business registration (Master Business Licence or Ontario Corporate Number) and confirm that written quotes, contracts, and insurance certificates reflect the exact same legal name."
      },
      {
        id: "liability-insurance",
        heading: "02. Commercial Liability Insurance",
        content: "Request a direct Certificate of Insurance from the contractor's broker naming your property address if appropriate. A reputable renovation contractor carries minimum $2,000,000 to $5,000,000 in commercial general liability insurance to protect your property against accidental damage or third-party claims."
      },
      {
        id: "wsib-clearance",
        heading: "03. WSIB Clearance Certificate",
        content: "Under Ontario law, contractors and subcontractors working on residential properties must maintain Workplace Safety and Insurance Board (WSIB) coverage or valid exemptions. Request an eClearance certificate directly from WSIB Ontario to confirm the contractor is in good standing."
      },
      {
        id: "municipal-licensing",
        heading: "04. Municipal Contractor Licensing",
        content: "Check specific municipal licensing requirements. Cities like Kitchener, Waterloo, and Cambridge or local regional authorities may require specific contractor or trade licences for certain scope classifications."
      },
      {
        id: "private-credentials",
        heading: "05. Credentials & Member Bodies",
        content: "Verify memberships such as RenoMark, CHBA (Canadian Home Builders' Association), or Baeumler Approved directly on the issuing association's official directory. Private memberships validate professional standards but are distinct from municipal building permits."
      },
      {
        id: "contracts-change-orders",
        heading: "06. Written Contracts & Change Orders",
        content: "A professional contractor provides a detailed written agreement specifying itemized scopes, payment schedules linked to verifiable milestones, warranty terms, and a formal written change-order procedure."
      }
    ]
  },

  {
    id: "contractor-questions",
    slug: "questions-to-ask-renovation-contractor-ontario",
    category: "hiring",
    categoryLabel: "Hiring a Contractor",
    priority: "Priority 1",
    title: "Questions to Ask a Renovation Contractor Before Signing a Contract in Ontario",
    subtitle: "Key questions on project management, permits, change orders, and payment terms.",
    author: "Havenridge Technical Team",
    date: "August 30, 2026",
    readTime: "9 min read",
    img: "/project_images/knox/whole_home_white_kitchen.jpg",
    quickAnswer: "Before signing, homeowners should understand exactly who is responsible for design, permits, scheduling, site supervision, selections, changes, payment milestones, cleanup, insurance and warranty. A strong contractor should be willing to explain the process in writing and show how decisions and changes are documented.",
    tableOfContents: [
      { id: "legal-entity", title: "01. Legal Entity & Background" },
      { id: "scope-inclusions", title: "02. Scope Inclusions & Exclusions" },
      { id: "permits-design", title: "03. Permits & Design Coordination" },
      { id: "change-process", title: "04. Change Order Pricing & Approval" },
      { id: "insurance-warranty", title: "05. Insurance, References & Warranty" }
    ],
    sections: [
      {
        id: "legal-entity",
        heading: "01. Legal Entity & Background",
        content: "Ask: 'What is the full legal corporate name of your business, how long have you been operating under this identity, and who will be my primary point of contact on site daily?'"
      },
      {
        id: "scope-inclusions",
        heading: "02. Scope Inclusions & Exclusions",
        content: "Ask: 'Does this estimate include all structural engineering, trade permits, architectural drawings, material procurement, site protection, and post-construction cleaning?'"
      },
      {
        id: "permits-design",
        heading: "03. Permits & Design Coordination",
        content: "Ask: 'Who handles the municipal permit submission with Cambridge/Kitchener/Waterloo building departments, and what happens if municipal plan examiners request revisions?'"
      },
      {
        id: "change-process",
        heading: "04. Change Order Pricing & Approval",
        content: "Ask: 'How are unexpected hidden conditions (e.g., legacy wiring, structural deficiencies) documented, priced, and approved before extra cost is incurred?'"
      },
      {
        id: "insurance-warranty",
        heading: "05. Insurance, References & Warranty",
        content: "Ask: 'Can you provide a current WSIB clearance certificate, certificate of insurance, 3 recent homeowner references for similar scopes, and your written warranty document?'"
      }
    ]
  },

  {
    id: "kitchen-cost",
    slug: "kitchen-renovation-cost-waterloo-region",
    category: "budget-planning",
    categoryLabel: "Budget & Planning",
    priority: "Priority 1",
    title: "How Much Does a Kitchen Renovation Cost in Waterloo Region?",
    subtitle: "Understanding layout changes, custom cabinetry, countertops, plumbing, and trade costs.",
    author: "Havenridge Technical Team",
    date: "August 30, 2026",
    readTime: "9 min read",
    img: "/project_images/Appledale_Crescent/appledale_kitchen_full_wide.jpg",
    quickAnswer: "A kitchen renovation can range from a focused update to a major reconfiguration, so there is no responsible one-price answer. The biggest cost drivers are cabinetry, layout changes, plumbing and electrical work, structural changes, appliance level, countertops, flooring and finish selections. Havenridge publishes verified investment ranges during pre-construction planning.",
    tableOfContents: [
      { id: "cost-drivers", title: "01. What Drives the Investment Most?" },
      { id: "inclusions-exclusions", title: "02. Inclusions and Exclusions" },
      { id: "moving-walls", title: "03. Moving Walls & Plumbing" },
      { id: "timelines", title: "04. Planning & Construction Timelines" },
      { id: "allowances", title: "05. Handling Allowances & Selections" }
    ],
    sections: [
      {
        id: "cost-drivers",
        heading: "01. What Drives the Investment Most?",
        content: "Custom cabinetry and layout structural changes account for the largest proportion of a major kitchen budget. High-grade quartz or porcelain slabs, sub-zero or commercial-grade appliance packages, custom millwork, and electrical panel upgrades further shape the overall scope."
      },
      {
        id: "inclusions-exclusions",
        heading: "02. Inclusions and Exclusions",
        content: "A complete professional proposal includes trade labor (plumbing, electrical, HVAC), tile installation, dryfitting, framing modifications, waste disposal, site containment, and project management."
      },
      {
        id: "moving-walls",
        heading: "03. Moving Walls & Plumbing",
        content: "Relocating sinks, gas lines, or removing load-bearing walls requiring engineered LVL beams introduces specialized trade involvement, engineering drawings, and municipal inspections."
      },
      {
        id: "timelines",
        heading: "04. Planning & Construction Timelines",
        content: "Pre-construction design and cabinet fabrication typically require 6–10 weeks, while on-site construction generally spans 4–8 weeks depending on structural complexity."
      },
      {
        id: "allowances",
        heading: "05. Handling Allowances & Selections",
        content: "Establishing clear allowances for lighting, plumbing fixtures, and tile ensures accurate preliminary budgeting before final line-item selections are confirmed."
      }
    ]
  },

  {
    id: "addition-cost",
    slug: "home-addition-cost-waterloo-region",
    category: "additions",
    categoryLabel: "Additions",
    priority: "Priority 1",
    title: "How Much Does a Home Addition Cost in Waterloo Region?",
    subtitle: "Navigating foundations, structural tie-ins, mechanical extensions, and permits.",
    author: "Havenridge Technical Team",
    date: "August 30, 2026",
    readTime: "11 min read",
    img: "/project_images/Huntingwood_Court/Huntingwood_1.png",
    quickAnswer: "The cost of an addition depends heavily on what is being added and how the new space connects to the existing home. A simple single-storey expansion, a second-storey addition and a fully serviced suite can have very different structural, foundation, mechanical and design requirements. Homeowners should budget from a verified scope, drawings and site conditions rather than a generic cost-per-square-foot number.",
    tableOfContents: [
      { id: "addition-types", title: "01. Addition Type & Size" },
      { id: "foundations-roof", title: "02. Foundation & Roof Tie-ins" },
      { id: "mechanical-impacts", title: "03. Mechanical & Plumbing Impacts" },
      { id: "engineering-permits", title: "04. Design, Engineering & Permits" },
      { id: "contingency-planning", title: "05. Site Access & Contingency" }
    ],
    sections: [
      {
        id: "addition-types",
        heading: "01. Addition Type & Size",
        content: "Ground-floor bump-outs, full rear additions, and second-storey pop-tops introduce distinct engineering requirements. Ground additions require excavating new footings, while second-storey additions require evaluating existing foundation load capacities."
      },
      {
        id: "foundations-roof",
        heading: "02. Foundation & Roof Tie-ins",
        content: "Seamlessly connecting new foundation walls, waterproofing membranes, and roof trusses to existing structures requires precision carpentry and weatherproofing protocols."
      },
      {
        id: "mechanical-impacts",
        heading: "03. Mechanical & Plumbing Impacts",
        content: "Extending HVAC ductwork, sizing up furnace/AC capacity, and upgrading electrical service panels (often from 100A to 200A) are essential components of addition planning."
      },
      {
        id: "engineering-permits",
        heading: "04. Design, Engineering & Permits",
        content: "Architectural plans, BCIN structural drawings, soils testing, site plan approval, and municipal building permits must precede any excavation work."
      },
      {
        id: "contingency-planning",
        heading: "05. Site Access & Contingency",
        content: "Evaluating machine access paths, protection for existing landscaping, and retaining an appropriate contingency reserve protects Against unseen underground conditions."
      }
    ]
  },

  {
    id: "adus-secondary-suites",
    slug: "adus-secondary-suites-waterloo-region",
    category: "basements-adus",
    categoryLabel: "ADUs & Suites",
    priority: "Priority 1",
    title: "ADUs & Secondary Suites in Waterloo Region",
    subtitle: "Understanding attached, detached, garden suite, and accessory residential unit rules.",
    author: "Havenridge Technical Team",
    date: "August 30, 2026",
    readTime: "12 min read",
    img: "/project_images/natchez/secondary_suite_exterior_entrance.jpg",
    quickAnswer: "This guide covers the broader additional-residential-unit (ARU/ADU) picture—including attached, detached, garden-suite and above-garage possibilities. Rules must be presented city by city because Cambridge, Kitchener and Waterloo do not share one universal unit-count, zoning or licensing regime. Current municipal sources must be checked immediately before planning.",
    tableOfContents: [
      { id: "aru-definitions", title: "01. What Counts as an ARU/ADU?" },
      { id: "cambridge-rules", title: "02. Cambridge Municipal Zoning" },
      { id: "kitchener-rules", title: "03. Kitchener Municipal Zoning" },
      { id: "waterloo-rules", title: "04. Waterloo Municipal Zoning" },
      { id: "servicing-capacity", title: "05. Servicing & Utilities" }
    ],
    sections: [
      {
        id: "aru-definitions",
        heading: "01. What Counts as an ARU/ADU?",
        content: "An Additional Residential Unit (ARU) or Accessory Dwelling Unit (ADU) is a self-contained residential unit with its own kitchen, bathroom, and entrance. Options include basement conversions, rear-yard detached garden suites, or secondary upper suites."
      },
      {
        id: "cambridge-rules",
        heading: "02. Cambridge Municipal Zoning",
        content: "Cambridge zoning provisions dictate setback distances, maximum height limitations for detached structures, and specific parking space requirements."
      },
      {
        id: "kitchener-rules",
        heading: "03. Kitchener Municipal Zoning",
        content: "Kitchener's Growing Together zoning framework governs unit allowances, lot coverage calculations, and tree preservation bylaws for accessory suites."
      },
      {
        id: "waterloo-rules",
        heading: "04. Waterloo Municipal Zoning",
        content: "Waterloo requires strict compliance with rental licensing regulations, egress clear width standards, and municipal water servicing connections."
      },
      {
        id: "servicing-capacity",
        heading: "05. Servicing & Utilities",
        content: "Water main entry sizing, sewer lateral capacity, separate electrical sub-panels, and dedicated HVAC/fire-separation assemblies must satisfy the Ontario Building Code."
      }
    ]
  }
,
  {
    id: "renovation-building-permits-waterloo-region",
    slug: "renovation-building-permits-waterloo-region",
    category: "permits",
    categoryLabel: "Permits & Regulations",
    priority: "Priority 2",
    title: "Do I Need a Building Permit for a Renovation in Waterloo Region? | Havenridge Build",
    subtitle: "Learn when home renovations in Cambridge, Kitchener and Waterloo typically require a building permit, what may not, and why project-specific confirmation matters.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/permit-waterloo.png",
    quickAnswer: "A building permit is commonly required when a renovation changes the structure, adds or removes walls, alters plumbing, changes the use of space, creates a new dwelling unit, or adds floor area. Cosmetic work may not require a municipal building permit, but the exact requirements depend on the work and the property.",
    tableOfContents: [
      { id: "sec-1", title: "01. Start With the Scope, Not the Project Price" },
      { id: "sec-2", title: "02. Work That Commonly Triggers Permits" },
      { id: "sec-3", title: "03. Work That May Not Need a Building Permit" },
      { id: "sec-4", title: "04. Cambridge, Kitchener, and Waterloo Are Not Identical" },
      { id: "sec-5", title: "05. Permits Are Only One Approval Stream" },
      { id: "sec-6", title: "06. How Havenridge Approaches Permit-Led Work" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. Start With the Scope, Not the Project Price",
        content: "A common misconception among homeowners is that the need for a building permit is tied to the total budget of a renovation. In reality, permit requirements are driven entirely by the nature of the work being performed and applicable municipal laws. Whether your project costs $10,000 or $100,000, if you are altering the structure or systems of your home, you will likely need a permit."
      },
      {
        id: "sec-2",
        heading: "02. Work That Commonly Triggers Permits",
        content: "There are several key triggers that almost always require a building permit. These include structural alterations, adding to the footprint of your home, moving or removing walls, and any significant plumbing or drain work. Additionally, altering door or window openings, finishing a basement, changing the primary use of a space, or adding a secondary residential unit will mandate formal municipal approval and inspection."
      },
      {
        id: "sec-3",
        heading: "03. Work That May Not Need a Building Permit",
        content: "Not every home improvement project requires municipal oversight. Purely cosmetic work—such as painting, decorating, or installing new flooring—typically falls outside the permit process. Replacing kitchen or bathroom cupboards without moving plumbing, swapping out same-size windows, or replacing roof shingles and exterior siding often do not require a building permit. However, it is important to remember that zoning or other specific approvals might still apply depending on your location."
      },
      {
        id: "sec-4",
        heading: "04. Cambridge, Kitchener, and Waterloo Are Not Identical",
        content: "While they are neighboring cities in the Waterloo Region, Cambridge, Kitchener, and Waterloo each have their own specific zoning bylaws, application steps, forms, and fee structures. A project that requires a specific variance in Kitchener might have a different pathway in Cambridge. Homeowners should always consult the exact municipal website for their property's jurisdiction rather than assuming region-wide uniformity."
      },
      {
        id: "sec-5",
        heading: "05. Permits Are Only One Approval Stream",
        content: "A municipal building permit is often just one piece of the regulatory puzzle. For instance, any significant electrical work requires a separate notification to the Electrical Safety Authority (ESA). Additionally, properties located in heritage districts or near conservation areas may require approvals from the Grand River Conservation Authority (GRCA) or local heritage committees before any building permits can be issued."
      },
      {
        id: "sec-6",
        heading: "06. How Havenridge Approaches Permit-Led Work",
        content: "At Havenridge Build, we handle the complexities of permit-led renovations so you don't have to. We coordinate the necessary design and drawing packages, involve structural engineers or BCIN designers when required, and manage the entire submission process. Throughout construction, we coordinate all mandatory municipal inspections and ensure that comprehensive project records are maintained for your peace of mind."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **Does a kitchen renovation need a permit?**\nIf you are simply replacing cabinets and countertops without moving plumbing or electrical, a permit is usually not required. However, removing walls or relocating fixtures will trigger the need for one.\n2. **Does a bathroom renovation need a permit?**\nSimilar to kitchens, cosmetic updates generally do not require a permit, but moving plumbing lines or expanding the bathroom footprint will.\n3. **Do I need a permit to remove a wall?**\nYes, especially if the wall is load-bearing. Even if you suspect it is just a partition wall, it is highly recommended to have it assessed and permitted.\n4. **Can I start demolition before the permit is issued?**\nIt is strongly advised not to. Starting work before obtaining a permit can lead to stop-work orders, fines, and complications if the permit is ultimately denied or requires design changes.\n5. **Who applies for the permit on a Havenridge project?**\nHavenridge typically acts as the authorized agent, coordinating the application, drawings, and correspondence on behalf of the homeowner.   Planning a renovation and unsure what approvals may apply? [Start Your Project with Havenridge Build](#) so the scope can be reviewed before construction begins."
      }
    ]
  },
  {
    id: "building-permit-vs-esa-electrical-notification",
    slug: "building-permit-vs-esa-electrical-notification",
    category: "permits",
    categoryLabel: "Permits & Regulations",
    priority: "Priority 2",
    title: "Building Permit vs ESA Electrical Permit in Ontario | Havenridge Build",
    subtitle: "A municipal building permit and an ESA electrical notification are different approvals. Learn when a renovation may need both and who is responsible for electrical compliance.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/esa-electrical.png",
    quickAnswer: "A municipal building permit is not the same thing as an Electrical Safety Authority (ESA) notification of work. Many renovations involving new or altered wiring require an ESA notification even when the homeowner already has a municipal building permit.",
    tableOfContents: [
      { id: "sec-1", title: "01. Two Different Systems" },
      { id: "sec-2", title: "02. When Electrical Work Typically Needs Notification" },
      { id: "sec-3", title: "03. Who Files It" },
      { id: "sec-4", title: "04. Inspection Stages" },
      { id: "sec-5", title: "05. Certificate of Acceptance" },
      { id: "sec-6", title: "06. Why This Matters on Renovations" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. Two Different Systems",
        content: "It is crucial to understand that municipal building departments and the Electrical Safety Authority (ESA) operate independently. While your local city hall administers building permits for structural and life-safety compliance, the ESA exclusively oversees electrical notifications and inspections under the Ontario Electrical Safety Code."
      },
      {
        id: "sec-2",
        heading: "02. When Electrical Work Typically Needs Notification",
        content: "According to the ESA, almost all electrical work must be reported by filing a notification before the work begins. Whether you are installing new pot lights, upgrading a panel, or rewiring a kitchen, a notification is generally required, subject to only a few very limited exceptions for minor maintenance."
      },
      {
        id: "sec-3",
        heading: "03. Who Files It",
        content: "By law, the person actually performing the electrical work must file the ESA notification. If you hire a general contractor who subcontracts the work, the Licensed Electrical Contractor (LEC) they bring in is responsible for filing. If Havenridge hires an LEC for your project, that specific electrical contractor files the notification under their license."
      },
      {
        id: "sec-4",
        heading: "04. Inspection Stages",
        content: "Electrical inspections typically occur in stages. A 'rough-in' inspection happens after wires are run but before walls are closed up with drywall. A 'final' inspection occurs once all fixtures, switches, and plates are installed. In some cases involving panel upgrades, a service inspection may also be required. The exact review path determined by the ESA depends on the complexity of the installation."
      },
      {
        id: "sec-5",
        heading: "05. Certificate of Acceptance",
        content: "Upon successful completion and final inspection of the electrical work, the ESA issues a Certificate of Acceptance. Homeowners should always retain this document as part of their permanent project closeout records, as it provides proof of legal, inspected electrical work for insurance purposes and future resale."
      },
      {
        id: "sec-6",
        heading: "06. Why This Matters on Renovations",
        content: "Major home improvements—such as kitchens, basements, additions, and whole-home renovations—often combine substantial structural changes with new wiring. Because these projects straddle both structural and electrical domains, they frequently trigger the need for both a municipal building permit and an ESA electrical notification."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **Is an ESA notification the same as a building permit?**\nNo. The ESA notification covers only electrical compliance, while a building permit covers structural, plumbing, and general building code compliance.\n2. **Can my general contractor do electrical work?**\nIn Ontario, electrical work must typically be performed by a Licensed Electrical Contractor (LEC). A general contractor should hire an LEC rather than doing the wiring themselves.\n3. **Who should keep the ESA Certificate of Acceptance?**\nThe homeowner should keep the final Certificate of Acceptance with their important home records.\n4. **Does every electrical change require an inspection?**\nAlmost all new installations and significant alterations require an ESA notification and subsequent inspection. Minor repairs like swapping a like-for-like light switch may be exempt, but it's always best to verify.   Ask how regulated electrical work will be handled before your renovation begins, and keep the final documentation with your home records. [Contact Havenridge Build](#) to discuss your next project."
      }
    ]
  },
  {
    id: "removing-load-bearing-wall-renovation-ontario",
    slug: "removing-load-bearing-wall-renovation-ontario",
    category: "additions",
    categoryLabel: "Additions",
    priority: "Priority 2",
    title: "Removing a Load-Bearing Wall in a Home Renovation | Havenridge Build",
    subtitle: "Removing a load-bearing wall can transform a floor plan, but it usually requires structural design, permits and careful construction sequencing. Here is what homeowners should expect.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/load-bearing-wall.png",
    quickAnswer: "A load-bearing wall cannot simply be treated like a partition wall. Creating a larger opening often requires structural assessment, engineered beam/post design, permit drawings, temporary support and coordinated construction.",
    tableOfContents: [
      { id: "sec-1", title: "01. How to Know Whether a Wall is Load-Bearing" },
      { id: "sec-2", title: "02. Structural Design Comes Before Demolition" },
      { id: "sec-3", title: "03. Permits and Drawings" },
      { id: "sec-4", title: "04. Temporary Support and Sequencing" },
      { id: "sec-5", title: "05. What Can Affect Cost" },
      { id: "sec-6", title: "06. Why This Often Appears in Kitchen and Main-Floor Renovations" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. How to Know Whether a Wall is Load-Bearing",
        content: "Determining if a wall is load-bearing cannot be done accurately with just a visual glance at the drywall. It requires a thorough review of existing framing, joist direction, roof loads, and foundation conditions. While walls running perpendicular to floor joists are often load-bearing, an expert assessment is essential to prevent catastrophic structural failure."
      },
      {
        id: "sec-2",
        heading: "02. Structural Design Comes Before Demolition",
        content: "Before a single stud is removed, a comprehensive structural plan must be established. The replacement system—comprising beam sizing, support posts, point loads, foundations, and hardware connections—must be calculated as an integrated whole to safely carry the weight that the wall previously supported."
      },
      {
        id: "sec-3",
        heading: "03. Permits and Drawings",
        content: "Because removing a load-bearing wall impacts the structural integrity of the home, it almost universally requires a municipal building permit. This application will need to be supported by detailed structural drawings, often stamped by a Professional Engineer (P.Eng) or qualified BCIN designer, demonstrating how the loads will be safely transferred."
      },
      {
        id: "sec-4",
        heading: "04. Temporary Support and Sequencing",
        content: "During the actual renovation, safety is paramount. Before the wall comes down, temporary shoring walls are constructed on either side to hold up the ceiling and roof loads. Only once this temporary support is secure is the old wall removed and the new structural beam hoisted into place and secured."
      },
      {
        id: "sec-5",
        heading: "05. What Can Affect Cost",
        content: "The cost of removing a load-bearing wall varies widely based on several factors. The span of the opening dictates the size and material of the beam (wood vs. steel). Hidden services like plumbing, HVAC, or electrical inside the wall will need to be relocated. Furthermore, new point loads may require digging into the basement floor to pour new concrete foundation footings."
      },
      {
        id: "sec-6",
        heading: "06. Why This Often Appears in Kitchen and Main-Floor Renovations",
        content: "Modern living often favors open-concept floor plans, making wall removal a staple of major main-floor and kitchen renovations. Transforming a compartmentalized layout into a cohesive, flowing space frequently requires structural work to be integrated seamlessly with new cabinetry layouts, continuous flooring, and updated lighting."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **Can I tell if a wall is load-bearing from the attic?**\nWhile inspecting the attic can provide clues regarding joist direction and roof bracing, it is rarely enough to make a definitive determination without examining the basement and intermediate floors.\n2. **Do I need an engineer to remove a load-bearing wall?**\nYes, in most municipalities, altering load-bearing structures requires design and sign-off by a licensed structural engineer or qualified designer to obtain a permit.\n3. **Can plumbing or electrical run through the wall being removed?**\nThey often do. If services are found inside the wall, they must be safely rerouted, which can add complexity and cost to the project.\n4. **Will the new beam be flush or dropped?**\nA 'flush' beam is recessed into the ceiling structure for a seamless look but is significantly more complex and expensive to install. A 'dropped' beam sits below the ceiling line and is generally simpler to install."
      }
    ]
  },
  {
    id: "adu-basement-apartment-coach-house-differences",
    slug: "adu-basement-apartment-coach-house-differences",
    category: "basements-adus",
    categoryLabel: "Basements & ADUs",
    priority: "Priority 2",
    title: "ADU vs Basement Apartment vs Coach House in Waterloo Region | Havenridge Build",
    subtitle: "Understand common terms for additional residential units in Cambridge, Kitchener and Waterloo, including basement apartments, attached units and detached coach houses.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/adu-vs-basement.png",
    quickAnswer: "Terms such as ADU, ARU, additional dwelling unit, additional residential unit, basement apartment and coach house can overlap, but the rules depend on the municipality and the physical form of the unit. The safest approach is to identify the proposed unit and then confirm the current zoning, permit and occupancy requirements for the property.",
    tableOfContents: [
      { id: "sec-1", title: "01. The Common Idea" },
      { id: "sec-2", title: "02. Inside the Main House" },
      { id: "sec-3", title: "03. Detached Units / Coach Houses" },
      { id: "sec-4", title: "04. Different Municipalities Use Different Terms and Limits" },
      { id: "sec-5", title: "05. Legal Use Requires More Than Construction" },
      { id: "sec-6", title: "06. Feasibility Before Design" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. The Common Idea",
        content: "Despite the varying terminology, the foundational concept remains the same: a self-contained dwelling unit that provides independent living facilities. This generally means the unit must have its own dedicated kitchen, washroom, and living/sleeping space, distinct from the primary residence."
      },
      {
        id: "sec-2",
        heading: "02. Inside the Main House",
        content: "Many secondary units are created within the existing footprint of the main house. Basement apartments are the most common example, but units can also be developed on the main floor or upper levels by converting existing space, or they can be incorporated as part of a new attached addition to the home."
      },
      {
        id: "sec-3",
        heading: "03. Detached Units / Coach Houses",
        content: "A separate accessory building, often referred to as a coach house, garden suite, or detached ADU, is a standalone structure on the same property as the main house. These are subject to strict local zoning regulations regarding setbacks, lot coverage, and building height, but offer highly private supplementary housing."
      },
      {
        id: "sec-4",
        heading: "04. Different Municipalities Use Different Terms and Limits",
        content: "Navigating the rules requires understanding local language. Cambridge typically uses 'ARU' (Additional Residential Unit); Kitchener utilizes 'ADU' (Additional Dwelling Unit); and Waterloo refers to 'ARUs' while operating under its own updated zoning framework. Each city has specific, differing limits on how many units are allowed per lot."
      },
      {
        id: "sec-5",
        heading: "05. Legal Use Requires More Than Construction",
        content: "Simply building out a kitchen and bathroom does not make a unit legal. Achieving legal compliance involves securing building permits, passing municipal inspections, ensuring zoning compliance, and in some jurisdictions, obtaining a rental license or fulfilling fire code retrofit requirements."
      },
      {
        id: "sec-6",
        heading: "06. Feasibility Before Design",
        content: "Before investing in architectural designs, it is critical to assess feasibility. Factors such as property size, access routes for emergency services, utility servicing capacity, parking availability, zoning bylaws, egress windows, and fire separation ratings will dictate what is legally possible to build on your lot."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **Is an ADU the same as a basement apartment?**\nA basement apartment is a specific type of ADU. 'ADU' is a broader term that encompasses basement apartments, coach houses, and attached suites.\n2. **Can an ADU be detached from the main house?**\nYes, these are commonly called coach houses or garden suites, provided local zoning allows for detached accessory structures on your property.\n3. **Can I convert my garage into a dwelling unit?**\nPotentially, but this requires verifying zoning for parking impacts, upgrading the structure to meet residential building codes, and ensuring proper insulation and servicing.\n4. **Do I need a permit for an existing basement apartment?**\nIf the existing apartment was built without permits, it is not considered legal. You will likely need to undergo a legalization process involving inspections and upgrades to meet current fire and building codes."
      }
    ]
  },
  {
    id: "cambridge-additional-residential-units-aru",
    slug: "cambridge-additional-residential-units-aru",
    category: "basements-adus",
    categoryLabel: "Basements & ADUs",
    priority: "Priority 2",
    title: "Cambridge ARU Guide: Additional Residential Units | Havenridge Build",
    subtitle: "Planning an additional residential unit in Cambridge? Learn the current unit configurations, permit requirements, grant support and early feasibility questions to ask.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/cambridge-aru.png",
    quickAnswer: "Cambridge permits qualifying single-detached, semi-detached and townhouse lots to contain up to two additional residential units, for a total of three units, subject to zoning, building code and property-specific requirements.",
    tableOfContents: [
      { id: "sec-1", title: "01. What Cambridge Currently Permits" },
      { id: "sec-2", title: "02. Ways an ARU Can Be Created" },
      { id: "sec-3", title: "03. Building Permit and Occupancy Approval" },
      { id: "sec-4", title: "04. Financial Assistance" },
      { id: "sec-5", title: "05. Feasibility Questions Before Design" },
      { id: "sec-6", title: "06. How Havenridge Can Fit" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. What Cambridge Currently Permits",
        content: "The City of Cambridge allows for increased residential density by permitting up to three total units on qualifying properties. This can be configured as either up to three units entirely within the main building, or up to two units within the main building plus one additional unit located in a detached accessory structure, provided zoning conditions are met."
      },
      {
        id: "sec-2",
        heading: "02. Ways an ARU Can Be Created",
        content: "Homeowners have several pathways to create an ARU. You can convert existing interior space (like finishing a basement), build a new addition to the main home, convert an existing accessory structure (such as a large detached garage), or construct a completely new detached accessory building from the ground up."
      },
      {
        id: "sec-3",
        heading: "03. Building Permit and Occupancy Approval",
        content: "Creating an ARU is a major construction project that strictly requires a municipal building permit. The process ensures the unit meets the Ontario Building Code for safety, fire separation, and habitability. Once construction is complete and final inspections pass, the city issues occupancy approval, making the unit legal."
      },
      {
        id: "sec-4",
        heading: "04. Financial Assistance",
        content: "To encourage the creation of affordable housing, Cambridge currently advertises a one-time grant of up to $10,000 for qualifying ARU projects. This grant can offset costs such as municipal service upgrades, professional permit drawings, and hard construction expenses. *Note: Grant programs are time-sensitive and subject to funding availability; verify current terms before proceeding.*"
      },
      {
        id: "sec-5",
        heading: "05. Feasibility Questions Before Design",
        content: "Early feasibility checks save time and money. Crucial considerations include confirming your specific zoning rules, verifying adequate parking, ensuring safe emergency access and egress routes, checking the capacity of existing water and sewer services, and assessing existing conditions like basement ceiling heights."
      },
      {
        id: "sec-6",
        heading: "06. How Havenridge Can Fit",
        content: "At Havenridge Build, we assist homeowners in navigating the complex landscape of ARU development. We offer feasibility assessments to determine what your property can support and provide coordinated design-build services to take your ARU from initial concept through permitting and final construction."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **How many units can I have on my Cambridge property?**\nOn qualifying lots, you can have a maximum of three total residential units.\n2. **Can my ARU be in a detached building?**\nYes, Cambridge allows for one of the ARUs to be located in a detached accessory structure, subject to zoning setbacks and lot coverage limits.\n3. **Does Cambridge charge development charges on ARUs?**\nWhile some exemptions exist for ARUs, development charges can apply depending on the size and location of the unit. It is essential to confirm with the city.\n4. **Is the Cambridge ARU grant still available?**\nGrant availability fluctuates based on municipal budgets. Always reverify current program status directly with the City of Cambridge.\n5. **Can I convert an existing basement into an ARU?**\nYes, provided the basement can meet building code requirements for ceiling height, fire separation, and emergency egress."
      }
    ]
  },
  {
    id: "kitchener-additional-dwelling-units-adu",
    slug: "kitchener-additional-dwelling-units-adu",
    category: "basements-adus",
    categoryLabel: "Basements & ADUs",
    priority: "Priority 2",
    title: "Kitchener ADU Guide 2026: Additional Dwelling Units | Havenridge Build",
    subtitle: "Explore Kitchener's current additional dwelling unit rules, permit pathways and 2026 incentive program for qualifying second, third and fourth units.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/kitchener-adu.png",
    quickAnswer: "Kitchener has expanded housing options for residential properties, including pathways for additional dwelling units. The exact approvals depend on the number of units, property zoning, the form of the project and whether the work converts existing space or adds new floor area.",
    tableOfContents: [
      { id: "sec-1", title: "01. Two to Four Units Versus Larger Residential Projects" },
      { id: "sec-2", title: "02. Conversion or New Floor Area" },
      { id: "sec-3", title: "03. 2026 ADU Grant" },
      { id: "sec-4", title: "04. Zoning Confirmation and Permits" },
      { id: "sec-5", title: "05. Feasibility Checklist" },
      { id: "sec-6", title: "06. Why the Guide Should Stay Current" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. Two to Four Units Versus Larger Residential Projects",
        content: "Kitchener has streamlined the process for smaller scale densification. The regulatory pathway for adding units to a property to reach a total of two to four units is distinct from the more rigorous planning approvals required for larger multi-residential projects containing five to ten units."
      },
      {
        id: "sec-2",
        heading: "02. Conversion or New Floor Area",
        content: "An ADU in Kitchener can be realized through various methods. You might convert existing space such as a basement, attic, or attached garage. Alternatively, you might construct an attached addition or build a detached coach house, provided the new floor area complies with current zoning setbacks and lot coverage limits."
      },
      {
        id: "sec-3",
        heading: "03. 2026 ADU Grant",
        content: "To promote specific housing goals, Kitchener's 2026 ADU program offers development-charge grants for qualifying units. Specific incentives are often tied to projects that provide affordable housing, achieve high energy efficiency standards, or incorporate barrier-free, accessible design. *Homeowners must reverify all grant amounts and eligibility requirements with the city prior to application.*"
      },
      {
        id: "sec-4",
        heading: "04. Zoning Confirmation and Permits",
        content: "Before any construction begins, securing zoning confirmation is a vital step to ensure the proposed use is permitted on your specific lot. Following this, a comprehensive building permit application, detailing structural, plumbing, and fire safety plans, must be submitted and approved to ensure compliance with the Ontario Building Code."
      },
      {
        id: "sec-5",
        heading: "05. Feasibility Checklist",
        content: "Evaluating an ADU project requires reviewing a robust checklist: verify the permitted unit count, assess safe access routes, confirm parking requirements and zoning compliance, check utility servicing capacity, ensure fire and life safety separations, verify egress windows, check ceiling heights, and formulate a realistic budget."
      },
      {
        id: "sec-6",
        heading: "06. Why the Guide Should Stay Current",
        content: "Municipal housing policies and incentive programs are continually evolving to address local needs. It is important to treat this guide as a starting point and always consult official City of Kitchener resources for the most up-to-date bylaws, building department requirements, and grant availability."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **How many units can I add in Kitchener?**\nGenerally, properties can accommodate up to four units in total, but this is heavily dependent on specific lot zoning and physical site constraints.\n2. **Can I add a basement apartment?**\nYes, converting a basement is a common ADU pathway, provided it meets code requirements for height, egress, and fire separation.\n3. **Can I convert a garage or attic?**\nYes, both are possible ADU locations if the structure can be upgraded to meet residential living standards and zoning requirements are met.\n4. **What is Kitchener’s 2026 ADU grant?**\nIt is an incentive program designed to offset development charges for ADUs that meet specific affordable, sustainable, or accessible criteria.\n5. **Do I need zoning confirmation before the building permit?**\nYes, confirming zoning is a critical first step before investing time and money into full building permit drawings."
      }
    ]
  },
  {
    id: "waterloo-additional-residential-units-aru",
    slug: "waterloo-additional-residential-units-aru",
    category: "basements-adus",
    categoryLabel: "Basements & ADUs",
    priority: "Priority 2",
    title: "Waterloo ARU Guide: Up to Four Units, Permits & Grants | Havenridge Build",
    subtitle: "Learn Waterloo's current additional residential unit framework, building permit process, coach-house options and affordable-rental grant program.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/waterloo-aru.png",
    quickAnswer: "Waterloo's updated zoning framework allows up to four units on a low-rise residential property, subject to property-specific zoning and building requirements. A building permit is required to add an additional unit.",
    tableOfContents: [
      { id: "sec-1", title: "01. What Waterloo Currently Allows" },
      { id: "sec-2", title: "02. Main-Floor, Basement and Coach-House Pathways" },
      { id: "sec-3", title: "03. Permit Process" },
      { id: "sec-4", title: "04. Affordable-Rental Grant" },
      { id: "sec-5", title: "05. Rental Licensing" },
      { id: "sec-6", title: "06. Feasibility Before Design" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. What Waterloo Currently Allows",
        content: "The City of Waterloo has progressively updated its zoning to encourage gentle density. Currently, low-rise residential properties may potentially house up to four total dwelling units. However, achieving this maximum is not guaranteed; the physical building form, lot size, and specific zoning regulations ultimately dictate what is feasible on your property."
      },
      {
        id: "sec-2",
        heading: "02. Main-Floor, Basement and Coach-House Pathways",
        content: "Waterloo provides distinct guidance depending on where the ARU is located. The requirements for an internal unit—such as a basement or main-floor conversion—focus heavily on fire separation and egress within the existing shell. Conversely, detached coach houses involve separate checklists focusing on setbacks, lot coverage, and site servicing."
      },
      {
        id: "sec-3",
        heading: "03. Permit Process",
        content: "Adding an ARU requires a formal building permit. Homeowners must submit detailed architectural and structural drawings, complete application forms, and pay applicable municipal fees. The city reviews the application for code compliance, issues the permit, and conducts mandatory inspections throughout construction."
      },
      {
        id: "sec-4",
        heading: "04. Affordable-Rental Grant",
        content: "To support affordable housing initiatives, Waterloo advertises a significant grant of up to $30,000 for qualifying ARUs. A key condition of this grant is that the unit must be rented at affordable rates for a minimum of five years. *Prospective builders should reverify all program terms and current intake periods before relying on these funds.*"
      },
      {
        id: "sec-5",
        heading: "05. Rental Licensing",
        content: "Unlike some neighboring municipalities, Waterloo maintains a residential rental licensing program. If you intend to rent out your newly created ARU, you must obtain a rental license from the city. This ensures ongoing compliance with property standards and safety regulations."
      },
      {
        id: "sec-6",
        heading: "06. Feasibility Before Design",
        content: "Success requires upfront due diligence. Before engaging a designer, homeowners must confirm zoning compliance, evaluate site access and utility servicing, assess parking requirements, ensure emergency egress is viable, check fire separation needs, and consider the long-term use and management of the property."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **Can I have four units on my Waterloo property?**\nPotentially. The zoning framework permits up to four units, but your specific lot size and building constraints must be able to support them under the building code.\n2. **Can I build a coach house in Waterloo?**\nYes, detached coach houses are permitted on qualifying lots, subject to specific zoning setbacks and coverage limits.\n3. **Does Waterloo offer an ARU grant?**\nYes, Waterloo has offered an affordable-rental grant of up to $30,000, but it is contingent on renting the unit affordably for five years.\n4. **Do I need a rental licence?**\nYes, if the ARU is being rented out, a City of Waterloo rental license is mandatory.\n5. **How long does an ARU permit review take?**\nPermit review timelines vary based on application volume, but typically range from a few weeks to over a month. Ensure your application is complete to avoid delays."
      }
    ]
  },
  {
    id: "whole-home-renovation-timeline",
    slug: "whole-home-renovation-timeline",
    category: "budget-planning",
    categoryLabel: "Budget & Planning",
    priority: "Priority 2",
    title: "Whole-Home Renovation Timeline: Planning to Completion | Havenridge Build",
    subtitle: "Learn the major phases of a whole-home renovation, what can extend the schedule, and why design, selections and permits should be planned before construction starts.",
    author: "Havenridge Technical Team",
    date: "September 28, 2026",
    readTime: "5 min read",
    img: "/project_images/guides/whole-home-timeline.png",
    quickAnswer: "There is no universal whole-home renovation timeline. The schedule depends on design complexity, structural changes, permits, material lead times, the number of rooms affected, existing-home conditions and how quickly decisions are made. The most reliable approach is to separate preconstruction from construction and plan both.",
    tableOfContents: [
      { id: "sec-1", title: "01. Phase 1 - Discovery and Feasibility" },
      { id: "sec-2", title: "02. Phase 2 - Design and Preconstruction" },
      { id: "sec-3", title: "03. Phase 3 - Procurement and Scheduling" },
      { id: "sec-4", title: "04. Phase 4 - Construction" },
      { id: "sec-5", title: "05. What Commonly Extends Schedules" },
      { id: "sec-6", title: "06. How Homeowners Can Help Keep Decisions Moving" },
      { id: "sec-faq", title: "07. Frequently Asked Questions" }
    ],
    sections: [
      {
        id: "sec-1",
        heading: "01. Phase 1 - Discovery and Feasibility",
        content: "Every successful renovation begins with a solid foundation of understanding. In this initial phase, we define your ultimate goals, assess existing home conditions, take precise measurements, and evaluate project constraints. This is also when we ensure that your design aspirations align with a realistic budget framework."
      },
      {
        id: "sec-2",
        heading: "02. Phase 2 - Design and Preconstruction",
        content: "This critical phase is where the vision takes shape on paper. We develop floor plan layouts, create 3D visualizations to help you understand the space, and guide you through material selections. Concurrently, structural engineering is finalized, permit drawings are prepared, and a comprehensive scope of work is detailed."
      },
      {
        id: "sec-3",
        heading: "03. Phase 3 - Procurement and Scheduling",
        content: "Before demolition starts, we lock in the logistics. This phase involves ordering long-lead items like custom cabinetry, specialized windows and doors, and high-end plumbing fixtures. We also coordinate trade schedules and map out the exact sequence of construction events to ensure a smooth workflow."
      },
      {
        id: "sec-4",
        heading: "04. Phase 4 - Construction",
        content: "With permits in hand and materials ordered, physical transformation begins. Construction progresses logically: demolition and structural work, followed by electrical/plumbing rough-ins, mandatory municipal inspections, closing in walls with drywall, installing fine finishes and millwork, and finally, addressing any remaining deficiencies during close-out."
      },
      {
        id: "sec-5",
        heading: "05. What Commonly Extends Schedules",
        content: "Schedules are most often derailed by variables introduced after construction begins. Common culprits include late changes to the scope of work, discovering hidden issues behind walls (like asbestos or water damage), delays in homeowner material selections, municipal permit revisions, delays in special-order items, and waiting on municipal inspections."
      },
      {
        id: "sec-6",
        heading: "06. How Homeowners Can Help Keep Decisions Moving",
        content: "Homeowners play a vital role in maintaining the schedule. You can keep the project on track by making design and material selections on time, responding promptly to requests for approval, avoiding informal scope changes mid-construction, and keeping all communication centralized through the project management team."
      },
      {
        id: "sec-faq",
        heading: "07. Frequently Asked Questions",
        content: "1. **How long does design take before construction?**\nDepending on the complexity, design and preconstruction can take anywhere from 2 to 6 months before ground is broken.\n2. **Do permits delay a renovation?**\nObtaining permits requires municipal review, which takes time. If not accounted for in the preconstruction schedule, it can feel like a delay.\n3. **When should cabinetry be ordered?**\nCustom cabinetry often has lead times of 8-12 weeks and should be ordered as soon as the design is finalized, often before demolition begins.\n4. **What happens if we change the design during construction?**\nDesign changes during construction (change orders) almost universally result in added costs and extended project timelines."
      }
    ]
  }
];