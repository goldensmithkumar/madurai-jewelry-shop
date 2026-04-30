'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createEngravingOrder(data: {
    item_details: string
    engraving_text: string
    image_url: string
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const { error } = await supabase
        .from('engraving_orders')
        .insert({
            customer_id: user.id,
            item_details: data.item_details,
            engraving_text: data.engraving_text,
            image_url: data.image_url,
            status: 'pending'
        })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}
