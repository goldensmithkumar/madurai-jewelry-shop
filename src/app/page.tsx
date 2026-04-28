'use client';

import ProductCard from "@/components/ProductCard";
import Logo from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen">
      {/* Redesigned Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0a0a0a_100%)]">
        <div className="max-w-[1500px] mx-auto w-full flex flex-col items-center py-12 px-6">

          {/* Top Brand Header */}
          <div className="text-center mb-8 md:mb-12 z-10">
            <div className="mb-6 md:mb-10 transition-transform duration-1000 hover:scale-105">
              <Logo className="h-16 md:h-28 w-auto mx-auto" />
            </div>
            <h1 className="text-2xl md:text-5xl font-serif mb-4 md:mb-6 tracking-[0.2em] md:tracking-[0.3em] leading-tight flex flex-col items-center">
              <span className="gold-text whitespace-nowrap">{t.hero.title}</span>
            </h1>
            <div className="h-[1px] md:h-[2px] w-24 md:w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6 md:mb-8"></div>
            <p className="text-gray-400 text-[9px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] mb-8 md:mb-10 max-w-xs md:max-w-md mx-auto leading-loose italic px-4">
              {t.hero.tagline}
            </p>
            <a href="#collection" className="px-10 md:px-12 py-3 md:py-4 bg-white text-black rounded-full text-[9px] md:text-[10px] uppercase tracking-widest font-black hover:bg-gold hover:text-white transition-all duration-500 shadow-2xl hover:shadow-gold/40">
              {t.hero.explore}
            </a>
          </div>

          {/* Balanced 3-Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 items-start w-full mt-6 md:mt-4 max-w-md md:max-w-none">

            {/* Left Card: Ear Piercing */}
            <a href="#piercing" className="group glass rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center relative hover:border-gold/30 transition-all duration-700 aspect-square w-full shadow-2xl">
              <img
                src="/images/ear-piercing.png"
                alt={t.services.piercing.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/95"></div>
              <div className="relative z-10 p-8 md:p-10 text-center transition-transform duration-700 group-hover:scale-105">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-gold font-bold mb-4 md:mb-6 block">{t.services.piercing.subtitle}</span>
                <h3 className="text-xl md:text-3xl font-serif mb-4 md:mb-6 leading-tight whitespace-pre-line">{t.services.piercing.title.replace(' ', '\n')}</h3>
                <div className="h-[1px] w-10 md:w-12 bg-gold/30 mx-auto mb-4 md:mb-6 transition-all duration-700 group-hover:w-24"></div>
                <p className="text-gray-400 text-[11px] md:text-sm opacity-0 md:group-hover:opacity-100 transition-all duration-700 max-w-xs mx-auto leading-relaxed h-0 md:group-hover:h-auto overflow-hidden">
                  {t.services.piercing.desc}
                </p>
              </div>
            </a>

            {/* Middle Card: XRF Testing Services */}
            <a href="#xrf" className="group glass rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center relative border-gold/20 border hover:border-gold/50 transition-all duration-700 aspect-square w-full shadow-2xl">
              <img
                src="/images/xrf-testing.png"
                alt={t.services.xrf.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-gold/10 via-black/60 to-black/95"></div>
              <div className="relative z-10 p-8 md:p-10 text-center transition-transform duration-700 group-hover:scale-105">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-gold font-black mb-4 md:mb-6 block">{t.services.xrf.subtitle}</span>
                <h3 className="text-xl md:text-3xl font-serif mb-4 md:mb-6 leading-tight whitespace-pre-line">{t.services.xrf.title.replace(' ', '\n')}</h3>
                <div className="h-[1px] w-10 md:w-12 bg-gold/50 mx-auto mb-4 md:mb-6 transition-all duration-700 group-hover:w-24"></div>
                <p className="text-gray-400 text-[11px] md:text-sm opacity-0 md:group-hover:opacity-100 transition-all duration-700 max-w-xs mx-auto leading-relaxed h-0 md:group-hover:h-auto overflow-hidden">
                  {t.services.xrf.desc}
                </p>
              </div>
            </a>

            {/* Right Card: Laser Engraving */}
            <a href="#engraving" className="group glass rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col items-center justify-center relative hover:border-silver/30 transition-all duration-700 aspect-square w-full shadow-2xl">
              <img
                src="/images/laser-engraving.png"
                alt={t.services.engraving.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/95"></div>
              <div className="relative z-10 p-8 md:p-10 text-center transition-transform duration-700 group-hover:scale-105">
                <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-silver font-bold mb-4 md:mb-6 block">{t.services.engraving.subtitle}</span>
                <h3 className="text-xl md:text-3xl font-serif mb-4 md:mb-6 leading-tight whitespace-pre-line">{t.services.engraving.title.replace(' ', '\n')}</h3>
                <div className="h-[1px] w-10 md:w-12 bg-silver/30 mx-auto mb-4 md:mb-6 transition-all duration-700 group-hover:w-24"></div>
                <p className="text-gray-400 text-[11px] md:text-sm opacity-0 md:group-hover:opacity-100 transition-all duration-700 max-w-xs mx-auto leading-relaxed h-0 md:group-hover:h-auto overflow-hidden">
                  {t.services.engraving.desc}
                </p>
              </div>
            </a>
          </div>

        </div>
      </section>

      {/* Specialty Section */}
      <section id="collection" className="py-24 px-6 md:px-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 text-gold">{t.sections.specialty}</h6>
            <h2 className="text-4xl font-serif">{t.sections.specialtyTitle}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ProductCard
            name="Murugan Peacock Vel Pendant"
            category="Premium Testing & Design"
            price="Contact for Pricing"
            image="/images/products/vel-peacock.jpg"
          />
          <ProductCard
            name="Artisan Vel Bracelet"
            category="Custom Silver Work"
            price="Contact for Pricing"
            image="/images/products/vel-bracelet.jpg"
          />
          <ProductCard
            name="Signature OM Vel Bracelet"
            category="Fine Silver Craft"
            price="Contact for Pricing"
            image="/images/products/vel-om-bracelet.jpg"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Ear Piercing */}
          <div id="piercing" className="glass p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-8 text-white/[0.02] text-9xl font-serif font-bold group-hover:text-gold/5 transition-all duration-700">01</div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] mb-6 block font-bold">{t.services.piercing.subtitle}</span>
            <h2 className="text-4xl font-serif mb-6">{t.sections.piercingTitle}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">
              {t.sections.piercingDesc}
            </p>
            <button className="px-10 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-500">
              {t.sections.bookAppointment}
            </button>
          </div>

          {/* Laser Engraving */}
          <div id="engraving" className="glass p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-8 text-white/[0.02] text-9xl font-serif font-bold group-hover:text-silver/5 transition-all duration-700">02</div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-silver mb-6 block font-bold">{t.services.engraving.subtitle}</span>
            <h2 className="text-4xl font-serif mb-6">{t.sections.engravingTitle}</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">
              {t.sections.engravingDesc}
            </p>
            <div className="border-dashed border-[1px] border-white/20 p-10 rounded-2xl text-center bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{t.sections.uploadDesign}</p>
              <span className="text-[9px] text-gray-700 uppercase tracking-widest">{t.sections.uploadDesc}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-4 text-gold/60">{t.sections.connect}</h6>
            <h2 className="text-5xl font-serif mb-8 leading-tight">{t.sections.visitUs}</h2>
            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed">
              {t.sections.visitDesc}
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-bold">{t.sections.location}</h4>
                  <p className="text-gray-300 font-light leading-relaxed">
                    24, SPR Complex<br />
                    PatcharsiKara sr, Madurai 1
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-[#d4af37] mb-2 font-bold">{t.sections.contactPerson}</h4>
                  <p className="text-white text-xl font-serif mb-2">Suresh</p>
                  <p className="text-gray-300 font-light">
                    +91 78450 23969<br />
                    +91 96882 53635
                  </p>
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
