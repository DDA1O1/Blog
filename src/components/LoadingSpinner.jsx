import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-t-2 border-violet-500 rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner; 