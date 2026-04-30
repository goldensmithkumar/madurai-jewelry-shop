import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user's bookings
    const { data: bookings } = await supabase
        .from('piercing_bookings')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })

    // Fetch user's engraving orders
    const { data: engravings } = await supabase
        .from('engraving_orders')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-serif gold-text mb-2">My Account</h1>
                        <p className="text-gray-400">Welcome back, {user.user_metadata.full_name || user.email}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="/book-piercing"
                            className="px-6 py-3 bg-gold/20 border border-gold/30 text-gold rounded-xl hover:bg-gold/30 transition-all font-bold text-sm"
                        >
                            Book Ear Piercing
                        </Link>
                        <Link
                            href="/engraving-request"
                            className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all font-bold text-sm"
                        >
                            Request Engraving
                        </Link>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Bookings Section */}
                    <section className="glass p-8 rounded-3xl border border-white/10">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">My Appointments</h2>
                        {bookings && bookings.length > 0 ? (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                                        <div>
                                            <p className="text-amber-200 font-bold">{booking.booking_date}</p>
                                            <p className="text-xs text-gray-400">{booking.time_slot}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-tighter ${booking.status === 'pending' ? 'bg-amber-400/20 text-amber-400' :
                                                booking.status === 'confirmed' ? 'bg-green-400/20 text-green-400' :
                                                    'bg-gray-400/20 text-gray-400'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                                <p className="text-gray-500 mb-4">No appointments found</p>
                                <Link href="/book-piercing" className="text-gold hover:underline font-bold text-sm">
                                    Schedule your first appointment
                                </Link>
                            </div>
                        )}
                    </section>

                    {/* Engraving Orders Section */}
                    <section className="glass p-8 rounded-3xl border border-white/10">
                        <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">My Engraving Requests</h2>
                        {engravings && engravings.length > 0 ? (
                            <div className="space-y-4">
                                {engravings.map((order) => (
                                    <div key={order.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                                        {order.image_url ? (
                                            <img src={order.image_url} alt="Reference" className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-gray-500">No Img</div>
                                        )}
                                        <div className="flex-1">
                                            <p className="text-white font-bold text-sm truncate">{order.item_details}</p>
                                            <p className="text-amber-200/60 text-xs italic">&quot;{order.engraving_text}&quot;</p>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold text-gray-400 bg-white/5">{order.status}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-2xl">
                                <p className="text-gray-500 mb-4">No engraving requests yet</p>
                                <Link href="/engraving-request" className="text-gold hover:underline font-bold text-sm">
                                    Start a new request
                                </Link>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}
