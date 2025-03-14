import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './css/Loading.module.css'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export function Loading({
  fetchingApi,
  status,
}: {
  fetchingApi: boolean
  status: string
}) {
  console.log(status)
  if (fetchingApi || status === 'pending') {
    return (
      <div className={styles.container}>
        <FontAwesomeIcon icon={faSpinner} spin />

        <p>Loading...</p>
      </div>
    )
  }
}
