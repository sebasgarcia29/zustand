import { DragEvent, useState } from "react";
import Swal from "sweetalert2";
import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
    status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {


    const [onDragOver, setOnDragOver] = useState(false)

    const isDragging = useTaskStore((state) => !!state.draggingTaskId);
    const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
    const addTask = useTaskStore((state) => state.addTask);

    const handleAddTask = async () => {

        const { isConfirmed } = await Swal.fire({
            title: 'Add Task',
            input: 'text',
            inputLabel: 'Task Name',
            showCancelButton: true,
            confirmButtonText: 'Add',
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Swal.isLoading(),
            inputValidator: (value) => {
                if (!value) return 'Task Name is required!'
            },
            preConfirm: (taskName) => {
                return addTask(taskName, status);
            },
        })
        if (isConfirmed) {
            Swal.fire({
                title: 'Task Added',
                icon: 'success',
                timer: 1000,
                showConfirmButton: false,
            })
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(true);
    }
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
    }
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setOnDragOver(false);
        onTaskDrop(status)
    }

    return {
        isDragging,
        onDragOver,
        handleAddTask,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    }
}
