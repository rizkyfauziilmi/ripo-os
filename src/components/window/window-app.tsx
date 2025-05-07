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

  const updateBoundsState = useCallback(
    (draggableRect: DOMRect, constraintsRect: DOMRect) => {
      if (lastFrameRef.current) {
        cancelAnimationFrame(lastFrameRef.current);
      }

      lastFrameRef.current = requestAnimationFrame(() => {
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
      });
    },
    [],
  );

  const handleResize = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const { width: startWidth, height: startHeight } = dimensions;

      const onMouseMove = (moveEvent: MouseEvent) => {
        moveEvent.preventDefault();

        if (!constraintsRef?.current || !draggableRef.current) return;

        const constraintsRect = constraintsRef.current.getBoundingClientRect();
        const draggableRect = draggableRef.current.getBoundingClientRect();

        let newWidth = startWidth;
        let newHeight = startHeight;

        if (direction.includes("e")) {
          newWidth = Math.min(
            startWidth + (moveEvent.clientX - startX),
            constraintsRect.right - draggableRect.left,
          );
        }
        if (direction.includes("w")) {
          newWidth = Math.min(
            startWidth - (moveEvent.clientX - startX),
            draggableRect.right - constraintsRect.left,
          );
        }
        if (direction.includes("s")) {
          newHeight = Math.min(
            startHeight + (moveEvent.clientY - startY),
            constraintsRect.bottom - draggableRect.top,
          );
        }
        if (direction.includes("n")) {
          newHeight = Math.min(
            startHeight - (moveEvent.clientY - startY),
            draggableRect.bottom - constraintsRect.top,
          );
        }

        updateBoundsState(draggableRect, constraintsRect);

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
    [constraintsRef, dimensions, updateBoundsState],
  );

  const handleDrag = useCallback(() => {
    if (!draggableRef.current || !constraintsRef?.current) return;

    const draggableRect = draggableRef.current.getBoundingClientRect();
    const constraintsRect = constraintsRef.current.getBoundingClientRect();

    updateBoundsState(draggableRect, constraintsRect);
  }, [constraintsRef, updateBoundsState]);

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
