import { Home } from "lucide-react";
import { Button } from "../ui/button";
import Workspace from "./workspace";
import { useDialogStore } from "@/store/dialog-store";

function LeftTopbar() {
  const { setAppMenuOpen, appMenuOpen } = useDialogStore();

  return (
    <div className="flex flex-1 items-center gap-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setAppMenuOpen(!appMenuOpen)}
      >
        <Home />
      </Button>
      <Workspace />
    </div>
  );
}

export default LeftTopbar;
