import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

import IssueManagementForm from "../forms/IssueManagementForm";
import { IssueFormData } from "../types/kanbanTypes";
import { getIssueByCode, updateIssueByFormData } from "../api/issueApiClient";

const IssueManagementPage = () => {
  const navigate = useNavigate();
  const { issueCode } = useParams();

  const { data: currentIssue, isLoading: isGetLoading } = useQuery(
    "getIssueByCode",
    () => getIssueByCode(issueCode || ""),
    {
      enabled: !!issueCode,
      onError: async () => toast.error("Error fetching issue"),
    }
  );

  const { mutateAsync, isLoading: isUpdateLoading } = useMutation(
    updateIssueByFormData,
    {
      onSuccess: async () => {
        toast.success("Issue successfully updated");
        navigate("/kanban");
      },
      onError: async () => {
        toast.error("Error updating issue");
      },
    }
  );

  const handleSave = (formData: IssueFormData) => {
    mutateAsync(formData);
  };

  return (
    <>
      <h1 className="mx-2 text-2xl font-bold underline">Manage Issue</h1>
      <p className="mx-2 text-sm italic">View and Edit an Issue's Details</p>
      {isGetLoading ? (
        <div>Loading issue...</div>
      ) : (
        <IssueManagementForm
          currentIssue={currentIssue}
          onSave={handleSave}
          isLoading={isUpdateLoading}
        />
      )}
    </>
  );
};

export default IssueManagementPage;
