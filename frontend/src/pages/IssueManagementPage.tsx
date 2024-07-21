import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

import IssueManagementForm from "../forms/IssueManagementForm";
import { IssueFormData } from "../types/kanbanTypes";
import { getIssueByCode, updateIssueByCode } from "../api/issueApiClient";
import { useParams } from "react-router-dom";

const IssueManagementPage = () => {
  const { issueCode } = useParams();

  const { data: currentIssue, isLoading: isGetLoading } = useQuery(
    "getIssueByCode",
    () => getIssueByCode(issueCode || ""),
    {
      enabled: !!issueCode,
      onError: async () => toast.error("Error fetching issue"),
    }
  );

  const { mutate, isLoading: isUpdateLoading } = useMutation(
    updateIssueByCode,
    {
      onSuccess: async () => {
        toast.success("issue successfully updated");
      },
      onError: async () => {
        toast.error("Error updating issue");
      },
    }
  );

  const handleSave = (formData: IssueFormData) => {
    mutate(formData);
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
