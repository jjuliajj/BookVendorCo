import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { GraduationCap, ShieldCheck, Award, BookOpen, Layers, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publisher Authority & Academic Trust Mission",
  description: "Learn about BookVendor Co. Academic Press mission, editorial guidelines, and digital licensing standards.",
};

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-5xl space-y-16">
          
          {/* Header */}
          <header className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#E66D5C] font-sans font-bold text-xs uppercase tracking-[0.2em] inline-block bg-[#E66D5C]/10 px-3 py-1 rounded-full border border-[#E66D5C]/20">
              Institutional Heritage & Mission
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-[#002147]">
              Publisher Authority & Trust
            </h1>
            <p className="text-base text-[#002147]/70 leading-relaxed font-sans">
              BookVendor Co. is a distinguished digital literature press dedicated to preserving critical inquiry, scholarly monographs, and DRM-free literature for modern readers worldwide.
            </p>
          </header>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#002147]/15 shadow-sm space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#002147] text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-[#E66D5C]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002147]">Peer-Reviewed Rigor</h3>
              <p className="text-xs text-[#002147]/70 font-sans leading-relaxed">
                Every volume in our catalogue undergoes meticulous editorial review, verified citation formatting, and metadata archiving.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#002147]/15 shadow-sm space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#002147] text-white flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6 text-[#E66D5C]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002147]">Open EPUB Standards</h3>
              <p className="text-xs text-[#002147]/70 font-sans leading-relaxed">
                We believe in reader ownership. All digital volumes are delivered in clean EPUB 3.0 standards compatible with any digital e-reader.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-[#002147]/15 shadow-sm space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#002147] text-white flex items-center justify-center font-bold">
                <Award className="w-6 h-6 text-[#E66D5C]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002147]">Global Scholarly Access</h3>
              <p className="text-xs text-[#002147]/70 font-sans leading-relaxed">
                Connecting authors and readers across philosophy, non-fiction, fiction, and foundational sciences with seamless instant access.
              </p>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-[#002147] text-[#F7F5F0] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#002147] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 max-w-xl text-left">
              <h2 className="text-3xl font-serif font-bold text-white">Explore Our Digital Catalogue</h2>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                Browse our complete collection of curated monographs and literary works.
              </p>
            </div>
            <Link
              href="/collections"
              className="bg-[#E66D5C] hover:bg-white text-white hover:text-[#002147] px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 flex-shrink-0"
            >
              <span>Browse Full Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
