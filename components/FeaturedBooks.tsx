import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";
import Link from "next/link";
import { GraduationCap, ArrowRight } from "lucide-react";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-16 bg-[#F7F5F0]">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#002147]/15 pb-6 font-serif">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#002147] text-[#F7F5F0] text-xs font-bold rounded-full uppercase tracking-widest mb-3 font-sans">
              <GraduationCap className="w-4 h-4 text-[#E66D5C]" /> Academic Catalogue Highlights
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#002147]">
              Peer-Reviewed <span className="italic font-normal text-[#E66D5C]">Academic Works</span>
            </h2>
          </div>
          <Link
            href="/collections"
            className="text-xs font-bold font-sans text-[#002147] hover:text-[#E66D5C] flex items-center gap-2 uppercase tracking-wider transition-colors"
          >
            <span>Browse Full Repository ({books.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-4 Column Grid for Book Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>

      </div>
    </section>
  );
}
