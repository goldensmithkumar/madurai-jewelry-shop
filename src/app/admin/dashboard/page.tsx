import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check if user is admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profile || profile.role !== 'admin') {
        redirect('/')
    }

    // Fetch ALL bookings (admin can see all)
    const { data: bookings } = await supabase
        .from('piercing_bookings')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })

    // Fetch ALL engraving orders
    const { data: engravings } = await supabase
        .from('engraving_orders')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-serif gold-text mb-2">Shop Admin</h1>
                        <p className="text-gray-400">Manage bookings and engraving orders</p>
                    </div>
                    <Link
                        href="/admin/upload"
                        className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold rounded-xl hover:from-amber-300 hover:to-yellow-500 transition-all text-sm"
                    >
                        Upload Shop Images
                    </Link>
                </header>

                {/* Bookings Table */}
                <section className="glass p-8 rounded-3xl border border-white/10 mb-8">
                    <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">All Piercing Appointments</h2>
                    {bookings && bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-amber-200/60 uppercase tracking-widest text-[10px] border-b border-white/10">
                                        <th className="pb-4 pr-4">Customer</th>
                                        <th className="pb-4 pr-4">Date</th>
                                        <th className="pb-4 pr-4">Time</th>
                                        <th className="pb-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="py-4 pr-4 text-white font-bold">{(booking.profiles as any)?.full_name || 'Unknown'}</td>
                                            <td className="py-4 pr-4 text-gray-300">{booking.booking_date}</td>
                                            <td className="py-4 pr-4 text-gray-400">{booking.time_slot}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold ${booking.status === 'pending' ? 'bg-amber-400/20 text-amber-400' :
                                                        booking.status === 'confirmed' ? 'bg-green-400/20 text-green-400' :
                                                            'bg-gray-400/20 text-gray-400'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No bookings yet</p>
                    )}
                </section>

                {/* Engraving Orders */}
                <section className="glass p-8 rounded-3xl border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest">All Engraving Orders</h2>
                    {engravings && engravings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {engravings.map((order) => (
                                <div key={order.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all">
                                    {order.image_url && (
                                        <img src={order.image_url} alt="Engraving ref" className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10" />
                                    )}
                                    <p className="text-white font-bold mb-1">{order.item_details}</p>
                                    <p className="text-amber-200/60 text-sm italic mb-2">&quot;{order.engraving_text}&quot;</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-gray-500 text-xs">By: {(order.profiles as any)?.full_name || 'Unknown'}</p>
                                        <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold text-gray-400 bg-white/5">{order.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8">No engraving orders yet</p>
                    )}
                </section>
            </div>
        </div>
    )
}
