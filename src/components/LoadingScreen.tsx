import styles from '@/components/LoadingScreen.module.scss'

interface LoadingScreenProps {
  isLoading: boolean
}

export function LoadingScreen({
  isLoading,
}: LoadingScreenProps): React.ReactElement {
  return (
    <div
      className={`${styles['loading-screen']} ${
        isLoading ? styles.loading : ''
      }`}
    >
      Loading
    </div>
  )
}
