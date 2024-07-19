import { Column, Task } from "../types/kanbanTypes";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import TaskCard from "./TaskCard";

type Props = {
  column: Column;
  createTask: (columnId: string) => void;
  tasks: Task[];
  deleteTask: (taskId: string) => void;
};

const KanbanColumnContainer = ({
  column,
  createTask,
  tasks,
  deleteTask,
}: Props) => {
  return (
    <div className="flex flex-col min-h-screen w-[20%] p-5">
      <div className="bg-lloyds-dark-green text-white font-bold cursor-grab rounded-t-md border-b-2 border-amber-300 p-1 h-16">
        <h2>{column.title}</h2>
      </div>
      <div className="flex flex-col flex-1 gap-4 p-2 overflow-x-hidden overflow-y-auto bg-indigo-300">
        {tasks.map((task) => (
          <TaskCard key={task.taskId} task={task} deleteTask={deleteTask} />
        ))}
      </div>
      <div className="bg-lloyds-dark-green text-white rounded-b-md">
        <Button
          onClick={() => createTask(column.columnId)}
          className="flex items-center p-2 gap-2 bg-lloyds-dark-green text-white font-bold text-xs hover:text-amber-100 hover:bg-lloyds-dark-green"
        >
          <PlusCircleIcon />
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default KanbanColumnContainer;
