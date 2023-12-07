import { DragEvent, useState } from 'react';
import {
  IoAddOutline,
  IoCheckmarkCircleOutline,
} from 'react-icons/io5';
import { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './SingleTask';
import { useTaskStore } from '../../stores';
import classNames from 'classnames'
import Swal from 'sweetalert2'

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}


export const JiraTasks = ({ title, tasks, status }: Props) => {

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

  return (
    <div
      className={
        classNames('!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]', {
          'border-blue-500 border-dotted': isDragging,
          'border-green-500 border-dotted': isDragging && onDragOver
        })
      }
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Task Header */}
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>

      </div>

      {/* Task Items */}
      <div className="h-full w-full">

        {tasks.map((task) => (
          <SingleTask task={task} key={task.id} />
        ))}


      </div>
    </div>
  );
};