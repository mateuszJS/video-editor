'use client'

import { useActionState, useEffect } from "react";
import { googleLogin } from "../actions";
import useUserStore from "@/hooks/useUserStore";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function GoogleLogin() {
  const [loginState, loginAction] = useActionState(googleLogin, undefined)
  const userStore = useUserStore()
  const router = useRouter()

  const initGooglBtn = () => {
    // TODO: replace it with google script on load
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: response => loginAction(response.credential)
    });
    google.accounts.id.renderButton(
      document.getElementById("googleSignInBtn")!,
      { type: "standard", theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  useEffect(() => {
    if (loginState?.userData) {
      userStore.set(loginState?.userData)
      router.replace('/dashboard')
    }
  }, [loginState?.userData])

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        onReady={initGooglBtn}
        async
      />
      <div id="googleSignInBtn"></div>
      {loginState?.error && <p>Error</p>}
    </>
  )
}