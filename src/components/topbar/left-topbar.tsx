import { Home } from "lucide-react";
import { Button } from "../ui/button";
import Workspace from "./workspace";

function LeftTopbar() {
  return (
    <div className="flex flex-1 items-center gap-4">
      <Button size="icon" variant="ghost">
        <Home />
      </Button>
      <Workspace />
    </div>
  );
}

export default LeftTopbar;
