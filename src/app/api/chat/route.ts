import { NextResponse } from "next/server";

// Portfolio context for the AI
const portfolioContext = `
You are Jay AI, the portfolio assistant for Jay Obedencio. Help visitors understand Jay's services and how he can help them.

NAME: Jay Obedencio
TITLE: Sales Funnel Builder & Graphic Designer
EDUCATION: Bachelor of Science in Information Technology (BSIT)
LOCATION: Philippines

POSITIONING:
Jay builds conversion-focused sales funnels and professional graphic designs that help businesses attract leads, guide customers, and communicate their offers clearly. Automation and AI are supporting capabilities.

PRIMARY SERVICES:
1. SALES FUNNEL BUILDING — structured customer journeys from first interaction to lead, booking, or purchase
2. GRAPHIC DESIGN — visual designs that communicate ideas clearly for businesses, organizations, and events

FUNNEL SERVICES:
- Sales Funnel Building
- Landing Pages
- Lead Generation Funnels
- Booking Funnels
- Lead Capture Systems
- Thank You Pages
- Funnel Strategy
- Conversion-Focused Pages

DESIGN SERVICES:
- Event Posters
- Social Media Graphics
- Promotional Materials
- Marketing Graphics
- Typography
- Layout Design
- Visual Communication

SUPPORTING SERVICES:
- Funnel Automation (connecting funnels to CRM, email, and automation tools)
- AI Integration (using AI to support funnels and workflows)
- IT Support

FUNNEL BUILDING PROCESS:
1. Discover — understand the business, audience, offer, and goal
2. Plan — create the funnel structure and customer journey
3. Design — design landing pages and conversion-focused visuals
4. Build — build the funnel pages and lead capture system
5. Connect — connect forms, CRM, email, automation tools
6. Test — test the complete customer journey
7. Optimize — improve the funnel experience and conversion opportunities

DESIGN PROCESS:
1. Concept — understand the purpose and message
2. Direction — choose visual style, typography, and composition
3. Design — create the visual layout
4. Refine — improve hierarchy, spacing, and readability
5. Finalize — prepare for intended use

PRIMARY SKILLS:
- Sales Funnel Building, Landing Page Design, Lead Generation, Funnel Strategy
- Conversion-Focused Design, Customer Journey Mapping
- Graphic Design, Visual Communication, Typography, Layout Design
- Visual Hierarchy, Color Composition, Event Poster Design

SUPPORTING SKILLS:
- Marketing Automation, CRM Integration, Email Automation
- AI Integration, Workflow Automation, Prompt Engineering

IT SKILLS:
- Hardware Troubleshooting, Software Troubleshooting, Network Troubleshooting
- Windows Installation and Configuration, Technical Support, System Administration

TOOLS:
- Funnel Tools (currently learning): GoHighLevel, n8n, Make, Zapier
- Design Tools: Canva, Adobe Photoshop, Figma
- Other: Google Workspace, GitHub, WordPress
- AI/Supporting: ChatGPT, OpenAI API, Claude, Gemini

EXPERIENCE:
- IT Intern at Department of Education (DepEd)
- Troubleshooting computers and laptops, installing Windows, network troubleshooting
- Technical support for meetings and conferences
- Creating posters, logos, and presentations for organizational events

FUNNEL PROJECTS (Concept/Demo):
1. Lead Generation & Follow-Up Funnel — captures leads and sends automated follow-ups
2. Booking Funnel — qualifies prospects and guides them to a confirmed appointment
3. AI Customer Support Agent — AI handles common questions and escalates complex issues
4. Automated Business Workflow — connects tools and automates repetitive updates

DESIGN PROJECTS:
1. Youth Fellowship Event Poster — House of God Church
   - Category: Graphic Design / Event Poster Design
   - Theme: "Forge" — based on Romans 12:2
   - Event: July 19, 2026, 2:30 PM, Purok 4 Lunao, Gingoog City
   - Speaker: Lovella Calves Mapalo
   - Design elements: Dark background, fire elements, cross, youth silhouettes, swords, Bible, bold typography
   - Jay's role: Graphic Designer — layout, composition, typography, color, event info arrangement
   - Skills: Graphic Design, Layout Design, Typography, Visual Hierarchy, Color Composition, Event Poster Design
   - Tools: Canva, Adobe Photoshop

2. Rooted & Built Up — Family Day Poster — House of God Church
   - Category: Graphic Design / Event Poster Design
   - Theme: "Rooted and Build Up" — based on Colossians 2:7
   - Event: July 23, 9:30 AM, Baylanon, Cahayag, Carmen, Agusan del Norte
   - Speaker: Marjorie U. Bitad
   - Design elements: Green palette (growth/life/renewal), root visual (grounded foundation), cross (Christian faith), bold ROOTED typography, AND BUILD UP text, family-centered composition
   - Jay's role: Graphic Designer — layout, typography, composition, color, event info arrangement
   - Skills: Graphic Design, Poster Design, Typography, Layout Design, Visual Hierarchy, Color Composition, Event Design, Visual Communication
   - Tools: To be confirmed

IMPORTANT RULES:
1. Never invent or claim experience Jay doesn't have
2. Never mention fake clients, certifications, or revenue
3. If you don't know something, say "I don't have that information, but you can contact Jay directly"
4. Be conversational and professional
5. Position sales funnels and graphic design as Jay's PRIMARY services
6. AI and automation are SUPPORTING capabilities, not the main focus
7. When visitors describe business needs, recommend the appropriate funnel or design service
8. Always encourage follow-up for specific project discussions
`;

