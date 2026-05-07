'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

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

    // Initial sweeping animation (Option A: The Laser Etch)
    useEffect(() => {
        // Laser sweeps from 100 to 0 (Revealing After image)
        const timer = setTimeout(() => {
            setSliderPos(0);

            const timer2 = setTimeout(() => {
                setSwept(true);
            }, 1000); // Allow 1s fluid transition to finish sweeping
            return () => clearTimeout(timer2);
        }, 800); // Trigger 0.8s after revealing element
        return () => clearTimeout(timer);
    }, []);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!containerRef.current || !swept) return;
        setIsHovering(true);
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        // Map x to percentage
        let percentage = (x / width) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        setSliderPos(percentage);
    }

    function handleMouseLeave() {
        setIsHovering(false);
    }

    return (
        <div className="flex flex-col gap-3 group/wrapper max-w-[380px] w-full mx-auto">
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative aspect-square w-full rounded-[2rem] overflow-hidden glass hover:border-gold/50 transition-all duration-500 hover:scale-[0.98] border border-white/10 group cursor-ew-resize shadow-2xl"
            >
                {/* AFTER Image (Background) */}
                <img
                    src={afterImage}
                    alt={`${name} Engraved`}
                    className={`absolute inset-0 w-full h-full object-cover brightness-110 contrast-110 transition-transform duration-[3000ms] ease-in-out ${!swept && sliderPos > 0 ? 'scale-[1.3]' : 'scale-100'}`}
                />

                {/* BEFORE Image (Clipped Over Top) */}
                {beforeImage && (
                    <div
                        className={`absolute inset-0 w-full h-full overflow-hidden ${!swept ? 'transition-all duration-1000 ease-in-out' : ''}`}
                        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} // Clips from right
                    >
                        <img
                            src={beforeImage}
                            alt={`${name} Blank`}
                            className="absolute inset-0 w-full h-full object-cover brightness-100 contrast-100 scale-105"
                        />
                    </div>
                )}

                {/* Laser Bar & Slider Handle */}
                {beforeImage && (
                    <div
                        className={`absolute top-0 bottom-0 w-[4px] bg-gold/90 shadow-[0_0_15px_#d4af37,0_0_30px_#d4af37,0_0_50px_#fff] z-10 
                            ${!swept ? 'transition-all duration-1000 ease-in-out' : ''}`}
                        style={{ left: `calc(${sliderPos}% - 2px)` }}
                    >
                        {/* Interactive Handle indicator that appears on hover */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 bg-black/60 backdrop-blur-md border border-gold/50 rounded-[10px] flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}>
                            <div className="flex gap-1 text-gold/80 font-black text-[8px] tracking-widest">
                                &lt;&gt;
                            </div>
                        </div>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none opacity-80"></div>
                <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
                    <span className="text-[9px] uppercase tracking-[0.5em] text-silver font-black block mb-2 drop-shadow-md">{category}</span>
                    <h3 className="text-2xl font-serif leading-tight text-white drop-shadow-xl">{name}</h3>
                </div>
            </div>
            {beforeImage && (
                <p className="text-center text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold transition-colors group-hover/wrapper:text-gold/80">Interactive ← Before & After →</p>
            )}
        </div>
    );
}
