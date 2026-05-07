'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function signup(formData: FormData) {
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const password = formData.get('password') as string
    const full_name = formData.get('full_name') as string

    if ((!email && !phone) || !password) {
        redirect('/signup?error=' + encodeURIComponent("Missing required fields (Email or Phone required)"))
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    ...(email ? [{ email }] : []),
                    ...(phone ? [{ phone }] : [])
                ]
            }
        })

        if (existingUser) {
            redirect('/signup?error=' + encodeURIComponent("User already exists"))
        }

        const passwordHash = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                phone,
                passwordHash,
                profile: {
                    create: {
                        fullName: full_name,
                        role: 'customer'
                    }
                }
            }
        })
    } catch (error: any) {
        if (error.message === "NEXT_REDIRECT") {
            throw error;
        }
        console.error("Signup Action Error:", error);
        redirect('/signup?error=' + encodeURIComponent("Internal Server Error: " + error.message))
    }

    redirect('/login?message=' + encodeURIComponent("Account created! Please log in."))
}
