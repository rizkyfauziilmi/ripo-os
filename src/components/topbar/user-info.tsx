import { Button } from "../ui/button";
import { Lock, Power, Settings } from "lucide-react";

function UserInfo() {
  return (
    <div className="bg-muted/50 rounded-md p-2 h-[5.5rem] flex flex-col w-full gap-2">
      <UserControls />
      <p className="bg-popover text-center text-sm p-1 font-bold rounded-md">
        rizkyfauziilmi
      </p>
    </div>
  );
}

function UserControls() {
  return (
    <div className="flex gap-2 items-center justify-between">
      <Button size="icon" variant="secondary">
        <Settings />
      </Button>
      <Button variant="secondary">Uptime: 0:09</Button>
      <Button size="icon" variant="secondary">
        <Lock />
      </Button>
      <Button size="icon" variant="destructive">
        <Power />
      </Button>
    </div>
  );
}

export default UserInfo;
