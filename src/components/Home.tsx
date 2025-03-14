import { MagnifyingGlass, PlusCircle } from '@phosphor-icons/react'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import styles from './css/Home.module.css'

import { Button } from './Button'
import { Input } from './Input'
import { Empty } from './List/Empty'
import { Header as ListHeader } from './List/Header'
import { Item } from './List/Item'
import { Loading } from './List/Loading'

import { getTasks } from '../api/Tasks/get'
import { usePostTask } from '../api/Tasks/post'
import { useDeleteTask } from '../api/Tasks/delete'
import { useUpdateTask } from '../api/Tasks/update'

export interface ITask {
  id?: number
  description: string
  completed: boolean
}

const searchFormSchema = z.object({
  query: z.string(),
  completed: z.string(),
})
type SearchFormInputs = z.infer<typeof searchFormSchema>

export function Home() {
  const { mutate: postTask, isPending: isPosting } = usePostTask()
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask()
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask()

  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [fetchingApi, setFetchingApi] = useState(true)

  const { data, isFetching, status } = getTasks(searchQuery, filterStatus)
  const tasks = data?.data?.tasks || []

  // Automatically update loading state based on API calls
  useEffect(() => {
    setFetchingApi(isFetching || isPosting || isDeleting || isUpdating)
  }, [isFetching, isPosting, isDeleting, isUpdating])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery = searchQuery
        ? task.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true

      const matchesStatus =
        filterStatus === 'completed'
          ? task.completed
          : filterStatus === 'notCompleted'
            ? !task.completed
            : true

      return matchesQuery && matchesStatus
    })
  }, [tasks, searchQuery, filterStatus])

  const checkedTasksCounter = useMemo(
    () => filteredTasks.filter((task) => task.completed).length,
    [filteredTasks],
  )

  const { register, handleSubmit } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  function handleSearchTasks({ query, completed }: SearchFormInputs) {
    setSearchQuery(query)
    setFilterStatus(completed)
  }

  function handleAddTask() {
    if (!inputValue.trim()) {
      alert('Please enter a task before adding')
      return
    }

    postTask({ description: inputValue, completed: false })
    setInputValue('')
  }

  function handleRemoveTask(id: number) {
    if (window.confirm('Delete Task?')) {
      deleteTask(id)
    }
  }

  function handleUpdateTaskDescription({
    id,
    description,
  }: {
    id: number
    description: string
  }) {
    const taskToUpdate = tasks.find((task) => task.id === id)
    if (taskToUpdate) {
      updateTask({ ...taskToUpdate, description })
    }
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const taskToUpdate = tasks.find((task) => task.id === id)
    if (taskToUpdate) {
      updateTask({ ...taskToUpdate, completed: value })
    }
  }

  return (
    <section className={styles.content}>
      <div className={styles.container}>
        <Input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button onClick={handleAddTask} disabled={fetchingApi}>
          Create
          <PlusCircle size={16} color="#f2f2f2" weight="bold" />
        </Button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(handleSearchTasks)}>
        <input
          type="text"
          placeholder="Search tasks..."
          {...register('query')}
        />
        <select
          id="completed"
          {...register('completed')}
          className={styles.select}
        >
          <option value="">All tasks</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not completed</option>
        </select>
        <button className={styles.button} type="submit" disabled={fetchingApi}>
          Search
          <MagnifyingGlass size={20} />
        </button>
      </form>

      <div className={styles.list}>
        <ListHeader
          tasksCounter={filteredTasks.length}
          checkedTasksCounter={checkedTasksCounter}
        />
        {filteredTasks.length > 0 || status === 'pending' ? (
          <div>
            {filteredTasks.map((task) => (
              <Item
                key={task.id}
                data={task}
                removeTask={handleRemoveTask}
                toggleTaskStatus={handleToggleTask}
                updateTaskDescription={handleUpdateTaskDescription}
              />
            ))}
          </div>
        ) : (
          <Empty fetchingApi={fetchingApi} />
        )}
        <Loading status={status} fetchingApi={fetchingApi} />
      </div>
    </section>
  )
}
