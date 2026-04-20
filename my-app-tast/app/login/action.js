'use server';

import { SignJWT, importJWK } from 'jose'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'

export async function login(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (email !== 'devinetypor@gmail.com' || password !== '2526') {
        return { message: 'Login Failed' }
    }

    const secretJWK = {
        kty: 'oct',
        k: process.env.JOSE_SECRET
    }
    const secretKey = await importJWK(secretJWK, 'HS256')
    
    const token = await new SignJWT({ email })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(secretKey)

    await (await cookies()).set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/',
    })

    redirect('/manage/blog')
    return { message: 'Login Success' }
}
