import {
    SkillCategory,
    EquipmentItem,
    ExperienceItem,
    EducationItem,
    PackageItem,
    ClientItem,
    ContentCard,
    ProcessStep,
    Project,
} from "@/types";

// ─── Navigation ───────────────────────────────────────────
export const NAV_LINKS = [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Gadgets", href: "#gadgets" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
    { name: "GitHub", url: "https://github.com/Sachin1724", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sachidananda-mallick/", icon: "linkedin" },
    { name: "Instagram", url: "https://www.instagram.com/iamsachindada", icon: "instagram" },
    { name: "YouTube", url: "https://www.youtube.com/@sachindadaorginals", icon: "youtube" },
];

// ─── Hero Stats ───────────────────────────────────────────
export const HERO_STATS = [
    { value: "2.4K", label: "Followers" },
    { value: "1.7Lakh", label: "Views / Month" },
    { value: "77", label: "Posts" },
];

// ─── Skills Ticker ────────────────────────────────────────
export const TICKER_SKILLS = [
    "Video Editing",
    "Web Development",
    "Motion Graphics",
    "Frontend Design",
    "Cinematography",
    "Photography",
    "Reels Editing",
    "Odia Content",
];

// ─── Clients ──────────────────────────────────────────────
export const CLIENTS: ClientItem[] = [
    { name: "Viral Vir", logo: "/assets/images/clients/client-1.png", fallbackEmoji: "🏢" },
    { name: "Cubiktech", logo: "/assets/images/clients/client-2.png", fallbackEmoji: "🎯" },
    { name: "Dear Sir Bari Sir", logo: "/assets/images/clients/client-3.png", fallbackEmoji: "🚀" },
    { name: "BPUT Odisha", logo: "/assets/images/clients/client-4.png", fallbackEmoji: "💼" },
    { name: "MO Nimapada", logo: "/assets/images/clients/client-5.png", fallbackEmoji: "⚡" },
    { name: "GDG RANCHI", logo: "/assets/images/clients/client-6.png", fallbackEmoji: "🎨" },
    { name: "MASTER CHEF ROURKELA", logo: "/assets/images/clients/client-7.png", fallbackEmoji: "🍳" },
];

// ─── About / Skills Tags ─────────────────────────────────
export const ABOUT_SKILLS = [
    "React / HTML / CSS / JS",
    "Reels & Video Editing",
    "Motion Graphics",
    "Photography",
    "Cinematography",
    "Frontend Design",
    "Odia Content Creation",
    "Landing Page Development",
];

// ─── Packages (Freelance Services) ───────────────────────
export const PACKAGES: PackageItem[] = [
    {
        id: "reels",
        badge: "Reels",
        name: "Reel Retainer",
        price: "₹8,000",
        pricePer: "/ month",
        description: "For creators and small brands who want consistent, high-quality reels every week.",
        features: [
            "4 edited reels per month",
            "Captions + subtitles included",
            "2 revision rounds each",
            "Delivered in 3 days",
            "Trending audio suggestions",
        ],
        ctaText: "Connect",
        ctaLink: "",
        emailSubject: "Reel Retainer Inquiry",
    },
    {
        id: "brand",
        badge: "⭐ Most Popular",
        name: "Brand Starter",
        price: "₹12,000",
        pricePer: "/ project",
        description: "Perfect for small businesses launching online — get a full digital identity in one shot.",
        features: [
            "1-page landing website",
            "3 motion graphics / banners",
            "Logo animation",
            "Mobile responsive design",
            "Delivered in 7 days",
        ],
        ctaText: "Connect",
        ctaLink: "",
        emailSubject: "Brand Starter Inquiry",
        featured: true,
    },
    {
        id: "video",
        badge: "Video",
        name: "Full Video Starter",
        price: "₹15,000",
        pricePer: "/ project",
        priceNote: "*Price may vary depending on content need",
        description: "High-quality editing for long-form / full-size videos up to 30 mins (Podcast, Comedy, Gaming, Story).",
        features: [
            "Up to 30 mins video editing",
            "Premium sound designing",
            "Custom motion graphics",
            "2 revision rounds included",
            "Delivered in 7 days",
            "Thumbnail design (+ addl. charges)",
        ],
        ctaText: "Connect",
        ctaLink: "",
        emailSubject: "Full Video Starter Inquiry",
    },
    {
        id: "webdev",
        badge: "Web Dev",
        name: "Landing Page",
        price: "₹15,000",
        pricePer: "/ project",
        description: "Fast, clean, conversion-ready landing page for your product, startup, or portfolio.",
        features: [
            "Custom HTML/CSS/JS or React",
            "Fully mobile responsive",
            "Contact form integration",
            "Basic SEO setup",
            "Delivered in 5–7 days",
        ],
        ctaText: "Connect",
        ctaLink: "",
        emailSubject: "Landing Page Inquiry",
    },
];

// ─── Content Section ─────────────────────────────────────
export const CONTENT_CARDS: ContentCard[] = [
    { icon: "💻", title: "Dev Tutorials in Odia", subtitle: "HTML, CSS, JS, Web Dev basics" },
    { icon: "🎬", title: "Behind the Scenes", subtitle: "Editing process, gear, workflow" },
    { icon: "🚀", title: "Futuristic Ideas", subtitle: "Digital stories and tech experiments" },
];

export const IG_STATS = [
    { value: "2.4K", label: "Followers" },
    { value: "77", label: "Posts" },
    { value: "1.7L", label: "Views / mo" },
];

// ─── Contact Process Steps ───────────────────────────────
export const PROCESS_STEPS: ProcessStep[] = [
    {
        num: "01",
        title: "You DM me the keyword",
        description: "No forms. No emails. Just a DM on Instagram with the package keyword.",
    },
    {
        num: "02",
        title: "I send you a brief form",
        description: "Quick Google form to understand your requirements. Takes 5 minutes.",
    },
    {
        num: "03",
        title: "50% advance, work starts",
        description: "UPI payment, work begins within 24 hours. No delays.",
    },
    {
        num: "04",
        title: "Delivery + final payment",
        description: "Files delivered, revisions done, remaining 50% cleared. Done.",
    },
];

// ─── Projects (migrated from Supabase & Local JSON) ───────────
import projectsData from "../data/projects.json";

export const MEDIA_PROJECTS = projectsData.MEDIA_PROJECTS as Project[];
export const DEV_PROJECTS = projectsData.DEV_PROJECTS as Project[];

// ─── Skills (kept for admin/resume) ──────────────────────
export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        title: "Editing & Content",
        skills: [
            { name: "Video Editing" },
            { name: "Motion Graphics" },
            { name: "Color Grading" },
            { name: "Audio Mixing" },
            { name: "Scriptwriting" },
            { name: "Audacity" },
        ],
    },
    {
        title: "Frontend Development",
        skills: [
            { name: "HTML & CSS" },
            { name: "JavaScript" },
            { name: "TypeScript" },
            { name: "React" },
            { name: "Next.js" },
            { name: "Tailwind CSS" },
        ],
    },
    {
        title: "Backend / Tools",
        skills: [
            { name: "Node.js" },
            { name: "Express" },
            { name: "MongoDB" },
            { name: "PostgreSQL" },
            { name: "Git & GitHub" },
            { name: "REST APIs" },
        ],
    },
    {
        title: "Other",
        skills: [
            { name: "UI/UX Design" },
            { name: "Figma" },
            { name: "Adobe Premiere Pro" },
            { name: "After Effects" },
            { name: "DaVinci Resolve" },
        ],
    },
];

