import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

import { SignInFormData } from "../types/userTypes";
import { signInUser } from "../api/myUserApiClient";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(signInUser, {
    onSuccess: async () => {
      toast.success("Successful Sign In");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error("Failed to Sign In");
      console.log("Failed Sign In", error);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h1 className="text-2xl font-bold underline">Sign In</h1>
      <p className="mx-2 text-sm italic">All fields are required</p>
      <div className=" mx-2 flex flex-col gap-5">
        <label className="flex flex-col text-slate-700 text-sm font-bold">
          RACFID
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal flex-1 md:w-[30%]"
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
        <label className="flex flex-col text-slate-700 text-sm font-bold">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal flex-1 md:w-[30%]"
            {...register("password", { required: "Required" })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <span className="flex flex-col items-center justify-start sm:flex-row">
          <Button
            type="submit"
            className="rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green w-full sm:w-fit"
          >
            Sign In
          </Button>
          <span className="m-2 text-sm">
            Not Registered?{" "}
            <Link to="/register" className="underline">
              Create an account here
            </Link>
          </span>
        </span>
      </div>
    </form>
  );
};
export default SignIn;
