"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import NavbarWrapper from "@/components/NavbarWrapper";
import HandsOn from "@/components/HandsOn";

import Education from "@/components/Education";
import Carousel3D from "@/components/Carousel3D";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Equipment from "@/components/Equipment";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import AdminAccessButton from "@/components/AdminAccessButton";

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <>
            {loading && <Preloader />}
            <NavbarWrapper isLoading={loading} />
            <AdminAccessButton />
            <main className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}>
                <Hero />
                <HandsOn />
                <Skills />
                <Work />
                <Equipment />
                <Experience />
                <Education />
                <Carousel3D
                    items={[
                        {
                            id: 1,
                            image: "/assets/images/Carousel1.jpg",
                            title: "SIH 2025",
                            description: "Media Coverage and Official Video Partner for SIH 2025.",
                            link: "https://youtu.be/qhUdQNE2fvg?si=bEGqtF-IVQfmVsbX" // Add your actual project link here
                        },
                        {
                            id: 2,
                            image: "/assets/images/Carousel2.JPG",
                            title: "GDG DEVFEST 2025",
                            description: "Ofiicial Media partner for DEVFEST 2025 Ranchi in collaboration with Kizen Production. ",
                            link: "https://www.instagram.com/reel/DPwqsY-EiEp/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" // Add your actual project link here
                        },
                        {
                            id: 3,
                            image: "/assets/images/Carousel3.jpg",
                            title: "SIH Coverage",
                            description: "Media Coverage for SIH 2025.",
                            link: "https://www.instagram.com/p/DSC2bX4k9VP/" // Add your actual project link here
                        },
                        {
                            id: 4,
                            image: "/assets/images/Carousel4.jpg",
                            title: "Podcast Production",
                            description: "Podcast Production for The Lazy IITAN.",
                            link: "https://drive.google.com/file/d/1UVf0LLjRTB0ZkMZYWd_hTPkzbRI892RE/view?usp=drive_link" // Add your actual project link here
                        },
                        {
                            id: 5,
                            image: "/assets/images/Carousel5.jpg",
                            title: "Thumbnail Design",
                            description: "Thumbnail Design for Podcast Production.",
                            link: "https://drive.google.com/drive/folders/1TXVd9L9Sr-JPgLhpsY2cnzuM3-EIToHD?usp=drive_link" // Add your actual project link here
                        },
                    ]}
                />
                <Contact />
            </main>
        </>
    );
}