// ─── Equipment ───────────────────────────────────────────
export const EQUIPMENT: EquipmentItem[] = [
    {
        icon: "camera",
        type: "Primary Camera",
        model: "Canon EOS",
        image: "/assets/images/canon-camera.png",
        usage: "Used for shooting production photos and high-resolution videos",
        specs: [
            "Type: DSLR / Mirrorless",
            "Sensor: Full-frame CMOS",
            "ISO Range: 100–25600 (expandable)",
            "Autofocus: Dual Pixel CMOS AF",
            "Max Video: 4K @ 30fps, Full HD @ 120fps",
            "Connectivity: USB, Wi-Fi, Bluetooth",
        ],
    },
    {
        icon: "laptop",
        type: "Laptop",
        model: "ASUS TUF A15 RTX 4050",
        image: "/assets/images/asus-laptop.jpg",
        usage: "Main machine for video editing, coding, and development work",
        specs: [
            "Processor: AMD Ryzen 7 7735HS",
            "GPU: NVIDIA RTX 4050 (6GB GDDR6)",
            "RAM: 16GB DDR5 (expandable to 32GB)",
            "Storage: 512GB NVMe SSD",
            'Display: 15.6\" FHD, 144Hz',
            "Battery: 90Wh | Ports: USB-C, HDMI 2.1",
        ],
    },
    {
        icon: "smartphone",
        type: "Smartphone",
        model: "Samsung S23",
        image: "/assets/images/samsung-phone.jpg",
        usage: "Mobile content creation, quick edits, and social media management",
        specs: [
            'Display: 6.1\" Dynamic AMOLED 2X, 120Hz',
            "Processor: Snapdragon 8 Gen 2",
            "RAM: 8GB | Storage: 128/256GB",
            "Camera: 50MP main, 12MP ultrawide",
            "Video: Up to 8K 30fps / 4K 60fps",
            "Battery: 3900mAh",
        ],
    },
    {
        icon: "microphone",
        type: "Microphone",
        model: "Ulanzi A100 Wireless",
        image: "/assets/images/microphone.jpg",
        usage: "Professional audio recording for voiceovers and on-location shoots",
        specs: [
            "System: 2.4GHz wireless",
            "Range: ~100m",
            "Battery: Up to 9–12 hours",
            "Output: USB-C / TRRS / TRS",
            "Features: Noise reduction, dual-channel",
        ],
    },
    {
        icon: "headphones",
        type: "IEM",
        model: "FiiO JD1",
        image: "/assets/images/iem.jpg",
        usage: "Audio monitoring and precision mixing during editing sessions",
        specs: [
            "Driver: 10mm dynamic driver",
            "Frequency Response: 20Hz–20kHz",
            "Impedance: 16Ω",
            "Cable: Detachable (0.78mm 2-pin)",
        ],
    },
    {
        icon: "light",
        type: "Gimbal",
        model: "DJI OSMO 7P",
        image: "/assets/images/gimbal.jpg",
        usage: "Mobile gimbal for smooth shots and on-location production shoots",
        specs: [
            "Type: Smartphone gimbal, 3-axis",
            "Battery Life: ~8 hours",
            "Charging: USB-C Fast Charge",
            "Features: ActiveTrack, Gesture control",
            "Modes: Panorama / Timelapse",
        ],
    },
];

