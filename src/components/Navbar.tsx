'use client';

import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();

    const languages: { code: Language, label: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'te', label: 'తెలుగు' }
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center transition-all duration-300">
            <Link href="/" className="flex items-center gap-3 group">
                <Logo className="h-8 w-auto transition-transform duration-500 group-hover:scale-105" />
                <span className="gold-text text-xl font-serif tracking-tight border-l border-white/10 pl-3">Gold & Silver</span>
            </Link>

            <div className="hidden md:flex space-x-10 text-[12px] uppercase tracking-[0.2em] text-gray-200 font-semibold">
                <Link href="/" className="hover:text-gold transition-colors relative group">
                    {t.nav.home}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="/collection" className="hover:text-gold transition-colors relative group">
                    {t.nav.collection}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="#piercing" className="hover:text-gold transition-colors relative group">
                    {t.nav.piercing}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link href="#engraving" className="hover:text-gold transition-colors relative group">
                    {t.nav.engraving}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300"></span>
                </Link>
            </div>

            <div className="flex items-center space-x-6">
                {/* Language Dropdown */}
                <div className="relative group">
                    <button className="flex items-center gap-2 group/btn px-4 py-2 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5">
                        <span className="text-[12px] uppercase tracking-[0.2em] text-white font-bold group-hover/btn:text-gold transition-colors">
                            {language === 'en' ? 'Language' : language === 'ta' ? 'மொழி' : language === 'hi' ? 'भाषा' : 'భాష'}
                        </span>
                        <svg className="w-4 h-4 text-gold group-hover/btn:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Glassmorphic Dropdown Menu */}
                    <div className="absolute top-full right-0 mt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-500 z-[100] p-1">
                        <div className="glass rounded-[1.5rem] border border-white/20 overflow-hidden shadow-2xl backdrop-blur-3xl bg-black/60">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={`w-full text-left px-6 py-5 text-[12px] uppercase tracking-widest transition-all duration-300 flex items-center justify-between font-bold
                                        ${language === lang.code ? 'text-gold bg-gold/20' : 'text-gray-200 hover:text-white hover:bg-white/10'}`}
                                >
                                    <span>{lang.label}</span>
                                    {language === lang.code && (
                                        <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_15px_#f9d71c]"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Link href="#contact" className="text-xs uppercase tracking-widest text-[#d4af37] px-6 py-2 rounded-full border border-[#d4af37]/20 hover:bg-[#d4af37]/10 transition-all font-semibold whitespace-nowrap">
                    {t.nav.contact}
                </Link>
            </div>
        </nav>
    );
}
