import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState, useCallback, useRef, memo } from "react";
import React from "react";
import WindowHeader from "./window-header";
import ResizeHandles from "./resize-handles";
import {
  WINDOW_MIN_HEIGHT,
  WINDOW_MIN_WIDTH,
  WINDOW_OFFSET_DETECTION,
} from "@/constant/window";
import useWindowStore, { Window } from "@/store/window-store";

interface WindowAppProps {
  window: Window;
  constraintsRef: React.RefObject<HTMLDivElement> | null;
}

function WindowApp({ constraintsRef, window }: WindowAppProps) {
  const { updateWindow } = useWindowStore();

  const draggableRef = useRef<HTMLDivElement>(null);
  const lastFrameRef = useRef<number>(null);

  const [resizing, setResizing] = useState(false);
  const [isTouchingBounds, setIsTouchingBounds] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

  const updateBoundsState = useCallback(
    (draggableRect: DOMRect, constraintsRect: DOMRect) => {
      const nextBounds = {
        top: draggableRect.top <= constraintsRect.top + WINDOW_OFFSET_DETECTION,
        right:
          draggableRect.right >=
          constraintsRect.right - WINDOW_OFFSET_DETECTION,
        bottom:
          draggableRect.bottom >=
          constraintsRect.bottom - WINDOW_OFFSET_DETECTION,
        left:
          draggableRect.left <= constraintsRect.left + WINDOW_OFFSET_DETECTION,
      };

      setIsTouchingBounds((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(nextBounds)) {
          if (lastFrameRef.current) {
            cancelAnimationFrame(lastFrameRef.current);
          }

          lastFrameRef.current = requestAnimationFrame(() => {
            setIsTouchingBounds(nextBounds);
          });
        }
        return prev;
      });
    },
    [],
  );

  const handleResize = useCallback(
    (e: React.MouseEvent, direction: string) => {
      e.stopPropagation();

      const startX = e.clientX;
      const startY = e.clientY;
      const { width: startWidth, height: startHeight } = window.dimensions;

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

        if (lastFrameRef.current) {
          clearTimeout(lastFrameRef.current);
        }

        updateWindow(window.id, {
          dimensions: {
            width: Math.max(WINDOW_MIN_WIDTH, newWidth),
            height: Math.max(WINDOW_MIN_HEIGHT, newHeight),
          },
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
    [
      constraintsRef,
      updateBoundsState,
      updateWindow,
      window.dimensions,
      window.id,
    ],
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
        width: `${window.dimensions.width}px`,
        height: `${window.dimensions.height}px`,
      }}
      className={cn(
        "absolute flex flex-col bg-background/95 rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
      )}
    >
      <MemoizedWindowHeader window={window} />
      <MemoizedResizeHandles
        isTouchingBounds={isTouchingBounds}
        handleResize={handleResize}
      />
    </motion.div>
  );
}

const MemoizedWindowHeader = memo(WindowHeader);
const MemoizedResizeHandles = memo(ResizeHandles);

export default WindowApp;
