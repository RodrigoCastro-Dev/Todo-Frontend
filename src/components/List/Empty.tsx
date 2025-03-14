import styles from './css/Empty.module.css'

export function Empty({ fetchingApi }: { fetchingApi: boolean }) {
  if (!fetchingApi) {
    return (
      <div className={styles.container}>
        <img src="/clipboard.png" alt="ícone de prancheta" />
        <p>
          <strong>No tasks have been found</strong>
          Organize your to do items!
        </p>
      </div>
    )
  }
}
