import Link from "next/link";
import { Package } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white pt-14 pb-10 border-t-4 border-[#F97316] font-mono">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#334155]">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-[#F97316]" />
              <span className="font-bold text-2xl tracking-tight uppercase text-white">BookVendor <span className="text-[#F97316]">Co.</span></span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed max-w-md font-sans">
              Commercial digital book supply hub. Catalog licensing, volume EPUB downloads, and verified digital book distribution.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-3">Supply Index</h4>
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              <li><Link href="/collections" className="hover:text-[#F97316]">Catalog Collections</Link></li>
              <li><Link href="/genres" className="hover:text-[#F97316]">Supply Genres</Link></li>
              <li><Link href="/authors" className="hover:text-[#F97316]">Authors Directory</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-3">Vendor Support</h4>
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              <li><Link href="/privacy" className="hover:text-[#F97316]">Privacy & Licensing</Link></li>
              <li><Link href="/terms" className="hover:text-[#F97316]">Vendor Terms</Link></li>
              <li><Link href="/contact" className="hover:text-[#F97316]">Supply Desk</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 text-center text-xs text-[#64748B]">
          © {new Date().getFullYear()} BookVendor Co. Commercial Logistics. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
