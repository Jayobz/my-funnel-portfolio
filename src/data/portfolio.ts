export const portfolioData = {
  profile: {
    name: "Jay Obedencio",
    title: "Sales Funnel Builder & Graphic Designer",
    subtitle: "Sales Funnel Builder • Graphic Designer • IT Professional",
    education: "Bachelor of Science in Information Technology (BSIT)",
    location: "Philippines",
    goal:
      "I build conversion-focused sales funnels and professional graphic designs that help businesses attract leads, guide customers, and communicate their offers clearly.",
  },
  skills: {
    funnels: [
      "Sales Funnel Building",
      "Landing Page Design",
      "Lead Generation",
      "Funnel Strategy",
      "Conversion-Focused Design",
      "Lead Capture",
      "Booking Funnels",
      "Thank You Pages",
      "Customer Journey Mapping",
    ],
    design: [
      "Graphic Design",
      "Visual Communication",
      "Typography",
      "Layout Design",
      "Visual Hierarchy",
      "Color Composition",
      "Event Poster Design",
      "Marketing Collateral",
      "Canva",
      "Adobe Photoshop",
      "Figma",
      "UI/UX Design",
    ],
    supporting: [
      "Marketing Automation",
      "CRM Integration",
      "Email Automation",
      "AI Integration",
      "Workflow Automation",
      "Prompt Engineering",
      "API Integration",
    ],
    it: [
      "Hardware Troubleshooting",
      "Software Troubleshooting",
      "Network Troubleshooting",
      "Printer Troubleshooting",
      "Computer Setup and Maintenance",
      "Windows Installation and Configuration",
      "Basic System Administration",
      "Technical Documentation",
      "Audio/Conference Room Setup and Operation",
    ],
  },
  services: [
    {
      title: "Sales Funnel Building",
      text: "I create structured customer journeys that guide visitors from first interaction to lead, booking, or purchase.",
      category: "funnels",
    },
    {
      title: "Landing Pages",
      text: "Conversion-focused landing pages designed to clearly communicate offers and capture leads.",
      category: "funnels",
    },
    {
      title: "Lead Generation",
      text: "Build lead capture systems, follow-up sequences, and automated pipelines that bring in and nurture prospects.",
      category: "funnels",
    },
    {
      title: "Booking Funnels",
      text: "End-to-end booking flows that guide prospects from interest to confirmed appointment.",
      category: "funnels",
    },
    {
      title: "Graphic Design",
      text: "I create visual designs that communicate ideas clearly and help businesses, organizations, and events present themselves professionally.",
      category: "design",
    },
    {
      title: "Event Posters & Promo Graphics",
      text: "Professionally designed promotional materials for events, campaigns, and organizations.",
      category: "design",
    },
    {
      title: "Funnel Automation",
      text: "Connect funnels to CRM, email, and automation tools so the system works without manual effort.",
      category: "supporting",
    },
    {
      title: "IT Support",
      text: "Technical troubleshooting, computer setup, software installation, networking, and general IT assistance.",
      category: "supporting",
    },
  ],
  tools: {
    funnels: [
      "GoHighLevel",
      "n8n",
      "Make",
      "Zapier",
    ],
    design: [
      "Canva",
      "Adobe Photoshop",
      "Figma",
    ],
    experienced: [
      "Google Workspace",
      "Figma",
      "Canva",
      "Adobe Photoshop",
      "GitHub",
      "WordPress",
    ],
    learning: [
      "GoHighLevel",
      "n8n",
      "Make",
      "Zapier",
      "ChatGPT",
      "OpenAI API",
      "Claude",
      "Gemini",
    ],
  },
  experience: [
    {
      company: "Department of Education (DepEd)",
      role: "IT Intern",
      bullets: [
        "Troubleshooting and maintaining computers and laptops",
        "Installing and configuring Windows",
        "Replacing laptop SSDs",
        "Troubleshooting internet and network connectivity",
        "Checking server internet connections",
        "Resetting Microsoft account passwords",
        "Scanning and printing documents",
        "Operating audio conference room equipment",
        "Supporting meetings and conferences",
        "Creating and updating posters and logos",
        "Creating presentations for organizational events",
        "Providing general technical support",
      ],
    },
  ],
  projects: [
    {
      title: "PrimeFit Coaching — Fitness Consultation Funnel",
      category: "Sales Funnel",
      problem: "Fitness coaches struggle to convert website visitors into booked consultations without a clear, guided customer journey.",
      solution: "A full sales funnel built for PrimeFit Coaching — guiding cold visitors from a landing page through lead capture, trust-building, and a free consultation booking.",
      workflow: ["Landing Page", "Lead Capture", "Trust & Social Proof", "Booking Page", "Confirmation"],
      tools: ["HTML5", "CSS3", "JavaScript", "Vercel"],
      result: "A live, conversion-focused fitness funnel that qualifies leads and books free consultations.",
      liveUrl: "https://prime-fit-coaching.vercel.app/",
      imagePath: "/images/projects/page.png",
    },
    {
      title: "PrimeHome Realty — Real Estate Lead Funnel",
      category: "Sales Funnel",
      problem: "Home buyers feel overwhelmed searching listings without knowing what type of home actually fits their lifestyle and budget.",
      solution: "A real estate funnel that guides prospects through 5 lifestyle questions, builds clarity around their needs, and moves them toward a free consultation with an advisor.",
      workflow: ["Landing Page", "Lifestyle Quiz", "Budget Qualifier", "Free Guide", "Consultation Booking"],
      tools: ["HTML5", "CSS3", "JavaScript", "Vercel"],
      result: "A conversion-focused real estate funnel that qualifies buyers and books consultations.",
      liveUrl: "https://real-state-hazel-nu.vercel.app/",
      imagePath: "/images/projects/real state.png",
    },

  ],
  contact: {
    email: "jayobedencio03@gmail.com",
    linkedin: "LinkedIn",
    github: "GitHub",
    facebook: "Facebook",
  },
  resume: { pdf: "/Obedencio-Jay-Web-Developer-Resume.pdf" },

  /**
   * Design / creative projects — separate from AI automation projects.
   * Add new design projects here; the UI reads from this array automatically.
   */
  designProjects: [
    {
      id: "youth-fellowship-poster",
      title: "Youth Fellowship Event Poster",
      category: "Graphic Design",
      tags: ["Graphic Design", "Poster Design", "Church Media", "Event Design", "Typography", "Visual Communication"],
      description:
        "An event poster designed for a youth fellowship program, combining bold typography, dramatic visual elements, biblical messaging, and event information into a single promotional design.",
      // Original poster image — public/images/projects/youth-fellowship.png
      imagePath: "/images/projects/youth-fellowship.png" as string | null,

      // ── Event details ────────────────────────────────────────────────────
      event: {
        name: "Youth Fellowship",
        theme: "Forge",
        verse: "Romans 12:2",
        date: "July 19, 2026",
        time: "2:30 PM",
        perks: "Free Snacks",
        speaker: "Lovella Calves Mapalo",
        location: "Purok 4 Lunao, Gingoog City",
        contact: "0935 841 3416",
        facebook: "House of God Church - Lunao",
        church: "House of God Church",
      },

      // ── Case study content ───────────────────────────────────────────────
      overview:
        "Designed promotional material for the House of God Church Youth Fellowship event. The design communicates the event theme, biblical message, schedule, speaker, and contact information while maintaining a strong youth-oriented visual style.",

      objective: [
        "Clearly communicate the event information.",
        "Highlight the Youth Fellowship program.",
        "Make the theme immediately recognizable.",
        "Create a strong visual connection with the Bible verse.",
        "Attract young people to the event.",
        "Make important information easy to find.",
      ],

      designConcept: [
        {
          element: "Dark Background",
          meaning:
            "Creates a dramatic and strong atmosphere that supports the Forge theme.",
        },
        {
          element: "Fire Elements",
          meaning:
            "Represent transformation, strength, passion, and spiritual growth.",
        },
        {
          element: "Cross",
          meaning: "Represents the Christian foundation of the event.",
        },
        {
          element: "Youth Silhouettes",
          meaning:
            "Represent fellowship, community, worship, and youth participation.",
        },
        {
          element: "Swords",
          meaning:
            "Create a strong symbolic visual associated with spiritual strength and biblical imagery.",
        },
        {
          element: "Bible",
          meaning:
            "Reinforces the connection between the event and God's Word.",
        },
        {
          element: "Bold Typography",
          meaning:
            "Large type makes YOUTH FELLOWSHIP and FORGE the main visual focal points.",
        },
      ],

      process: [
        "Concept",
        "Theme Development",
        "Visual Composition",
        "Typography",
        "Information Layout",
        "Final Poster",
      ],

      role: {
        title: "Graphic Designer",
        responsibilities: [
          "Poster layout",
          "Visual composition",
          "Typography selection",
          "Event information arrangement",
          "Color and visual treatment",
          "Promotional design",
          "Final design preparation",
        ],
      },

      skills: [
        "Graphic Design",
        "Layout Design",
        "Typography",
        "Visual Hierarchy",
        "Color Composition",
        "Event Poster Design",
        "Digital Design",
      ],

      tools: ["Canva", "Adobe Photoshop"],
    },

    // ── Rooted & Built Up — Family Day Poster ──────────────────────────────
    {
      id: "rooted-family-day",
      title: "Rooted & Built Up — Family Day Poster",
      category: "Graphic Design",
      tags: ["Graphic Design", "Poster Design", "Church Media", "Event Design", "Typography", "Visual Communication"],
      description:
        "A promotional event poster designed for House of God Church's Family Day. The design centers on the theme \"Rooted and Build Up,\" using natural root imagery, green tones, strong typography, and a clean family-oriented composition to communicate the event's message and invitation.",
      // Original poster image — public/images/projects/Rooted.png
      imagePath: "/images/projects/Rooted.png" as string | null,

      // ── Event details ────────────────────────────────────────────────────
      event: {
        name: "Family Day",
        theme: "Rooted and Build Up",
        verse: "Colossians 2:7",
        date: "July 23",
        time: "9:30 AM",
        perks: "",
        speaker: "Marjorie U. Bitad",
        location: "Baylanon, Cahayag, Carmen, Agusan del Norte",
        contact: "",
        facebook: "",
        church: "House of God Church",
      },

      // ── Case study content ───────────────────────────────────────────────
      overview:
        "Designed a promotional poster for the House of God Church Family Day event. The design communicates the event theme, biblical message, schedule, speaker, and location while maintaining a welcoming, family-centered visual style.",

      objective: [
        "Clearly communicate the Family Day event information.",
        "Highlight the Rooted and Build Up theme.",
        "Create a strong visual connection with Colossians 2:7.",
        "Convey a welcoming and family-oriented message.",
        "Make event details easy to find at a glance.",
        "Reflect the natural, grounded nature of the theme through visuals.",
      ],

      designConcept: [
        {
          element: "Green Color Palette",
          meaning:
            "The green palette communicates growth, life, renewal, and the natural theme of being rooted.",
        },
        {
          element: "Root Visual",
          meaning:
            "The roots represent being firmly grounded and connected to a strong foundation.",
        },
        {
          element: "Cross",
          meaning:
            "The cross reinforces the Christian message and connects the visual concept to faith.",
        },
        {
          element: "Typography — ROOTED",
          meaning:
            "The large ROOTED headline creates the main visual focal point and anchors the design.",
        },
        {
          element: "Typography — AND BUILD UP",
          meaning:
            "Supporting text that reinforces the theme and completes the biblical reference.",
        },
        {
          element: "Family Day Elements",
          meaning:
            "Repeated Family Day typography and welcoming composition help establish the family-centered purpose of the event.",
        },
      ],

      process: [
        "Concept",
        "Theme Development",
        "Visual Composition",
        "Typography",
        "Information Layout",
        "Final Poster",
      ],

      role: {
        title: "Graphic Designer",
        responsibilities: [
          "Poster layout",
          "Typography",
          "Visual composition",
          "Color selection",
          "Event information arrangement",
          "Promotional graphic design",
        ],
      },

      skills: [
        "Graphic Design",
        "Poster Design",
        "Typography",
        "Layout Design",
        "Visual Hierarchy",
        "Color Composition",
        "Event Design",
        "Visual Communication",
      ],

      // Edit tools below once confirmed — leave empty array if unknown
      tools: [] as string[],
    },
  ],
};
