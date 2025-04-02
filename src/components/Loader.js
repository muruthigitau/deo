import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

const Loader = ({ message = "Loading...", fullScreen = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`${
        fullScreen
          ? "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          : "flex items-center justify-center"
      }`}
    >
      <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-lg">
        <LoaderCircle className="animate-spin text-green-600" size={48} />
        {/* <span className="text-gray-700 font-medium">{message}</span> */}
      </div>
    </motion.div>
  );
};

export default Loader;
