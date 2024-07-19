import { useState } from "react";

import { kanbanColumns } from "../config/kanbanColumnsConfig";
import KanbanColumnContainer from "./KanbanColumnContainer";
import { Task } from "../types/kanbanTypes";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const createTask = (columnId: string) => {
    const newTask: Task = {
      taskId: Math.floor(Math.random() * 10000).toString(),
      content: `Task ${tasks.length + 1}`,
      columnId,
    };

    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    const newTasks = tasks.filter((task) => task.taskId !== taskId);

    setTasks(newTasks);
  };

  return (
    <div className="flex justify-between items-center px-1 gap-4">
      {kanbanColumns.map((column) => (
        <KanbanColumnContainer
          key={column.columnId}
          column={column}
          createTask={createTask}
          tasks={tasks.filter((task) => task.columnId === column.columnId)}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
