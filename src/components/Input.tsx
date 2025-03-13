import styles from './css/Input.module.css'

export function Input({
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return <input className={styles.container} placeholder="Add task" {...rest} />
}
