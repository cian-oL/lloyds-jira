import { Link } from "react-router-dom";

import lloydsLogo from "@/assets/lloyds_full-logo.png";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="bg-lloyds-green text-white font-sans">
      <div className="container mx-auto py-10 flex justify-between items-center">
        <Link to="/">
          <img src={lloydsLogo} className="w-1/2" />
        </Link>
        <Link to="/sign-in">
          <Button className="rounded-lg bg-white text-black font-bold hover:bg-amber-100">
            Sign In
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
