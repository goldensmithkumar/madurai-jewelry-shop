"use client"

import Link from 'next/link'
import Logo from '@/components/Logo'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

function LoginForm() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')
    const message = searchParams.get('message')
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [localError, setLocalError] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setLocalError('')

        const form = new FormData(e.currentTarget)
        const email = form.get('email') as string
        const password = form.get('password') as string

        const res = await signIn('credentials', {
            redirect: false,
            email,
            password
        })

        if (res?.error) {
            setLocalError('Invalid email or password')
            setLoading(false)
        } else {
            // Check session role to route admin vs customer
            const sessionRes = await fetch('/api/auth/session')
            const session = await sessionRes.json()

            if (session?.user?.role === 'admin') {
                router.push('/admin/dashboard')
            } else {
                router.push('/dashboard')
            }
            router.refresh()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-amber-200/80 mb-2">Email Address</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-amber-200/80 mb-2">Password</label>
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                />
            </div>

            {(error || localError) && (
                <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                    {localError || error}
                </p>
            )}

            {message && (
                <p className="text-green-400 text-sm text-center bg-green-400/10 py-2 rounded-lg border border-green-400/20">
                    {message}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold rounded-xl hover:from-amber-300 hover:to-yellow-500 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.3)] disabled:opacity-50"
            >
                {loading ? 'Logging In...' : 'Log In'}
            </button>
        </form>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0a0a0a_100%)] p-6">
            <div className="w-full max-w-md">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="mb-3 transition-transform duration-1000 hover:scale-105">
                        <Logo className="h-12 lg:h-16 w-auto mx-auto brightness-150 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-serif tracking-[0.3em] leading-tight mt-1">
                        <span className="gold-text whitespace-nowrap drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">GOLD &amp; SILVER</span>
                    </h1>
                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3"></div>
                </div>

                {/* Login Form Card */}
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400 mt-1 text-sm">Log in to your account</p>
                    </div>

                    <Suspense fallback={<div className="text-center text-gold">Loading...</div>}>
                        <LoginForm />
                    </Suspense>

                    <p className="text-center mt-5 text-gray-400 text-sm">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-amber-400 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
