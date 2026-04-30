'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import imageCompression from 'browser-image-compression'
import Link from 'next/link'

export default function AdminUploadPage() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [images, setImages] = useState<any[]>([])
    const supabase = createClient()

    useEffect(() => {
        fetchImages()
    }, [])

    async function fetchImages() {
        const { data, error } = await supabase.storage
            .from('shop_images')
            .list('products', { limit: 50, sortBy: { column: 'created_at', order: 'desc' } })

        if (data) {
            setImages(data)
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
            // Compress to max 2MB for shop images (higher quality)
            const options = {
                maxSizeMB: 2,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            }

            const compressedFile = await imageCompression(file, options)

            const fileExt = compressedFile.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `products/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('shop_images')
                .upload(filePath, compressedFile)

            if (uploadError) throw uploadError

            setMessage('Image uploaded successfully!')
            fetchImages()
                ; (e.target as HTMLFormElement).reset()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    function getPublicUrl(name: string) {
        const { data } = supabase.storage
            .from('shop_images')
            .getPublicUrl(`products/${name}`)
        return data.publicUrl
    }

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

                {/* Upload Form */}
                <section className="glass p-8 rounded-3xl border border-white/10 mb-8">
                    <form onSubmit={handleUpload} className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-amber-200/80 mb-3 uppercase tracking-widest">Select Image</label>
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
                            className="px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold rounded-2xl hover:from-amber-300 hover:to-yellow-500 transition-all disabled:opacity-50 whitespace-nowrap"
                        >
                            {loading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                    {message && <p className="text-green-400 mt-4 text-sm">{message}</p>}
                    {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
                </section>

                {/* Image Gallery */}
                <section className="glass p-8 rounded-3xl border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">Uploaded Images</h2>
                    {images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {images.map((img) => (
                                <div key={img.name} className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all">
                                    <img
                                        src={getPublicUrl(img.name)}
                                        alt={img.name}
                                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-[10px] text-gray-300 truncate">{img.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No images uploaded yet</p>
                    )}
                </section>
            </div>
        </div>
    )
}
