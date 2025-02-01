import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease: "easeOut" }
  };

  const features = [
    { title: "Powerful Tools", desc: "Build faster with our advanced toolkit", icon: "🚀" },
    { title: "Easy Integration", desc: "Seamlessly connect with your workflow", icon: "⚡" },
    { title: "24/7 Support", desc: "We're here to help you succeed", icon: "💪" }
  ];

  const letterAnimation = {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const title = "Transform Your Vision";

  // Update ball colors
  const balls = [
    { size: 100, color: "rgba(255, 87, 51, 0.15)" },    // Coral red
    { size: 150, color: "rgba(64, 224, 208, 0.15)" },   // Turquoise
    { size: 80, color: "rgba(255, 195, 0, 0.15)" },     // Golden yellow
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Add floating balls */}
      {balls.map((ball, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: ball.size,
            height: ball.size,
            backgroundColor: ball.color,
            filter: "blur(4px)",
          }}
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <div className="flex justify-center mb-8">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterAnimation}
                initial="initial"
                animate="animate"
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
                className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400 inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          <motion.p 
            className="text-2xl text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Create something extraordinary with our innovative platform
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-10 mt-20"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                rotateY: 5,
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform-gpu border border-gray-700"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2, type: "spring" }}
                className="text-4xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 text-violet-400">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
        >
          <motion.button
            onClick={() => navigate('/auth')}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 25px -5px rgb(139, 92, 246, 0.2)",
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 relative overflow-hidden group"
          >
            <motion.span 
              className="relative z-10"
              whileHover={{ scale: 1.1 }}
            >
              Get Started Now
            </motion.span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
