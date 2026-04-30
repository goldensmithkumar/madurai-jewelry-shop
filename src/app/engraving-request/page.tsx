'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import imageCompression from 'browser-image-compression'
import { createClient } from '@/lib/supabase/client'
import { createEngravingOrder } from './actions'
import Link from 'next/link'

export default function EngravingRequestPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const file = formData.get('image') as File
        const item_details = formData.get('item_details') as string
        const engraving_text = formData.get('engraving_text') as string

        try {
            let image_url = ''

            if (file && file.size > 0) {
                // 1. Compress Image
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1080,
                    useWebWorker: true,
                }

                const compressedFile = await imageCompression(file, options)

                // 2. Upload to Supabase Storage
                const fileExt = compressedFile.name.split('.').pop()
                const fileName = `${Math.random()}.${fileExt}`
                const filePath = `engravings/${fileName}`

                const { error: uploadError } = await supabase.storage
                    .from('customer_images')
                    .upload(filePath, compressedFile)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('customer_images')
                    .getPublicUrl(filePath)

                image_url = publicUrl
            }

            // 3. Save to Database via Server Action
            await createEngravingOrder({
                item_details,
                engraving_text,
                image_url,
            })

        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-12 px-6">
            <div className="max-w-2xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif gold-text mb-4">Custom Engraving</h1>
                    <p className="text-gray-400">Upload a photo of your jewelry and the text you want engraved</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-amber-200/80 mb-3 uppercase tracking-widest">Item Description</label>
                        <input
                            name="item_details"
                            type="text"
                            required
                            placeholder="e.g. 22k Gold Wedding Ring"
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-amber-200/80 mb-3 uppercase tracking-widest">Engraving Text</label>
                        <input
                            name="engraving_text"
                            type="text"
                            placeholder="e.g. 'A & S 2024'"
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all font-serif"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-amber-200/80 mb-3 uppercase tracking-widest">Reference Photo</label>
                        <div className="relative group">
                            <input
                                name="image"
                                type="file"
                                accept="image/*"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gold/20 file:text-gold hover:file:bg-gold/30 transition-all cursor-pointer"
                            />
                            <p className="mt-2 text-[10px] text-gray-500 uppercase tracking-widest">Image will be optimized to {`<`} 500KB automatically</p>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:from-amber-300 hover:to-yellow-500 transition-all active:scale-[0.98] shadow-2xl disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Submit Request'}
                        </button>
                        <Link
                            href="/dashboard"
                            className="text-center text-gray-500 hover:text-white transition-colors text-sm"
                        >
                            Cancel and return
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
