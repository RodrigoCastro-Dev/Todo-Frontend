import { PlusCircle } from '@phosphor-icons/react';
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

export interface ITask {
  id?: number;
  title: string;
  completed: boolean;
  description: string;
}

export interface TasksResponse {
  data: {
    tasks: ITask[];
  };
}

export function Home() {
  const { data } = getTasks();
  const Tasks = data?.data?.tasks || [];

  useEffect(() => {
    setTasks(Tasks);
  }, [Tasks]);

  const [tasks, setTasks] = useState(Tasks);
  const [inputValue, setInputValue] = useState('');
  const checkedTasksCounter = tasks?.reduce((prevValue, currentTask) => {
    if (currentTask.completed) {
      return prevValue + 1;
    }

    return prevValue;
  }, 0);

  const { mutate: postTask } = usePostTask();
  const { mutate: deleteTask } = useDeleteTask();

  function handleAddTask() {
    if (!inputValue) {
      alert('Add a task before creating');
      return;
    }

    const newTask: ITask = {
      id: undefined,
      title: inputValue,
      description: inputValue,
      completed: false,
    };

    postTask(newTask);
    setInputValue('');
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    if (confirm('Delete Task?')) {
      deleteTask(id);
    }

    setTasks(filteredTasks);
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: value };
      }

      return { ...task };
    });

    setTasks(updatedTasks);
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

      <div className={styles.tasksList}>
        <ListHeader tasksCounter={tasks.length} checkedTasksCounter={checkedTasksCounter} />

        {tasks.length > 0 ? (
          <div>
            {tasks.map((task) => (
              <Item key={task.id} data={task} removeTask={handleRemoveTask} toggleTaskStatus={handleToggleTask} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </section>
  );
}
