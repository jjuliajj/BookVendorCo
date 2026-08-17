"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { Book, getBooks } from "@/lib/api";
import { 
  Compass, 
  Layers, 
  Bookmark, 
  ArrowRight, 
  LayoutGrid, 
  ListFilter, 
  Sparkles, 
  BookOpen,
  Filter,
  Check
} from "lucide-react";

interface CategoryExplorerProps {
  initialBooks: Book[];
}

export default function CategoryExplorer({ initialBooks }: CategoryExplorerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(initialBooks.map(b => b.category).filter(Boolean)));
    return ["All", ...unique];
  }, [initialBooks]);

  // Group books by category
  const categoryStats = useMemo(() => {
    const map: Record<string, { count: number; sampleBooks: Book[] }> = {};
    initialBooks.forEach((book) => {
      const cat = book.category || "Uncategorized";
      if (!map[cat]) {
        map[cat] = { count: 0, sampleBooks: [] };
      }
      map[cat].count += 1;
      if (map[cat].sampleBooks.length < 3) {
        map[cat].sampleBooks.push(book);
      }
    });
    return map;
  }, [initialBooks]);

  // Filtered books based on selection
  const filteredBooks = useMemo(() => {
    if (selectedCategory === "All") return initialBooks;
    return initialBooks.filter(b => b.category === selectedCategory);
  }, [initialBooks, selectedCategory]);

  return (
    <div className="space-y-12">
      
      {/* 1. Header Banner */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-[#002147]/15 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E66D5C]/10 text-[#E66D5C] text-xs font-bold rounded-full border border-[#E66D5C]/20 uppercase tracking-widest font-sans">
            <Compass className="w-4 h-4" /> Academic Discipline Matrix
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#002147] leading-tight">
            Explore by <span className="text-[#E66D5C] italic font-normal">Discipline & Category</span>
          </h1>
          <p className="text-sm font-sans text-[#002147]/70 leading-relaxed">
            Navigate our comprehensive digital library organized by thematic subject matter, literary traditions, and scholarly inquiry.
          </p>
        </div>

        {/* Category Counter Card */}
        <div className="bg-[#002147] text-[#F7F5F0] px-6 py-5 rounded-2xl border border-[#002147] shadow-xl flex items-center gap-4 flex-shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#E66D5C] text-white flex items-center justify-center font-bold shadow-md">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-white">{categories.length - 1}</div>
            <div className="text-[10px] font-sans font-bold text-white/60 uppercase tracking-widest">
              Disciplines ({initialBooks.length} Volumes)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Category Visual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categoryStats).map(([catName, data]) => {
          const isSelected = selectedCategory === catName;
          return (
            <button
              key={catName}
              onClick={() => setSelectedCategory(catName)}
              className={`text-left rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between group space-y-6 relative overflow-hidden ${
                isSelected
                  ? "bg-[#002147] text-white border-[#002147] shadow-xl scale-[1.02]"
                  : "bg-white/80 hover:bg-white text-[#002147] border-[#002147]/15 hover:border-[#E66D5C] hover:shadow-lg"
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                    isSelected ? "bg-[#E66D5C] text-white" : "bg-[#E66D5C]/10 text-[#E66D5C] group-hover:bg-[#E66D5C] group-hover:text-white"
                  }`}>
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-sans font-bold px-3 py-1 rounded-full border ${
                    isSelected ? "bg-white/10 text-white border-white/20" : "bg-[#002147]/5 text-[#002147]/70 border-[#002147]/10"
                  }`}>
                    {data.count} {data.count === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>

                <div>
                  <h2 className={`font-serif text-2xl font-bold transition-colors ${isSelected ? "text-white" : "text-[#002147] group-hover:text-[#E66D5C]"}`}>
                    {catName}
                  </h2>
                  <p className={`text-xs font-sans mt-1 ${isSelected ? "text-white/70" : "text-[#002147]/60"}`}>
                    Curated {catName.toLowerCase()} works & foundational texts.
                  </p>
                </div>
              </div>

              {/* Fan-Out Book Cover Preview Stack */}
              <div className="flex items-center justify-between pt-2 border-t border-current/10">
                <div className="flex -space-x-3 overflow-hidden py-1">
                  {data.sampleBooks.map((book, idx) => (
                    <div
                      key={book.id}
                      className="w-10 aspect-[3/4] rounded-md overflow-hidden border-2 border-white shadow-md flex-shrink-0 transition-transform group-hover:translate-x-1"
                      style={{ zIndex: 10 - idx }}
                    >
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#002147]/20 flex items-center justify-center">
                          <BookOpen className="w-3 h-3 text-[#002147]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <span className={`text-xs font-bold flex items-center gap-1 uppercase tracking-wider ${
                  isSelected ? "text-[#E66D5C]" : "text-[#002147] group-hover:text-[#E66D5C]"
                }`}>
                  <span>{isSelected ? "Active View" : "Explore"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Category Filter Pills & Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#002147]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Filter Pills Horizontal Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-[#002147]/50 uppercase tracking-wider flex items-center gap-1.5 px-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E66D5C]" /> Filter:
          </span>
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  active
                    ? "bg-[#002147] text-white shadow-sm"
                    : "bg-[#F7F5F0] text-[#002147]/80 hover:bg-[#002147]/10"
                }`}
              >
                {active && <Check className="w-3.5 h-3.5 text-[#E66D5C]" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-auto border-t md:border-t-0 pt-2 md:pt-0 border-[#002147]/10">
          <span className="text-xs font-sans text-[#002147]/60 font-semibold mr-1">
            Showing <strong className="text-[#002147]">{filteredBooks.length}</strong> volumes
          </span>

          <div className="flex items-center bg-[#F7F5F0] p-1 rounded-xl border border-[#002147]/10">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-white text-[#002147] shadow-xs" : "text-[#002147]/50 hover:text-[#002147]"}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-white text-[#002147] shadow-xs" : "text-[#002147]/50 hover:text-[#002147]"}`}
              title="List View"
            >
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* 4. Filtered Books Showcase */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              image={book.cover_url}
              category={book.category}
              description={book.description}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-2xl p-5 border border-[#002147]/15 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group">
              <div className="flex items-center gap-5 min-w-0">
                <Link href={`/products/${book.id}`} className="w-16 aspect-[3/4] bg-[#F7F5F0] rounded-xl overflow-hidden flex-shrink-0 border border-[#002147]/10 block">
                  {book.cover_url ? (
                    <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#002147]/40">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  )}
                </Link>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#E66D5C] uppercase tracking-wider bg-[#E66D5C]/10 px-2 py-0.5 rounded-full">
                      {book.category}
                    </span>
                  </div>
                  <Link href={`/products/${book.id}`}>
                    <h3 className="font-serif font-bold text-lg text-[#002147] group-hover:text-[#E66D5C] transition-colors truncate">
                      {book.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-[#002147]/70 italic">by {book.author}</p>
                  {book.description && (
                    <p className="text-xs text-[#002147]/60 line-clamp-1 max-w-xl">
                      {book.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 self-end md:self-center border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-between md:justify-end">
                <span className="font-serif font-bold text-lg text-[#002147]">{book.price || "$0.50"}</span>
                <Link
                  href={`/products/${book.id}`}
                  className="bg-[#002147] hover:bg-[#E66D5C] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
