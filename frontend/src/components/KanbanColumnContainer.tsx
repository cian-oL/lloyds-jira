import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { createPortal } from "react-dom";

import { Column, Issue } from "../types/kanbanTypes";
import IssueCard from "./IssueCard";

type Props = {
  column: Column;
  issues?: Issue[];
  handleDelete: (issue: Issue) => void;
  activeIssue: Issue | null;
};

const KanbanColumnContainer = ({
  column,
  issues,
  handleDelete,
  activeIssue,
}: Props) => {
  const columnIssueIds: string[] = useMemo(() => {
    if (!issues) {
      return [""];
    }

    return issues.map((issue) => issue.issueCode);
  }, [issues]);

  const { isOver, setNodeRef: DroppableNodeRef } = useDroppable({
    id: column.columnId,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div className="flex flex-col min-h-screen w-full p-5 md:w-[20%]">
      <div className="bg-lloyds-dark-green text-white font-bold cursor-grab rounded-t-md border-b-2 border-amber-300 p-1 h-16">
        <h2>{column.title}</h2>
      </div>
      <SortableContext items={columnIssueIds}>
        <div
          ref={DroppableNodeRef}
          className={`flex flex-col flex-1 gap-4 p-2 overflow-x-hidden overflow-y-auto bg-indigo-300 ${
            isOver && "border-4 border-amber-600"
          }`}
        >
          {issues?.map((issue) => (
            <IssueCard
              key={issue.issueCode}
              issue={issue}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </SortableContext>
      <div className="bg-lloyds-dark-green text-white rounded-b-md">
        <p className="p-2 gap-2 bg-lloyds-dark-green text-white font-bold text-xs">
          {column.title}
        </p>
      </div>
      {createPortal(
        <DragOverlay>
          {activeIssue && (
            <IssueCard issue={activeIssue} handleDelete={handleDelete} />
          )}
        </DragOverlay>,
        document.body
      )}
    </div>
  );
};

export default KanbanColumnContainer;
