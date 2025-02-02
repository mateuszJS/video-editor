"use server"

import { UserStore } from '@/hooks/useUserStore';
import { createSession, deleteSession, encrypt } from '@/lib/session';
import {OAuth2Client}  from 'google-auth-library';
import { redirect } from 'next/navigation';

const client = new OAuth2Client();
export async function googleLogin(prevState: any, googleJwtToken: string) {
  try {
    // TODO: does it actually VERIFIED that token is produces by google??
    const ticket = await client.verifyIdToken({
        idToken: googleJwtToken,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,  // Specify the WEB_CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    if (!payload) throw Error('Google google-auth-library didn\'t returned payload.')
    /*
    {
      sub: '106118124079169595655', // (Subject) Claim - Users google internal id
      email: 'mate.walendzik@gmail.com',
      email_verified: true,
      name: 'Mateusz Walendzik',
      picture: 'https://lh3.googleusercontent.com/a/ACg8ocLNSgiGbN5xaMfGb3lH-aFghcI5bT-imTSKzRm8sZeSZMtrVRF5=s96-c',
      given_name: 'Mateusz',
      family_name: 'Walendzik',
      exp: 1738431159,
    }
    */

    await createSession(payload.sub)

    const userData: UserStore['user'] = {
      picture: payload.picture,
      firstName: payload.given_name,
      lastName: payload.family_name,
    }

    return { userData }
  } catch (error) {
    return {
      error: 'Something went wrong, please try later or use a different account/login method.'
    }
  }
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}