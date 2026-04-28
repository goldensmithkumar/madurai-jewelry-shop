import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Redesigned Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0a0a0a_100%)]">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch h-full py-12">

          {/* Ear Piercing Highlight */}
          <a href="#piercing" className="group glass rounded-[2.5rem] overflow-hidden flex flex-col relative hover:border-gold/30 transition-all duration-700 h-[400px] md:h-auto">
            <img
              src="/images/ear-piercing.png"
              alt="Ear Piercing"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="mt-auto p-10 z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-2 block">Workshop Service</span>
              <h3 className="text-3xl font-serif">Ear Piercing</h3>
              <p className="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">Safe, precise, and hygienic artistry.</p>
            </div>
          </a>

          {/* Central Branding & Collection */}
          <div className="flex flex-col items-center justify-center text-center p-8 z-10 order-first md:order-none">
            <h1 className="text-4xl md:text-6xl font-serif mb-8 tracking-tight leading-tight">
              <span className="gold-text">Madurai</span><br />
              <span className="silver-text">Gold & Silver</span>
            </h1>
            <p className="text-gray-400 text-sm mb-10 max-w-xs font-light leading-relaxed">
              Excellence in every detail. Craftsmanship that lasts for generations.
            </p>
            <a href="#collection" className="px-12 py-5 bg-white text-black rounded-full font-bold hover:bg-gold hover:text-white transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-gold/20">
              View Collection
            </a>
          </div>

          {/* Laser Engraving Highlight */}
          <a href="#engraving" className="group glass rounded-[2.5rem] overflow-hidden flex flex-col relative hover:border-silver/30 transition-all duration-700 h-[400px] md:h-auto">
            <img
              src="/images/laser-engraving.png"
              alt="Laser Engraving"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <div className="mt-auto p-10 z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-silver font-bold mb-2 block">Customization</span>
              <h3 className="text-3xl font-serif">Laser Engraving</h3>
              <p className="text-gray-400 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">Your signature, precisely etched.</p>
            </div>
          </a>

        </div>
      </section>

      {/* Collection Section */}
      <section id="collection" className="py-24 px-6 md:px-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h6 className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-2 text-silver">Our Workshop</h6>
            <h2 className="text-4xl font-serif">Featured Collection</h2>
          </div>
          <button className="text-gray-400 border-b border-gray-800 pb-1 hover:text-white transition-all text-sm tracking-widest uppercase">Explore All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <ProductCard
            name="Classic Silver Band"
            category="Sterling Silver"
            price="₹ 3,990"
            image="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2000"
          />
          <ProductCard
            name="Regal Gold Pendant"
            category="22K Solid Gold"
            price="₹ 24,500"
            image="https://images.unsplash.com/photo-1599643478518-a744c517c29b?q=80&w=2000"
          />
          <ProductCard
            name="Artisan Statement Chain"
            category="Premium Silver"
            price="₹ 12,800"
            image="https://images.unsplash.com/photo-1629241060972-e0c1280ee3f0?q=80&w=2000"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Ear Piercing */}
          <div id="piercing" className="glass p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-8 text-white/[0.02] text-9xl font-serif font-bold group-hover:text-gold/5 transition-all duration-700">01</div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4af37] mb-6 block font-bold">Workshop Service</span>
            <h2 className="text-4xl font-serif mb-6">Ear Piercing Services</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">
              Expert ear piercing handled with medical-grade hygiene and artisan precision.
              We use 100% sterilized silver and gold starters for a safe, elegant experience.
            </p>
            <button className="px-10 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-500">
              Book Appointment
            </button>
          </div>

          {/* Laser Engraving */}
          <div id="engraving" className="glass p-12 rounded-[2.5rem] relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-8 text-white/[0.02] text-9xl font-serif font-bold group-hover:text-silver/5 transition-all duration-700">02</div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-silver mb-6 block font-bold">Customization</span>
            <h2 className="text-4xl font-serif mb-6">Laser Engraving</h2>
            <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">
              Personalize your jewelry with high-precision laser engraving. Upload your own
              handwritten signature, special date, or custom drawing.
            </p>
            <div className="border-dashed border-[1px] border-white/20 p-10 rounded-2xl text-center bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/40 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Click to upload design</p>
              <span className="text-[9px] text-gray-700 uppercase tracking-widest">SVG, PNG, or JPG up to 10MB</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 text-center opacity-60">
        <p className="text-[10px] uppercase tracking-[0.3em] font-light mb-4">Madurai Gold and Silver Shop &copy; 2026</p>
        <div className="gold-text font-serif text-2xl">Crafting Excellence Since Generations.</div>
      </footer>
    </main>
  );
}
