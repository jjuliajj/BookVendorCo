"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { GraduationCap, ShieldCheck, Plus, Check } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image?: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const [format, setFormat] = useState<"hardcover" | "paperback">("hardcover");
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-[#002147]/20 shadow-xs hover:border-[#002147] transition-all font-sans space-y-4 text-left group">
      
      {/* Citation Tag */}
      <div className="flex justify-between items-center border-b border-[#002147]/10 pb-3">
        <span className="text-[10px] font-mono font-bold text-[#002147] bg-[#F7F5F0] px-2.5 py-1 rounded-full border border-[#002147]/20">
          [{author.split(' ').pop()}, M. (2026)] • ACADEMIC PRESS
        </span>
        <span className="text-emerald-700 font-bold text-[10px] flex items-center gap-1 uppercase">
          <ShieldCheck className="w-3.5 h-3.5" /> Peer Reviewed
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-5">
        {image && (
          <Link href={`/products/${id}`} className="w-24 aspect-[4/5] bg-[#F7F5F0] rounded-xl overflow-hidden border border-[#002147]/15 flex-shrink-0 block">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
          </Link>
        )}

        <div className="space-y-2 flex-grow">
          <Link href={`/products/${id}`}>
            <h3 className="font-serif font-bold text-lg text-[#002147] group-hover:underline line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-[#002147]/70 italic">by {author}</p>
          
          {description && (
            <p className="text-xs text-[#002147]/80 line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Hardcover vs Paperback Toggle Selector */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-[#F7F5F0] p-1 rounded-lg border border-[#002147]/15 text-[10px] font-bold">
              <button 
                onClick={() => setFormat("hardcover")}
                className={`px-2.5 py-1 rounded transition-colors ${format === "hardcover" ? "bg-[#002147] text-white" : "text-[#002147]"}`}
              >
                Hardcover Edition
              </button>
              <button 
                onClick={() => setFormat("paperback")}
                className={`px-2.5 py-1 rounded transition-colors ${format === "paperback" ? "bg-[#002147] text-white" : "text-[#002147]"}`}
              >
                EPUB Digital
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-base text-[#002147]">{price}</span>
              <button 
                onClick={handleQuickAdd}
                className="bg-[#002147] hover:bg-[#1E293B] text-white px-4 py-2 rounded-full text-xs font-bold uppercase transition-all shadow-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5 text-[#F7F5F0]" /> Add
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
