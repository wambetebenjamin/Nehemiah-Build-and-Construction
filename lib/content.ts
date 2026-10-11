export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Civil";
  location: string;
  value: string;
  year: string;
  image: string;
  gallery: string[];
  excerpt: string;
  brief: string;
  role: string;
  challenge: string;
  solution: string;
  timeline: string[];
  testimonial: string;
};

export const projects: Project[] = [
  {
    slug: "karen-family-residence",
    title: "Karen Family Residence",
    category: "Residential",
    location: "Karen, Nairobi",
    value: "KES 42M*",
    year: "2025*",
    image: "/images/residential-build.jpg",
    gallery: ["/images/residential-build.jpg", "/images/nairobi-construction-crew.jpg", "/images/civil-engineer-survey.jpg"],
    excerpt: "A considered home build, planned around family life and delivered with clear stage-by-stage communication.",
    brief: "A representative residential brief: translate a family's wish list into a comfortable, durable home with a clear build sequence and cost checkpoints.",
    role: "Illustrative end-to-end delivery: early site review, coordination of design and approvals, construction supervision, and handover planning.",
    challenge: "The concept needed to balance natural light, practical circulation, and a phased construction plan.",
    solution: "A coordinated brief and milestone-based work plan keep decisions visible from the first survey through to final inspection.",
    timeline: ["Site survey and brief", "Design coordination and approvals", "Structure and finishes", "Snagging and handover"],
    testimonial: "A clear process makes a complex build feel manageable.",
  },
  {
    slug: "westlands-commercial-hub",
    title: "Westlands Commercial Hub",
    category: "Commercial",
    location: "Westlands, Nairobi",
    value: "KES 180M*",
    year: "2024*",
    image: "/images/nairobi-skyline.jpg",
    gallery: ["/images/nairobi-skyline.jpg", "/images/architects-blueprint.jpg", "/images/nairobi-construction-crew.jpg"],
    excerpt: "A representative commercial development profile focused on coordination, buildability, and reliable reporting.",
    brief: "An illustrative commercial project profile for a Nairobi developer planning a flexible, multi-tenant building.",
    role: "Construction management concept covering package coordination, programme tracking, quality checks, and handover documentation.",
    challenge: "Commercial work demands tight coordination between specialist teams, deliveries, and decision-makers.",
    solution: "Structured reporting, clear approval points, and a shared programme help maintain momentum while protecting quality.",
    timeline: ["Feasibility and scope", "Design and authority coordination", "Main works and fit-out", "Commissioning and close-out"],
    testimonial: "Good project control starts with clear communication.",
  },
  {
    slug: "athi-river-civil-works",
    title: "Athi River Civil Works",
    category: "Civil",
    location: "Athi River, Machakos County",
    value: "KES 96M*",
    year: "2023*",
    image: "/images/site-surveyor.jpg",
    gallery: ["/images/site-surveyor.jpg", "/images/construction-team.jpg", "/images/civil-engineer-survey.jpg"],
    excerpt: "An illustrative civil engineering profile built around site context, safe sequencing, and quality control.",
    brief: "A representative civil works brief: plan site access and ground works in a way that respects local conditions and the wider programme.",
    role: "Illustrative site coordination, survey-led planning, work sequencing, and construction supervision.",
    challenge: "Ground conditions, access, and weather can quickly affect civil works sequencing.",
    solution: "Early surveys and regular site checks surface constraints before they become expensive programme risks.",
    timeline: ["Survey and setting out", "Earthworks and foundations", "Civil installation", "Testing and completion"],
    testimonial: "Careful preparation makes the work safer and more predictable.",
  },
];

export type TenderOpportunity = {
  reference: string;
  name: string;
  category: string;
  closingDate: string;
  documentUrl?: string;
  note: string;
};

export const tenderOpportunities: TenderOpportunity[] = [
  {
    reference: "NB-2026-001",
    name: "Residential Estate Works — Illustrative Opportunity",
    category: "Residential Construction",
    closingDate: "30 November 2026",
    documentUrl: process.env.TENDER_DOCUMENT_URL || undefined,
    note: "Example listing only. Replace with an approved, live tender and its Vercel Blob PDF before publication.",
  },
  {
    reference: "NB-2026-002",
    name: "Civil Infrastructure Package — Illustrative Opportunity",
    category: "Civil Engineering",
    closingDate: "15 December 2026",
    note: "Example listing only. Replace with an approved, live tender and its Vercel Blob PDF before publication.",
  },
];

