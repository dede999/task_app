import { TaskModel } from './../models/task';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'

export type TaskState = {
  tasks: Partial<TaskModel>[]
  addTask: (email: string) => void
  deleteTask: (deletedTask: TaskModel) => Promise<void>
  loadTasks: (email: string) => Promise<void>
}

export const taskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (email: string) => set(
        (state) => ({ tasks: [new TaskModel(email), ...state.tasks] })
      ),
      deleteTask: async (deletedTask: TaskModel) => {
        await deletedTask.deleteTask();
        set((state) => ({
          ...state,
          tasks: state.tasks.filter((task) => task.id !== deletedTask.id),
        }));
      },
      loadTasks: async (email: string) => {
        const tasks = await TaskModel.getTasks(email);
        const taskModels = tasks.map(task => ({
          ...task,
          url: task.url || undefined
        }));
        set({ tasks: taskModels });
      }
    }),
    { name: 'tasks', getStorage: () => sessionStorage }
  )
)