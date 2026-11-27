export const PROFILE = {
  name: "Abhiishek Jain",
  legalName: "Abhishek Jain",
  headline: "Full-Stack Developer × AI/ML × DevOps",
  intro:
    "Engineering production web systems, real-time computer vision pipelines, and automated Kubernetes delivery workflows. Shipping fast, reliable software from India.",
  location: "India",
  phone: "+91 9548469164",
  email: "contactabhiishek101@gmail.com",
  linkedin: "https://www.linkedin.com/in/codewithabhiishek",
  github: "https://github.com/codewithabhiishek",
  portfolio: "https://abhiishek.is-a.dev/",
};

export const HIGHLIGHTS = [
  { metric: "20+", label: "Live Applications", detail: "Full-stack, AI/ML & cloud deployments" },
  { metric: "Argo CD", label: "Open Source Contributor", detail: "Docker Hub webhook parser & namespace UX" },
  { metric: "#8", label: "International Hackathon", detail: "Christ University, Delhi NCR" },
  { metric: "MSME 6.0", label: "Pitch Shortlisted", detail: "Expert Committee backed · Bennett Univ." },
];

export const SKILLS = [
  { category: "Languages", items: ["Python", "TypeScript", "SQL", "Bash"] },
  { category: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
  { category: "Backend", items: ["FastAPI", "WebSockets", "SQLModel", "SQLite"] },
  { category: "AI / ML", items: ["YOLOv8", "ByteTrack", "OpenCV", "XGBoost", "scikit-learn"] },
  {
    category: "DevOps & Cloud",
    items: ["Docker", "Kubernetes", "Jenkins", "Terraform", "Git", "GitHub Actions", "Argo CD"],
  },
];

export const EDUCATION = [
  {
    school: "DBS Global University",
    degree: "Bachelor of Computer Applications",
    period: "2023 – 2026",
    score: "CGPA: 7.48",
  },
  {
    school: "Jim Corbett Public School",
    degree: "Class XII",
    period: "2023",
    score: "74.89%",
  },
];

export const EXPERIENCE = {
  role: "Freelance Software Engineer",
  company: "Self-Employed",
  period: "2025 – 2026",
  bullets: [
    "Built and deployed full-stack client web applications end-to-end — frontend, backend, API integration, and deployment.",
    "Shipped production software including an inventory & billing system, a CRM platform, and a business website for a dental practice.",
    "Partnered directly with clients from requirements through launch, delivering working, deployed products.",
  ],
  selectedWork: ["Inventory & Billing System", "CRM Platform", "Dentist Website"],
};

export const PROJECTS = [
  {
    id: "01",
    name: "ChargeIQ — EV Route Planner",
    year: "2026",
    stack: ["React", "Vite", "FastAPI", "Python", "OSRM", "OpenChargeMap", "XGBoost", "scikit-learn"],
    impact: "30% faster charging-stop planning",
    description:
      "Full-stack EV trip planner combining real routing, ML wait-time prediction, and a hybrid real/estimated data engine with a 10% battery reserve safety margin.",
    bullets: [
      "Built a full-stack EV trip planner with OSRM and OpenChargeMap, cutting charging-stop planning time by 30%.",
      "Trained XGBoost and scikit-learn models to predict station wait times and improve route reliability.",
      "Designed a hybrid real/estimated data system with a 10% battery reserve safety margin.",
    ],
  },
  {
    id: "02",
    name: "Traffic Intelligence Platform",
    year: "2026",
    stack: ["YOLOv8n", "ByteTrack", "OpenCV", "FastAPI", "React 19", "WebSockets"],
    impact: "30 FPS live telemetry · 60% less manual monitoring",
    description:
      "Real-time AI traffic monitoring platform with multi-object vehicle tracking, speed estimation, zone-violation alerts, and JWT role-based access control.",
    bullets: [
      "Built an AI traffic monitoring platform using YOLOv8n, ByteTrack, and OpenCV for real-time vehicle detection and tracking.",
      "Added speed estimation, zone-violation detection, and JWT role-based access control.",
      "Streamed live telemetry at 30 FPS, cutting manual monitoring needs by 60% for site operators.",
    ],
  },
];

export const LEADERSHIP = [
  {
    year: "2025",
    title: "Hackathon Organizer (SIH Internal Round)",
    org: "DBS Global University",
    points: [
      "Coordinated logistics for 50+ teams and 200+ participants.",
      "Drove 15+ functional prototypes and a 20% rise in student participation year-over-year.",
    ],
  },
  {
    year: "INT'L",
    title: "International Hackathon Winner",
    org: "Christ University, Delhi NCR",
    points: ["Secured 8th rank in an International Hackathon at Christ University, Delhi NCR."],
  },
  {
    year: "2026",
    title: "MSME Idea Hackathon 6.0",
    org: "Host Institute: Bennett University, Noida",
    points: [
      "Shortlisted for Pitch Round; cleared Host Institute Round with Expert Committee backing; awaiting funding.",
    ],
  },
];

export const CERTIFICATIONS = [
  { name: "IBM DevOps and Software Engineering Specialization", issuer: "IBM", date: "Mar 2024" },
  { name: "Linux Commands & Shell Scripting Essentials V2", issuer: "Coursera", date: "Mar 2024" },
];
