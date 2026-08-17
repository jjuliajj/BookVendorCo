import Link from "next/link";
import { ArrowRight, Package, Truck, ShieldCheck, Box, Database } from "lucide-react";

export default function Hero() {
  const stockInventorySummary = [
    { sku: "SKU-9021", title: "Political Philosophy Folio", stock: "1,420 UNITS", tier: "WHOLESALE TIER A" },
    { sku: "SKU-8412", title: "Modern Economics Archive", stock: "850 UNITS", tier: "WHOLESALE TIER A" },
    { sku: "SKU-7721", title: "Historical Masterworks", stock: "3,100 UNITS", tier: "WHOLESALE TIER B" },
  ];

  return (
    <section className="pt-32 pb-12 bg-[#F8FAFC] border-b-4 border-[#1E293B] font-mono">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
        
        {/* Commercial Freight Warehouse Banner */}
        <div className="bg-[#1E293B] text-white rounded-lg p-6 sm:p-12 border-2 border-[#EA580C] shadow-2xl grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Industrial Headlines & Fast Lookup */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EA580C] text-white text-xs font-bold rounded uppercase">
              <Package className="w-4 h-4" /> WAREHOUSE LOCATION: WH-01 • COMMERCIAL CATALOG
            </div>

            <h1 className="text-3xl sm:text-5xl font-black leading-none uppercase tracking-tight text-white">
              COMMERCIAL BOOK <br />
              <span className="text-[#EA580C]">SUPPLY & FULFILLMENT</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#94A3B8] font-sans leading-relaxed">
              Centralized commercial book distribution hub. Direct EPUB bulk licensing, verified catalog manifests, and automated warehouse fulfillment.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link 
                href="/collections" 
                className="bg-[#EA580C] hover:bg-white text-white hover:text-[#1E293B] px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center gap-2"
              >
                <span>Browse Vendor Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Real-Time Warehouse Stock Status Table */}
          <div className="lg:col-span-5 bg-[#0F172A] p-6 rounded border border-[#CBD5E1]/30 space-y-4">
            <div className="border-b border-[#EA580C] pb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#EA580C] uppercase flex items-center gap-1">
                <Database className="w-3.5 h-3.5" /> LIVE INVENTORY STATUS
              </span>
              <span className="text-[9px] text-[#94A3B8] uppercase">WH-MANIFEST-2026</span>
            </div>

            <div className="space-y-3 text-xs">
              {stockInventorySummary.map((item) => (
                <div key={item.sku} className="bg-[#1E293B] p-3 rounded border border-[#CBD5E1]/20 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] font-bold text-[#EA580C]">{item.sku}</span>
                    <div className="font-bold text-white truncate max-w-[180px]">{item.title}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold text-[10px] block">{item.stock}</span>
                    <span className="text-[8px] text-[#94A3B8]">{item.tier}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#CBD5E1]/20 text-[9px] text-[#94A3B8] uppercase flex justify-between font-bold">
              <span>FULFILLMENT: INSTANT</span>
              <span>EPUB 3.0 MANIFEST</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
