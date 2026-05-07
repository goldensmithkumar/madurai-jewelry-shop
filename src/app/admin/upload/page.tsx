'use client'

import { useState, useEffect } from 'react'
import imageCompression from 'browser-image-compression'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'

export default function AdminUploadPage() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [images, setImages] = useState<any[]>([])
    const [bucket, setBucket] = useState<string>('shop_images')

    // Advanced Inventory States
    const [material, setMaterial] = useState<'Gold' | 'Silver'>('Gold')
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [weightGrams, setWeightGrams] = useState('')

    useEffect(() => {
        fetchImages()
    }, [bucket])

    async function fetchImages() {
        try {
            const res = await fetch(`/api/upload?bucket=${bucket}`)
            if (res.ok) {
                const data = await res.json()
                setImages(data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setMessage(null)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const file = formData.get('image') as File

        if (!file || file.size === 0) {
            setError('Please select an image')
            setLoading(false)
            return
        }

        try {
            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            }

            const compressedFile = await imageCompression(file, options)

            // Upload via API
            const apiData = new FormData()
            apiData.append("file", compressedFile)

            // Explicitly grab the bucket from the form data
            const targetBucket = formData.get('bucket') as string || bucket
            apiData.append("bucket", targetBucket)

            if (targetBucket === 'shop_images' || targetBucket === 'engraving_showcase') {
                apiData.append('material', material)
                apiData.append('category', category)
                apiData.append('name', name)
                apiData.append('weightGrams', weightGrams || "N/A")
            }

            if (targetBucket === 'engraving_showcase') {
                const fileBefore = formData.get('fileBefore') as File | null;
                if (fileBefore && fileBefore.size > 0) {
                    const compressedBefore = await imageCompression(fileBefore, options)
                    apiData.append('fileBefore', compressedBefore)
                }
            }

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: apiData
            })

            const result = await res.json()
            if (!res.ok) throw new Error(result.error)

            setMessage(`${name || 'Image'} uploaded successfully!`)
            if (targetBucket === 'shop_images' || targetBucket === 'engraving_showcase') {
                setName('')
                setWeightGrams('')
                setCategory('')
            }
            fetchImages()
                ; (e.target as HTMLFormElement).reset()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleSpecificHeroUpload(e: React.ChangeEvent<HTMLInputElement>, prefix: string) {
        const file = e.target.files?.[0]
        if (!file) return
        setLoading(true)
        setMessage(null)
        setError(null)
        try {
            const options = { maxSizeMB: 2, maxWidthOrHeight: 1920, useWebWorker: true }
            const compressedFile = await imageCompression(file, options)
            const apiData = new FormData()
            apiData.append('file', compressedFile)
            apiData.append('bucket', 'hero_images')
            apiData.append('customPrefix', prefix)

            const res = await fetch('/api/upload', { method: 'POST', body: apiData })
            const result = await res.json()
            if (!res.ok) throw new Error(result.error)

            setMessage(`Hero Background updated!`)
            fetchImages()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Safely assign specifically prefixed hero images just like the homepage does
    const heroImgPiercing = images.filter(img => img.name.startsWith('piercing-')).sort((a, b) => b.name.localeCompare(a.name))[0]?.url || "/images/ear-piercing.png"
    const heroImgXRF = images.filter(img => img.name.startsWith('xrf-')).sort((a, b) => b.name.localeCompare(a.name))[0]?.url || "/images/xrf-testing.png"
    const heroImgEngraving = images.filter(img => img.name.startsWith('engraving-')).sort((a, b) => b.name.localeCompare(a.name))[0]?.url || "/images/laser-engraving.png"

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-serif gold-text mb-2">Upload Shop Images</h1>
                        <p className="text-gray-400">Add product and engraving showcase photos</p>
                    </div>
                    <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                        ← Back to Admin
                    </Link>
                </header>

                <section className="glass p-8 rounded-3xl border border-white/10 mb-8">
                    <div className="flex gap-4 mb-6 border-b border-white/10 pb-4 overflow-x-auto">
                        <button
                            type="button"
                            onClick={() => setBucket('shop_images')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${bucket === 'shop_images' ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            Shop Images
                        </button>
                        <button
                            type="button"
                            onClick={() => setBucket('engraving_showcase')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${bucket === 'engraving_showcase' ? 'bg-silver text-black' : 'text-gray-400 hover:text-white'}`}
                        >
                            Engraving Showcase
                        </button>
                        <button
                            type="button"
                            onClick={() => setBucket('hero_images')}
                            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${bucket === 'hero_images' ? 'bg-amber-100 text-black shadow-[0_0_15px_rgba(254,243,199,0.3)]' : 'text-gray-400 hover:text-white'}`}
                        >
                            Hero Cards
                        </button>
                    </div>

                    {bucket === 'hero_images' ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Piercing Hero Admin Card */}
                            <div className="group glass rounded-[2rem] overflow-hidden flex flex-col items-center justify-center relative border border-white/10 hover:border-gold/50 transition-all duration-700 aspect-square w-full">
                                <img src={heroImgPiercing} alt="Piercing" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-all duration-1000 brightness-110 contrast-110" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/98"></div>
                                <label className="absolute top-4 right-4 z-30 bg-gold/20 hover:bg-gold/40 text-gold p-2 px-4 rounded-xl backdrop-blur-md cursor-pointer transition-all border border-gold/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold tracking-widest">Update</span>
                                    <input type="file" hidden accept="image/*" onChange={(e) => handleSpecificHeroUpload(e, 'piercing')} disabled={loading} />
                                </label>
                                <div className="relative z-10 p-6 text-center">
                                    <span className="text-[9px] uppercase tracking-[0.6em] text-gold font-bold mb-3 block">Specialized</span>
                                    <h3 className="text-2xl font-serif mb-3 leading-tight text-white">Ear Piercing</h3>
                                </div>
                            </div>

                            {/* XRF Testing Hero Admin Card */}
                            <div className="group glass rounded-[2rem] overflow-hidden flex flex-col items-center justify-center relative border border-white/10 hover:border-gold/70 transition-all duration-700 aspect-square w-full">
                                <img src={heroImgXRF} alt="XRF" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 transition-all duration-1000 brightness-125 contrast-125" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/98"></div>
                                <label className="absolute top-4 right-4 z-30 bg-gold/20 hover:bg-gold/40 text-gold p-2 px-4 rounded-xl backdrop-blur-md cursor-pointer transition-all border border-gold/30 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold tracking-widest">Update</span>
                                    <input type="file" hidden accept="image/*" onChange={(e) => handleSpecificHeroUpload(e, 'xrf')} disabled={loading} />
                                </label>
                                <div className="relative z-10 p-6 text-center">
                                    <span className="text-[9px] uppercase tracking-[0.6em] text-gold font-black mb-3 block">Advanced</span>
                                    <h3 className="text-3xl font-serif mb-3 leading-tight text-white font-black drop-shadow-md">XRF Testing</h3>
                                </div>
                            </div>

                            {/* Laser Engraving Hero Admin Card */}
                            <div className="group glass rounded-[2rem] overflow-hidden flex flex-col items-center justify-center relative border border-white/10 hover:border-silver/50 transition-all duration-700 aspect-square w-full">
                                <img src={heroImgEngraving} alt="Engraving" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-all duration-1000 brightness-110 contrast-110" />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/98"></div>
                                <label className="absolute top-4 right-4 z-30 bg-silver/20 hover:bg-silver/40 text-silver p-2 px-4 rounded-xl backdrop-blur-md cursor-pointer transition-all border border-silver/30 hover:shadow-[0_0_15px_rgba(192,192,192,0.4)] flex items-center gap-2">
                                    <span className="text-[10px] uppercase font-bold tracking-widest">Update</span>
                                    <input type="file" hidden accept="image/*" onChange={(e) => handleSpecificHeroUpload(e, 'engraving')} disabled={loading} />
                                </label>
                                <div className="relative z-10 p-6 text-center">
                                    <span className="text-[9px] uppercase tracking-[0.6em] text-silver font-bold mb-3 block">Custom</span>
                                    <h3 className="text-2xl font-serif mb-3 leading-tight text-white">Laser Engraving</h3>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleUpload} className="flex flex-col gap-6">

                            {/* Standard Shop Product Metadata */}
                            {bucket === 'shop_images' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <div className="col-span-full mb-2">
                                        <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">Primary Material</label>
                                        <div className="flex gap-4">
                                            <button type="button" onClick={() => setMaterial('Gold')} className={`flex-1 py-3 rounded-xl border ${material === 'Gold' ? 'border-amber-400 bg-amber-400/20 text-amber-300' : 'border-white/10 text-gray-400'} transition-all uppercase tracking-widest font-bold text-xs`}>
                                                🟡 Gold
                                            </button>
                                            <button type="button" onClick={() => setMaterial('Silver')} className={`flex-1 py-3 rounded-xl border ${material === 'Silver' ? 'border-gray-300 bg-gray-300/20 text-gray-200' : 'border-white/10 text-gray-400'} transition-all uppercase tracking-widest font-bold text-xs`}>
                                                ⚪ Silver
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Product Category</label>
                                        <input
                                            type="text"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            list="categories-list"
                                            placeholder="e.g. Ring, Necklace, Chain"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                                        />
                                        <datalist id="categories-list">
                                            <option value="Ring" />
                                            <option value="Necklace" />
                                            <option value="Chain" />
                                            <option value="Bracelet" />
                                            <option value="Dollar (Pendant)" />
                                        </datalist>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Specific Product Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Temple Gold Necklace"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Weight (Grams)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={weightGrams}
                                            onChange={(e) => setWeightGrams(e.target.value)}
                                            placeholder="e.g. 12.5"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-gold transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Custom Engraving Job Metadata */}
                            {bucket === 'engraving_showcase' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <div className="col-span-full mb-2">
                                        <label className="block text-sm font-bold text-white mb-3 uppercase tracking-widest">Base Material</label>
                                        <div className="flex gap-4">
                                            <button type="button" onClick={() => setMaterial('Gold')} className={`flex-1 py-3 rounded-xl border ${material === 'Gold' ? 'border-amber-400 bg-amber-400/20 text-amber-300' : 'border-white/10 text-gray-400'} transition-all uppercase tracking-widest font-bold text-xs`}>
                                                🟡 Gold
                                            </button>
                                            <button type="button" onClick={() => setMaterial('Silver')} className={`flex-1 py-3 rounded-xl border ${material === 'Silver' ? 'border-gray-300 bg-gray-300/20 text-gray-200' : 'border-white/10 text-gray-400'} transition-all uppercase tracking-widest font-bold text-xs`}>
                                                ⚪ Silver
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Engraving Category</label>
                                        <input
                                            type="text"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            list="engraving-list"
                                            placeholder="e.g. Photo Engrave"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-silver transition-colors"
                                        />
                                        <datalist id="engraving-list">
                                            <option value="Photo Engrave" />
                                            <option value="Name Engrave" />
                                            <option value="Logo Engrave" />
                                            <option value="Custom Drawing Engrave" />
                                        </datalist>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-300 mb-2">Engraving Job Title</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="e.g. Anniversary Diamond Ring"
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-silver transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                <input type="hidden" name="bucket" value={bucket} />

                                {bucket === 'engraving_showcase' && (
                                    <div className="flex-1 w-full">
                                        <label className="block text-sm font-bold text-silver mb-3 uppercase tracking-widest">Select "Before" Image</label>
                                        <input
                                            name="fileBefore"
                                            type="file"
                                            accept="image/*"
                                            required
                                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-silver/20 file:text-silver hover:file:bg-silver/30 transition-all cursor-pointer"
                                        />
                                    </div>
                                )}

                                <div className="flex-1 w-full">
                                    <label className="block text-sm font-bold text-amber-200/80 mb-3 uppercase tracking-widest">
                                        Select {bucket === 'engraving_showcase' ? '"After" Image' : 'Image File'}
                                    </label>
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        required
                                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 transition-all cursor-pointer"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold rounded-2xl hover:from-amber-300 hover:to-yellow-500 transition-all disabled:opacity-50 whitespace-nowrap h-[62px]"
                                >
                                    {loading ? 'Uploading...' : 'Upload & Save'}
                                </button>
                            </div>
                        </form>
                    )}
                    {message && <p className="text-green-400 mt-4 text-sm">{message}</p>}
                    {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
                </section>

                {bucket !== 'hero_images' && (
                    <section className="glass p-8 rounded-3xl border border-white/10">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Uploaded {bucket === 'shop_images' ? 'Shop Images' : 'Engravings'}</h2>
                        {images.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {images.map((img, i) => (
                                    <ProductCard
                                        key={img.url + i}
                                        name={img.name ? img.name.replace(/^\d+-/, '').replace(/\.[^.]+$/, '').replace(/-/g, ' ') : 'Unnamed Image'}
                                        category={bucket === 'shop_images' && img.category ? `${img.material} ${img.category}` : bucket === 'shop_images' ? "Shop Catalog" : "Engraving Job"}
                                        price={bucket === 'shop_images' && img.weightGrams ? `${img.weightGrams}g` : "Manage"}
                                        image={img.url}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No images uploaded yet</p>
                        )}
                    </section>
                )}
            </div>
        </div>
    )
}
