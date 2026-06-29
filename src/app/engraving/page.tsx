"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Suspense, useState, useRef, useEffect } from "react";

function EngravingContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Custom Engraving";
    const category = searchParams.get("category") || "Engraving Service";
    const beforeImage = searchParams.get("beforeImage") || "";
    const afterImage = searchParams.get("afterImage") || "";

    const [sliderPos, setSliderPos] = useState(0); 
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!containerRef.current) return;
        setIsHovering(true);
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        let percentage = (x / width) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        setSliderPos(percentage);
    }

    function handleMouseLeave() {
        setIsHovering(false);
    }

    return (
        <div className="max-w-[1400px] mx-auto min-h-screen pt-24 pb-12 px-6 flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-stretch z-10 relative">
            
            {/* Left: Interactive Slider */}
            <div className="flex-1 w-full lg:w-1/2 relative group flex justify-center flex-col items-center">
                <div 
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative w-full max-w-[600px] aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden glass border border-white/10 shadow-2xl shadow-silver/5 flex items-center justify-center bg-black/40 cursor-ew-resize"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-silver/5 via-transparent to-white/5 mix-blend-overlay z-20 pointer-events-none"></div>
                    
                    {afterImage ? (
                        <img 
                            src={afterImage} 
                            alt={name} 
                            className="absolute inset-0 w-full h-full object-cover scale-100"
                        />
                    ) : (
                        <Logo className="w-32 h-auto opacity-20 grayscale" />
                    )}

                    {beforeImage && (
                        <div
                            className="absolute inset-0 w-full h-full overflow-hidden"
                            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                        >
                            <img
                                src={beforeImage}
                                alt={`${name} Blank`}
                                className="absolute inset-0 w-full h-full object-cover scale-100"
                            />
                        </div>
                    )}

                    {/* Laser Bar & Slider Handle */}
                    {beforeImage && (
                        <div
                            className="absolute top-0 bottom-0 w-[2px] bg-gold/90 shadow-[0_0_10px_#d4af37,0_0_20px_#fff] z-30"
                            style={{ left: `calc(${sliderPos}% - 1px)` }}
                        >
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 backdrop-blur-md border border-gold/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
                                <div className="flex gap-1 text-gold/80 font-black text-[8px] tracking-widest">
                                    &lt;&gt;
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {beforeImage && (
                    <p className="mt-6 text-center text-xs uppercase tracking-[0.4em] text-gray-500 font-bold">Interactive ← Before & After →</p>
                )}
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-silver/10 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/10 blur-[120px] rounded-full pointer-events-none"></div>
            </div>

            {/* Right: Engraving Info */}
            <div className="flex-1 w-full lg:w-1/2 flex flex-col justify-center">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-500 mb-8 font-bold">
                    <Link href="/" className="hover:text-silver transition-colors">Home</Link>
                    <span>/</span>
                    <span className="hover:text-silver transition-colors cursor-pointer">Engraving</span>
                    <span>/</span>
                    <span className="text-silver/80">{category}</span>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 leading-tight text-white">{name}</h1>
                <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 mb-8 border-b border-white/10 pb-8">
                    {category}
                </p>

                <div className="flex items-end gap-4 mb-10">
                    <span className="text-3xl font-light text-white">Custom Pricing</span>
                </div>

                <p className="text-gray-400 font-light leading-relaxed mb-12">
                    Our master engravers use state-of-the-art laser technology combined with traditional techniques to create this stunning piece. Move the slider on the image to see the incredible transformation from a blank canvas to a detailed masterpiece. 
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-4 mb-12">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 bg-gradient-to-r from-silver/80 to-gray-400 text-black py-4 px-8 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm">
                            Order Now
                        </button>
                        <button className="flex-1 bg-white/5 border border-white/20 text-white py-4 px-8 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-all duration-300 active:scale-95 text-sm flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Wishlist
                        </button>
                    </div>
                    
                    <Link href="/" className="w-full bg-transparent border border-gray-600 text-gray-400 py-3 px-8 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-800 hover:text-white transition-all duration-300 active:scale-95 text-sm flex items-center justify-center gap-2 mt-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-t border-white/10">
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-silver">⚡</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Precision Laser</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-silver">✏️</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Custom Design</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-silver">🚚</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Secure Delivery</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center text-center">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-silver">🛡️</div>
                        <span className="text-[9px] uppercase tracking-widest text-gray-400">Quality Guaranteed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EngravingPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-white/5 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-gray-400/5 blur-[100px] rounded-full mix-blend-screen"></div>
            </div>

            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-silver/20 border-t-silver rounded-full animate-spin"></div>
                </div>
            }>
                <EngravingContent />
            </Suspense>
        </main>
    );
}
