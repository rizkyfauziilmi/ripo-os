import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useCallback, useRef } from "react";
import WindowHeader from "./window-header";
import ResizeHandles from "./resize-handles";
import { WINDOW_OFFSET_DETECTION } from "@/constant/window";

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

        if (!constraintsRef?.current || !draggableRef.current) return;

        const constraintsRect = constraintsRef.current.getBoundingClientRect();
        const draggableRect = draggableRef.current.getBoundingClientRect();

        const maxWidth = constraintsRect.width;
        const maxHeight = constraintsRect.height;

        if (direction.includes("e")) {
          newWidth = Math.min(
            startWidth + (moveEvent.clientX - startX),
            Math.min(constraintsRect.right - draggableRect.left, maxWidth),
          );
        }
        if (direction.includes("w")) {
          newWidth = Math.min(
            startWidth - (moveEvent.clientX - startX),
            Math.min(draggableRect.right - constraintsRect.left, maxWidth),
          );
        }
        if (direction.includes("s")) {
          newHeight = Math.min(
            startHeight + (moveEvent.clientY - startY),
            Math.min(constraintsRect.bottom - draggableRect.top, maxHeight),
          );
        }
        if (direction.includes("n")) {
          newHeight = Math.min(
            startHeight - (moveEvent.clientY - startY),
            Math.min(draggableRect.bottom - constraintsRect.top, maxHeight),
          );
        }

        const nextBounds = {
          top:
            draggableRect.top <= constraintsRect.top + WINDOW_OFFSET_DETECTION,
          right:
            draggableRect.right >=
            constraintsRect.right - WINDOW_OFFSET_DETECTION,
          bottom:
            draggableRect.bottom >=
            constraintsRect.bottom - WINDOW_OFFSET_DETECTION,
          left:
            draggableRect.left <=
            constraintsRect.left + WINDOW_OFFSET_DETECTION,
        };

        setIsTouchingBounds((prev) =>
          JSON.stringify(prev) !== JSON.stringify(nextBounds)
            ? nextBounds
            : prev,
        );

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
    [constraintsRef, dimensions],
  );

  const handleDrag = () => {
    if (!draggableRef.current || !constraintsRef?.current) return;

    if (lastFrameRef.current) {
      cancelAnimationFrame(lastFrameRef.current);
    }

    lastFrameRef.current = requestAnimationFrame(() => {
      const draggableRect = draggableRef.current!.getBoundingClientRect();
      const constraintsRect = constraintsRef.current!.getBoundingClientRect();

      const isTouchingLeft =
        draggableRect.left <= constraintsRect.left + WINDOW_OFFSET_DETECTION;
      const isTouchingRight =
        draggableRect.right >= constraintsRect.right - WINDOW_OFFSET_DETECTION;
      const isTouchingTop =
        draggableRect.top <= constraintsRect.top + WINDOW_OFFSET_DETECTION;
      const isTouchingBottom =
        draggableRect.bottom >=
        constraintsRect.bottom - WINDOW_OFFSET_DETECTION;

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

      <ResizeHandles
        isTouchingBounds={isTouchingBounds}
        handleResize={handleResize}
      />
    </motion.div>
  );
}

export default WindowApp;
