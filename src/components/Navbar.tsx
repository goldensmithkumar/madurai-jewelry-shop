import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center transition-all duration-300">
            <div className="text-2xl font-serif tracking-tight">
                <span className="gold-text">Madurai</span> <span className="silver-text">Jewelry</span>
            </div>

            <div className="hidden md:flex space-x-10 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
                <Link href="/" className="hover:text-white transition-colors relative group">
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/collection" className="hover:text-white transition-colors relative group">
                    Collection
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="#piercing" className="hover:text-white transition-colors relative group">
                    Piercing
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="#engraving" className="hover:text-white transition-colors relative group">
                    Engraving
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
            </div>

            <div className="flex items-center space-x-6">
                <Link href="#contact" className="text-xs uppercase tracking-widest text-[#d4af37] px-6 py-2 rounded-full border border-[#d4af37]/20 hover:bg-[#d4af37]/10 transition-all font-semibold">
                    Contact
                </Link>
            </div>
        </nav>
    );
}
