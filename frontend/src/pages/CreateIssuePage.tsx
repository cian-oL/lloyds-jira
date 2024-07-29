import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import IssueManagementForm from "../forms/IssueManagementForm";
import { IssueFormData } from "../types/kanbanTypes";
import { createIssue } from "../api/issueApiClient";

const CreateIssuePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (formData: IssueFormData) => {
    setIsLoading(true);
    createIssue(formData)
      .then(() => {
        toast.success("Issue successfully created");
        navigate("/kanban");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Issue creation failure");
      });
  };

  return (
    <>
      <h1 className="text-3xl font-bold">Create Issue</h1>
      <IssueManagementForm onSave={handleSave} isLoading={isLoading} />
    </>
  );
};

export default CreateIssuePage;
