// tasks: {
//     'ID': { id: 'id', title: 'title', status: 'status'}
// }

import { type StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { create } from "zustand";
import { v4 as uuidV4 } from "uuid";
import { devtools, persist } from "zustand/middleware";
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";

interface TaskState {
    // tasks: {[key: string]: Task}
    draggingTaskId?: string
    tasks: Record<string, Task>
    getTaskByStatus: (status: TaskStatus) => Task[]
    setDraggingTaskId: (taskId: string) => void
    removeDraggingTaskId: () => void
    changeTaskStatus: (taskId: string, status: TaskStatus) => void
    onTaskDrop: (status: TaskStatus) => void
    addTask: (title: string, status: TaskStatus) => void
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/immer", never]], []> = (set, get) => ({
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

    setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }, false, 'setDraggingTaskId'),
    removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId'),
    //? without immer
    // changeTaskStatus: (taskId: string, status: TaskStatus) => {
    //     const tasks = get().tasks;
    //     const task = tasks[taskId];
    //     task.status = status;
    //     set({ tasks: { ...tasks } });
    // },
    //? with immer
    changeTaskStatus: (taskId: string, status: TaskStatus) => {
        set(state => {
            state.tasks[taskId].status = status;
        }, false, 'changeTaskStatus')

    },
    onTaskDrop: (status: TaskStatus) => {
        const taskId = get().draggingTaskId;
        if (!taskId) return
        get().changeTaskStatus(taskId, status);
        get().removeDraggingTaskId();
    },
    //? This not require nothing but the state its mutated
    // addTask: (title: string, status: TaskStatus) => {
    //     set((state) => {
    //         const taskId = `ABC-${uuidV4()}`;
    //         const task: Task = { id: taskId, title, status };
    //         return { tasks: { ...state.tasks, [taskId]: task } }
    //     });
    // },
    //? This require immer
    // addTask: (title: string, status: TaskStatus) => {
    //     const newTask: Task = { id: `ABC-${uuidV4()}`, title, status };
    //     set(produce((state: TaskState) => {
    //         state.tasks[newTask.id] = task
    //     }))
    // }
    //? With the middleware immer
    addTask: (title: string, status: TaskStatus) => {
        const newTask: Task = { id: `ABC-${uuidV4()}`, title, status };
        set(state => {
            state.tasks[newTask.id] = newTask
        }, false, 'addTask')
    }
});


export const useTaskStore = create<TaskState>()(
    // devtools(
    persist(
        immer(storeApi), { name: 'task-store' }
    )
    // )
);
