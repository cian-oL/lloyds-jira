import { useQuery } from "react-query";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { kanbanColumns } from "../config/kanbanConfig";
import KanbanColumnContainer from "./KanbanColumnContainer";
import { getAllIssues } from "../api/issueApiClient";

const KanbanBoard = () => {
  const { data: issues } = useQuery("getAllIssues", getAllIssues, {
    onError: async () => {
      toast.error("Error fetching issues");
    },
  });

  return (
    <div className="flex flex-col item px-1">
      <Link
        to="/issues/create-issue"
        className="p-2 gap-4 rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green w-[95%] md:w-[10%] md:ml-6"
      >
        <span className="ml-6">Add Issue</span>
      </Link>
      <div className="flex flex-col justify-between items-center px-1 gap-4 md:flex-row">
        {kanbanColumns.map((column) => (
          <KanbanColumnContainer
            key={column.columnId}
            column={column}
            issues={issues?.filter(
              (issue) => issue.columnId === column.columnId
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
