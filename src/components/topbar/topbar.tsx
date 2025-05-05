import LeftTopbar from "./left-topbar";
import MiddleTopbar from "./middle-topbar";
import RightTopbar from "./right-topbar";

function Topbar() {
  return (
    <div className="bg-background text-primary flex items-center justify-between py-1 px-4">
      <LeftTopbar />
      <MiddleTopbar />
      <RightTopbar />
    </div>
  );
}

export default Topbar;
