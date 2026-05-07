"use client";

import { useSession, signOut } from "next-auth/react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function DashboardPage() {
    const { data: session } = useSession();
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Card */}
                <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 mb-10 overflow-hidden relative group">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-700"></div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
                        <div className="text-center md:text-left">
                            <h1 className="text-[10px] uppercase tracking-[0.4em] text-gold font-black mb-4">
                                {t.dashboard.welcome}
                            </h1>
                            <h2 className="text-4xl md:text-5xl font-serif mb-2">{session?.user?.name || "Member"}</h2>
                            <p className="text-gray-500 font-light text-lg">{session?.user?.email}</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => signOut()}
                                className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all active:scale-95"
                            >
                                {t.dashboard.logout}
                            </button>
                            <Link
                                href="/"
                                className="text-center text-[9px] uppercase tracking-widest text-gray-600 hover:text-gold transition-colors"
                            >
                                {t.dashboard.back_to_shop}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass p-8 rounded-[2.5rem] border border-white/10">
                        <h3 className="text-xs uppercase tracking-widest text-gold/60 font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-sm">📅</span>
                            {t.dashboard.orders}
                        </h3>

                        <div className="text-center py-12 border border-dashed border-white/10 rounded-3xl bg-white/[0.02]">
                            <p className="text-gray-500 text-sm">{t.dashboard.no_orders}</p>
                            <Link href="/#piercing" className="mt-4 inline-block text-[10px] uppercase tracking-widest text-gold hover:underline">
                                Book a Service Now
                            </Link>
                        </div>
                    </div>

                    <div className="glass p-8 rounded-[2.5rem] border border-white/10 flex flex-col items-center justify-center text-center">
                        <Logo className="h-12 w-auto mb-6 grayscale opacity-30" />
                        <p className="text-gray-500 font-light text-sm italic max-w-[200px]">
                            "Crafting legacy since generations. Thank you for being part of our story."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
