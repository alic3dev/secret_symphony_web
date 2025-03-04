import React from 'react'
import { Link } from 'react-router'

import { Create_account_form } from '@/components/forms'

import styles from '@/components/pages/login_or_create_page.module.scss'

export function Create_account_page(): React.ReactElement {
  React.useEffect((): void => {}, [])

  return (
    <div className={styles['login-or-create-page']}>
      <div className={styles.background}>
        SECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONY
      </div>
      <div className={styles['background-secondary']}>
        SECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONYSECRETSYMPHONY
      </div>

      <div className={`surface ${styles['login-or-create-form-container']}`}>
        <h2 className={styles['login-or-create-form-heading']}>
          create account
        </h2>

        <Create_account_form />

        <br />

        <Link to="/login">login</Link>
      </div>
    </div>
  )
}
