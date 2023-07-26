import {
  createSignal,
  type Component,
  createResource,
  For,
  JSX,
  Signal,
} from "solid-js";
import { createStore, Store } from "solid-js/store";

type Task = {
  name: string;
};

// type TObject = T extends object
// https://stackoverflow.com/questions/70030144/how-to-update-local-storage-values-in-solidjs-using-hooks
function createStoredSignal<T>(
  key: string,
  defaultValue: T[],
  storage = localStorage,
): Store<T> {
  const initialValue = storage.getItem(key)
    ? (JSON.parse(storage.getItem(key) || "") as T[])
    : defaultValue;

  const [value, setValue] = createStore(initialValue);

  const setValueAndStore = ((arg: T[]) => {
    const v = setValue(arg);
    storage.setItem(key, JSON.stringify(v));
    return v;
  }) as typeof setValue;

  return [value, setValueAndStore];
}

const [taskName, setTaskName] = createSignal("");
// const [tasks, setTasks] = createStore<Task[]>([]);
const [tasks, setTasks] = createStoredSignal<Task>("tasks", []);

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
