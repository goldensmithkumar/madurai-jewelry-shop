'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Logo from '@/components/Logo'
import ProductCard from '@/components/ProductCard'
import EngravingCard from '@/components/EngravingCard'
import { useLanguage } from '@/context/LanguageContext'

type TabType = 'gold' | 'silver' | 'engraving'

function CollectionContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const categoryFilter = searchParams.get('category');

    const [shopImages, setShopImages] = useState<any[]>([])
    const [engravingImages, setEngravingImages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<TabType>('gold')

    useEffect(() => {
        async function fetchImages() {
            try {
                const [shopRes, engraveRes] = await Promise.all([
                    fetch('/api/upload?bucket=shop_images'),
                    fetch('/api/upload?bucket=engraving_showcase')
                ])
                if (shopRes.ok) {
                    const data = await shopRes.json()
                    setShopImages(data)
                }
                if (engraveRes.ok) {
                    const data = await engraveRes.json()
                    setEngravingImages(data)
                }
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false)
            }
        }
        fetchImages()
    }, [])

    // Filter products based on active tab and optional category filter
    const goldProducts = shopImages.filter(img => img.material === 'Gold' || !img.material)
    const silverProducts = shopImages.filter(img => img.material === 'Silver')

    const filteredGold = categoryFilter
        ? goldProducts.filter(img => img.category?.toLowerCase().includes(categoryFilter.toLowerCase()))
        : goldProducts

    const filteredSilver = categoryFilter
        ? silverProducts.filter(img => img.category?.toLowerCase().includes(categoryFilter.toLowerCase()))
        : silverProducts

    const currentProducts = activeTab === 'gold' ? filteredGold : activeTab === 'silver' ? filteredSilver : []
    const currentEngravings = activeTab === 'engraving' ? engravingImages : []

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0a0a0a_100%)] pt-28 pb-16 px-4 md:px-6">
            <div className="max-w-[1400px] mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mb-3">
                        <Logo className="h-10 md:h-14 w-auto mx-auto brightness-150 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif tracking-[0.3em] leading-tight mt-2">
                        <span className="gold-text drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">{t.collection.title}</span>
                    </h1>
                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4 mb-4"></div>
                    <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">
                        {t.collection.tagline}
                    </p>
                    {categoryFilter && (
                        <p className="text-gold text-xs uppercase tracking-widest mt-2">
                            Filtered: {categoryFilter}
                        </p>
                    )}
                </div>

                {/* Material/Type Tabs */}
                <div className="flex justify-center gap-3 mb-12">
                    <button
                        onClick={() => setActiveTab('gold')}
                        className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${activeTab === 'gold'
                            ? 'bg-gradient-to-r from-amber-400/20 to-yellow-600/20 border-gold/50 text-gold shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                            : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                            }`}
                    >
                        🟡 Gold Collection
                        <span className="ml-2 text-[10px] opacity-70">({filteredGold.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('silver')}
                        className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${activeTab === 'silver'
                            ? 'bg-gradient-to-r from-gray-300/20 to-gray-500/20 border-silver/50 text-silver shadow-[0_0_20px_rgba(192,192,192,0.2)]'
                            : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                            }`}
                    >
                        ⚪ Silver Collection
                        <span className="ml-2 text-[10px] opacity-70">({filteredSilver.length})</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('engraving')}
                        className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${activeTab === 'engraving'
                            ? 'bg-gradient-to-r from-silver/20 to-white/10 border-silver/50 text-silver shadow-[0_0_20px_rgba(192,192,192,0.2)]'
                            : 'border-white/10 text-gray-500 hover:text-white hover:border-white/30'
                            }`}
                    >
                        ✒️ Engravings
                        <span className="ml-2 text-[10px] opacity-70">({engravingImages.length})</span>
                    </button>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-500 text-sm uppercase tracking-widest">{t.collection.loading}</p>
                    </div>
                ) : activeTab === 'engraving' ? (
                    // Engraving Grid
                    currentEngravings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {currentEngravings.map((img, i) => (
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
                        <div className="text-center py-20 glass rounded-3xl border border-white/10 max-w-lg mx-auto">
                            <div className="text-5xl mb-4">✒️</div>
                            <p className="text-gray-400 mb-2">Engraving showcase coming soon</p>
                            <p className="text-gray-600 text-[9px] uppercase tracking-widest">Upload engravings from admin panel</p>
                        </div>
                    )
                ) : (
                    // Product Grid (Gold / Silver)
                    currentProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {currentProducts.map((img, index) => (
                                <ProductCard
                                    key={img.url + index}
                                    name={img.name || 'Jewelry Piece'}
                                    category={`${img.material || 'Gold'} ${img.category || 'Jewelry'}`}
                                    price={img.weightGrams ? `${img.weightGrams}g` : "Contact Store"}
                                    image={img.url}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 glass rounded-3xl border border-white/10 max-w-lg mx-auto">
                            <div className="text-5xl mb-4">{activeTab === 'gold' ? '💎' : '💍'}</div>
                            <p className="text-gray-400 mb-2">
                                {activeTab === 'gold' ? 'Gold' : 'Silver'} collection coming soon
                            </p>
                            <p className="text-gray-600 text-[9px] uppercase tracking-widest">{t.collection.admin_hint}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default function CollectionPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
        }>
            <CollectionContent />
        </Suspense>
    )
}
