import { createSignal, type Component, For, JSX } from "solid-js";

import createStoredSignal from "./helpers/storedSignal";

type Task = {
  name: string;
};

const [taskName, setTaskName] = createSignal("");
const [tasks, setTasks] = createStoredSignal<Task[]>("tasks", []);

const App: Component = () => {
  return (
    <>
      <p>
        <strong>We welcome human resource called Salaryman</strong>
      </p>
      <For each={tasks()} fallback={<p>No tasks.</p>}>
        {(task) => <p>{task.name}</p>}
      </For>
      <AddNewTask />
    </>
  );
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
