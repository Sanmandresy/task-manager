import { create } from "zustand";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskStore = {
  tasks: Task[];
  searchTask: string;
  addTask: (task: Task) => void;
  updateTask: (taskId: number, updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  setSearchTask: (search: string) => void;
};

const useTaskManager = create<TaskStore>((set) => ({
  tasks: [],
  searchTask: "",
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    })),
  setSearchTask: (search) => set(() => ({ searchTask: search })),
}));

export { useTaskManager };
