"use client";
import { Dispatch, SetStateAction, useState } from "react";

type Task = {
  name: string;
};

const SalaryMan = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addNewTask = (name: string) => {
    setTasks((tasks) => tasks.concat([{ name } as Task]));
  };

  return (
    <>
      <h1>Welcome Salaryman!</h1>
      <Tasks tasks={tasks} />
      <AddNewTask addNewTask={addNewTask} />
    </>
  );
};

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  return (
    <>
      {tasks.map((task) => {
        return <p key={task.name}>{task.name}</p>;
      })}
    </>
  );
};

const AddNewTask = ({ addNewTask }: { addNewTask: (name: string) => void }) => {
  const [newTask, setNewTask] = useState("");

  const submitOnClick = () => {
    addNewTask(newTask);
    setNewTask("");
  };
  return (
    <>
      <p>{newTask}</p>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.currentTarget.value)}
      />
      <button onClick={submitOnClick}>Add</button>
    </>
  );
};

export default SalaryMan;
