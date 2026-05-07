'use client';


import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import EngravingCard from "@/components/EngravingCard";
import Logo from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [shopImages, setShopImages] = useState<any[]>([]);
  const [engravingImages, setEngravingImages] = useState<any[]>([]);
  const [heroImages, setHeroImages] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [shopRes, engraveRes, heroRes] = await Promise.all([
          fetch('/api/upload?bucket=shop_images'),
          fetch('/api/upload?bucket=engraving_showcase'),
          fetch('/api/upload?bucket=hero_images')
        ])

        if (shopRes.ok) {
          const data = await shopRes.json()
          setShopImages([...data].sort(() => 0.5 - Math.random()).slice(0, 6))
        }

        if (engraveRes.ok) {
          const data = await engraveRes.json()
          setEngravingImages([...data].sort(() => 0.5 - Math.random()).slice(0, 6))
        }

        if (heroRes.ok) {
          const data = await heroRes.json()
          setHeroImages(data)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  // Safely assign the specific heroic cards by sorting for the latest using their intelligent custom prefixes
  const heroImgPiercing = heroImages.filter(img => img.name.startsWith('piercing-')).sort((a, b) => b.name.localeCompare(a.name))[0]?.url || "/images/ear-piercing-v2.png"
  const heroImgMelting = heroImages.filter(img => img.name.startsWith('melting-')).sort((a, b) => b.name.localeCompare(a.name))[0]?.url || "/images/gold-melting-v4.png"
  const heroImgEngraving = heroImages.filter(img => img.name.startsWith('engraving-')).sort((a, b) => b.name.localeCompare(a.name))[0]?.url || "/images/laser-engraving.png"

  return (
    <main className="min-h-screen">
      {/* Redesigned Hero Section - Now strictly fits viewport */}
      <section className="h-[100dvh] min-h-[600px] overflow-hidden flex flex-col items-center justify-center pt-[80px] md:pt-[100px] pb-4 px-4 md:px-6 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0a0a0a_100%)] relative">
        <div className="max-w-[1400px] mx-auto w-full flex flex-col items-center flex-1 justify-center">

          {/* Top Brand Header */}
          <div className="text-center mb-2 md:mb-4 z-10 w-full flex flex-col items-center">
            <div className="mb-2 md:mb-3 transition-transform duration-1000 hover:scale-105">
              <Logo className="h-8 md:h-12 lg:h-16 w-auto mx-auto brightness-150 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
            </div>
            {session?.user?.name && (
              <div className="mb-2 md:mb-4 animate-fade-in">
                <span className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-gold font-bold bg-gold/10 px-4 py-1 rounded-full border border-gold/20">
                  Welcome back, {session.user.name}
                </span>
              </div>
            )}
            <h1 className="text-xl md:text-4xl lg:text-5xl font-serif mb-1 md:mb-2 tracking-[0.2em] md:tracking-[0.4em] leading-tight mt-1">
              <span className="gold-text whitespace-nowrap drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">{t.hero.title}</span>
            </h1>
            <div className="h-[2px] w-20 md:w-36 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-2 md:mb-3"></div>
            <p className="text-gray-300 text-[8px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.8em] mb-3 md:mb-5 max-w-[90%] md:max-w-2xl mx-auto leading-[1.6] italic font-light drop-shadow-sm">
              {t.hero.tagline}
            </p>
          </div>

          {/* Balanced 3-Card Grid */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start w-full max-w-[1200px] mx-auto pb-4">

            {/* Left Card: Ear Piercing */}
            <Link href="/book-piercing" className="group glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center relative hover:border-gold/50 transition-all duration-700 aspect-square w-full shadow-2xl">
              <img
                src={heroImgPiercing}
                alt={t.services.piercing.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-1000 brightness-110 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/98"></div>
              <div className="relative z-10 p-2 md:p-6 text-center transition-transform duration-700 group-hover:scale-105">
                <span className="hidden md:block text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-gold font-bold mb-2 md:mb-3">{t.services.piercing.subtitle}</span>
                <h3 className="text-xs md:text-2xl font-serif mb-1 md:mb-3 leading-tight whitespace-pre-line">{t.services.piercing.title.replace(' ', '\n')}</h3>
                <div className="h-[1px] w-4 md:w-12 bg-gold/40 mx-auto mb-1 md:mb-3 transition-all duration-700 group-hover:w-24"></div>
              </div>
            </Link>

            {/* Middle Card: Gold Melting Ceremony */}
            <Link href="/book-melting" className="group glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center relative border-gold/40 border hover:border-gold/70 transition-all duration-700 aspect-square w-full shadow-2xl scale-105 z-20">
              <img
                src={heroImgMelting}
                alt={t.services.melting.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-85 group-hover:scale-110 transition-all duration-1000 brightness-125 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-black/50 to-black/98"></div>
              <div className="relative z-10 p-2 md:p-6 text-center transition-transform duration-700 group-hover:scale-105">
                <span className="hidden md:block text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-gold font-black mb-2 md:mb-3">{t.services.melting.subtitle}</span>
                <h3 className="text-[13px] md:text-3xl font-serif mb-1 md:mb-3 leading-tight whitespace-pre-line font-black drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{t.services.melting.title.replace(' ', '\n')}</h3>
                <div className="h-[1px] w-4 md:w-12 bg-gold/70 mx-auto mb-1 md:mb-3 transition-all duration-700 group-hover:w-24"></div>
              </div>
            </Link>

            {/* Right Card: Laser Engraving */}
            <Link href="/engraving-request" className="group glass rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col items-center justify-center relative hover:border-silver/50 transition-all duration-700 aspect-square w-full shadow-2xl">
              <img
                src={heroImgEngraving}
                alt={t.services.engraving.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-1000 brightness-110 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/98"></div>
              <div className="relative z-10 p-2 md:p-6 text-center transition-transform duration-700 group-hover:scale-105">
                <span className="hidden md:block text-[8px] md:text-[9px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-silver font-bold mb-2 md:mb-3">{t.services.engraving.subtitle}</span>
                <h3 className="text-xs md:text-2xl font-serif mb-1 md:mb-3 leading-tight whitespace-pre-line">{t.services.engraving.title.replace(' ', '\n')}</h3>
                <div className="h-[1px] w-4 md:w-12 bg-silver/40 mx-auto mb-1 md:mb-3 transition-all duration-700 group-hover:w-24"></div>
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* Visual Navigation for Accessibility */}
      <section className="py-12 px-6 md:px-24">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <Link href="/collection?category=Earrings" className="glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 hover:border-gold/50 transition-all group active:scale-95">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">✨</div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gold text-center">{t.earrings}</span>
          </Link>
          <Link href="/collection?category=Rings" className="glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 hover:border-gold/50 transition-all group active:scale-95">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💍</div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gold text-center">{t.rings}</span>
          </Link>
          <Link href="/collection?category=Necklaces" className="glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 hover:border-gold/50 transition-all group active:scale-95">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📿</div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gold text-center">{t.necklace}</span>
          </Link>
          <Link href="/collection?category=Bangles" className="glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 hover:border-gold/50 transition-all group active:scale-95">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⭕</div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gold text-center">{t.bangles}</span>
          </Link>
          <Link href="/collection?category=Coins" className="glass p-6 rounded-3xl flex flex-col items-center justify-center border border-white/10 hover:border-gold/50 transition-all group active:scale-95">
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🪙</div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gold text-center">{t.coins}</span>
          </Link>
        </div>
      </section>

      {/* The Gold Reserve - Dynamic from Admin Inventory */}
      <section id="gold-collection" className="py-24 px-6 md:px-24">
        <div className="flex justify-between items-end mb-16 border-b border-gold/10 pb-6">
          <div>
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 text-gold">Premium Selection</h6>
            <h2 className="text-4xl font-serif text-amber-100">The Gold Reserve</h2>
          </div>
          <Link href="/collection" className="text-[10px] uppercase tracking-widest text-gold/60 hover:text-gold transition-colors font-bold border-b border-gold/20 hover:border-gold/50 pb-1">
            View All Gold →
          </Link>
        </div>

        {shopImages.filter(img => img.material === 'Gold' || !img.material).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {shopImages.filter(img => img.material === 'Gold' || !img.material).map((img, i) => (
              <ProductCard
                key={img.url + i}
                name={img.name ? img.name.replace(/^\d+-/, '').replace(/\.[^.]+$/, '').replace(/-/g, ' ') : 'Unnamed Image'}
                category={img.category ? `Gold ${img.category}` : "22k Gold Collection"}
                price={img.weightGrams ? `${img.weightGrams}g` : "Contact for Pricing"}
                image={img.url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-3xl border border-white/10">
            <div className="text-4xl mb-4">💎</div>
            <p className="text-gray-500 mb-2">Gold Collection coming soon</p>
          </div>
        )}
      </section>

      {/* The Silver Collection - Dynamic from Admin Inventory */}
      <section id="silver-collection" className="py-16 px-6 md:px-24 bg-white/[0.02]">
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
          <div>
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 text-silver">Modern Elegance</h6>
            <h2 className="text-4xl font-serif text-gray-200">The Silver Collection</h2>
          </div>
          <Link href="/collection" className="text-[10px] uppercase tracking-widest text-silver/60 hover:text-silver transition-colors font-bold border-b border-silver/20 hover:border-silver/50 pb-1">
            View All Silver →
          </Link>
        </div>

        {shopImages.filter(img => img.material === 'Silver').length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {shopImages.filter(img => img.material === 'Silver').map((img, i) => (
              <ProductCard
                key={img.url + i}
                name={img.name}
                category={`Silver ${img.category || 'Jewelry'}`}
                price={img.weightGrams ? `${img.weightGrams}g` : "Check Store"}
                image={img.url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-3xl border border-white/10">
            <div className="text-4xl mb-4">💍</div>
            <p className="text-gray-500 mb-2">No Silver pieces available yet</p>
          </div>
        )}
      </section>

      {/* Engraving Collection */}
      <section className="py-24 px-6 md:px-24 bg-white/[0.02]">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 text-silver">Showcase</h6>
            <h2 className="text-4xl font-serif">Engraving Masterpieces</h2>
          </div>
          {engravingImages.length > 0 && (
            <span className="text-[10px] uppercase tracking-widest text-silver/60">
              Recent Work
            </span>
          )}
        </div>

        {engravingImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {engravingImages.map((img, i) => (
              <EngravingCard
                key={img.url + i}
                name={img.name}
                category={img.category || "Custom Engraving"}
                beforeImage={img.urlBefore}
                afterImage={img.url}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass rounded-3xl border border-white/10">
            <div className="text-4xl mb-4">✒️</div>
            <p className="text-gray-500 mb-2">Engraving showcase coming soon</p>
            <p className="text-gray-600 text-[10px] uppercase tracking-widest">Admin uploads will appear here</p>
          </div>
        )}
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          <div id="piercing" className="glass p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-8 text-white/[0.02] text-9xl font-serif font-bold group-hover:text-gold/5 transition-all duration-700">01</div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] mb-6 block font-bold">{t.services.piercing.subtitle}</span>
            <h2 className="text-4xl font-serif mb-6">{t.sections.piercingTitle}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">{t.sections.piercingDesc}</p>
            <Link href="/book-piercing" className="inline-block px-10 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-500">{t.sections.bookAppointment}</Link>
          </div>

          <div id="engraving" className="glass p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-8 text-white/[0.02] text-9xl font-serif font-bold group-hover:text-silver/5 transition-all duration-700">02</div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-silver mb-6 block font-bold">{t.services.engraving.subtitle}</span>
            <h2 className="text-4xl font-serif mb-6">{t.sections.engravingTitle}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">{t.sections.engravingDesc}</p>
            <Link href="/engraving-request" className="block border-dashed border-[1px] border-white/20 p-10 rounded-2xl text-center bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t.sections.uploadDesign}</p>
              <span className="text-[9px] text-gray-700 uppercase tracking-widest">{t.sections.uploadDesc}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 text-gold/60">{t.sections.connect}</h6>
            <h2 className="text-5xl font-serif mb-8 leading-tight">{t.sections.visitUs}</h2>
            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed">{t.sections.visitDesc}</p>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-bold">{t.sections.location}</h4>
                  <p className="text-gray-300 font-light leading-relaxed">24, SPR Complex<br />PatcharsiKara sr, Madurai 1</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-bold">{t.sections.contactPerson}</h4>
                  <p className="text-white text-xl font-serif mb-2">Suresh</p>
                  <p className="text-gray-300 font-light">+91 78450 23969<br />+91 96882 53635</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass p-1 rounded-[3rem] overflow-hidden group">
            <div className="bg-[#111] p-12 rounded-[2.8rem] space-y-6">
              <h3 className="text-2xl font-serif mb-4">{t.sections.sendMessage}</h3>
              <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold/50 outline-none transition-all" />
              <input type="email" placeholder="Your Email" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl focus:border-gold/50 outline-none transition-all" />
              <textarea placeholder="Tell us about your requirement..." className="w-full bg-white/5 border border-white/10 p-4 rounded-xl h-32 focus:border-gold/50 outline-none transition-all"></textarea>
              <button className="w-full py-4 bg-gold text-black rounded-xl font-bold hover:bg-white transition-all duration-500 shadow-xl shadow-gold/10 hover:shadow-white/10">Submit Request</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center opacity-60">
        <p className="text-[10px] uppercase tracking-[0.3em] font-light mb-4">{t.footer.copy}</p>
        <div className="flex justify-center mb-4">
          <Logo className="h-6 w-auto grayscale opacity-50" />
        </div>
        <div className="gold-text font-serif text-2xl">{t.footer.tagline}</div>
      </footer>
    </main>
  );
}
