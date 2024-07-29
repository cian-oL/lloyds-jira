import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Issue, IssueFormData } from "../types/kanbanTypes";
import { getAllUsers } from "../api/myUserApiClient";
import { issueCategories, kanbanColumns } from "../config/kanbanConfig";
import { Button } from "../components/ui/button";
import { AlertDialog, AlertDialogTrigger } from "../components/ui/alert-dialog";
import DeleteIssueDialog from "../components/DeleteIssueDialog";
import { deleteIssue } from "../api/issueApiClient";

type Props = {
  currentIssue?: Issue;
  onSave: (formData: IssueFormData) => void;
  isLoading: boolean;
};

const IssueManagementForm = ({
  currentIssue,
  onSave,
  isLoading: isUpdateLoading,
}: Props) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const navigate = useNavigate();

  const { data: users } = useQuery("getAllUsers", getAllUsers, {
    onError: async () => {
      toast.error("Error fetching users");
    },
  });

  const handleDelete = (issueToDelete: Issue) => {
    setIsDeleteLoading(true);
    deleteIssue(issueToDelete)
      .then(() => {
        setIsDeleteLoading(false);
        navigate("/kanban");
        toast.success("Issue deleted");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting issues");
        setIsDeleteLoading(false);
      });
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>();

  useEffect(() => {
    reset(currentIssue);
  }, [currentIssue, reset]);

  const onSubmit = handleSubmit((formData: IssueFormData) => onSave(formData));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <label className="mx-2 pt-5 text-slate-700 text-sm font-bold">
        Category:
        <select
          className="ml-2 border rounded w-[30%] py-1 px-2 text-gray-700 text-sm font-normal"
          {...register("issueCategory", { required: "Required" })}
        >
          <option value="">Select...</option>
          {issueCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.issueCategory && (
          <span className="text-red-500">{errors.issueCategory.message}</span>
        )}
      </label>
      <div className="flex flex-col mx-2 gap-5 md:flex-row">
        <label className="text-slate-700 text-sm font-bold">
          Code:
          <input
            type="text"
            disabled={currentIssue ? true : false}
            placeholder="LJ-XXXXXX"
            className="ml-2 border rounded py-1 px-2 text-gray-700 text-sm font-normal"
            {...register("issueCode", {
              validate: (value) => {
                const issueCategoryRegex = /LJ-\d{6}/;

                if (!value) {
                  return "Required";
                } else if (!issueCategoryRegex.test(value)) {
                  return 'Write in format "LJ-XXXXXX" with 6 numbers';
                }
              },
            })}
          />
          {errors.issueCode && (
            <span className="text-red-500">{errors.issueCode.message}</span>
          )}
        </label>
        <label className="text-slate-700 text-sm font-bold">
          Name:
          <input
            type="text"
            className="ml-2 border rounded py-1 px-2 text-gray-700 text-sm font-normal"
            {...register("name", { required: "Required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
      </div>
      <label className="mx-2 text-slate-700 text-sm font-bold">
        Description:
        <textarea
          rows={5}
          className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
          {...register("description", { required: "Required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <div className="flex flex-col w-1/2 mx-2 gap-5 md:flex-row">
        <label className="text-slate-700 text-sm font-bold">
          Story Points:
          <input
            className="ml-2 border rounded py-1 px-2 text-gray-700 text-sm font-normal"
            type="number"
            min={1}
            max={8}
            placeholder="1 - 8"
            {...register("storyPoints")}
          />
          {errors.storyPoints && (
            <span className="text-red-500">{errors.storyPoints.message}</span>
          )}
        </label>
        <label className="ml-50 text-slate-700 text-sm font-bold">
          Assignee:
          <select
            className="ml-2 border rounded py-1 px-2 text-gray-700 text-sm font-normal"
            {...register("assignee")}
          >
            <option value="">Assign...</option>
            {users?.map((user) => (
              <option
                key={user.racfid}
                value={`${user.firstName} ${user.lastName}`}
              >
                {`${user.firstName} ${user.lastName}`}
              </option>
            ))}
          </select>
          {errors.assignee && (
            <span className="text-red-500">{errors.assignee.message}</span>
          )}
        </label>
      </div>

      <div className="flex flex-col mx-2 md:flex-row gap-5"></div>

      <label className="text-slate-700 text-sm font-bold">
        Status:
        <select
          className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
          {...register("columnId")}
        >
          <option value="">Select...</option>
          {kanbanColumns.map((column) => (
            <option key={column.columnId} value={column.columnId}>
              {column.title}
            </option>
          ))}
        </select>
        {errors.assignee && (
          <span className="text-red-500">{errors.assignee.message}</span>
        )}
      </label>
      <div className="flex flex-col mx-2 md:flex-row gap-5">
        <Button
          type="submit"
          disabled={isUpdateLoading}
          className="rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green w-full sm:w-fit"
        >
          {isUpdateLoading ? "Saving..." : "Submit"}
        </Button>
        {currentIssue && (
          <AlertDialog>
            <AlertDialogTrigger
              disabled={isDeleteLoading}
              className="rounded-lg px-4 py-1 text-white font-bold bg-red-500 hover:bg-red-300"
            >
              {isDeleteLoading ? "Deleting" : "Delete Issue"}
            </AlertDialogTrigger>
            <DeleteIssueDialog
              issue={currentIssue}
              handleDelete={handleDelete}
            />
          </AlertDialog>
        )}
      </div>
    </form>
  );
};

export default IssueManagementForm;
