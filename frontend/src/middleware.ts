import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getCurrentUserServer } from "./lib/sutils"
import { isTokenValid, refreshToken } from "./lib/actions/auth"

const authRoutes = ["/login", "/register"]
const protectedRoutes = ["/app/wallet"]

export async function middleware(request: NextRequest) {
    const currentUser = getCurrentUserServer()

    if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
        request.cookies.delete("currentUser")
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("currentUser")

        return response
    }

    if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
        return NextResponse.redirect(new URL("/app/wallet", request.url))
    }
}
