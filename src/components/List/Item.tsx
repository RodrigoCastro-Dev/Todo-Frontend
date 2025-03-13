import { Trash, Check } from '@phosphor-icons/react'
import styles from './css/Item.module.css'
import { ITask } from '../Home'
import { useEffect, useRef, useState } from 'react'
import { useDebounce } from '@uidotdev/usehooks'

interface Props {
  data: ITask
  removeTask: (id: number) => void
  toggleTaskStatus: ({ id, value }: { id: number; value: boolean }) => void
  updateTaskDescription: ({
    id,
    description,
  }: {
    id: number
    description: string
  }) => void
}

export function Item({
  data,
  removeTask,
  toggleTaskStatus,
  updateTaskDescription,
}: Props) {
  const [searchTerm, setSearchTerm] = useState(data.description)
  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (data.id !== undefined) {
      updateTaskDescription({ id: data.id, description: debouncedSearchTerm })
    }
  }, [debouncedSearchTerm])

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

  function handleTaskInput(description: string) {
    setSearchTerm(description)
  }

  const checkboxCheckedClassname = data.completed
    ? styles['checkbox-checked']
    : styles['checkbox-unchecked']
  const inputCheckedClassname = data.completed ? styles['input-checked'] : ''

  return (
    <div className={styles.container}>
      <div>
        <label htmlFor="checkbox">
          <span
            className={`${styles.checkbox} ${checkboxCheckedClassname}`}
            onClick={handleTaskToggle}
          >
            <input readOnly type="checkbox" checked={data.completed} />
            {data.completed && <Check size={12} />}
          </span>
          <input
            name="search"
            type="text"
            className={`${styles.input} ${inputCheckedClassname}`}
            value={searchTerm}
            onChange={(e) => {
              handleTaskInput(e.target.value)
            }}
          />
        </label>
      </div>

      <button onClick={handleRemove}>
        <Trash size={16} color="#808080" />
      </button>
    </div>
  )
}
