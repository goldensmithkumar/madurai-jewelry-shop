import { withAuth } from "next-auth/middleware"

const middleware = withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            const pathname = req.nextUrl.pathname

            // Protect admin routes
            if (pathname.startsWith('/admin')) {
                return token?.role === 'admin'
            }

            // Protect customer routes
            if (pathname.startsWith('/dashboard') || pathname.startsWith('/book-piercing') || pathname.startsWith('/engraving-request')) {
                return !!token
            }

            return true
        }
    }
})

// Next.js 16 renamed 'middleware' to 'proxy'
export function proxy(req: any, event: any) {
    return (middleware as any)(req, event)
}

export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*', '/book-piercing/:path*', '/engraving-request/:path*']
}
