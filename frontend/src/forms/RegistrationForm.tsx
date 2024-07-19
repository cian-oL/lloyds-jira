import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { UserFormData } from "../types/userTypes";
import { registerUser } from "../api/myUserApiClient";
import { Button } from "../components/ui/button";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>();

  const mutation = useMutation(registerUser, {
    onSuccess: async () => {
      toast.success("Successful Registration");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error("Failed Registration");
      console.log("Failed Regisration", error);
    },
  });

  const onSubmit = handleSubmit((data) => mutation.mutate(data));

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      <h1 className="mx-2 text-2xl font-bold underline">Register</h1>
      <p className="mx-2 text-sm italic">All fields are required</p>
      <div className="flex flex-col mx-2 md:flex-row gap-5">
        <label className="text-slate-700 text-sm font-bold">
          RACFID:
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal flex-1"
            {...register("racfid", {
              validate: (value) => {
                const racfidRegex = /L\d{6}/;

                if (!value) {
                  return "Required";
                } else if (!racfidRegex.test(value)) {
                  return "Employee ID begins with L and contains 6 numbers";
                }
              },
            })}
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
          Password:
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
          Confirm Password:
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
          className="rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green w-full sm:w-fit"
        >
          Register
        </Button>
      </span>
    </form>
  );
};
export default RegistrationForm;
