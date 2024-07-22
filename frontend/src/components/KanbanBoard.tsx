import { useQuery } from "react-query";
import { toast } from "sonner";

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
    <div className="flex justify-between items-center px-1 gap-4">
      {kanbanColumns.map((column) => (
        <KanbanColumnContainer
          key={column.columnId}
          column={column}
          issues={issues?.filter((issue) => issue.columnId === column.columnId)}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