export const careers = [
  { title: "Site Engineer", department: "Construction", location: "Nairobi, Kenya", type: "Full-time" },
  { title: "Quantity Surveyor", department: "Commercial", location: "Nairobi, Kenya", type: "Full-time" },
  { title: "Project Manager", department: "Project Delivery", location: "Nairobi, Kenya", type: "Full-time" },
  { title: "Site Foreman", department: "Construction", location: "Nairobi, Kenya", type: "Full-time" },
  { title: "Architect", department: "Design Coordination", location: "Nairobi, Kenya", type: "Contract" },
];

export const insights = [
  {
    slug: "building-in-kenya-from-brief-to-handover",
    title: "Building in Kenya: from first brief to handover",
    description: "A practical overview of the decisions that make a home build easier to plan and manage.",
    category: "Planning",
    date: "2026-09-18",
    image: "/images/architects-blueprint.jpg",
  },
  {
    slug: "choosing-materials-for-east-african-climates",
    title: "Choosing materials for East African conditions",
    description: "Questions to ask about availability, durability, maintenance, and the intended use of a space.",
    category: "Materials",
    date: "2026-08-06",
    image: "/images/finishing-worker.jpg",
  },
  {
    slug: "site-surveys-before-groundbreaking",
    title: "Why a site survey belongs before groundbreaking",
    description: "How early site information helps teams coordinate design, access, and construction sequencing.",
    category: "Project delivery",
    date: "2026-07-14",
    image: "/images/site-surveyor.jpg",
  },
] as const;

export const services = [
  {
    title: "Residential Construction",
    description: "Thoughtful homes planned around your brief, budget, and the way you want to live.",
    image: "/images/residential-build.jpg",
    number: "01",
  },
  {
    title: "Commercial Development",
    description: "Coordinated commercial builds with clear reporting from early planning through handover.",
    image: "/images/nairobi-skyline.jpg",
    number: "02",
  },
  {
    title: "Civil Engineering",
    description: "Survey-led infrastructure and civil works, delivered with safety and quality in focus.",
    image: "/images/civil-engineer-survey.jpg",
    number: "03",
  },
  {
    title: "Interior Finishing",
    description: "Careful finishing work that brings materials, details, and day-to-day function together.",
    image: "/images/finishing-worker.jpg",
    number: "04",
  },
  {
    title: "Renovation",
    description: "Well-managed upgrades that respect what works and improve what no longer does.",
    image: "/images/nairobi-construction-crew.jpg",
    number: "05",
  },
  {
    title: "Project Management & Consulting",
    description: "Practical oversight, coordination, and decision support at every important milestone.",
    image: "/images/architects-blueprint.jpg",
    number: "06",
  },
];

export const journeyBeats = [
  { number: "01", title: "Client brief & site survey", copy: "We listen first, visit the site, and make the constraints and opportunities visible before plans harden.", icon: "survey" },
  { number: "02", title: "Plans & approvals", copy: "Design coordination and authority submissions are tracked as one clear, connected process.", icon: "plans" },
  { number: "03", title: "Ground breaks & structure rises", copy: "Our team sequences the work, supervises quality, and keeps progress easy to follow.", icon: "build" },
  { number: "04", title: "Keys handed to the client", copy: "We close out snags, share the handover details, and leave you ready for what comes next.", icon: "handover" },
] as const;

export const testimonials = [
  { name: "Grace M.", project: "Homeowner · Nairobi residence", quote: "The team made each milestone clear and kept us involved in the decisions that mattered.", illustrative: true },
  { name: "David K.", project: "Property developer · Commercial build", quote: "Consistent updates helped our team plan ahead and respond quickly when details changed.", illustrative: true },
  { name: "Amina N.", project: "Diaspora client · Family home", quote: "Having a reliable point of contact at home made the whole process feel more manageable.", illustrative: true },
];
