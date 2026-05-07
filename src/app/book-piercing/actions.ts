'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function createBooking(formData: FormData) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !(session.user as any).id) {
        throw new Error('Not authenticated')
    }

    const bookingDate = formData.get('date') as string
    const timeSlot = formData.get('time') as string
    const customerName = formData.get('customerName') as string
    const cellphone = formData.get('cellphone') as string
    const address = formData.get('address') as string

    try {
        await prisma.piercingBooking.create({
            data: {
                userId: (session.user as any).id,
                bookingDate,
                timeSlot,
                customerName,
                cellphone,
                address,
                status: 'pending'
            }
        })
    } catch (error: any) {
        redirect('/book-piercing?error=' + encodeURIComponent(error.message))
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}
