import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    { title: "Powerful Tools", desc: "Build faster with our advanced toolkit", icon: "🚀" },
    { title: "Easy Integration", desc: "Seamlessly connect with your workflow", icon: "⚡" },
    { title: "24/7 Support", desc: "We're here to help you succeed", icon: "💪" }
  ];

  // More visually stunning particles
  const particles = [
    ...Array(15).fill().map((_, i) => ({
      size: 20 + Math.random() * 100,
      color: `rgba(${Math.floor(Math.random()*100 + 155)}, ${Math.floor(Math.random()*100 + 155)}, ${Math.floor(Math.random()*255)}, 0.1)`,
      delay: i * 0.2,
      duration: 15 + Math.random() * 30
    }))
  ];
  
  // Enhanced title animation
  const titleAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9]
      }
    })
  };

  const title = "Transform Your Vision";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden relative">
      {/* Enhanced particles background */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            filter: "blur(8px)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 0
          }}
          animate={{
            x: [
              `${Math.random() * 50 - 25}%`,
              `${Math.random() * 50 - 25}%`,
              `${Math.random() * 50 - 25}%`
            ],
            y: [
              `${Math.random() * 50 - 25}%`,
              `${Math.random() * 50 - 25}%`,
              `${Math.random() * 50 - 25}%`
            ],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 25%, transparent 50%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center space-y-8"
        >
          {/* Enhanced title animation */}
          <div className="flex justify-center mb-10 flex-wrap">
            {title.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={titleAnimation}
                initial="hidden"
                animate="visible"
                className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400 inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>

          <motion.p 
            className="text-2xl text-gray-300 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Create something extraordinary with our innovative platform
          </motion.p>
        </motion.div>

        {/* Enhanced feature cards */}
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
                y: -10, 
                scale: 1.03,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.2)",
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700/50 group"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + index * 0.2, type: "spring" }}
                className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA button */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, type: "spring" }}
        >
          <motion.button
            onClick={() => navigate('/auth')}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)"
            }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-14 py-5 rounded-full text-xl font-medium transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started Now
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                fill="currentColor" 
                viewBox="0 0 16 16"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
              </motion.svg>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
