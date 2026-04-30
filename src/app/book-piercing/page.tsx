import { createBooking } from './actions'
import Link from 'next/link'

export default function BookPiercingPage({
    searchParams,
}: {
    searchParams: { error?: string }
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-12 px-6">
            <div className="max-w-2xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] border border-white/10">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif gold-text mb-4">Book Ear Piercing</h1>
                    <p className="text-gray-400">Select a convenient date and time for your visit</p>
                </div>

                <form action={createBooking} className="space-y-8">
                    <div>
                        <label className="block text-sm font-bold text-amber-200/80 mb-3 uppercase tracking-widest">Select Date</label>
                        <input
                            name="date"
                            type="date"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all [color-scheme:dark]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-amber-200/80 mb-3 uppercase tracking-widest">Preferred Time</label>
                        <select
                            name="time"
                            required
                            className="w-full px-5 py-4 rounded-2xl bg-[#151515] border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all appearance-none"
                        >
                            <option value="">Choose a time slot</option>
                            <option value="Morning (10 AM - 12 PM)">Morning (10 AM - 12 PM)</option>
                            <option value="Afternoon (1 PM - 4 PM)">Afternoon (1 PM - 4 PM)</option>
                            <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                        </select>
                    </div>

                    {searchParams.error && (
                        <p className="text-red-400 text-sm text-center bg-red-400/10 py-3 rounded-xl border border-red-400/20">
                            {searchParams.error}
                        </p>
                    )}

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            className="w-full py-5 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:from-amber-300 hover:to-yellow-500 transition-all active:scale-[0.98] shadow-2xl"
                        >
                            Confirm Booking
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
