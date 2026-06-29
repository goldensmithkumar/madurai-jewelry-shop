"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Suspense, useState } from "react";

function ProductContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Unnamed Jewelry";
    const category = searchParams.get("category") || "Exclusive Collection";
    const price = searchParams.get("price") || "Contact for Pricing";
    const image = searchParams.get("image") || "";

    const [isImageZoomed, setIsImageZoomed] = useState(false);

    return (
        <div className="max-w-[1400px] mx-auto min-h-screen pt-24 pb-12 px-6 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-stretch z-10 relative">
            
            {/* Left: Image Showcase */}
            <div className="flex-1 w-full lg:w-1/2 relative group flex justify-center">
                <div 
                    className="relative w-full max-w-[600px] aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden glass border border-white/10 shadow-2xl shadow-gold/5 flex items-center justify-center bg-black/40"
                    onMouseEnter={() => setIsImageZoomed(true)}
                    onMouseLeave={() => setIsImageZoomed(false)}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-silver/5 mix-blend-overlay"></div>
                    {image ? (
                        <img 
                            src={image} 
                            alt={name} 
                            className={`w-full h-full object-contain p-8 transition-transform duration-700 ease-out ${isImageZoomed ? 'scale-110' : 'scale-100'}`}
                        />
                    ) : (
                        <Logo className="w-32 h-auto opacity-20 grayscale" />
                    )}
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-silver/20 blur-[120px] rounded-full pointer-events-none"></div>
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 mb-8 font-bold">
                    <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/collection" className="hover:text-gold transition-colors">Collection</Link>
                    <span>/</span>
                    <span className="text-gold">{category}</span>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight text-white">{name}</h1>
                <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 mb-8 border-b border-white/10 pb-8">
                    {category}
                </p>

                <div className="flex items-end gap-4 mb-10">
                    <span className="text-3xl font-light text-white">{price}</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest pb-1">Est. Value</span>
                </div>

                <p className="text-gray-400 font-light leading-relaxed mb-12">
                    Experience the timeless elegance of this exquisite piece. Handcrafted with precision by our master artisans in Madurai, it blends traditional heritage with modern sophistication. Each detail is carefully sculpted to reflect unparalleled brilliance and quality.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <button className="flex-1 bg-gradient-to-r from-[#d4af37] to-yellow-600 text-black py-4 px-8 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-gold/20 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm">
                        Buy Now
                    </button>
                    <button className="flex-1 bg-white/5 border border-white/20 text-white py-4 px-8 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95 text-sm flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Wishlist
                    </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-white/10">
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37]">💎</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Certified Purity</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37]">🛡️</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Lifetime Warranty</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37]">🚚</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Secure Delivery</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37]">✨</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Artisan Crafted</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#d4af37]/5 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-gray-400/5 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-[#d4af37]/20 border-t-[#d4af37] rounded-full animate-spin"></div>
                </div>
            }>
                <ProductContent />
            </Suspense>
        </main>
    );
}
