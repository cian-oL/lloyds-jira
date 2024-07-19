import { useState } from "react";
import { TrashIcon } from "lucide-react";

import { Task } from "../types/kanbanTypes";
import { Button } from "./ui/button";

type Props = {
  task: Task;
  deleteTask: (taskId: string) => void;
};

const TaskCard = ({ task, deleteTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="relative flex items-center rounded-xl p-2.5 h-24 min-h-24 text-left bg-lloyds-green text-white text-sm font-bold hover:ring-2 cursor-grab hover:ring-inset hover:ring-amber-100"
    >
      {task.content}
      {mouseIsOver && (
        <Button
          onClick={() => deleteTask(task.taskId)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-lloyds-green text-white  hover:text-amber-100 hover:bg-lloyds-green hover:cursor-pointer"
        >
          <TrashIcon />
        </Button>
      )}
    </div>
  );
};

export default TaskCard;
