import React from 'react'
import { Link } from 'react-router'

import styles from '@/components/pages/RootPage.module.scss'

export function RootPage(): React.ReactElement {
  return (
    <div>
      <main className={styles.main}>
        <div className={styles.shadows} />
        <div className={styles['shadows-secondary']} />

        <h1 className={styles.title}>
          <span>Secret</span> <span>Symphony</span>
        </h1>

        <p className={styles.description}>A secure communication platform.</p>

        <Link to="/dashboard" className={styles.dashboard}>
          Dashboard
        </Link>
      </main>
    </div>
  )
}
