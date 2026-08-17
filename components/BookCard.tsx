"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ShieldCheck, Plus, Check, BookOpen } from "lucide-react";

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
  const [format, setFormat] = useState<"hardcover" | "epub">("hardcover");
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formattedPrice = price ? (price.startsWith("$") ? price : `$${price}`) : "$0.50";
  const authorLast = author ? author.split(" ").pop() : "Author";

  return (
    <div className="bg-white rounded-2xl p-4 border border-[#002147]/15 hover:border-[#002147] shadow-xs hover:shadow-xl transition-all duration-300 font-sans flex flex-col justify-between h-full group relative overflow-hidden text-left">
      
      {/* Top Meta Info Header */}
      <div className="flex items-center justify-between gap-1 mb-3 text-[10px] border-b border-[#002147]/10 pb-2.5">
        <span className="font-mono font-bold text-[#002147] bg-[#F7F5F0] px-2 py-0.5 rounded border border-[#002147]/15 truncate max-w-[140px]">
          [{authorLast}, (2026)]
        </span>
        <span className="text-emerald-700 font-bold flex items-center gap-1 uppercase tracking-wider text-[9px] flex-shrink-0">
          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Peer Reviewed
        </span>
      </div>

      {/* Book Cover Container */}
      <Link href={`/products/${id}`} className="block relative mb-3 group/cover overflow-hidden rounded-xl bg-[#F7F5F0] border border-[#002147]/10 aspect-[3/4]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center text-[#002147]/40 bg-[#F7F5F0]">
            <BookOpen className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs font-serif font-bold italic line-clamp-2">{title}</span>
          </div>
        )}

        {/* Category Pill floating tag */}
        <span className="absolute top-2 left-2 bg-[#002147]/90 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
          {category || "Academic"}
        </span>
      </Link>

      {/* Book Information */}
      <div className="flex-grow flex flex-col justify-between space-y-2">
        <div>
          <Link href={`/products/${id}`}>
            <h3 className="font-serif font-bold text-base text-[#002147] group-hover:text-[#E66D5C] transition-colors line-clamp-2 leading-tight">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-[#002147]/70 italic mt-0.5 truncate">
            by {author}
          </p>
        </div>

        {/* Format Selector & Purchase Footer */}
        <div className="pt-2 border-t border-[#002147]/10 space-y-2.5">
          {/* Format pills */}
          <div className="flex items-center justify-between bg-[#F7F5F0] p-1 rounded-lg border border-[#002147]/10 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setFormat("hardcover")}
              className={`flex-1 py-1 px-1.5 rounded transition-all text-center truncate ${
                format === "hardcover" ? "bg-[#002147] text-white shadow-2xs" : "text-[#002147]/70 hover:text-[#002147]"
              }`}
            >
              Hardcover
            </button>
            <button
              type="button"
              onClick={() => setFormat("epub")}
              className={`flex-1 py-1 px-1.5 rounded transition-all text-center truncate ${
                format === "epub" ? "bg-[#002147] text-white shadow-2xs" : "text-[#002147]/70 hover:text-[#002147]"
              }`}
            >
              EPUB
            </button>
          </div>

          {/* Price & Action Button */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#002147]/50 font-bold uppercase tracking-wider">Price</span>
              <span className="font-serif font-bold text-base text-[#002147] leading-none">
                {formattedPrice}
              </span>
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-1 flex-shrink-0 ${
                added 
                  ? "bg-emerald-600 text-white" 
                  : "bg-[#002147] hover:bg-[#E66D5C] text-white active:scale-95"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" /> Add
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
