import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";

import { Issue, IssueFormData } from "../types/kanbanTypes";
import { getAllUsers } from "../api/myUserApiClient";
import { issueCategories, kanbanColumns } from "../config/kanbanConfig";
import { Button } from "../components/ui/button";

type Props = {
  currentIssue?: Issue;
  onSave: (formData: IssueFormData) => void;
  isLoading: boolean;
};

const IssueManagementForm = ({ currentIssue, onSave, isLoading }: Props) => {
  const { data: users } = useQuery("getAllUsers", getAllUsers, {
    onError: async () => {
      toast.error("Error fetching users");
    },
  });

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
      <div className="flex flex-col mx-2 md:flex-row gap-5">
        <label className="text-slate-700 text-sm font-bold">
          Category:
          <select
            className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
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
        <label className="text-slate-700 text-sm font-bold">
          Code:
          <input
            type="text"
            disabled={currentIssue ? true : false}
            placeholder="LJ-XXXXXX"
            className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
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
            className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
            {...register("name", { required: "Required" })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </label>
        <label className="text-slate-700 text-sm font-bold">
          Description:
          <input
            type="text"
            className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
            {...register("description", { required: "Required" })}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </label>
        <label className="text-slate-700 text-sm font-bold">
          Story Points:
          <input
            className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
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
      </div>
      <label className="text-slate-700 text-sm font-bold">
        Assignee:
        <select
          className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
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
      <label className="text-slate-700 text-sm font-bold">
        Status:
        <select
          className="border rounded w-full py-1 px-2 text-gray-700 text-sm font-normal"
          {...register("columnId")}
        >
          <option value="">Select...</option>
          {kanbanColumns.map((column) => (
            <option key={column.columnId} value={column.title}>
              {column.title}
            </option>
          ))}
        </select>
        {errors.assignee && (
          <span className="text-red-500">{errors.assignee.message}</span>
        )}
      </label>
      <span className="mx-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green w-full sm:w-fit"
        >
          {isLoading ? "Saving..." : "Submit"}
        </Button>
      </span>
    </form>
  );
};

export default IssueManagementForm;
