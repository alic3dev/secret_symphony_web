import React from 'react'

import { Logo } from '@/components/decorative/Logo'

import styles from '@/components/layout/Header.module.scss'

export function Header(): React.ReactElement {
  return (
    <div className={styles.header}>
      <Logo />
    </div>
  )
}
