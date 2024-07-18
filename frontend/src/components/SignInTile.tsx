import { Link } from "react-router-dom";

import lloydsIcon from "@/assets/lloyds_icon.png";
import { Button } from "./ui/button";

const SignInTile = () => {
  return (
    <div className=" w-4/5 border border-lloyds-dark-green rounded-lg p-2 flex items-center mx-auto justify-evenly">
      <img src={lloydsIcon} className="w-1/10 py-5" />
      <section className="w-fit">
        <div className="mb-10">
          <h1 className="text-3xl font-bold ">Lloyds Jira</h1>
          <p>Welcome to the Jira Platform</p>
          <p>Please sign in or register:</p>
        </div>
        <div className="flex justify-start">
          <Link to="/sign-in">
            <Button className="mr-5 rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button className="rounded-lg bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green">
              Register
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SignInTile;
