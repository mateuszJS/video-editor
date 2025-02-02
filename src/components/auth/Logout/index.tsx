'use client'

import useUserStore from "@/hooks/useUserStore";
import { logout } from "../actions";

export default function Logout() {
  const userStore = useUserStore()

  const onClick = async () => {
    await logout()
    userStore.set(null)
  }

  return <button onClick={onClick}>Logout</button>
}