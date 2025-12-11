"use client";

import { TubelightNavbar } from "@/components/ui/TubelightNavbar";
import { Home, Briefcase, Code, GraduationCap, Mail, Folder, Cpu } from "lucide-react";

interface NavbarWrapperProps {
    isLoading?: boolean;
}

export default function NavbarWrapper({ isLoading = false }: NavbarWrapperProps) {
    const navItems = [
        { name: "Home", url: "#home", icon: Home },
        { name: "Skills", url: "#skills", icon: Code },
        { name: "Work", url: "#work", icon: Folder },
        { name: "Gadgets", url: "#equipment", icon: Cpu },
        { name: "Experience", url: "#experience", icon: Briefcase },
        { name: "Education", url: "#education", icon: GraduationCap },
        { name: "Contact", url: "#contact", icon: Mail },
    ];

    return <TubelightNavbar items={navItems} />;
}
