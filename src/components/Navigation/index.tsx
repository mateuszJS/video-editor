'use client'

import ProfileIcon from 'assets/profile-icon.svg'
import styles from './styles.module.css'
import IconButton from '@/components/IconButton'
import Link from 'next/link'
import useUserStore from '@/hooks/useUserStore'

interface Props {
  children?: React.ReactNode
}

export default function Navigation({ children }: Props) {
  const userStore = useUserStore()

  return (
    <nav className={styles.nav}>
      {children}
      {userStore.user ? (
        <Link href="/profile">
          <IconButton>
            <ProfileIcon className={styles.profileIcon} />
          </IconButton>
        </Link>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </nav>
  )
}