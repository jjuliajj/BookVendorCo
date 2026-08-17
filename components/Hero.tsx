import Link from "next/link";
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles, BookOpen, Layers, Award } from "lucide-react";

export default function Hero() {
  return (
    <section className="pt-32 pb-16 bg-[#F7F5F0] border-b border-[#002147]/10 font-sans relative overflow-hidden">
      {/* Background Subtle Accent Watermark */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#E66D5C]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-[#002147]/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl relative z-10">
        
        {/* Main Academic Hero Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-12 md:p-16 border border-[#002147]/15 shadow-xl grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#002147]/5 text-[#002147] text-xs font-bold rounded-full border border-[#002147]/15 uppercase tracking-widest font-sans">
              <GraduationCap className="w-4 h-4 text-[#E66D5C]" /> Oxford Academic Press Repository
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#002147] leading-[1.1]">
              Scholarly Literature & <br />
              <span className="text-[#E66D5C] italic font-normal">Digital Archives</span>
            </h1>

            <p className="text-base sm:text-lg text-[#002147]/70 font-sans leading-relaxed max-w-xl">
              Centralized digital book supply hub. Access peer-reviewed monographs, philosophy essays, and curated literature formatted for verified EPUB digital devices.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                href="/collections" 
                className="bg-[#002147] hover:bg-[#E66D5C] text-white px-8 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2 group"
              >
                <span>Browse Full Catalogue</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/genres"
                className="bg-[#F7F5F0] hover:bg-[#002147]/10 text-[#002147] px-6 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-[#002147]/20 flex items-center gap-2"
              >
                <Layers className="w-4 h-4 text-[#002147]" />
                <span>Explore Disciplines</span>
              </Link>
            </div>

            {/* Micro badges */}
            <div className="pt-4 border-t border-[#002147]/10 flex flex-wrap items-center gap-6 text-xs text-[#002147]/60 font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Peer-Reviewed Citations
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#E66D5C]" /> Instant EPUB 3.0 Manifest
              </span>
            </div>
          </div>

          {/* Right Column: Featured Press Stats Card */}
          <div className="lg:col-span-5 bg-[#002147] text-[#F7F5F0] p-8 rounded-2xl border border-[#002147] shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <span className="text-xs font-bold text-[#E66D5C] uppercase tracking-widest flex items-center gap-2">
                <Award className="w-4 h-4" /> Editorial Authority
              </span>
              <span className="text-[10px] font-mono text-white/50 uppercase">EST. 2026</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-3xl font-serif font-bold text-white">40+</div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-1">Published Volumes</div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-3xl font-serif font-bold text-[#E66D5C]">6</div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-1">Disciplines</div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-3xl font-serif font-bold text-white">100%</div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-1">DRM-Free EPUB</div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="text-3xl font-serif font-bold text-[#E66D5C]">Instant</div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mt-1">Digital Delivery</div>
              </div>
            </div>

            <div className="pt-2 text-center text-xs text-white/70 italic font-serif">
              "Literature is the quiet conversation between minds across centuries."
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
