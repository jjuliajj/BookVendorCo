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
  ArrowRight
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#F8FAFC] text-[#1E293B] font-mono">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-bold text-[#EA580C] hover:text-[#1E293B] transition-colors mb-2 uppercase tracking-widest gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Vendor Catalog
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] flex items-center gap-3 uppercase">
                <Package className="w-8 h-8 text-[#EA580C]" />
                Commercial Supply Cart
              </h1>
            </div>
            <span className="text-xs font-bold text-[#1E293B] bg-[#F1F5F9] px-4 py-2 border border-[#CBD5E1] w-fit uppercase">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Catalog SKU' : 'Catalog SKUs'}
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white rounded p-12 text-center border-2 border-[#1E293B] shadow-lg max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-[#F1F5F9] text-[#EA580C] rounded flex items-center justify-center mx-auto mb-4 border border-[#CBD5E1]">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] uppercase mb-2">Supply Cart is Empty</h3>
              <p className="text-xs text-[#475569] mb-6 font-sans">Browse commercial book supply catalog and place instant digital licensing orders.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#1E293B] text-white px-8 py-3.5 rounded font-bold text-xs uppercase tracking-wider transition-all shadow"
              >
                <span>Browse Vendor Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded p-4 border-2 border-[#1E293B] shadow hover:border-[#EA580C] transition-all flex gap-4 items-center"
                  >
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-[#F8FAFC] rounded overflow-hidden flex-shrink-0 border border-[#CBD5E1] block">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#475569] text-[9px] font-bold">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-bold text-base md:text-lg text-[#1E293B] hover:text-[#EA580C] transition-colors line-clamp-1 uppercase">
                          {item.title}
                        </Link>
                        <span className="font-bold text-[#EA580C] text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="text-xs text-[#475569]">by {item.author}</p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded px-3 py-1">
                          <button className="text-[#1E293B] hover:text-[#EA580C]" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#1E293B] w-4 text-center">{item.quantity}</span>
                          <button className="text-[#1E293B] hover:text-[#EA580C]" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button className="text-rose-600 hover:bg-rose-50 p-2 rounded transition-all" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary - High Contrast Commercial Hub Box */}
              <div className="lg:col-span-5">
                <div className="bg-[#1E293B] text-white rounded p-6 md:p-8 shadow-xl border-2 border-[#EA580C] space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-[#334155] pb-4">
                    <h2 className="text-xl font-bold flex items-center gap-2 text-white uppercase">
                      <Package className="w-5 h-5 text-[#EA580C]" /> Vendor Order Summary
                    </h2>
                    <span className="text-[10px] font-bold text-white bg-[#EA580C] px-2 py-0.5 rounded uppercase">BULK LICENSE</span>
                  </div>

                  <div className="space-y-3 text-xs text-white">
                    <div className="flex justify-between text-white/90">
                      <span className="text-[#94A3B8]">Catalog Total ({fullCartItems.length} SKUs)</span>
                      <span className="font-bold text-white text-sm">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span className="text-[#94A3B8]">Digital Dispatch Fulfillment</span>
                      <span className="text-emerald-400 font-bold uppercase text-[10px]">Instant Manifest Download</span>
                    </div>
                    <div className="flex justify-between text-white/90">
                      <span className="text-[#94A3B8]">Commercial Tax</span>
                      <span className="font-bold text-white">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-[#334155]">
                      <span className="text-base font-bold text-white">Total Amount</span>
                      <span className="text-3xl font-black text-[#EA580C]">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-[#EA580C] hover:bg-white text-white hover:text-[#1E293B] py-4 rounded font-bold text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Commercial Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-[#334155] flex items-center justify-center gap-2 text-[10px] text-[#94A3B8] uppercase text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Commercial Grade Fulfillment Protocol</span>
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