// ─── Experience ──────────────────────────────────────────

export const EXPERIENCE: ExperienceItem[] = [
    {
        role: "Freelance Video Editor / Cinematographer",
        organization: "Self-Employed",
        duration: "2022 - Present",
        responsibilities: [
            "Edited short-form and long-form video content for various clients and brands",
            "Created motion graphics and visual effects for promotional materials",
            "Managed end-to-end video production from concept to final delivery",
            "For - The Viral Vir, Lenstalk Media, The Lazy IITAN",
        ],
    },
    {
        role: "Media Partner",
        organization: "Google Developer Groups (Ranchi)",
        duration: "2024",
        responsibilities: [
            "Capturing Every Moment for the official Devfest 2025 Ranchi.",
            "Creating, Capturing and creating short form content.",
        ],
    },
    {
        role: "Content Creator",
        organization: "BPUT Cultural Coordinator",
        duration: "2024",
        responsibilities: [
            "Produced video content for college events and social media channels",
            "Designed promotional materials and digital assets",
            "Coordinated with team members for content planning and execution",
        ],
    },
];

// ─── Education ───────────────────────────────────────────
export const EDUCATION: EducationItem[] = [
    {
        degree: "B.Tech in Computer Science & Engineering",
        institute: "BPUT, Odisha",
        duration: "2024 - 2028",
        description:
            "Focused on software development, problem solving, and modern web technologies. Participated in multiple hackathons and technical events.",
    },
    {
        degree: "Higher Secondary (12th), 2023 — 72.4%",
        institute: "Chandrasekhar Academy",
        duration: "2021 - 2023",
        description: "Focus on Learning.",
    },
    {
        degree: "Secondary (10th), 2021 — 92.4%",
        institute: "Chandrasekhar Academy",
        duration: "2021 - 2022",
        description: "Focus on Learning.",
    },
];
