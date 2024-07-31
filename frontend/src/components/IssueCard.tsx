import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Issue } from "../types/kanbanTypes";
import { AlertDialog, AlertDialogTrigger } from "../components/ui/alert-dialog";
import DeleteIssueDialog from "./DeleteIssueDialog";

type Props = {
  issue: Issue;
  handleDelete: (issue: Issue) => void;
};

const IssueCard = ({ issue, handleDelete }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: issue.issueCode,
    data: {
      type: "Issue",
      issue,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex flex-col items-start rounded-xl p-2.5 min-h-24 text-left bg-lloyds-green text-white text-xs hover:ring-2 cursor-grab hover:ring-inset hover:ring-amber-100 ${
        isDragging && "opacity-70 z-10"
      }`}
    >
      <Link to={`/issues/${issue.issueCode}`}>
        <p className="font-bold underline text-sm hover:text-indigo-400">
          {issue.issueCode}
        </p>
      </Link>
      <p>{issue.name}</p>
      <br />
      <p className="font-bold underline">Assignee:</p>
      <div className="flex items-center justify-between w-full gap-2">
        <p className="w-1/2">{issue.assignee}</p>
        {mouseIsOver && (
          <AlertDialog>
            <AlertDialogTrigger className="w-4 mr-2 bg-lloyds-green text-white text-xs hover:text-red-500 hover:bg-lloyds-green hover:cursor-pointer">
              <TrashIcon className="h-4" />
            </AlertDialogTrigger>
            <DeleteIssueDialog issue={issue} handleDelete={handleDelete} />
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
