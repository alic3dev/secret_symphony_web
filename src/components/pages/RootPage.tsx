import React from 'react'
import { Link } from 'react-router'

import styles from '@/components/pages/RootPage.module.scss'

interface NavigationItem {
  to: string
  text: string
}

const navigationItems: NavigationItem[] = [
  {
    to: '/dashboard',
    text: 'DASHBOARD',
  },
  {
    to: '/logout',
    text: 'LOGOUT',
  },
]

export function RootPage(): React.ReactElement {
  return (
    <main>
      <div className={styles.informational}>
        <h1 className={styles.title}>
          <span>SECRET</span> <span>SYMPHONY</span>
        </h1>

        <p className={styles.description}>A secure communication platform.</p>
      </div>

      <nav className={styles.navigation}>
        <h4 className={styles['navigation-heading']}>NAVIGATION</h4>
        {navigationItems.map(
          (
            navigationItem: NavigationItem,
            index: number,
          ): React.ReactElement => (
            <Link
              key={index}
              to={navigationItem.to}
              className={styles['navigation-item']}
            >
              <span className={styles['navigation-carrot']}>&gt;</span>&nbsp;
              <span className={styles['navigation-text']}>
                {navigationItem.text}
              </span>
            </Link>
          ),
        )}
      </nav>
    </main>
  )
}
