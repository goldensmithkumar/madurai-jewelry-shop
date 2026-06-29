'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

interface EngravingCardProps {
    name: string;
    category: string;
    beforeImage?: string | null;
    afterImage: string;
}

export default function EngravingCard({ name, category, beforeImage, afterImage }: EngravingCardProps) {
    const [sliderPos, setSliderPos] = useState(100); // Starts showing BEFORE
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [swept, setSwept] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Generate a stable fake initial like count based on product name
        const seed = name.length * 13 + (category?.length || 5) * 7;
        const initialLikes = 15 + (seed % 150);
        
        // Check if user already liked this
        const hasLiked = localStorage.getItem(`liked_engraving_${name}`);
        if (hasLiked) {
            setLiked(true);
            setLikesCount(initialLikes + 1);
        } else {
            setLikesCount(initialLikes);
        }
    }, [name, category]);

    // Initial sweeping animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setSliderPos(0);
            const timer2 = setTimeout(() => setSwept(true), 1000);
            return () => clearTimeout(timer2);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!containerRef.current || !swept) return;
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

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);

        if (liked) {
            setLiked(false);
            setLikesCount(prev => prev - 1);
            localStorage.removeItem(`liked_engraving_${name}`);
        } else {
            setLiked(true);
            setLikesCount(prev => prev + 1);
            localStorage.setItem(`liked_engraving_${name}`, 'true');
        }
    };

    return (
        <div className="glass p-5 rounded-[2rem] hover-lift group relative overflow-hidden transition-all duration-500 hover:border-gold/30 border border-white/5 flex flex-col h-full shadow-lg">
            
            {/* Interactive Slider Area (Matches ProductCard Image Area) */}
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="aspect-[4/5] bg-black/20 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative flex-shrink-0 cursor-ew-resize group/slider"
            >
                {/* AFTER Image (Background) */}
                <img
                    src={afterImage}
                    alt={`${name} Engraved`}
                    className={`absolute inset-0 w-full h-full object-contain transition-transform duration-[3000ms] ease-in-out ${!swept && sliderPos > 0 ? 'scale-110' : 'scale-100'}`}
                />

                {/* BEFORE Image (Clipped Over Top) */}
                {beforeImage && (
                    <div
                        className={`absolute inset-0 w-full h-full overflow-hidden ${!swept ? 'transition-all duration-1000 ease-in-out' : ''}`}
                        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                    >
                        <img
                            src={beforeImage}
                            alt={`${name} Blank`}
                            className="absolute inset-0 w-full h-full object-contain scale-100"
                        />
                    </div>
                )}

                {/* Laser Bar & Slider Handle */}
                {beforeImage && (
                    <div
                        className={`absolute top-0 bottom-0 w-[2px] bg-gold/90 shadow-[0_0_10px_#d4af37,0_0_20px_#fff] z-10 
                            ${!swept ? 'transition-all duration-1000 ease-in-out' : ''}`}
                        style={{ left: `calc(${sliderPos}% - 1px)` }}
                    >
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 backdrop-blur-md border border-gold/50 rounded-full flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
                            <div className="flex gap-1 text-gold/80 font-black text-[6px] tracking-widest">
                                &lt;&gt;
                            </div>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-700 opacity-30 group-hover/slider:opacity-60 pointer-events-none"></div>

                {/* Floating Like Count Badge overlay */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-xl z-20">
                    <svg className={`w-3 h-3 ${liked ? 'text-blue-500 fill-blue-500' : 'text-gray-300'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill={liked ? "currentColor" : "none"}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514" />
                    </svg>
                    <span className="text-[10px] text-white font-bold">{likesCount}</span>
                </div>
            </div>

            <div className="flex flex-col flex-1 relative z-10 px-1">
                {/* Brand Title Area */}
                <div className="flex items-center gap-3 mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                    <Logo className="h-5 w-auto brightness-150" />
                    <div className="border-l border-white/10 pl-3">
                        <p className="text-[8px] uppercase tracking-[0.2em] gold-text font-bold leading-none mb-[3px]">Madurai</p>
                        <p className="text-[7px] uppercase tracking-widest text-silver/70 leading-none">Engraving</p>
                    </div>
                </div>

                {/* Product Detail Area */}
                <div className="flex justify-between items-start mb-5">
                    <div className="flex-1 pr-2">
                        <h3 className="text-lg font-serif mb-1 leading-tight group-hover:text-silver transition-colors">{name}</h3>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.15em] font-light">{category}</p>
                    </div>
                    <span className="text-white/90 font-medium tracking-wide flex-shrink-0 py-1 px-3 bg-white/5 rounded-full border border-white/10 text-xs shadow-inner shadow-black/50">Custom</span>
                </div>

                {/* Action Bar */}
                <div className="mt-auto pt-4 border-t border-white/10 flex gap-2">
                    <button 
                        onClick={handleLike}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-300 font-bold ${liked ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'} ${isAnimating ? 'scale-95' : 'scale-100'}`}
                    >
                        <svg className={`w-4 h-4 transition-transform duration-300 ${liked ? 'fill-blue-400 scale-110' : ''}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill={liked ? "currentColor" : "none"}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.514" />
                        </svg>
                        <span className="text-[11px] tracking-wide">{liked ? 'Liked' : 'Like'}</span>
                    </button>
                    
                    <Link 
                        href={`/engraving?name=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}&beforeImage=${encodeURIComponent(beforeImage || '')}&afterImage=${encodeURIComponent(afterImage || '')}`}
                        className="flex-[1.5] flex items-center justify-center py-3 rounded-xl border border-white/10 text-[10px] uppercase tracking-widest bg-black/20 hover:bg-silver/80 hover:text-black transition-all duration-500 hover:border-transparent font-bold hover:shadow-[0_0_15px_rgba(192,192,192,0.4)]"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
