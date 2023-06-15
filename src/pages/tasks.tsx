import { useTaskManager } from "@/store/useTaskManager";
import React, { ChangeEvent, useRef } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TaskManager = () => {
  const createTaskRef = useRef<HTMLInputElement>(null);
  const { tasks, searchTask, addTask, updateTask, deleteTask, setSearchTask } =
    useTaskManager();
  const { value, setValue } = useLocalStorage("tasks");

  const handleAddTask = () => {
    const title = createTaskRef?.current?.value || ""; // Replace with the value in the createTaskRef
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    addTask(newTask);
    setValue(tasks);
  };

  const handleUpdateTask = (taskId: number, updatedTask: Task) => {
    updateTask(taskId, updatedTask);
  };

  const handleDeleteTask = (taskId: number) => {
    deleteTask(taskId);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  // See! I already give you everything!
  const filteredTasks = tasks.filter((task: Task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  );

  return (
    <div>
      <h1>Task Manager</h1>

      <input type="text" ref={createTaskRef} />

      <button onClick={handleAddTask}>Add Task</button>

      <input type="text" onChange={handleSearch} placeholder="Search Task" />

      <ul>
        {filteredTasks.map((task: Task) => (
          <li key={task.id}>
            <input
              type="text"
              value={task.title}
              onChange={(e) => {
                const updatedTask = {
                  ...task,
                  title: e.target.value,
                };
                handleUpdateTask(task.id, updatedTask);
              }}
            />
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
