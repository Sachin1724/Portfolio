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
