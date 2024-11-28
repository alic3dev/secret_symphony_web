import React from 'react'

import styles from '@/components/decorative/Logo.module.scss'

export function Logo(): React.ReactElement {
  return (
    <div className={styles.logo}>
      <span>S</span>
      <div className={styles.bar} />
      <span>S</span>
    </div>
  )
}
