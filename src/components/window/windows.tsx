import useWindowStore from "@/store/window-store";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
const WindowApp = React.lazy(() => import("./window-app"));

interface WindowsProps {
  constraintsRef: React.RefObject<HTMLDivElement>;
}

function Windows({ constraintsRef }: WindowsProps) {
  const { windows } = useWindowStore();

  return (
    <AnimatePresence>
      {windows.map(
        (window) =>
          window.isOpen && (
            <motion.div
              key={window.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <WindowApp window={window} constraintsRef={constraintsRef} />
            </motion.div>
          ),
      )}
    </AnimatePresence>
  );
}

export default Windows;
