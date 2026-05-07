'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { translations, Language } from '@/lib/translations';

export default function LoginDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [lang, setLang] = useState<Language>('en');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const t = translations[lang];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            if (!phone) {
                setError(t.error_required);
                return;
            }

            const res = await signIn('credentials', {
                redirect: false,
                email: phone,
                password
            });

            if (res?.error) {
                setError(t.error_invalid);
            } else {
                setIsOpen(false);
                router.refresh();
            }
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 px-4 py-2 rounded-xl transition-all group"
            >
                <span className="text-lg">👤</span>
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-gold font-black">{t.account}</span>
            </button>

            <div
                className={`absolute top-full right-0 mt-3 w-80 transition-all duration-500 z-[100] ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
            >
                <div className="glass rounded-[2rem] border border-gold/20 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] backdrop-blur-3xl bg-black/95 p-6 md:p-8">
                    {/* Language Toggle */}
                    <div className="flex justify-center gap-2 mb-6 border-b border-white/5 pb-4">
                        {(['en', 'ta', 'hi'] as Language[]).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${lang === l ? 'bg-gold text-black' : 'bg-white/5 text-gold/40 hover:bg-white/10'}`}
                            >
                                {l === 'en' ? 'EN' : l === 'ta' ? 'தமிழ்' : 'हिंदी'}
                            </button>
                        ))}
                    </div>

                    <h3 className="text-gold font-serif text-xl mb-6 text-center tracking-widest uppercase">
                        {t.welcome_back}
                    </h3>

                    {error && (
                        <div className="bg-red-400/10 border border-red-400/20 p-3 rounded-xl mb-6 flex items-center gap-2 text-red-400">
                            <span className="text-lg">⚠️</span>
                            <p className="text-[9px] uppercase font-bold tracking-widest">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-black text-gold/60 ml-1">
                                    <span>📱</span> {t.mobile_number}
                                </label>
                                <input
                                    type="tel"
                                    placeholder="Number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-lg text-white focus:border-gold/50 outline-none transition-all placeholder:text-gray-700 font-bold tracking-widest"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-black text-gold/60 ml-1">
                                    <span>🔒</span> {t.password}
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-base text-white focus:border-gold/50 outline-none transition-all placeholder:text-gray-700"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-black font-black py-5 rounded-[1.5rem] text-[11px] uppercase tracking-[0.3em] mt-2 hover:scale-[1.02] shadow-[0_10px_30px_rgba(212,175,55,0.3)] active:scale-95 transition-all outline-none">
                            {t.login_btn} 🚀
                        </button>
                    </form>

                    <div className="flex flex-col gap-4 mt-8 border-t border-white/5 pt-6 text-center">
                        <button
                            onClick={() => { setIsOpen(false); router.push('/signup'); }}
                            className="text-gold text-[9px] uppercase tracking-[0.3em] font-black hover:text-white transition-colors"
                        >
                            {t.new_account} ✨
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
