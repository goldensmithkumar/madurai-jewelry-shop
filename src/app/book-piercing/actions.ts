'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createBooking(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const booking_date = formData.get('date') as string
    const time_slot = formData.get('time') as string

    const { error } = await supabase
        .from('piercing_bookings')
        .insert({
            customer_id: user.id,
            booking_date,
            time_slot,
            status: 'pending'
        })

    if (error) {
        redirect('/book-piercing?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}
