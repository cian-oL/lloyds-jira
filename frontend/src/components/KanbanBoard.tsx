import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import { kanbanColumns } from "../config/kanbanConfig";
import KanbanColumnContainer from "./KanbanColumnContainer";
import { deleteIssue, getAllIssues, updateIssue } from "../api/issueApiClient";
import { Issue } from "../types/kanbanTypes";

const KanbanBoard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

  useEffect(() => {
    setIsLoading(true);
    getAllIssues()
      .then((issues) => {
        setIssues(issues);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching issues");
      });
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDelete = (issueToDelete: Issue) => {
    setIsLoading(true);
    deleteIssue(issueToDelete)
      .then(() => {
        setIssues(
          issues.filter((issue) => issue.issueCode !== issueToDelete.issueCode)
        );
        setIsLoading(false);
        toast.success("Issue deleted");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting issues");
        setIsLoading(false);
      });
  };

  const handleDragStart = (e: DragStartEvent) => {
    setActiveIssue(e.active.data.current?.issue);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over) {
      return;
    }

    const activeIssueId = active.id;
    const activeIssueColumnId = active.data.current?.issue.columnId;
    const overId = over.id;

    if (activeIssueId === overId || activeIssueColumnId === overId) {
      setActiveIssue(null);
      return;
    }

    setIssues((issues) => {
      const activeIssueIndex = issues.findIndex(
        (issue) => issue.issueCode === activeIssueId
      );

      if (over.data.current?.type === "Column") {
        issues[activeIssueIndex].columnId = overId.toString();
      }

      if (over.data.current?.type === "Issue") {
        issues[activeIssueIndex].columnId = over.data.current.issue.columnId;
      }

      updateIssue(issues[activeIssueIndex])
        .then(() => toast.success("Issue updated"))
        .catch((err) => {
          console.log(err);
          toast.error("Error updating issue");
        });

      return arrayMove(issues, activeIssueIndex, activeIssueIndex);
    });
  };

  return (
    <div className="flex flex-col item px-1">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Link
          to="/issues/create-issue"
          className="p-2 gap-4 rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green w-[95%] md:w-[10%] md:ml-6"
        >
          <span className="ml-6">Add Issue</span>
        </Link>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col justify-between items-center px-1 gap-4 md:flex-row">
            {kanbanColumns.map((column) => (
              <KanbanColumnContainer
                key={column.columnId}
                column={column}
                issues={issues?.filter(
                  (issue) => issue.columnId === column.columnId
                )}
                handleDelete={handleDelete}
                activeIssue={activeIssue}
              />
            ))}
          </div>
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
