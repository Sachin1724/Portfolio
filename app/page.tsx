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
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="site">
            <Nav />
            <main>
                <Hero />
                <Marquee />
                <Clients />
                <div className="pasapali" aria-hidden="true" />
                <Work />
                <div className="zig" aria-hidden="true" />
                <About />
                <div className="pasapali pasapali--red" aria-hidden="true" />
                <Toolkit />
                <Gear />
                <div className="zig" aria-hidden="true" style={{ ["--b" as string]: "var(--rani)" }} />
                <Packages />
                <div className="pasapali" aria-hidden="true" />
                <Onboarding />
                <Teaching />
                <div className="zig" aria-hidden="true" style={{ ["--b" as string]: "var(--chuna)" }} />
                <Journey />
                <Testimonials />
                <div className="pasapali pasapali--red" aria-hidden="true" />
                <FAQ />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
