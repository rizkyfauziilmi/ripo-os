import { motion } from "motion/react";

interface WindowAppProps {
  constraintsRef: React.RefObject<HTMLDivElement> | null;
}

function WindowApp({ constraintsRef }: WindowAppProps) {
  if (!constraintsRef) return null;

  return (
    <motion.div
      drag
      dragConstraints={constraintsRef}
      dragElastic={0}
      dragMomentum={false}
      className="absolute w-[300px] h-[200px] bg-background rounded-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      Window
    </motion.div>
  );
}

export default WindowApp;
