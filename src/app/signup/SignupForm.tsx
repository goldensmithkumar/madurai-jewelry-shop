"use client"

import { signup } from '@/app/auth/actions'
import { useState } from 'react'
import { translations, Language } from '@/lib/translations'

export default function SignupForm({ error: initialError }: { error?: string }) {
    const [loading, setLoading] = useState(false)
    const [localError, setLocalError] = useState(initialError || '')
    const [lang, setLang] = useState<Language>('en')
    const t = translations[lang]

    return (
        <div className="space-y-6">
            {/* Language Switcher */}
            <div className="flex justify-center gap-2 pb-2">
                {(['en', 'ta', 'hi'] as Language[]).map((l) => (
                    <button
                        key={l}
                        onClick={() => setLang(l)}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'bg-white/5 text-gold/60 hover:bg-white/10'}`}
                    >
                        {l === 'en' ? 'English' : l === 'ta' ? 'தமிழ்' : 'हिंदी'}
                    </button>
                ))}
            </div>

            <form
                action={async (formData) => {
                    setLoading(true)
                    try {
                        await signup(formData)
                    } catch (e: any) {
                        setLocalError(e.message || "An error occurred during signup")
                    } finally {
                        setLoading(false)
                    }
                }}
                className="space-y-6"
            >
                <div className="space-y-4">
                    {/* Name */}
                    <div className="glass p-4 rounded-2xl border border-white/10 focus-within:border-gold/50 transition-all">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-gold mb-3">
                            <span className="bg-gold/20 p-1.5 rounded-lg">👤</span>
                            {t.your_name}
                        </label>
                        <input
                            name="full_name"
                            type="text"
                            required
                            placeholder={t.your_name}
                            className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none font-medium text-lg"
                        />
                    </div>

                    {/* Phone */}
                    <div className="glass p-4 rounded-2xl border border-gold/30 bg-gold/5 focus-within:border-gold transition-all shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-gold mb-3">
                            <span className="bg-gold/20 p-1.5 rounded-lg">📱</span>
                            {t.mobile_number}
                        </label>
                        <input
                            name="phone"
                            type="tel"
                            required
                            placeholder="1234567890"
                            className="w-full bg-transparent text-white placeholder-gray-500 focus:outline-none font-bold text-2xl tracking-widest"
                        />
                    </div>

                    {/* Email */}
                    <div className="glass p-4 rounded-2xl border border-white/10 focus-within:border-gold/50 transition-all opacity-80 focus-within:opacity-100">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-gold mb-3">
                            <span className="bg-white/10 p-1.5 rounded-lg">✉️</span>
                            {t.email_address} ({t.optional})
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="mail@example.com"
                            className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none font-medium text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div className="glass p-4 rounded-2xl border border-white/10 focus-within:border-gold/50 transition-all">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-black text-gold mb-3">
                            <span className="bg-white/10 p-1.5 rounded-lg">🔒</span>
                            {t.security_key}
                        </label>
                        <input
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none font-medium text-lg"
                        />
                    </div>
                </div>

                {localError && (
                    <div className="bg-red-400/10 border border-red-400/20 p-4 rounded-xl flex items-start gap-3">
                        <span className="text-xl">⚠️</span>
                        <p className="text-red-400 text-xs font-medium leading-relaxed">
                            {localError}
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gold/30 disabled:opacity-50 text-base flex items-center justify-center gap-3"
                >
                    {loading ? '...' : <>{t.signup_btn} 🚀</>}
                </button>
            </form>
        </div>
    )
}
