"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Package,
  ArrowRight,
  BookOpen,
  CheckCircle2
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#F7F5F0] text-[#002147] font-sans">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-[#E66D5C] hover:text-[#002147] transition-colors mb-2 uppercase tracking-widest gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Catalogue
              </Link>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#002147] flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-[#E66D5C]" />
                Academic Cart & Order Desk
              </h1>
            </div>
            <span className="text-xs font-bold text-[#002147] bg-white px-4 py-2 border border-[#002147]/15 rounded-full w-fit uppercase tracking-wider">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Volume' : 'Volumes'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 text-center border border-[#002147]/15 shadow-xl max-w-lg mx-auto my-8 space-y-4">
              <div className="w-16 h-16 bg-[#F7F5F0] text-[#E66D5C] rounded-2xl flex items-center justify-center mx-auto border border-[#002147]/10">
                <BookOpen className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#002147]">Your Academic Cart is Empty</h3>
              <p className="text-xs text-[#002147]/70 font-sans leading-relaxed">
                Browse our peer-reviewed digital catalogue and add volumes for immediate EPUB download.
              </p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#E66D5C] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
              >
                <span>Browse Full Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Items List */}
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl p-4 border border-[#002147]/15 shadow-xs hover:border-[#E66D5C] transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[3/4] bg-[#F7F5F0] rounded-xl overflow-hidden flex-shrink-0 border border-[#002147]/10 block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#002147]/40 text-[9px] font-bold p-2 text-center">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-serif font-bold text-base md:text-lg text-[#002147] hover:text-[#E66D5C] transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-serif font-bold text-[#002147] text-base whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.50'}`}
                        </span>
                      </div>

                      <p className="text-xs text-[#002147]/70 italic">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-[#F7F5F0] border border-[#002147]/15 rounded-lg px-3 py-1">
                          <button className="text-[#002147] hover:text-[#E66D5C]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#002147] w-4 text-center">{item.quantity}</span>
                          <button className="text-[#002147] hover:text-[#E66D5C]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-600 hover:bg-rose-50 p-2 rounded-full transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Right Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#002147] text-[#F7F5F0] rounded-3xl p-6 md:p-8 shadow-xl border border-[#002147] space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h2 className="text-xl font-serif font-bold flex items-center gap-2 text-white">
                      Order Summary
                    </h2>
                    <span className="text-[10px] font-bold text-white bg-[#E66D5C] px-2.5 py-1 rounded-full uppercase tracking-wider">DRM-Free EPUB</span>
                  </div>

                  <div className="space-y-3 text-xs text-white">
                    <div className="flex justify-between text-white/90">
                      <span className="text-white/60">Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-serif font-bold text-white text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span className="text-white/60">Digital Delivery</span>
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">Instant Manifest</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span className="text-white/60">Tax</span>
                      <span className="font-bold text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-white/10">
                      <span className="text-base font-bold text-white">Total</span>
                      <span className="text-3xl font-serif font-bold text-[#E66D5C]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#E66D5C] hover:bg-white text-white hover:text-[#002147] py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-white/50 uppercase tracking-wider text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Instant Verified EPUB Download</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
