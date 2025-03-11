import { Trash, Check } from '@phosphor-icons/react'
import styles from './css/Item.module.css'
import { ITask } from '../Home'

interface Props {
  data: ITask
  removeTask: (id: number) => void
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
}

export function Item({ data, removeTask, toggleTaskStatus }: Props) {
  function handleTaskToggle() {
    if (data.id !== undefined) {
      toggleTaskStatus({ id: data.id, value: !data.completed })
    }
  }

  function handleRemove() {
    if (data.id !== undefined) {
      removeTask(data.id)
    }
  }

  const checkboxCheckedClassname = data.completed
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const paragraphCheckedClassname = data.completed
    ? styles['paragraph-checked']
    : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox" onClick={handleTaskToggle}>
          <input readOnly type="checkbox" checked={data.completed} />
          <span className={`${styles.checkbox} ${checkboxCheckedClassname}`}>
            {data.completed && <Check size={12} />}
          </span>

          <p className={`${styles.paragraph} ${paragraphCheckedClassname}`}>
            {data.title}
          </p>
        </label>
      </div>

      <button onClick={handleRemove}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}
