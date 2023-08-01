"use client";
import useKeyboardShortcut from "@/hooks/useKeyboardShortcut";
import { Dispatch, SetStateAction, useState } from "react";

type Task = {
  name: string;
  focused: boolean;
};

const SalaryMan = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addNewTask = (name: string) => {
    setTasks((tasks) => tasks.concat([{ name, focused: false } as Task]));
  };

  return (
    <>
      <h1>Welcome Salaryman!</h1>
      <Tasks tasks={tasks} setTasks={setTasks} />
      <AddNewTask addNewTask={addNewTask} />
    </>
  );
};

const Tasks = ({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  const focusTaskAtIndex = (tasks: Task[], index: number) => {
    return tasks.map((task, i) => {
      if (i === index) {
        return { ...task, focused: true };
      }
      return { ...task, focused: false };
    });
  };

  const moveFocusDown = () => {
    setTasks((tasks) => {
      const focusedTaskIndex = tasks.findIndex((task) => task.focused);
      if (focusedTaskIndex < tasks.length - 1) {
        return focusTaskAtIndex(tasks, focusedTaskIndex + 1);
      }
      return focusTaskAtIndex(tasks, 0);
    });
  };

  const moveFocusUp = () => {
    setTasks((tasks) => {
      const focusedTaskIndex = tasks.findIndex((task) => task.focused);
      if (focusedTaskIndex === -1 || focusedTaskIndex === 0) {
        return focusTaskAtIndex(tasks, tasks.length - 1);
      }
      return focusTaskAtIndex(tasks, focusedTaskIndex - 1);
    });
  };

  useKeyboardShortcut("j", moveFocusDown);
  useKeyboardShortcut("k", moveFocusUp);
  return (
    <>
      {tasks.map((task) => {
        return (
          <p
            style={{ backgroundColor: task.focused ? "#bbb" : "" }}
            key={task.name}
          >
            {task.name}
          </p>
        );
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
