import VolumeMixer from "./volume-mixer";
import UserAvatar from "./user-avatar";
import UserInfo from "./user-info";

function RightSheetBento() {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <UserAvatar />
        <UserInfo />
      </div>
      <VolumeMixer />
    </div>
  );
}

export default RightSheetBento;
