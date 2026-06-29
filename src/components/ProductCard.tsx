"use client";

import Logo from "@/components/Logo";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductCard({ name, category, price, image }: { name: string, category: string, price: string, image?: string }) {
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    useEffect(() => {
        // Generate a stable fake initial like count based on product name
        const seed = name.length * 17 + (category?.length || 5) * 7;
        const initialLikes = 24 + (seed % 420);
        
        // Check if user already liked this
        const hasLiked = localStorage.getItem(`liked_${name}`);
        if (hasLiked) {
            setLiked(true);
            setLikesCount(initialLikes + 1);
        } else {
            setLikesCount(initialLikes);
        }
    }, [name, category]);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Trigger small pop animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);

        if (liked) {
            setLiked(false);
            setLikesCount(prev => prev - 1);
            localStorage.removeItem(`liked_${name}`);
        } else {
            setLiked(true);
            setLikesCount(prev => prev + 1);
            localStorage.setItem(`liked_${name}`, 'true');
        }
    };

    return (
        <>
            <div className="glass p-5 rounded-[2rem] hover-lift group relative overflow-hidden transition-all duration-500 hover:border-gold/30 border border-white/5 flex flex-col h-full shadow-lg">
            <div className="h-64 bg-white/5 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative flex-shrink-0">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100 cursor-pointer"
                        onClick={() => setIsImageModalOpen(true)}
                    />
                ) : (
                    <div className="text-gray-600 text-[10px] uppercase tracking-widest italic">{category}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-700 opacity-30 group-hover:opacity-60 pointer-events-none"></div>
                
                {/* Floating Like Count Badge overlay */}
                <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-xl">
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
                        <p className="text-[7px] uppercase tracking-widest text-[#d4af37]/70 leading-none">Gold & Silver</p>
                    </div>
                </div>

                {/* Product Detail Area */}
                <div className="flex justify-between items-start mb-5">
                    <div className="flex-1 pr-2">
                        <h3 className="text-lg font-serif mb-1 leading-tight group-hover:text-gold transition-colors">{name}</h3>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.15em] font-light">{category}</p>
                    </div>
                    <span className="text-white/90 font-medium tracking-wide flex-shrink-0 py-1 px-3 bg-white/5 rounded-full border border-white/10 text-xs shadow-inner shadow-black/50">{price}</span>
                </div>

                {/* Facebook style action bar */}
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
                        href={`/product?name=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image || '')}`}
                        className="flex-[1.5] flex items-center justify-center py-3 rounded-xl border border-white/10 text-[10px] uppercase tracking-widest bg-black/20 hover:bg-gold hover:text-black transition-all duration-500 hover:border-transparent font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
            
            {/* Full Screen Image Modal */}
            {isImageModalOpen && image && (
                <div 
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 cursor-zoom-out transition-opacity duration-300"
                    onClick={() => setIsImageModalOpen(false)}
                >
                    <button 
                        className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsImageModalOpen(false);
                        }}
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={image}
                        alt={name}
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}

