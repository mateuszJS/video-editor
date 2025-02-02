import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.AUTH_SECRET // generated with: openssl rand -base64 32
const encodedKey = new TextEncoder().encode(secretKey)

type SessionPayload = {
  userId: string
  expiresAt: Date
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })

  const requestCookies = await cookies()
  requestCookies.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt
  })
}

export async function deleteSession() {
  const requestCookie = await cookies()
  requestCookie.delete("session")
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session = "") {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ['HS256']
    })
    return payload
  } catch(error) {}
}