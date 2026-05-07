"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function EngravingRequestPage() {
    const { data: session } = useSession();
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* COMPREHENSIVE ADVERTISEMENT SECTION */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/laser-engraving.png"
                        alt="Laser Engraving"
                        fill
                        className="object-cover opacity-40 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0a0a0a]"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12">
                    <div className="inline-block px-4 py-1 rounded-full border border-silver/30 bg-silver/5 text-silver text-[10px] uppercase tracking-[0.5em] mb-8">
                        {t.services.engraving.subtitle}
                    </div>

                    <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                        {t.sections.engravingTitle}
                    </h1>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-silver to-transparent mx-auto mb-10"></div>

                    <p className="text-gray-200 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light italic">
                        "{t.services.engraving.desc}"
                    </p>

                    {/* Trust Features */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">⚡</div>
                            <span className="text-[10px] uppercase tracking-widest text-silver/60">High Precision</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">📅</div>
                            <span className="text-[10px] uppercase tracking-widest text-silver/60">Dates & Names</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">♾️</div>
                            <span className="text-[10px] uppercase tracking-widest text-silver/60">Permanent</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">🎨</div>
                            <span className="text-[10px] uppercase tracking-widest text-silver/60">Custom Designs</span>
                        </div>
                    </div>

                    <button
                        onClick={scrollToForm}
                        className="group relative px-16 py-6 bg-white/10 text-white border border-white/20 font-black uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95"
                    >
                        <span className="relative z-10">{t.sections.bookAppointment} ↓</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
                    </button>
                </div>
            </section>

            {/* Booking Form Section */}
            <section ref={formRef} className="py-32 px-6 bg-[#0a0a0a] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-silver/50 to-transparent"></div>

                <div className="max-w-2xl mx-auto glass p-8 md:p-14 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 text-white/[0.02] text-9xl font-serif font-black pointer-events-none">ENGRAVE</div>

                    <div className="text-center mb-16 relative z-10">
                        <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">✒️✨</div>
                        <h2 className="text-4xl font-serif text-white mb-4 uppercase tracking-widest">{t.sections.bookAppointment}</h2>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-light">{t.hero.tagline}</p>
                    </div>

                    {success ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="text-6xl mb-6">✅</div>
                            <h3 className="text-2xl font-serif mb-4">Request Sent!</h3>
                            <p className="text-gray-400 mb-8">We will contact you to discuss your engraving design.</p>
                            <Link href="/" className="px-12 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <form
                            className="space-y-8 relative z-10"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-silver/40 group-focus-within:text-silver transition-colors">
                                        <span>👤</span> {t.your_name}
                                    </label>
                                    <input
                                        name="customerName"
                                        type="text"
                                        required
                                        defaultValue={session?.user?.name || ""}
                                        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white placeholder-gray-800 focus:outline-none focus:border-silver/50 focus:bg-white/[0.07] transition-all font-medium text-lg"
                                        placeholder="Full Name"
                                    />
                                </div>

                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-silver/40 group-focus-within:text-silver transition-colors">
                                        <span>📱</span> {t.mobile_number}
                                    </label>
                                    <input
                                        name="cellphone"
                                        type="tel"
                                        required
                                        defaultValue={session?.user?.email?.match(/^\d+$/) ? session.user.email : ""}
                                        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white focus:outline-none focus:border-silver/50 focus:bg-white/[0.07] transition-all font-bold text-xl tracking-widest"
                                        placeholder="00000 00000"
                                    />
                                </div>
                            </div>

                            {/* Upload Hint */}
                            <div className="group space-y-3">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-silver/40 group-focus-within:text-silver transition-colors">
                                    <span>📤</span> {t.sections.uploadDesign}
                                </label>
                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 text-center bg-white/[0.02] hover:bg-white/[0.05] hover:border-silver/40 transition-all group/upload cursor-pointer">
                                    <div className="text-4xl mb-4 text-white/20 group-hover/upload:text-white/60 transition-all">📸</div>
                                    <h4 className="text-[11px] uppercase tracking-[0.2em] font-black text-white/60 mb-2">{t.sections.uploadDesign}</h4>
                                    <p className="text-[10px] text-gray-700 uppercase tracking-widest">{t.sections.uploadDesc}</p>
                                    <input type="file" className="hidden" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-silver/40 group-focus-within:text-silver transition-colors">
                                        <span>📅</span> Date
                                    </label>
                                    <input
                                        name="date"
                                        type="date"
                                        required
                                        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white focus:outline-none focus:border-silver/50 focus:bg-white/[0.07] transition-all font-medium [color-scheme:dark]"
                                    />
                                </div>

                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-silver/40 group-focus-within:text-silver transition-colors">
                                        <span>⏰</span> Preferred Time
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="time"
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white focus:outline-none focus:border-silver/50 focus:bg-white/[0.07] transition-all font-medium appearance-none"
                                        >
                                            <option value="" className="bg-[#111]">Choose Slot</option>
                                            <option value="Morning" className="bg-[#111]">Morning (10-12)</option>
                                            <option value="Afternoon" className="bg-[#111]">Afternoon (1-4)</option>
                                            <option value="Evening" className="bg-[#111]">Evening (5-8)</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-silver/50 text-xs">▼</div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full py-6 mt-4 bg-white text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-white/5"
                            >
                                Submit Request ✅
                            </button>

                            <div className="text-center pt-8">
                                <Link href="/" className="text-[10px] uppercase tracking-[0.5em] text-gray-600 hover:text-white transition-all">
                                    ← Back to Home
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
