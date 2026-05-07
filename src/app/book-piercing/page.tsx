"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { createBooking } from "./actions";
import Image from "next/image";

export default function BookPiercingPage() {
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
                {/* Background with parallax effect hint */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/ear-piercing-v2.png"
                        alt="Ear Piercing"
                        fill
                        className="object-cover opacity-40 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#0a0a0a]"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 pb-12">
                    <div className="inline-block px-4 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] uppercase tracking-[0.5em] mb-8 animate-fade-in">
                        {t.services.piercing.subtitle}
                    </div>

                    <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight gold-text drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                        {t.sections.piercingTitle}
                    </h1>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-10"></div>

                    <p className="text-gray-200 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light italic">
                        "{t.sections.piercingDesc}"
                    </p>

                    {/* Trust Features (Icons) */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">🧼</div>
                            <span className="text-[10px] uppercase tracking-widest text-gold/60">Sterilized</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">👨‍⚕️</div>
                            <span className="text-[10px] uppercase tracking-widest text-gold/60">Expert Care</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">✨</div>
                            <span className="text-[10px] uppercase tracking-widest text-gold/60">Traditional</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-3">❤️</div>
                            <span className="text-[10px] uppercase tracking-widest text-gold/60">Pain-Free</span>
                        </div>
                    </div>

                    <button
                        onClick={scrollToForm}
                        className="group relative px-16 py-6 bg-gold text-black font-black uppercase tracking-[0.4em] rounded-full hover:scale-105 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] active:scale-95"
                    >
                        <span className="relative z-10">{t.sections.bookAppointment} ↓</span>
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
                    </button>
                </div>
            </section>

            {/* Redesigned Booking Form Section (Matches Gold Melting Style) */}
            <section ref={formRef} className="py-32 px-6 bg-[#0a0a0a] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-gold/50 to-transparent"></div>

                <div className="max-w-2xl mx-auto glass p-8 md:p-14 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 text-white/[0.02] text-9xl font-serif font-black pointer-events-none">BOOK</div>

                    <div className="text-center mb-16 relative z-10">
                        <div className="text-5xl mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">👂✨</div>
                        <h2 className="text-4xl font-serif gold-text mb-4 uppercase tracking-widest">{t.sections.bookAppointment}</h2>
                        <p className="text-gray-500 text-[10px] uppercase tracking-[0.4em] font-light">{t.hero.tagline}</p>
                    </div>

                    {success ? (
                        <div className="text-center py-12 animate-fade-in">
                            <div className="text-6xl mb-6">✅</div>
                            <h3 className="text-2xl font-serif mb-4">Booking Successful!</h3>
                            <p className="text-gray-400 mb-8">We will contact you shortly to confirm your visit.</p>
                            <Link href="/" className="px-12 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-gold hover:text-black transition-all">
                                Return to Home
                            </Link>
                        </div>
                    ) : (
                        <form
                            action={async (formData) => {
                                setLoading(true);
                                setError("");
                                try {
                                    await createBooking(formData);
                                    setSuccess(true);
                                } catch (e: any) {
                                    setError(e.message || "An error occurred");
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            className="space-y-8 relative z-10"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Name Input */}
                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gold/40 group-focus-within:text-gold transition-colors">
                                        <span>👤</span> {t.your_name}
                                    </label>
                                    <input
                                        name="customerName"
                                        type="text"
                                        required
                                        defaultValue={session?.user?.name || ""}
                                        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white placeholder-gray-800 focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all font-medium text-lg"
                                        placeholder="Full Name"
                                    />
                                </div>

                                {/* Phone Input */}
                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gold/40 group-focus-within:text-gold transition-colors">
                                        <span>📱</span> {t.mobile_number}
                                    </label>
                                    <input
                                        name="cellphone"
                                        type="tel"
                                        required
                                        defaultValue={session?.user?.email?.match(/^\d+$/) ? session.user.email : ""}
                                        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all font-bold text-xl tracking-widest"
                                        placeholder="00000 00000"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="group space-y-3">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gold/40 group-focus-within:text-gold transition-colors">
                                    <span>📍</span> {t.sections.location}
                                </label>
                                <textarea
                                    name="address"
                                    required
                                    rows={3}
                                    className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all font-medium text-base"
                                    placeholder="Your detailed address..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Date */}
                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gold/40 group-focus-within:text-gold transition-colors">
                                        <span>📅</span> Date
                                    </label>
                                    <input
                                        name="date"
                                        type="date"
                                        required
                                        className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all font-medium [color-scheme:dark]"
                                    />
                                </div>

                                {/* Time Slot */}
                                <div className="group space-y-3">
                                    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] font-black text-gold/40 group-focus-within:text-gold transition-colors">
                                        <span>⏰</span> Preferred Time
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="time"
                                            required
                                            className="w-full bg-white/[0.03] border border-white/10 px-6 py-5 rounded-2xl text-white focus:outline-none focus:border-gold/50 focus:bg-white/[0.07] transition-all font-medium appearance-none"
                                        >
                                            <option value="" className="bg-[#111]">Choose Slot</option>
                                            <option value="Morning" className="bg-[#111]">Morning (10-12)</option>
                                            <option value="Afternoon" className="bg-[#111]">Afternoon (1-4)</option>
                                            <option value="Evening" className="bg-[#111]">Evening (5-8)</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gold/50 text-xs">▼</div>
                                    </div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-400/10 border border-red-400/20 p-5 rounded-2xl text-red-400 text-[11px] uppercase font-black tracking-widest flex items-center justify-center gap-3 animate-shake">
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-6 mt-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 text-black font-black uppercase tracking-[0.4em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-2xl shadow-gold/40 disabled:opacity-50 relative overflow-hidden group/btn"
                            >
                                <span className="relative z-10">{loading ? "Processing..." : t.sections.bookAppointment + " ✅"}</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                            </button>

                            <div className="text-center pt-8">
                                <Link href="/" className="text-[10px] uppercase tracking-[0.5em] text-gray-600 hover:text-white transition-all">
                                    ← Back to Collection
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </div>
    );
}
