import { Link } from "react-router-dom";

import lloydsIcon from "@/assets/lloyds_icon.png";
import { Button } from "./ui/button";

const HomePageTile = () => {
  return (
    <div className=" w-4/5 border border-lloyds-dark-green rounded-lg p-2 flex flex-col items-center mx-auto justify-evenly md:flex-row">
      <img src={lloydsIcon} className="w-1/10 py-5" />
      <section className="w-fit">
        <div className="mb-10">
          <h1 className="text-3xl font-bold ">Lloyds Jira</h1>
          <p>Welcome to the Jira Platform</p>
          <p>Get Started on your Tasks!</p>
        </div>
        <Link to="/kanban">
          <Button className="mr-5 rounded-lg w-full bg-lloyds-dark-green text-white font-bold hover:bg-lloyds-green">
            Go to Kanban
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default HomePageTile;
