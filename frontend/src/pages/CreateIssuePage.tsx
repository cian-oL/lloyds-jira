import { useMutation } from "react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import IssueManagementForm from "../forms/IssueManagementForm";
import { IssueFormData } from "../types/kanbanTypes";
import { createIssue } from "../api/issueApiClient";

const CreateIssuePage = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(createIssue, {
    onSuccess: async () => {
      toast.success("Issue successfully created");
    },
    onError: async () => {
      toast.error("Issue creation failure");
    },
  });

  const handleSave = (formData: IssueFormData) => {
    mutate(formData);
    navigate("/kanban");
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Create Issue</h1>
      <IssueManagementForm onSave={handleSave} isLoading={isLoading} />
    </>
  );
};

export default CreateIssuePage;
