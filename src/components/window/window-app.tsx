import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useCallback, useRef } from "react";
import WindowHeader from "./window-header";

interface WindowAppProps {
  constraintsRef: React.RefObject<HTMLDivElement> | null;
  AppName: string;
}

function WindowApp({ constraintsRef, AppName }: WindowAppProps) {
  const draggableRef = useRef<HTMLDivElement>(null);
  const lastFrameRef = useRef<number>(null);

  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [resizing, setResizing] = useState(false);
  const [isTouchingBounds, setIsTouchingBounds] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

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

  const handleDrag = () => {
    if (!draggableRef.current || !constraintsRef?.current) return;

    if (lastFrameRef.current) {
      cancelAnimationFrame(lastFrameRef.current);
    }

    lastFrameRef.current = requestAnimationFrame(() => {
      const draggableRect = draggableRef.current!.getBoundingClientRect();
      const constraintsRect = constraintsRef.current!.getBoundingClientRect();

      const isTouchingLeft = draggableRect.left <= constraintsRect.left;
      const isTouchingRight = draggableRect.right >= constraintsRect.right;
      const isTouchingTop = draggableRect.top <= constraintsRect.top;
      const isTouchingBottom = draggableRect.bottom >= constraintsRect.bottom;

      setIsTouchingBounds((prev) => {
        const next = {
          top: isTouchingTop,
          right: isTouchingRight,
          bottom: isTouchingBottom,
          left: isTouchingLeft,
        };

        // Hanya update state jika berubah
        return JSON.stringify(prev) !== JSON.stringify(next) ? next : prev;
      });
    });
  };

  if (!constraintsRef) return null;

  return (
    <motion.div
      ref={draggableRef}
      drag={!resizing}
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      onDrag={handleDrag}
      style={{
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
      }}
      className={cn(
        "absolute flex flex-col bg-background/95 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      )}
    >
      <WindowHeader AppName={AppName} />

      {/* Resize handles */}
      <div
        className={cn(
          isTouchingBounds.bottom || isTouchingBounds.right
            ? "bottom-0 right-0"
            : "-bottom-4 -right-4",
          "absolute w-6 h-6 cursor-se-resize bg-red-500",
        )}
        onMouseDown={(e) => handleResize(e, "se")}
      />
      <div
        className={cn(
          isTouchingBounds.bottom || isTouchingBounds.left
            ? "bottom-0 left-0"
            : "-bottom-4 -left-4",
          "absolute w-6 h-6 cursor-sw-resize",
        )}
        onMouseDown={(e) => handleResize(e, "sw")}
      />
      <div
        className={cn(
          isTouchingBounds.top || isTouchingBounds.right
            ? "top-0 right-0"
            : "-top-4 -right-4",
          "absolute w-6 h-6 cursor-ne-resize",
        )}
        onMouseDown={(e) => handleResize(e, "ne")}
      />
      <div
        className={cn(
          isTouchingBounds.top || isTouchingBounds.left
            ? "top-0 left-0"
            : "-top-4 -left-4",
          "absolute w-6 h-6 cursor-nw-resize",
        )}
        onMouseDown={(e) => handleResize(e, "nw")}
      />
      <div
        className={cn(
          isTouchingBounds.bottom ? "bottom-0" : "-bottom-3",
          "absolute left-6 right-6 h-2 cursor-s-resize",
        )}
        onMouseDown={(e) => handleResize(e, "s")}
      />
      <div
        className={cn(
          isTouchingBounds.top ? "top-0" : "-top-3",
          "absolute left-6 right-6 h-2 cursor-n-resize",
        )}
        onMouseDown={(e) => handleResize(e, "n")}
      />
      <div
        className={cn(
          isTouchingBounds.right ? "right-0" : "-right-3",
          "absolute top-6 bottom-6 w-2 cursor-e-resize",
        )}
        onMouseDown={(e) => handleResize(e, "e")}
      />
      <div
        className={cn(
          isTouchingBounds.left ? "left-0" : "-left-3",
          "absolute top-6 bottom-6 w-2 cursor-w-resize",
        )}
        onMouseDown={(e) => handleResize(e, "w")}
      />
    </motion.div>
  );
}

export default WindowApp;
