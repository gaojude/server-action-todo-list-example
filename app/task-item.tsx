"use client";

import { startTransition, useOptimistic } from "react";
import { TaskType, toggleTask } from "./taskActions";

export const TaskItem = ({ task }: { task: TaskType }) => {

  const [optimisticDone, setOptimisticDone] = useOptimistic(task.done);

  return (
    <li key={task.id}>
      <input type="checkbox" checked={optimisticDone} onChange={() => {
        startTransition(async () => {
          setOptimisticDone(!optimisticDone)
          await toggleTask(task.id)
        })
      }}></input>
      {task.title}
      {task.done !== optimisticDone ? <span> (pending...)</span> : null}
    </li>
  );
};
