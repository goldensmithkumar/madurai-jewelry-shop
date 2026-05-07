import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
    try {
        const { email, phone, password, name } = await req.json();

        if ((!email && !phone) || !password) {
            return NextResponse.json({ error: 'Email or Phone and Password are required' }, { status: 400 });
        }

        // Check for existing user
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    ...(email ? [{ email }] : []),
                    ...(phone ? [{ phone }] : [])
                ]
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                phone,
                passwordHash,
                profile: {
                    create: {
                        fullName: name || 'Customer',
                        role: 'customer'
                    }
                }
            }
        });

        return NextResponse.json({ message: 'User created' }, { status: 201 });

    } catch (e: any) {
        console.error("Signup error:", e);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
