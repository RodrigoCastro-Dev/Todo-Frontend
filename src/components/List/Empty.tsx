import styles from './css/Empty.module.css'

export function Empty() {
  return (
    <div className={styles.container}>
      <img src="/clipboard.png" alt="ícone de prancheta" />
      <p>
        <strong>No tasks have been created</strong>
        Create some tasks and organize your to do items
      </p>
    </div>
  )
}
