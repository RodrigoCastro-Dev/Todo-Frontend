import { MagnifyingGlass, PlusCircle } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import styles from './css/Home.module.css';

import { Button } from './Button';
import { Input } from './Input';
import { Empty } from './List/Empty';
import { Header as ListHeader } from './List/Header';
import { Item } from './List/Item';
import { getTasks } from '../api/Tasks/get';
import { usePostTask } from '../api/Tasks/post';
import { useDeleteTask } from '../api/Tasks/delete';
import { useUpdateTask } from '../api/Tasks/update';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export interface ITask {
  id?: number;
  description: string;
  completed: boolean;
}

export interface TasksResponse {
  data: {
    tasks: ITask[];
  };
}
const searchFormSchema = z.object({
  query: z.string(),
  completed: z.string(),
})
type SearchFormInputs = z.infer<typeof searchFormSchema>

export function Home() {
  const { mutate: postTask } = usePostTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const { data } = getTasks(searchQuery, filterStatus);
  const Tasks = data?.data?.tasks || [];

  const [tasks, setTasks] = useState(Tasks);

  useEffect(() => {
    if (data?.data?.tasks) {
      filterTasks(searchQuery, filterStatus);
    }
  }, [data]);

  const checkedTasksCounter = tasks?.reduce((prevValue, currentTask) => {
    return currentTask.completed ? prevValue + 1 : prevValue;
  }, 0);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });


  async function handleSearchTasks(data: SearchFormInputs) {
    setFilterStatus(data.completed);
    setSearchQuery(data.query);
    filterTasks(data.query, filterStatus);
  }

  function filterTasks(query: string, status: string) {
    let filteredTasks = Tasks;

    if (query) {
      filteredTasks = filteredTasks.filter((task) =>
        task.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (status === 'completed') {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (status === 'notCompleted') {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    setTasks(filteredTasks);
  }

  function handleAddTask() {
    if (!inputValue) {
      alert('Add a task before creating');
      return;
    }

    const newTask: ITask = { id: undefined, description: inputValue, completed: false };
    postTask(newTask);
    setInputValue('');
  }

  function handleRemoveTask(id: number) {
    if (confirm('Delete Task?')) {
      deleteTask(id);
    }
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: value } : task
    );

    const taskToUpdate = tasks.find((task) => task.id === id);
    setTasks(updatedTasks);
    if (taskToUpdate) {
      updateTask({ ...taskToUpdate, completed: value });
    }
  }

  function handleTaskDescription({ id, description }: { id: number; description: string }) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, description } : task
      )
    );

    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      updateTask({ ...taskToUpdate, description });
    }
  }

  return (
    <section className={styles.content}>
      <div className={styles.taskInfoContainer}>
        <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
        <Button onClick={handleAddTask}>
          Create
          <PlusCircle size={16} color="#f2f2f2" weight="bold" />
        </Button>
      </div>

      <form className={styles.searchForm} onSubmit={handleSubmit(handleSearchTasks)}>
        <input
          type="text"
          placeholder="Search tasks..."
          {...register('query')}
        />

        <select id='completed'
          {...register("completed")}
          className={styles.select}
        >
          <option value="">All tasks</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not completed</option>
        </select>

        <button className={styles.searchButton} type="submit" disabled={isSubmitting}>
          Search
          <MagnifyingGlass size={20} />
        </button>
      </form>

      <div className={styles.tasksList}>
        <ListHeader tasksCounter={tasks.length} checkedTasksCounter={checkedTasksCounter} />

        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <Item key={task.id} data={task} removeTask={handleRemoveTask} toggleTaskStatus={handleToggleTask} updateTaskDescription={handleTaskDescription} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </section>
  );
}
