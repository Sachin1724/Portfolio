import { Project, SkillCategory, EquipmentItem, ExperienceItem, EducationItem } from "@/types";

export const NAV_LINKS = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Work", href: "#work" },


    { name: "Equipment", href: "#equipment" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
];

export const SOCIAL_LINKS = [
    { name: "GitHub", url: "https://github.com/Sachin1724", icon: "github" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sachidananda-mallick/", icon: "linkedin" },
    { name: "Instagram", url: "https://www.instagram.com/sachinmallick_/", icon: "instagram" },
    { name: "YouTube", url: "https://www.youtube.com/@sachindadaorginals", icon: "youtube" },
];

export const MEDIA_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Brand Promotional Reel",
        description: "Created engaging short-form content with motion graphics and color grading for social media campaigns.",
        image: "/assets/images/Carousel1.jpg",
        tags: ["Short-form"],
        category: "media",
        link: "https://youtu.be/qhUdQNE2fvg?si=lzrohVrrXKrTQvTL",
    },
    {
        id: "2",
        title: "Event Highlight Video",
        description: "Edited long-form documentary-style coverage of tech event with cinematic transitions and audio mixing.",
        image: "/assets/images/Carousel2.JPG",
        tags: ["Long-form"],
        category: "media",
        link: "https://www.instagram.com/reel/DPwqsY-EiEp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
        id: "3",
        title: "Product Launch Video",
        description: "Scripted and edited product showcase with dynamic animations and professional voiceover integration.",
        image: "/assets/images/Carousel3.jpg",
        tags: ["Short-form"],
        category: "media",
        link: "https://www.instagram.com/p/DRupYfzjlrq/",
    },
    {
        id: "4",
        title: "Tutorial Series",
        description: "Produced educational content series with screen recordings, graphics overlays, and clear narration.",
        image: "/assets/images/Carousel5.jpg",
        tags: ["Long-form"],
        category: "media",
        link: "https://www.instagram.com/p/DLqAI4YtgJd/",
    },
];

export const DEV_PROJECTS: Project[] = [
    {
        id: "1",
        title: "Solaris",
        image: "/assets/images/solaris.jpg",
        description: "Full-stack Solar Panel Management System.",
        techStack: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
        githubUrl: "https://github.com/Sachin1724/solaris-frontend-v1",
        category: "development",
    },

];

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

export const EQUIPMENT: EquipmentItem[] = [
    {
        icon: "camera",
        type: "Primary Camera",
        model: "Canon 1200D",
        usage: "Used for shooting production photos",
        specs: [
            "Type: DSLR",
            "Sensor: APS-C CMOS (18 MP)",
            "ISO Range: 100–6400 (expandable to 12800)",
            "Autofocus: 9-point AF",
            "Max Video: 1080p @ 30fps",
            "Lens Mount: Canon EF / EF-S",
            "Connectivity: USB 2.0, Mini HDMI"
        ]
    },
    {
        icon: "laptop",
        type: "Laptop",
        model: "ASUS TUF A15 RTX 4050",
        usage: "Main machine for video editing, coding, and development work",
        specs: [
            "Processor: AMD Ryzen 7 7735HS",
            "GPU: NVIDIA RTX 4050 (6GB GDDR6)",
            "RAM: 16GB DDR5 (expandable to 32GB)",
            "Storage: 512GB NVMe SSD",
            "Display: 15.6\" FHD, 144Hz",
            "Battery: 90Wh",
            "Ports: USB-C, USB-A, HDMI 2.1, RJ45"
        ]
    },
    {
        icon: "smartphone",
        type: "Smartphone",
        model: "Samsung S23",
        usage: "Mobile content creation, quick edits, and social media management",
        specs: [
            "Display: 6.1\" Dynamic AMOLED 2X, 120Hz",
            "Processor: Snapdragon 8 Gen 2",
            "RAM: 8GB | Storage: 128/256GB",
            "Camera: 50MP main, 12MP ultrawide, 10MP 3x telephoto",
            "Video: Up to 8K 30fps / 4K 60fps",
            "Battery: 3900mAh"
        ]
    },
    {
        icon: "microphone",
        type: "Microphone",
        model: "Audio Array AM-C1 / Ulanzi A100",
        usage: "Professional audio recording for voiceovers and podcasts",
        specs: [
            "AM-C1: 2.4GHz wireless system",
            "Range: ~100m | Battery: Up to 8 hours",
            "Output: USB-C / TRRS / TRS",
            "Ulanzi A100: Wireless lavalier mic",
            "Features: Noise reduction, dual-channel",
            "Battery: 9–12 hours"
        ]
    },
    {
        icon: "headphones",
        type: "IEM",
        model: "FiiO JD1",
        usage: "Audio monitoring and mixing during editing sessions",
        specs: [
            "Driver: 10mm dynamic driver",
            "Frequency Response: 20Hz–20kHz",
            "Impedance: 16Ω",
            "Cable: Detachable (0.78mm 2-pin)"
        ]
    },
    {
        icon: "light",
        type: "Gimbal",
        model: "DJI OSMO 7P",
        usage: "Mobile Gimbal for mobile content creation and Go to Shoots",
        specs: [
            "Type: Smartphone gimbal",
            "Stabilization: 3-axis",
            "Battery Life: ~8 hours",
            "Charging: USB-C Fast Charge",
            "Features: ActiveTrack, Gesture control",
            "Modes: Panorama / Timelapse"
        ]
    },
];

export const EXPERIENCE: ExperienceItem[] = [
    {
        role: "Freelance Video Editor/ Cinematographer",
        organization: "Self-Employed",
        duration: "2022 - Present",
        responsibilities: [
            "Edited short-form and long-form video content for various clients and brands",
            "Created motion graphics and visual effects for promotional materials",
            "Managed end-to-end video production from concept to final delivery",
            "For - The Viral Vir , Lenstalk Media , The Lazy IITAN",
        ],
    },
    {
        role: "Media Partner",
        organization: "Google Developer Groups (Ranchi)",
        duration: "2024",
        responsibilities: [
            "Capturing Every Moment for the offical Devfest 2025 Ranchi.",
            "Creating Capturing and creating short form content.",
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

export const EDUCATION: EducationItem[] = [
    {
        degree: "Higher Secondary (12th), 2023 — 72.4%",
        institute: "Chandrasekhar Academy",
        duration: "2021 - 2023",
        description: "Focus on Learnging.",
    },

    {
        degree: "B.Tech in Computer Science & Engineering",
        institute: "BPUT, Odisha",
        duration: "2024 - 2028",
        description: "Focused on software development, problem solving, and modern web technologies. Participated in multiple hackathons and technical events.",
    },
];
