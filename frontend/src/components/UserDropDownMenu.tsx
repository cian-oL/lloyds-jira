import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { getUser, signOutUser } from "../api/myUserApiClient";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { toast } from "sonner";

const UserDropDownMenu = () => {
  const { data: currentUserData } = useQuery("getUser", getUser);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(signOutUser, {
    onSuccess: async () => {
      toast.success("Successful Sign Out");
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: async (error: Error) => {
      toast.error("Error Signing Out");
      console.log("Failed Sign Out", error);
    },
  });

  const handleClick = () => mutation.mutate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex gap-2 rounded-lg p-2 bg-white text-black font-bold hover:bg-amber-100">
        <User />
        {currentUserData?.firstName}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-lloyds-dark-green text-white mr-2">
        <DropdownMenuLabel className="font-extrabold text-base underline">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to="/profile">Profile Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Button
          onClick={handleClick}
          className=" w-full rounded-lg bg-white text-black font-bold hover:bg-amber-100"
        >
          Sign Out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDownMenu;
