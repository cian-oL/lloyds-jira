import { RiKanbanView2 } from "react-icons/ri";
import { MdOutlineTableRows } from "react-icons/md";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex bg-white rounded p-2 gap-5 text-black font-bold">
      <span>Kanban Menu:</span>
      <NavigationMenu>
        <NavigationMenuList className="flex gap-2 text-2xl">
          <NavigationMenuItem>
            <Link to="/kanban">
              <RiKanbanView2 className="bg-white font-bold text-black hover:text-indigo-400" />
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/backlog">
              <MdOutlineTableRows className="bg-white font-bold text-black hover:text-indigo-400" />
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navbar;
