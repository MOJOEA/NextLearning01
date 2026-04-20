import { NextResponse } from 'next/server';
import { jwtVerify, importJWK } from 'jose';

export async function middleware(request) {
  try {
    const sessionCookie = request.cookies.get('session');
    
    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const token = sessionCookie.value;
    const secretJWK = {
        kty: 'oct',
        k: process.env.JOSE_SECRET
    };
    
    const secretKey = await importJWK(secretJWK, 'HS256');
    const { payload } = await jwtVerify(token, secretKey);
    console.log('User Payload:', payload);
    if (payload.email !== 'devinetypor@gmail.com'){
      throw new Error('email incorrect')
    }
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify({ email: payload.email }))
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.log('Middleware Error:', error.message);
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/manage', '/manage/blog/:path*'],
};
