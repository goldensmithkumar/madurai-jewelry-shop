import Link from 'next/link'
import { signup } from '@/app/auth/actions'
import Logo from '@/components/Logo'
import SignupForm from './SignupForm'

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>
}) {
    const params = await searchParams
    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_center,_#1a1a1a_0%,_#0a0a0a_100%)] p-6">
            <div className="w-full max-w-md">
                {/* Brand Header - Same as Homepage */}
                <div className="text-center mb-8">
                    <div className="mb-3 transition-transform duration-1000 hover:scale-105">
                        <Logo className="h-12 lg:h-16 w-auto mx-auto brightness-150 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]" />
                    </div>
                    <h1 className="text-2xl md:text-4xl font-serif tracking-[0.3em] leading-tight mt-1">
                        <span className="gold-text whitespace-nowrap drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">GOLD &amp; SILVER</span>
                    </h1>
                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-3"></div>
                </div>

                {/* Signup Form Card */}
                <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <p className="text-gray-400 mt-1 text-sm">Join Madurai Jewelry Shop</p>
                    </div>

                    <SignupForm error={params.error} />

                    <p className="text-center mt-5 text-gray-400 text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-amber-400 hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

