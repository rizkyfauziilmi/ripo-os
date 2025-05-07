import useWindowStore, { Window } from "@/store/windowStore";
import { motion } from "motion/react";

interface WindowHeaderProps {
  window: Window;
}

function WindowHeader({ window }: WindowHeaderProps) {
  const { minimizeWindow, closeWindow } = useWindowStore();

  return (
    <div className="px-2 pt-2 relative">
      <div className="text-sm w-full text-center font-bold">
        {window.appName}
      </div>
      <div className="flex space-x-2 absolute right-2 top-2 z-10">
        <motion.div
          className="size-4 rounded-full bg-red-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onTap={() => closeWindow(window.id)}
        ></motion.div>
        <motion.div
          className="size-4 rounded-full bg-yellow-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        ></motion.div>
        <motion.div
          className="size-4 rounded-full bg-green-500"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onTap={() => minimizeWindow(window.id)}
        ></motion.div>
      </div>
    </div>
  );
}

export default WindowHeader;