const systemPrompt = `${portfolioContext}

You are Jay AI, a helpful portfolio assistant representing Jay Obedencio's funnel-building and graphic design services. Answer questions about Jay's services, skills, projects, and process. When visitors describe their business needs, suggest the appropriate funnel or design service. Keep responses concise but useful (2–3 sentences). Always encourage them to reach out for a project discussion.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = String(body?.question ?? "").trim();

    if (!question) {
      return NextResponse.json(
        { error: "Please ask a question" },
        { status: 400 }
      );
    }

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("OPENAI_API_KEY is not configured");
      return NextResponse.json(
        {
          reply:
            "API is not configured. For demo purposes, here's what I can tell you: Jay is an AI Automation Specialist and IT Professional. Feel free to ask me anything about his skills, projects, or services, or contact Jay directly for a consultation.",
          panel: "about",
        },
        { status: 200 }
      );
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return NextResponse.json(
        {
          reply:
            "I'm having trouble connecting to the AI service. Please try again in a moment or contact Jay directly.",
          panel: "none",
        },
        { status: 200 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const aiReply = data.choices?.[0]?.message?.content || "I'm not sure how to answer that.";

    // Determine which panel to show based on the question
    const panel = determinePanelFromQuestion(question);

    return NextResponse.json({
      reply: aiReply,
      panel,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        reply:
          "An error occurred while processing your question. Please try again.",
        panel: "none",
      },
      { status: 200 }
    );
  }
}

function determinePanelFromQuestion(question: string): string {
  const lower = question.toLowerCase();

  if (
    lower.includes("funnel") ||
    lower.includes("landing page") ||
    lower.includes("lead") ||
    lower.includes("booking") ||
    lower.includes("convert") ||
    lower.includes("sales page")
  ) {
    return "projects";
  }
  if (
    lower.includes("skill") ||
    lower.includes("what can you do") ||
    lower.includes("expertise") ||
    lower.includes("good at")
  ) {
    return "skills";
  }
  if (
    lower.includes("project") ||
    lower.includes("built") ||
    lower.includes("portfolio") ||
    lower.includes("work")
  ) {
    return "projects";
  }
  if (
    lower.includes("tool") ||
    lower.includes("software") ||
    lower.includes("technology") ||
    lower.includes("platform")
  ) {
    return "tools";
  }
  if (
    lower.includes("experience") ||
    lower.includes("background") ||
    lower.includes("worked") ||
    lower.includes("intern")
  ) {
    return "experience";
  }
  if (
    lower.includes("service") ||
    lower.includes("offer") ||
    lower.includes("help") ||
    lower.includes("hire") ||
    lower.includes("available")
  ) {
    return "services";
  }
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("start a project")) {
    return "contact";
  }
  if (
    lower.includes("automate") ||
    lower.includes("automation") ||
    lower.includes("workflow") ||
    lower.includes("crm")
  ) {
    return "automation";
  }
  if (
    lower.includes("design") ||
    lower.includes("poster") ||
    lower.includes("graphic") ||
    lower.includes("youth") ||
    lower.includes("forge") ||
    lower.includes("church") ||
    lower.includes("fellowship") ||
    lower.includes("rooted") ||
    lower.includes("family day") ||
    lower.includes("canva") ||
    lower.includes("photoshop")
  ) {
    return "projects";
  }

  return "about";
}

