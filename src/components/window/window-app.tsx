import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useCallback } from "react";

interface WindowAppProps {
  constraintsRef: React.RefObject<HTMLDivElement> | null;
}

function WindowApp({ constraintsRef }: WindowAppProps) {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [resizing, setResizing] = useState(false);

  const handleResize = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const { width: startWidth, height: startHeight } = dimensions;

      const onMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();

        let newWidth = startWidth;
        let newHeight = startHeight;

        if (direction.includes("e")) {
          newWidth = startWidth + (moveEvent.clientX - startX);
        }
        if (direction.includes("w")) {
          newWidth = startWidth - (moveEvent.clientX - startX);
        }
        if (direction.includes("s")) {
          newHeight = startHeight + (moveEvent.clientY - startY);
        }
        if (direction.includes("n")) {
          newHeight = startHeight - (moveEvent.clientY - startY);
        }

        setDimensions({
          width: Math.max(100, newWidth),
          height: Math.max(100, newHeight),
        });
        setResizing(true);
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        setResizing(false);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [dimensions],
  );

  if (!constraintsRef) return null;

  return (
    <motion.div
      drag={!resizing}
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
      className={cn(
        "absolute bg-background/95 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      )}
    >
      <div className="p-2">Window</div>

      {/* Resize handles */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize"
        onMouseDown={(e) => handleResize(e, "se")}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize"
        onMouseDown={(e) => handleResize(e, "sw")}
      />
      <div
        className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize"
        onMouseDown={(e) => handleResize(e, "ne")}
      />
      <div
        className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize"
        onMouseDown={(e) => handleResize(e, "nw")}
      />
      <div
        className="absolute bottom-0 left-6 right-6 h-2 cursor-s-resize"
        onMouseDown={(e) => handleResize(e, "s")}
      />
      <div
        className="absolute top-0 left-6 right-6 h-2 cursor-n-resize"
        onMouseDown={(e) => handleResize(e, "n")}
      />
      <div
        className="absolute right-0 top-6 bottom-6 w-2 cursor-e-resize"
        onMouseDown={(e) => handleResize(e, "e")}
      />
      <div
        className="absolute left-0 top-6 bottom-6 w-2 cursor-w-resize"
        onMouseDown={(e) => handleResize(e, "w")}
      />
    </motion.div>
  );
}

export default WindowApp;
