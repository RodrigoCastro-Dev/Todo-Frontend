import styles from './css/Button.module.css'

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export function Button({ children, disabled, ...rest }: Props) {
  return (
    <button {...rest} className={styles.container} disabled={disabled}>
      {children}
    </button>
  )
}
