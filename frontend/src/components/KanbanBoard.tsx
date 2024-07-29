import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { kanbanColumns } from "../config/kanbanConfig";
import KanbanColumnContainer from "./KanbanColumnContainer";
import { deleteIssue, getAllIssues } from "../api/issueApiClient";
import { Issue } from "../types/kanbanTypes";

const KanbanBoard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex flex-col item px-1">
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
