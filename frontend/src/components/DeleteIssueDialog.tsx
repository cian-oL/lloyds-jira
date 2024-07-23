import { useNavigate } from "react-router-dom";

import { deleteIssueByCode } from "../api/issueApiClient";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Issue } from "../types/kanbanTypes";

type Props = {
  issue: Issue;
};

const DeleteIssueDialog = ({ issue }: Props) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteIssueByCode(issue);
    navigate("/kanban");
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the issue
          from the server.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={handleDelete}
          className="rounded-lg text-white font-bold bg-red-500 hover:bg-red-300"
        >
          Delete Issue
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
export default DeleteIssueDialog;
