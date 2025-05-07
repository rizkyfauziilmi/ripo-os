import { cn } from "@/lib/utils";

function ResizeHandles({
  isTouchingBounds,
  handleResize,
}: {
  isTouchingBounds: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  handleResize: (e: React.MouseEvent, direction: string) => void;
}) {
  const directions = [
    {
      dir: "se",
      bounds: ["bottom", "right"],
      position: "bottom-0 right-0",
      offset: "-bottom-4 -right-4",
      size: "w-6 h-6 cursor-se-resize",
    },
    {
      dir: "sw",
      bounds: ["bottom", "left"],
      position: "bottom-0 left-0",
      offset: "-bottom-4 -left-4",
      size: "w-6 h-6 cursor-sw-resize",
    },
    {
      dir: "ne",
      bounds: ["top", "right"],
      position: "top-0 right-0",
      offset: "-top-4 -right-4",
      size: "w-6 h-6 cursor-ne-resize",
    },
    {
      dir: "nw",
      bounds: ["top", "left"],
      position: "top-0 left-0",
      offset: "-top-4 -left-4",
      size: "w-6 h-6 cursor-nw-resize",
    },
    {
      dir: "s",
      bounds: ["bottom"],
      position: "bottom-0",
      offset: "-bottom-3",
      size: "left-6 right-6 h-2 cursor-s-resize",
    },
    {
      dir: "n",
      bounds: ["top"],
      position: "top-0",
      offset: "-top-3",
      size: "left-6 right-6 h-2 cursor-n-resize",
    },
    {
      dir: "e",
      bounds: ["right"],
      position: "right-0",
      offset: "-right-3",
      size: "top-6 bottom-6 w-2 cursor-e-resize",
    },
    {
      dir: "w",
      bounds: ["left"],
      position: "left-0",
      offset: "-left-3",
      size: "top-6 bottom-6 w-2 cursor-w-resize",
    },
  ];

  return (
    <>
      {directions.map(({ dir, bounds, position, offset, size }) => (
        <div
          key={dir}
          className={cn(
            bounds.some(
              (bound) =>
                isTouchingBounds[bound as keyof typeof isTouchingBounds],
            )
              ? position
              : offset,
            `absolute ${size}`,
            "bg-red-500",
          )}
          onMouseDown={(e) => handleResize(e, dir)}
        />
      ))}
    </>
  );
}

export default ResizeHandles;
