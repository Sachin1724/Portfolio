"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 20,
        borderBottom: '2 solid #FF204E',
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 11,
        color: '#666666',
        marginBottom: 3,
    },
    contactInfo: {
        fontSize: 9,
        color: '#444444',
        marginTop: 5,
    },
    section: {
        marginTop: 15,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF204E',
        marginBottom: 8,
        textTransform: 'uppercase',
        borderBottom: '1 solid #CCCCCC',
        paddingBottom: 3,
    },
    text: {
        fontSize: 10,
        lineHeight: 1.5,
        color: '#333333',
        textAlign: 'justify',
    },
    educationItem: {
        marginBottom: 8,
    },
    educationTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000',
    },
    educationDetails: {
        fontSize: 9,
        color: '#666666',
        marginTop: 2,
    },
    skillsContainer: {
        marginTop: 5,
    },
    skillItem: {
        marginBottom: 6,
    },
    skillCategory: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 2,
    },
    skillList: {
        fontSize: 9,
        color: '#444444',
        lineHeight: 1.4,
    },
    projectItem: {
        marginBottom: 10,
    },
    projectTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 3,
    },
    projectDescription: {
        fontSize: 9,
        color: '#444444',
        lineHeight: 1.5,
    },
    workItem: {
        marginBottom: 10,
    },
    workTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000',
    },
    workDuration: {
        fontSize: 9,
        color: '#666666',
        fontStyle: 'italic',
        marginBottom: 3,
    },
    interestsList: {
        fontSize: 9,
        color: '#444444',
        lineHeight: 1.4,
    },
});

// Resume Document Component
export const ResumeDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>SACHIDANANDA MALLICK</Text>
                <Text style={styles.subtitle}>CSE Student · 5+ Years Experience in Content & Media</Text>
                <Text style={styles.subtitle}>BPUT (CSE) · Cuttack, Odisha</Text>
                <Text style={styles.contactInfo}>
                    📧 sachinmallickff.19@gmail.com  |  📱 6371885476
                </Text>
            </View>

            {/* Profile */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={styles.text}>
                    Creative and technically skilled CSE student with 5+ years of hands-on experience in content creation,
                    media production, video editing, color grading, and UI-focused frontend development. Experienced in
                    Cinemaline Camera handling, composition, podcast production, and digital branding. Passionate about
                    merging tech, design, and storytelling to create meaningful digital experiences.
                </Text>
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                <View style={styles.educationItem}>
                    <Text style={styles.educationTitle}>Biju Patnaik University of Technology (BPUT)</Text>
                    <Text style={styles.educationDetails}>B.Tech CSE, Expected 2028</Text>
                </View>
                <View style={styles.educationItem}>
                    <Text style={styles.educationTitle}>Chandrasekhar Academy</Text>
                    <Text style={styles.educationDetails}>Higher Secondary (12th), 2023 — 72.4%</Text>
                </View>
                <View style={styles.educationItem}>
                    <Text style={styles.educationDetails}>High School (10th), 2021 — 92.4%</Text>
                </View>
            </View>

            {/* Technical & Creative Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical & Creative Skills</Text>
                <View style={styles.skillsContainer}>
                    <View style={styles.skillItem}>
                        <Text style={styles.skillCategory}>Frontend Development:</Text>
                        <Text style={styles.skillList}>
                            React.js, Next.js, JavaScript, TypeScript, HTML, CSS, TailwindCSS, Framer Motion, UI Animation
                        </Text>
                    </View>
                    <View style={styles.skillItem}>
                        <Text style={styles.skillCategory}>Creative & Media Skills:</Text>
                        <Text style={styles.skillList}>
                            Cinemaline Camera Handling, Shot Composition, Movie-style Color Grading, Storyboarding,
                            Scripting, Direction
                        </Text>
                    </View>
                    <View style={styles.skillItem}>
                        <Text style={styles.skillCategory}>Audio & Podcast:</Text>
                        <Text style={styles.skillList}>
                            Podcast Production, Audio Cleaning, Mixing, Mastering, Audacity
                        </Text>
                    </View>
                    <View style={styles.skillItem}>
                        <Text style={styles.skillCategory}>Editing Software:</Text>
                        <Text style={styles.skillList}>
                            DaVinci Resolve, Adobe Premiere Pro, After Effects, Audacity, Photoshop, Canva, Affinity Designer
                        </Text>
                    </View>
                    <View style={styles.skillItem}>
                        <Text style={styles.skillCategory}>Programming & Tools:</Text>
                        <Text style={styles.skillList}>
                            Git, GitHub, VS Code, REST APIs, Postman, Figma, Basic Node.js
                        </Text>
                    </View>
                    <View style={styles.skillItem}>
                        <Text style={styles.skillCategory}>Soft Skills:</Text>
                        <Text style={styles.skillList}>
                            Leadership, Team Collaboration, Creative Thinking, Problem-Solving, Adaptability, Communication
                        </Text>
                    </View>
                </View>
            </View>

            {/* Project Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Project Experience</Text>
                <View style={styles.projectItem}>
                    <Text style={styles.projectTitle}>Solaris – Real-Time Solar Energy Monitoring System</Text>
                    <Text style={styles.projectDescription}>
                        Developed a real-time energy monitoring dashboard for solar panels using ESP32, WebSockets, Node.js,
                        and chart visualizations. Designed the complete frontend dashboard UI, enabling real-time updates,
                        device diagnostics, power output analysis, live graphs, and historical performance tracking.
                    </Text>
                </View>
                <View style={styles.projectItem}>
                    <Text style={styles.projectTitle}>Freelance Video Editing & Media Production</Text>
                    <Text style={styles.projectDescription}>
                        Produced cinematic edits, short-form reels, long-form videos, brand promos, and storytelling-based
                        content for creators. Handled color grading, composition, transitions, pacing, and thumbnails.
                        Supported podcast teams with full audio-video workflow.
                    </Text>
                </View>
            </View>

            {/* Work Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                <View style={styles.workItem}>
                    <Text style={styles.workTitle}>Freelance Video Editor & Media Creator</Text>
                    <Text style={styles.workDuration}>2019 – Present</Text>
                    <Text style={styles.projectDescription}>
                        Delivered 50+ professional edits across YouTube, Instagram, brand ads, and event-based content.
                        Skilled in crafting emotion-driven edits, maintaining color consistency, and enhancing narrative
                        structure. Experienced in client coordination, creative direction, and fast-turnaround deliveries.
                    </Text>
                </View>
            </View>

            {/* Additional Interests */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional Interests</Text>
                <Text style={styles.interestsList}>
                    Cinematic Filmmaking · UI/UX Design · Podcasting · Indie Videography · Visual Storytelling · Media Technology
                </Text>
            </View>

            {/* Contact Footer */}
            <View style={{ marginTop: 20, borderTop: '1 solid #CCCCCC', paddingTop: 10 }}>
                <Text style={styles.contactInfo}>
                    📧 sachinmallickff.19@gmail.com  |  📱 6371885476
                </Text>
            </View>
        </Page>
    </Document>
);
