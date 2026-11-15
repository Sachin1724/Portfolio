import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Clients from "@/components/Clients";
import Work from "@/components/Work";
import About from "@/components/About";
import Toolkit from "@/components/Toolkit";
import Gear from "@/components/Gear";
import Packages from "@/components/Packages";
import Onboarding from "@/components/Onboarding";
import Teaching from "@/components/Teaching";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
    return (
        <div className="site">
            <div className="noise" aria-hidden="true" />
            <Nav />
            <main id="top">
                <Hero />
                <Marquee />
                <Clients />
                <Work />
                <About />
                <Toolkit />
                <Gear />
                <Packages />
                <Onboarding />
                <Teaching />
                <Journey />
                <Testimonials />
                <FAQ />
                <Contact />
            </main>
        </div>
    );
}
