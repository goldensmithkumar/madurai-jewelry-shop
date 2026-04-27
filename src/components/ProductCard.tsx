export default function ProductCard({ name, category, price, image }: { name: string, category: string, price: string, image?: string }) {
    return (
        <div className="glass p-5 rounded-[2rem] hover-lift group relative overflow-hidden transition-all duration-500 hover:border-white/20">
            <div className="h-64 bg-white/5 rounded-2xl mb-6 overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 transition-opacity group-hover:opacity-20 opacity-0 pointer-events-none"></div>
                <div className="text-gray-600 text-[10px] uppercase tracking-widest italic">{category}</div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-serif mb-1 leading-tight group-hover:text-white transition-colors">{name}</h3>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.15em] font-light">{category}</p>
                    </div>
                    <span className="text-white/90 font-medium tracking-wide">{price}</span>
                </div>

                <button className="w-full py-3 rounded-xl border border-white/5 text-[10px] uppercase tracking-widest bg-white/5 hover:bg-white hover:text-black transition-all duration-500 group-hover:border-transparent font-semibold">
                    View Details
                </button>
            </div>
        </div>
    );
}
