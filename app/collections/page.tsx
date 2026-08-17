import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBooks } from "@/lib/api";
import BookCard from "@/components/BookCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Special Collections & Digital Archives",
  description: "Browse our complete library catalog of curated EPUB e-books, rare editions, and literature collections.",
};

export default async function CollectionsPage({ searchParams }: { searchParams: Promise<{ genre?: string; category?: string }> }) {
  const params = await searchParams;
  const targetCategory = params.category || params.genre;
  const books = await getBooks();
  
  const filteredBooks = targetCategory 
    ? books.filter(b => b.category && b.category.toLowerCase() === targetCategory.toLowerCase())
    : books;

  const categories = Array.from(new Set(filteredBooks.map((b) => b.category).filter(Boolean)));

  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F0]">
      <Navbar />
      
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-7xl">
          
          <header className="mb-16 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[#E66D5C] font-sans font-bold text-xs uppercase tracking-[0.2em] inline-block bg-[#E66D5C]/10 px-3 py-1 rounded-full border border-[#E66D5C]/20">
              Curated Academic Series
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-semibold text-[#002147]">
              The Signature Collections
            </h1>
            <p className="text-base text-[#002147]/70 leading-relaxed font-sans">
              Explore our hand-picked series, organized by literary movement and thematic resonance. Every collection is an intellectual journey.
            </p>
          </header>

          <div className="space-y-20">
            {categories.map((category) => {
              const categoryBooks = filteredBooks.filter((b) => b.category === category);
              return (
                <div key={category} className="space-y-8">
                  <div className="flex items-baseline justify-between border-b border-[#002147]/15 pb-4">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#002147]">
                      {category}
                    </h2>
                    <span className="font-sans text-xs font-bold text-[#002147]/50 uppercase tracking-widest bg-[#002147]/5 px-3 py-1 rounded-full">
                      {categoryBooks.length} Volumes
                    </span>
                  </div>

                  {/* Responsive Grid with Clean Spacing (max 4 columns on large screens) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryBooks.map((book) => (
                      <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
