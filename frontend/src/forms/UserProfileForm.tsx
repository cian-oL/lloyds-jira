import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

import { UserFormData } from "../types/userTypes";
import { getUser, updateUser } from "../api/myUserApiClient";
import { Button } from "../components/ui/button";
import { useEffect } from "react";

const UserProfileForm = () => {
  const { data: currentUserData } = useQuery("getUser", getUser, {
    onError: (error: Error) => {
      toast.error("Failed to fetch Profile");
      console.log("Failed Profile Fetch", error);
    },
  });

  const { mutate, isLoading } = useMutation(updateUser, {
    onSuccess: async () => {
      toast.success("Profile Updated");
    },
    onError: (error: Error) => {
      toast.error("Failed to update Profile");
      console.log("Failed Profile Update", error);
    },
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  useEffect(() => {
    reset({
      racfid: currentUserData?.racfid,
      firstName: currentUserData?.firstName,
      lastName: currentUserData?.lastName,
    });
  }, [currentUserData, reset]);

  const onSubmit = handleSubmit((formData: UserFormData) => mutate(formData));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h1 className="mx-2 text-2xl font-bold underline">Profile</h1>
      <p className="mx-2 text-sm italic">
        View and Edit your Profile Information
      </p>
      <div className="flex flex-col mx-2 md:flex-row gap-5">
        <label className="text-slate-700 text-sm font-bold">
          RACFID:
          <input
            type="text"
            disabled
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("racfid")}
          />
          {errors.racfid && (
            <span className="text-red-500">{errors.racfid.message}</span>
          )}
        </label>
        <label className="text-slate-700 text-sm font-bold">
          First Name:
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("firstName", { required: "Required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-slate-700 text-sm font-bold">
          Last Name:
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("lastName", { required: "Required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <div className="flex flex-col mx-2 md:flex-row gap-5">
        <label className="text-slate-700 text-sm font-bold">
          Enter/Change Password:
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("password", {
              validate: (value) => {
                const strongPasswordRegex =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&*?])(?=.{8,})/;

                if (!value) {
                  return "Required";
                } else if (!strongPasswordRegex.test(value)) {
                  return "Passwords must meet strong password criteria";
                }
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <ul className="text-sm text-gray-400 pt-1 md:flex md:flex-col md:pt-5">
          <li>A minimum of 8 characters</li>
          <li>At least one lowercase letter</li>
          <li>At least one uppercase letter</li>
          <li>At least one number</li>
          <li>At least one symbol</li>
        </ul>
      </div>
      <div className="flex flex-col mx-2 md:flex-row gap-5">
        <label className="text-slate-700 text-sm font-bold">
          Confirm Password for Changes:
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("confirmPassword", {
              validate: (value) => {
                if (!value) {
                  return "This field is required";
                } else if (watch("password") !== value) {
                  return "Passwords do not match";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </label>
      </div>
      <span className="mx-2">
        <Button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green w-full sm:w-fit"
        >
          {isLoading ? "Saving..." : "Update"}
        </Button>
      </span>
    </form>
  );
};
export default UserProfileForm;
