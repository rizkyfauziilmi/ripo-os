import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function UserAvatar() {
  return (
    <Avatar isRoundedSquare className="size-[5.5rem]">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;
