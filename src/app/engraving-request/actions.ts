'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function createEngravingOrder(data: {
    item_details: string
    engraving_text: string
    image_url: string
}) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !(session.user as any).id) {
        throw new Error('Not authenticated')
    }

    try {
        await prisma.engravingOrder.create({
            data: {
                userId: (session.user as any).id,
                itemDetails: data.item_details,
                engravingText: data.engraving_text,
                imageUrl: data.image_url,
                status: 'pending'
            }
        })
    } catch (error: any) {
        throw new Error(error.message)
    }

    revalidatePath('/dashboard')
    redirect('/dashboard')
}
