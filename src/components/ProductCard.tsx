import Logo from "@/components/Logo";

export default function ProductCard({ name, category, price, image }: { name: string, category: string, price: string, image?: string }) {
    return (
        <div className="glass p-5 rounded-[2rem] hover-lift group relative overflow-hidden transition-all duration-500 hover:border-gold/30 border border-white/5 flex flex-col h-full">
            <div className="h-64 bg-white/5 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative flex-shrink-0">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                    />
                ) : (
                    <div className="text-gray-600 text-[10px] uppercase tracking-widest italic">{category}</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 transition-opacity duration-700 opacity-30 group-hover:opacity-60 pointer-events-none"></div>
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
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-lg font-serif mb-1 leading-tight group-hover:text-gold transition-colors">{name}</h3>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.15em] font-light">{category}</p>
                    </div>
                    <span className="text-white/90 font-medium tracking-wide flex-shrink-0 ml-4 py-1 px-3 bg-white/5 rounded-full border border-white/10 text-xs shadow-inner shadow-black/50">{price}</span>
                </div>

                <div className="mt-auto">
                    <button className="w-full py-3 rounded-xl border border-white/10 text-[10px] uppercase tracking-widest bg-black/20 hover:bg-gold hover:text-black transition-all duration-500 hover:border-transparent font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
