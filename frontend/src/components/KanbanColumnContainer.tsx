import { SortableContext } from "@dnd-kit/sortable";

import { Column, Issue } from "../types/kanbanTypes";
import { PlusCircleIcon } from "lucide-react";
import IssueCard from "./IssueCard";
import { useMemo } from "react";
import { Link } from "react-router-dom";

type Props = {
  column: Column;
  issues?: Issue[];
};

const KanbanColumnContainer = ({ column, issues }: Props) => {
  const issuesIds: string[] = useMemo(() => {
    if (!issues) {
      return [""];
    }

    return issues?.map((issue) => issue.issueCode);
  }, [issues]);

  return (
    <div className="flex flex-col min-h-screen w-[20%] p-5">
      <div className="bg-lloyds-dark-green text-white font-bold cursor-grab rounded-t-md border-b-2 border-amber-300 p-1 h-16">
        <h2>{column.title}</h2>
      </div>
      <div className="flex flex-col flex-1 gap-4 p-2 overflow-x-hidden overflow-y-auto bg-indigo-300">
        <SortableContext items={issuesIds}>
          {issues?.map((issue) => (
            <IssueCard key={issue.issueCode} issue={issue} />
          ))}
        </SortableContext>
      </div>
      <div className="bg-lloyds-dark-green text-white rounded-b-md">
        <Link
          to="/issues/create-issue"
          className="flex items-center p-2 gap-2 bg-lloyds-dark-green text-white font-bold text-xs hover:text-amber-100 hover:bg-lloyds-dark-green"
        >
          <PlusCircleIcon />
          Add Task
        </Link>
      </div>
    </div>
  );
};

export default KanbanColumnContainer;
