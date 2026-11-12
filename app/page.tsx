import { Suspense } from "react";
import { TaskItem } from "./task-item";
import { cacheTag, updateTag } from "next/cache";
import { getTasks } from "./taskActions";

const Tasks = async () => {
  "use cache";
  cacheTag("tasks");
  const tasks = await getTasks();
  return (
    <div>
      <ol className="">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ol>
      <p>Last Updated at {Date.now()}</p>
    </div>
  );
};

const refreshTasks = async () => {
  "use server";
  updateTag("tasks");
};

export default function Home() {
  return (
    <form className="border p-4 m-4">
      <h1 className="text-4xl text-blue">Todo List</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <Tasks />
        <button formAction={refreshTasks}>Refresh</button>
      </Suspense>
    </form>
  );
}
