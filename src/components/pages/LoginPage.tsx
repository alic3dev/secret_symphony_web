import React from 'react'
import { Link } from 'react-router'

import { LoginForm } from '@/components/forms'

import styles from '@/components/pages/login_or_create_page.module.scss'

export function LoginPage(): React.ReactElement {
  React.useEffect((): void => {
    const pathname: string = window.location.pathname

    if (pathname !== '/login') {
      window.localStorage.setItem('ss_login_referral', pathname)
    }
  }, [])

  return (
    <div className={styles['login-or-create-page']}>
      <div className={styles.background}>
        SECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONY
      </div>
      <div className={styles['background-secondary']}>
        SECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONY
      </div>

      <div className={`surface ${styles['login-or-create-form-container']}`}>
        <h2 className={styles['login-or-create-form-heading']}>LOGIN</h2>

        <LoginForm />

        <br />

        <Link to="/create-account">create account</Link>
      </div>
    </div>
  )
}
