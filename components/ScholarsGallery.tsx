"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Book, getBooks } from "@/lib/api";
import { getAuthorAvatar } from "@/lib/authorAvatar";
import { useCart } from "@/lib/CartContext";
import { 
  Users, 
  Award, 
  Search, 
  BookOpen, 
  ArrowRight, 
  X, 
  Plus, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Layers
} from "lucide-react";

interface AuthorGroup {
  name: string;
  avatar: string;
  category: string;
  count: number;
  books: Book[];
}

interface ScholarsGalleryProps {
  initialBooks: Book[];
}

export default function ScholarsGallery({ initialBooks }: ScholarsGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorGroup | null>(null);
  const [addedBookId, setAddedBookId] = useState<string | null>(null);
  const { addToCart } = useCart();

  // Group books by author
  const authorData: AuthorGroup[] = useMemo(() => {
    const authorNames = Array.from(new Set(initialBooks.map((b) => b.author).filter(Boolean)));
    return authorNames.map((name) => {
      const authorBooks = initialBooks.filter((b) => b.author === name);
      const categories = authorBooks.map((b) => b.category).filter(Boolean);
      const mainCategory = categories[0] || "Featured Scholar";
      return {
        name,
        avatar: getAuthorAvatar(name),
        category: mainCategory,
        count: authorBooks.length,
        books: authorBooks,
      };
    });
  }, [initialBooks]);

  // Filter authors based on search
  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return authorData;
    const query = searchQuery.toLowerCase();
    return authorData.filter(
      (a) =>
        a.name.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query) ||
        a.books.some((b) => b.title.toLowerCase().includes(query))
    );
  }, [authorData, searchQuery]);

  const handleQuickAdd = (bookId: string) => {
    addToCart(bookId, 1);
    setAddedBookId(bookId);
    setTimeout(() => setAddedBookId(null), 1500);
  };

  return (
    <div className="space-y-12">
      
      {/* 1. Header Banner */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-[#002147]/15 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E66D5C]/10 text-[#E66D5C] text-xs font-bold rounded-full border border-[#E66D5C]/20 uppercase tracking-widest font-sans">
            <Users className="w-4 h-4" /> Academic Faculty & Authors
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#002147] leading-tight">
            Scholars & <span className="text-[#E66D5C] italic font-normal">Visionary Authors</span>
          </h1>
          <p className="text-sm font-sans text-[#002147]/70 leading-relaxed">
            Meet the brilliant minds, essayists, and researchers shaping contemporary literature and critical thought in our digital press.
          </p>
        </div>

        {/* Authors Stats Card */}
        <div className="bg-[#002147] text-[#F7F5F0] px-6 py-5 rounded-2xl border border-[#002147] shadow-xl flex items-center gap-4 flex-shrink-0 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#E66D5C] text-white flex items-center justify-center font-bold shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-serif font-bold text-white">{authorData.length}</div>
            <div className="text-[10px] font-sans font-bold text-white/60 uppercase tracking-widest">
              Scholars ({initialBooks.length} Volumes)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#002147]/15 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#002147]/50" />
          <input
            type="text"
            placeholder="Search scholars, authors, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs bg-[#F7F5F0] text-[#002147] rounded-full border border-[#002147]/20 focus:border-[#002147] focus:outline-none transition-all placeholder:text-[#002147]/40 font-bold"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-3 text-[#002147]/40 hover:text-[#002147]">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs font-sans text-[#002147]/60 font-semibold self-end md:self-auto">
          Showing <strong className="text-[#002147]">{filteredAuthors.length}</strong> scholars
        </div>
      </div>

      {/* 3. Scholars Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAuthors.map((author) => (
          <div
            key={author.name}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#002147]/15 shadow-sm hover:shadow-xl hover:border-[#E66D5C] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-5">
              {/* Author Portrait Frame */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative border border-[#002147]/10 shadow-sm bg-[#002147]/5">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/85 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                    {author.category}
                  </span>
                  <span className="text-xs font-sans font-bold text-[#002147] bg-[#F7F5F0] px-2.5 py-0.5 rounded-full shadow-xs">
                    {author.count} {author.count === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>
              </div>

              {/* Author Bio */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#002147] group-hover:text-[#E66D5C] transition-colors">
                  {author.name}
                </h2>
                <p className="text-xs font-sans text-[#002147]/60 mt-1 italic">
                  Academic contributor & published author in {author.category.toLowerCase()}.
                </p>
              </div>

              {/* Works Mini Bookshelf Preview */}
              <div className="pt-3 border-t border-[#002147]/10 space-y-2">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#002147]/50 block">
                  Library Bibliography ({author.count})
                </span>
                
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {author.books.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center gap-3 p-2 rounded-xl bg-[#F7F5F0]/80 hover:bg-[#002147]/5 transition-colors group/book border border-[#002147]/10"
                    >
                      <Link href={`/products/${book.id}`} className="w-8 aspect-[3/4] bg-[#002147] rounded overflow-hidden flex-shrink-0 border border-[#002147]/15 block">
                        {book.cover_url ? (
                          <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <BookOpen className="w-3 h-3 opacity-50" />
                          </div>
                        )}
                      </Link>

                      <div className="flex-grow min-w-0">
                        <Link href={`/products/${book.id}`} className="text-xs font-serif font-bold text-[#002147] truncate block group-hover/book:text-[#E66D5C] transition-colors">
                          {book.title}
                        </Link>
                        <div className="text-[10px] font-sans text-[#002147]/50 font-semibold">
                          {book.price || "$0.50"}
                        </div>
                      </div>

                      <button
                        onClick={() => handleQuickAdd(book.id)}
                        className={`p-1.5 rounded-full transition-all flex-shrink-0 ${
                          addedBookId === book.id 
                            ? "bg-emerald-600 text-white" 
                            : "bg-[#002147] text-white hover:bg-[#E66D5C]"
                        }`}
                        title="Add to Cart"
                      >
                        {addedBookId === book.id ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inspect Bibliography Trigger */}
            <button
              onClick={() => setSelectedAuthor(author)}
              className="w-full py-3 bg-[#002147] text-white hover:bg-[#E66D5C] transition-colors rounded-xl font-sans text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Inspect Full Bibliography</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* 4. Author Bibliography Drawer / Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-opacity">
          <div className="bg-[#F7F5F0] w-full max-w-xl h-full shadow-2xl overflow-y-auto p-6 md:p-8 flex flex-col justify-between space-y-6 relative border-l border-[#002147]/20 animate-in slide-in-from-right duration-300">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#002147]/15 pb-4">
                <span className="text-xs font-bold text-[#E66D5C] uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Faculty Scholar
                </span>
                <button
                  onClick={() => setSelectedAuthor(null)}
                  className="p-2 rounded-full text-[#002147]/60 hover:text-[#002147] hover:bg-[#002147]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Author Header Info */}
              <div className="flex items-center gap-4 pt-2">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#002147]/20 shadow-md">
                  <img src={selectedAuthor.avatar} alt={selectedAuthor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[#002147]">
                    {selectedAuthor.name}
                  </h2>
                  <div className="text-xs font-sans text-[#002147]/60">
                    Primary Discipline: <strong className="text-[#002147]">{selectedAuthor.category}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Works List */}
            <div className="flex-grow space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#002147]/70 font-sans border-b border-[#002147]/10 pb-2">
                Published Volumes in Press ({selectedAuthor.count})
              </h3>

              <div className="space-y-4">
                {selectedAuthor.books.map((book) => (
                  <div key={book.id} className="bg-white rounded-2xl p-4 border border-[#002147]/15 shadow-xs flex items-start gap-4">
                    <Link href={`/products/${book.id}`} className="w-16 aspect-[3/4] bg-[#002147] rounded-xl overflow-hidden flex-shrink-0 border border-[#002147]/15 block">
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                          <BookOpen className="w-4 h-4 opacity-50" />
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1">
                      <Link href={`/products/${book.id}`} className="font-serif font-bold text-base text-[#002147] hover:text-[#E66D5C] transition-colors block">
                        {book.title}
                      </Link>
                      {book.description && (
                        <p className="text-xs text-[#002147]/70 line-clamp-2 leading-relaxed font-sans">
                          {book.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-serif font-bold text-sm text-[#002147]">{book.price || "$0.50"}</span>
                        <button
                          onClick={() => handleQuickAdd(book.id)}
                          className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
                            addedBookId === book.id ? "bg-emerald-600 text-white" : "bg-[#002147] hover:bg-[#E66D5C] text-white"
                          }`}
                        >
                          {addedBookId === book.id ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          <span>{addedBookId === book.id ? "Added" : "Add"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-4 border-t border-[#002147]/15">
              <button
                onClick={() => setSelectedAuthor(null)}
                className="w-full py-3 bg-[#002147] text-white rounded-full font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#E66D5C] transition-colors"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
