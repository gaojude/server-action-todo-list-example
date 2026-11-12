'use server'

import { updateTag } from "next/cache";

// mutable tasks
const tasks = [
  {
    id: 1,
    title: "do homework",
    done: false,
  },
  {
    id: 2,
    title: "play video games",
    done: true,
  },
];

export const toggleTask = async (id: number) => {
  const target = tasks.find(task => task.id === id)

  if (!target) {
    // error
    return
  }

  target.done = !target.done
  updateTag('tasks')
}

export const getTasks = async () => {
  await new Promise(res => setTimeout(res, 2000))

  const freshTasks = tasks.map(task => (
    {
      ...task
    }
  ))

  return freshTasks;
}

export type TaskType = (typeof tasks)[0];
