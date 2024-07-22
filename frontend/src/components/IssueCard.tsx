import { useState } from "react";
import { TrashIcon } from "lucide-react";

import { Issue } from "../types/kanbanTypes";
import { Button } from "./ui/button";

type Props = {
  issue: Issue;
};

const IssueCard = ({ issue }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className="flex flex-col items-start rounded-xl p-2.5 min-h-24 text-left bg-lloyds-green text-white text-xs hover:ring-2 cursor-grab hover:ring-inset hover:ring-amber-100"
    >
      <p className="font-bold underline text-sm">{issue.issueCode}</p>
      <p>{issue.name}</p>
      <br />
      <p className="font-bold underline">Assignee:</p>
      <div className="relative flex items-center justify-start gap-2">
        <p className="w-1/2">{issue.assignee}</p>
        {mouseIsOver && (
          <Button
            onClick={() => console.log("delete")}
            className="absolute left-24 w-4 p-0 bg-lloyds-green text-white text-xs hover:text-red-500 hover:bg-lloyds-green hover:cursor-pointer"
          >
            <TrashIcon />
          </Button>
        )}
      </div>
    </div>
  );
};

export default IssueCard;
