# Sachin Mallick - Personal Portfolio

A modern, single-page personal portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🎨 Features

- **Animated Preloader** with custom SM monogram logo
- **Glassmorphism UI** with smooth animations
- **Role Rotation** animation in hero section
- **Tabbed Work Section** showcasing Media and Development projects
- **Scroll Reveal Animations** throughout all sections
- **Responsive Design** optimized for all devices
- **Contact Form** with success feedback
- **Dark Theme** with vibrant accent colors

## 🎯 Sections

1. **Hero** - Introduction with role rotation and social links
2. **About** - Personal introduction and interests
3. **Education** - Academic background with timeline
4. **Work** - Tabbed showcase of Media and Development projects
5. **Skills** - Categorized skill sets
6. **Equipment** - Tools and gear used
7. **Experience** - Work history with timeline
8. **Contact** - Contact form and social links

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Color Palette

- **Background**: `#211832`
- **Primary Accent**: `#F25912`
- **Secondary Accent 1**: `#5C3E94`
- **Secondary Accent 2**: `#412B6B`

## 📝 Customization

### Update Personal Information

Edit the constants in `/lib/constants.ts`:
- Social links
- Projects (Media and Development)
- Skills
- Equipment
- Work experience
- Education

### Add Your Photo

Replace the placeholder in `/components/Hero.tsx` with your actual image:
1. Add your image to `/public/sachin.png`
2. Update the Hero component to use the image

### Update Fonts

The project uses **Plus Jakarta Sans** from Google Fonts as a placeholder. To use custom fonts:
1. Add font files to `/public/fonts/`
2. Update `/app/layout.tsx` to use `next/font/local`

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Scroll Detection**: react-intersection-observer

## 📦 Project Structure

```
Portfolio/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Preloader.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Education.tsx
│   ├── Work.tsx
│   ├── ProjectCard.tsx
│   ├── Skills.tsx
│   ├── SkillCategoryCard.tsx
│   ├── Equipment.tsx
│   ├── Experience.tsx
│   ├── TimelineItem.tsx
│   └── Contact.tsx
├── hooks/
│   └── useScrollReveal.ts
├── lib/
│   └── constants.ts
├── types/
│   └── index.ts
└── public/
```

## 📄 License

© 2025 Sachin Mallick. All rights reserved.

## 🤝 Contact

- Email: sachin@example.com
- GitHub: [Update in constants.ts]
- LinkedIn: [Update in constants.ts]
- Instagram: [Update in constants.ts]
