export interface Project {
    id: string;
    title: string;
    description: string;
    image?: string;
    thumbnail?: string;
    tags?: string[];
    techStack?: string[];
    githubUrl?: string;
    liveUrl?: string;
    link?: string;
    category: "media" | "development";
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
