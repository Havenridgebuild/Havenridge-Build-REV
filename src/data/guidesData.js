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
];
