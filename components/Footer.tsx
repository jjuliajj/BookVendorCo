import Link from "next/link";
import { GraduationCap, BookOpen, Heart, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#002147] text-[#F7F5F0] pt-16 pb-12 border-t-4 border-[#E66D5C] font-sans">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#E66D5C] text-white p-2 flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-serif font-bold tracking-tight text-white uppercase">
                BookVendor <span className="text-[#E66D5C] italic font-serif">Co.</span>
              </span>
            </Link>

            <p className="text-xs text-[#F7F5F0]/70 leading-relaxed max-w-md font-sans">
              Centralized academic & digital literature press. Providing verified catalog licensing, peer-reviewed monographs, and seamless EPUB digital downloads for worldwide readers and scholars.
            </p>

            <div className="flex items-center gap-4 text-xs text-white/50 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Academic Trust & Authority
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#E66D5C] uppercase tracking-widest mb-4">Academic Catalogue</h4>
            <ul className="space-y-2.5 text-xs text-[#F7F5F0]/80">
              <li><Link href="/collections" className="hover:text-[#E66D5C] transition-colors">Special Collections</Link></li>
              <li><Link href="/genres" className="hover:text-[#E66D5C] transition-colors">Browse Disciplines</Link></li>
              <li><Link href="/authors" className="hover:text-[#E66D5C] transition-colors">Scholars & Authors</Link></li>
              <li><Link href="/about" className="hover:text-[#E66D5C] transition-colors">Publisher Authority</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#E66D5C] uppercase tracking-widest mb-4">Reader Services</h4>
            <ul className="space-y-2.5 text-xs text-[#F7F5F0]/80">
              <li><Link href="/cart" className="hover:text-[#E66D5C] transition-colors">Academic Cart</Link></li>
              <li><Link href="/privacy" className="hover:text-[#E66D5C] transition-colors">Privacy & Licensing</Link></li>
              <li><Link href="/terms" className="hover:text-[#E66D5C] transition-colors">Terms of Publishing</Link></li>
              <li><Link href="/contact" className="hover:text-[#E66D5C] transition-colors">Editorial Desk</Link></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F5F0]/50">
          <div>
            © {new Date().getFullYear()} BookVendor Co. Academic Press. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted for literary excellence & scholarship</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
