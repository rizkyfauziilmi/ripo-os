import { cn } from "@/lib/utils";

interface AppIndicatorProps {
  isActive?: boolean;
}

function AppIndicator({ isActive = false }: AppIndicatorProps) {
  return (
    <div
      className={cn(
        "size-[0.40rem]",
        isActive ? "bg-blue-500" : "bg-gray-300",
        "rounded-full absolute -left-1 top-1/2 transform -translate-y-1/2",
      )}
    ></div>
  );
}

export default AppIndicator;
