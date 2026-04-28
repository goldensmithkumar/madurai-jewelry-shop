'use client';

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/lib/translations";

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const languages: { code: Language, label: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'ta', label: 'தமிழ்' },
        { code: 'hi', label: 'हिन्दी' },
        { code: 'te', label: 'తెలుగు' }
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glass px-4 md:px-6 py-4 flex justify-between items-center transition-all duration-300">
            <Link href="/" className="flex items-center gap-2 md:gap-3 group flex-shrink-0">
                <Logo className="h-7 md:h-8 w-auto transition-transform duration-500 group-hover:scale-105" />
                <span className="gold-text text-lg md:text-xl font-serif tracking-tight border-l border-white/10 pl-2 md:pl-3 whitespace-nowrap">Gold & Silver</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-10 text-[12px] uppercase tracking-[0.2em] text-gray-200 font-semibold">
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

            <div className="flex items-center space-x-2 md:space-x-6">
                {/* Language Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        onMouseEnter={() => setIsLangOpen(true)}
                        className="flex items-center gap-2 group/btn px-3 md:px-4 py-2 hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/5"
                    >
                        <span className="text-[10px] md:text-[12px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-white font-bold group-hover/btn:text-gold transition-colors">
                            {language === 'en' ? 'Language' : language === 'ta' ? 'மொழி' : language === 'hi' ? 'भाषा' : 'భాష'}
                        </span>
                        <svg className={`w-3 h-3 md:w-4 md:h-4 text-gold transition-transform duration-500 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Glassmorphic Dropdown Menu */}
                    <div
                        onMouseLeave={() => setIsLangOpen(false)}
                        className={`absolute top-full right-0 mt-2 w-44 md:w-52 transition-all duration-500 z-[100] p-1 ${isLangOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}
                    >
                        <div className="glass rounded-[1.5rem] border border-white/20 overflow-hidden shadow-2xl backdrop-blur-3xl bg-black/60">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsLangOpen(false);
                                    }}
                                    className={`w-full text-left px-5 md:px-6 py-4 md:py-5 text-[11px] md:text-[12px] uppercase tracking-widest transition-all duration-300 flex items-center justify-between font-bold
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

                <Link href="#contact" className="hidden md:block text-[10px] md:text-xs uppercase tracking-widest text-[#d4af37] px-4 md:px-6 py-2 rounded-full border border-[#d4af37]/20 hover:bg-[#d4af37]/10 transition-all font-semibold whitespace-nowrap">
                    {t.nav.contact}
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden p-2 text-white hover:text-gold transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)}></div>
                <div className={`absolute top-0 right-0 w-4/5 h-full bg-[#0a0a0a] border-l border-white/10 p-8 pt-24 transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex flex-col space-y-8 text-sm uppercase tracking-[0.2em] text-gray-300 font-semibold">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">{t.nav.home}</Link>
                        <Link href="/collection" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">{t.nav.collection}</Link>
                        <Link href="#piercing" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">{t.nav.piercing}</Link>
                        <Link href="#engraving" onClick={() => setIsMenuOpen(false)} className="hover:text-gold transition-colors">{t.nav.engraving}</Link>
                        <Link href="#contact" onClick={() => setIsMenuOpen(false)} className="text-gold border border-gold/20 rounded-full px-6 py-3 text-center">{t.nav.contact}</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
