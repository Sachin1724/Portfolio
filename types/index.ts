export interface Project {
    id: string;
    title: string;
    description: string;
    image?: string;
    thumbnail?: string;
    tags?: string[];
    tech_stack?: string[];
    github_url?: string;
    live_url?: string;
    link?: string;
    video_url?: string;
    aspect_ratio?: "16/9" | "9/16" | "1/1" | "4/5";  // Controls card display size
    category: "media" | "dev";
}

export interface Skill {
    name: string;
    level?: number;
}

export interface SkillCategory {
    title: string;
    skills: Skill[];
}

export interface EquipmentItem {
    icon: string;
    type: string;
    model: string;
    image?: string;
    usage: string;
    specs?: string[];
}

export interface ExperienceItem {
    role: string;
    organization: string;
    duration: string;
    responsibilities: string[];
}

export interface EducationItem {
    degree: string;
    institute: string;
    duration: string;
    description: string;
}

export interface PackageItem {
    id: string;
    badge: string;
    name: string;
    price: string;
    pricePer: string;
    priceNote?: string;
    description: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    featured?: boolean;
    emailSubject: string;
}

export interface ClientItem {
    name: string;
    logo: string;
    fallbackEmoji: string;
}

export interface ContentCard {
    icon: string;
    title: string;
    subtitle: string;
}

export interface ProcessStep {
    num: string;
    title: string;
    description: string;
}
