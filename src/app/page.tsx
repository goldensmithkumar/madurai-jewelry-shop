import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0a0a0a_100%)]">
        <div className="absolute w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full top-[-100px] right-[-100px]"></div>
        <div className="absolute w-[300px] h-[300px] bg-gold/5 blur-[100px] rounded-full bottom-[-50px] left-[-50px]"></div>
        
        <h1 className="text-5xl md:text-8xl font-serif mb-6 animate-fade-in tracking-tight">
          <span className="gold-text">Timeless</span> Gold & <br />
          <span className="silver-text">Artisan</span> Silver
        </h1>
        <p className="text-gray-400 max-w-lg mb-10 text-lg font-light leading-relaxed">
          Crafting excellence since generations at <strong>Madurai Gold and Silver Shop</strong>. 
          Explore our premium collection and specialized workshop services.
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <button className="px-10 py-4 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
            View Collection
          </button>
          <button className="px-10 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
            Workshop Services
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white/5 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Ear Piercing */}
          <div id="piercing" className="glass p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 text-8xl font-serif font-bold group-hover:text-gold/10 transition-colors">01</div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] mb-4 block">Workshop Service</span>
            <h2 className="text-4xl font-serif mb-6 glass-text">Master Ear Piercing</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Our master craftsman provides safe, precise, and hygienic ear piercing services. 
              We use premium silver/gold sterilized starters to ensure a royal experience.
            </p>
            <button className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white hover:text-black transition-all">
              Book Appointment
            </button>
          </div>

          {/* Laser Engraving */}
          <div id="engraving" className="glass p-10 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-white/5 text-8xl font-serif font-bold group-hover:text-silver/10 transition-colors">02</div>
            <span className="text-xs uppercase tracking-widest text-silver mb-4 block">Customization</span>
            <h2 className="text-4xl font-serif mb-6">Laser Engraving</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Make your jewelry truly unique. Upload your logos, signatures, or drawings and we will 
              engrave them with precision on your pieces.
            </p>
            <div className="border-dashed border-2 border-white/10 p-8 rounded-2xl text-center bg-white/5 hover:border-white/30 transition-all cursor-pointer">
              <p className="text-sm text-gray-400 mb-2">Upload your custom design</p>
              <span className="text-[10px] text-gray-600 uppercase tracking-widest">SVG, PNG, JPG</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-20 border-t border-white/10 text-center">
        <p className="text-gray-500 mb-4">&copy; 2026 Madurai Gold and Silver Shop. All rights reserved.</p>
        <div className="gold-text serif text-xl opacity-80">Crafting Excellence Since Generations.</div>
      </footer>
    </main>
  );
}
