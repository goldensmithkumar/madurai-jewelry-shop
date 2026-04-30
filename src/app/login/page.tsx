import Link from 'next/link'
import { login } from '@/app/auth/actions'

export default function LoginPage({
    searchParams,
}: {
    searchParams: { error?: string }
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c] p-6">
            <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-gray-400 mt-2">Log in to your account</p>
                </div>

                <form action={login} className="space-y-6">
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

                    {searchParams.error && (
                        <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">
                            {searchParams.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-bold rounded-xl hover:from-amber-300 hover:to-yellow-500 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                        Log In
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-amber-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
