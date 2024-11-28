import React from 'react'
import { Link } from 'react-router'

import styles from '@/components/decorative/Logo.module.scss'

export function Logo(): React.ReactElement {
  return (
    <Link to="/" className={styles.logo}>
      <span>S</span>
      <div className={styles.bar} />
      <span>S</span>
    </Link>
  )
}
