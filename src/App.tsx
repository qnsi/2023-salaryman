import { createSignal, type Component, For, JSX } from "solid-js";

import createStoredSignal from "./helpers/storedSignal";

type Task = {
  name: string;
};

const [taskName, setTaskName] = createSignal("");
const [tasks, setTasks] = createStoredSignal<Task[]>("tasks", []);

const App: Component = () => {
  return (
    <div style="margin: 20px">
      <p>
        <strong>We welcome human resource called Salaryman</strong>
      </p>
      <Tasks />
      <AddNewTask />
    </div>
  );
};

const Tasks = () => {
  return (
    <For each={tasks()} fallback={<p>No tasks.</p>}>
      {(task) => <TaskComponent task={task} />}
    </For>
  );
};

const TaskComponent = (props: { task: Task }) => {
  return <p>{props.task.name}</p>;
};

const AddNewTask = () => {
  const onInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = (
    event,
  ) => {
    setTaskName(event.currentTarget.value);
  };

  const addTask = () => {
    setTasks((tasks) => [...tasks, { name: taskName() }]);
  };

  return (
    <>
      <input type="text" value={taskName()} onInput={onInput} />
      <button type="submit" onClick={addTask}>
        Add task
      </button>
    </>
  );
};

export default App;
