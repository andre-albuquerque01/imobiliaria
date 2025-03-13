/* eslint-disable prettier/prettier */
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const authentication =
        token !== undefined && token.length >= 49 && token.length <= 53

    if (
        !authentication &&
        (request.nextUrl.pathname.startsWith('/house/insert') ||
            request.nextUrl.pathname.startsWith('/house/update') ||
            request.nextUrl.pathname.startsWith('/house/user') ||
            request.nextUrl.pathname.startsWith('/user/update'))
    ) {
        return NextResponse.redirect(new URL('/user/login', request.url))
    }

    if (
        authentication &&
        (request.nextUrl.pathname.startsWith('/user/login') ||
            request.nextUrl.pathname.startsWith('/user/insert') ||
            request.nextUrl.pathname.startsWith('/user/recover') ||
            request.nextUrl.pathname.startsWith('/user/term') ||
            request.nextUrl.pathname.startsWith('/user/verify'))
    ) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}
