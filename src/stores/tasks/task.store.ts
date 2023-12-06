// tasks: {
//     'ID': { id: 'id', title: 'title', status: 'status'}
// }

import { type StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface TaskState {
    // tasks: {[key: string]: Task}
    draggingTaskId?: string
    tasks: Record<string, Task>
    getTaskByStatus: (status: TaskStatus) => Task[]
    setDraggingTaskId: (taskId: string) => void
    removeDraggingTaskId: () => void
    changeTaskStatus: (taskId: string, status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
    draggingTaskId: undefined,
    tasks: {
        'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'OPEN' },
        'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'IN_PROGRESS' },
        'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'OPEN' },
        'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'OPEN' },
    },
    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter(task => task.status === status);
    },

    setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),
    removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        const tasks = get().tasks;
        const task = tasks[taskId];
        task.status = status;
        set({ tasks: { ...tasks } });
    }
});


export const useTaskStore = create<TaskState>()(
    devtools(storeApi)
);
