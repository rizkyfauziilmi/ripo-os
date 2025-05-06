import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  isRoundedSquare = false,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  isRoundedSquare?: boolean;
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        isRoundedSquare ? "rounded-md" : "rounded-full",
        "relative flex size-8 shrink-0 overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  isRoundedSquare = false,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback> & {
  isRoundedSquare?: boolean;
}) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        isRoundedSquare ? "rounded-md" : "rounded-full",
        "bg-muted flex size-full items-center justify-center",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
