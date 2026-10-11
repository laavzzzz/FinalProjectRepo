"use client";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import LogoSlider from "@/components/sections/LogoSlider";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen antialiased bg-[#fffaf5]">
      <Navbar />

      {/* Hero Section - Centered, No Mockup */}
      <div className="relative overflow-hidden">
        <Hero />
        <LogoSlider />
      </div>

      <section className="relative z-10 bg-white">
        <Stats />
        <Features /> 
      </section>

      {/* Product perspective section */}
      <section className="overflow-hidden border-y border-[#eaded4] bg-[#fff8f3] py-24">
        <div className="mx-auto mb-12 max-w-6xl px-5 sm:px-8">
           <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#d96535]">Built around people</p>
           <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.04em] text-[#2b211b] sm:text-4xl">A calmer way to move care forward.</h2>
        </div>
        
        <Testimonials />
      </section>

      {/* FAQ Section - Kept as requested */}
      <div id="faq" className="border-t border-[#eaded4] bg-white">
        <FAQ />
      </div>

      <Footer />

    </main>
  );
}