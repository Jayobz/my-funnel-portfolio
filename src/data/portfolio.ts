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
      title: "Lead Generation & Follow-Up Funnel",
      category: "Lead Generation",
      problem: "Manual lead capture and follow-up slows down sales responsiveness.",
      solution: "A funnel that captures leads, qualifies them, and sends timely automated follow-ups.",
      workflow: ["Landing Page", "Lead Capture", "Lead Tagging", "Follow-up Email", "Sales Notification"],
      tools: ["GoHighLevel", "n8n", "Google Workspace", "Email Automation"],
      result: "A streamlined lead handling process that minimizes manual follow-up work.",
    },
    {
      title: "Booking Funnel",
      category: "Funnels",
      problem: "Scheduling requests create unnecessary delays and repeated back-and-forth.",
      solution: "A booking funnel that qualifies prospects and guides them to a confirmed appointment.",
      workflow: ["Landing Page", "Qualification", "Calendar Booking", "Confirmation", "Reminder"],
      tools: ["GoHighLevel", "Calendar Tools", "Automation Workflow"],
      result: "A smoother booking process that reduces friction for both the business and the customer.",
    },
    {
      title: "AI Customer Support Agent",
      category: "Automation",
      problem: "Customer questions often repeat and take time away from support teams.",
      solution: "An AI assistant answers common questions and escalates more complex issues to a human when needed.",
      workflow: ["Inquiry", "AI Triage", "Response or Escalation", "Human Follow-Up"],
      tools: ["ChatGPT", "OpenAI API", "CRM", "Knowledge Base"],
      result: "A scalable support workflow that reduces repetitive customer support tasks.",
    },
    {
      title: "Automated Business Workflow",
      category: "Automation",
      problem: "Business tools often require repetitive manual updates between systems.",
      solution: "Connect apps and automate repetitive updates to reduce operational friction.",
      workflow: ["Trigger Event", "Processing", "Decision", "Automation", "Notification"],
      tools: ["Make", "Zapier", "n8n", "Google Workspace"],
      result: "A cleaner, more connected workflow across business tools.",
    },
  ],
  contact: {
    email: "your-email@example.com",
    linkedin: "LinkedIn",
    github: "GitHub",
    facebook: "Facebook",
  },
  resume: { pdf: "/resume-placeholder.pdf" },

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
