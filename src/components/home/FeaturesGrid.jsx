import { motion } from 'framer-motion';
import { Video, HelpCircle, Cpu, Download, Globe, IndianRupee, Gamepad2, Users } from 'lucide-react';

const features = [
  { icon: <Video className="w-8 h-8" />, title: 'Live & Recorded', description: 'Interactive classes with unlimited replays.' },
  { icon: <HelpCircle className="w-8 h-8" />, title: '24/7 Doubt Solving', description: 'Get answers via AI Chatbot & Mentors.' },
  { icon: <Cpu className="w-8 h-8" />, title: 'AI Practice', description: 'Smart adaptive testing built for you.' },
  { icon: <Download className="w-8 h-8" />, title: 'Offline Access', description: 'Download videos and learn anywhere.' },
  { icon: <Globe className="w-8 h-8" />, title: '7 Languages', description: 'Learn in your native language.' },
  { icon: <IndianRupee className="w-8 h-8" />, title: 'Affordable', description: 'Premium education, accessible to all.' },
  { icon: <Gamepad2 className="w-8 h-8" />, title: 'Gamified UI', description: 'Earn XP, badges, and compete globally.' },
  { icon: <Users className="w-8 h-8" />, title: 'Top Faculty', description: 'Learn from Indias best educators.' },
];

const FeaturesGrid = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4 section-header-underline pb-4">
          Why <span className="neon-text-cyan">Aakash Academic?</span>
        </h2>
        <p className="text-textSec font-exo text-lg max-w-2xl mx-auto mt-4">
          Built with cutting edge technology to provide the best learning experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group glass-card p-6 border-white/10 hover:border-cyanAccent/50 transition-all flex flex-col items-start"
          >
            <div className="mb-4 bg-cyanAccent/10 p-3 rounded-lg text-cyanAccent group-hover:scale-110 group-hover:bg-cyanAccent group-hover:text-darkBg transition-all duration-300">
              {feat.icon}
            </div>
            <h3 className="text-lg font-orbitron font-bold text-white mb-2">{feat.title}</h3>
            <p className="text-gray-400 font-nunito text-sm">{feat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
