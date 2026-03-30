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
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative z-10 bg-brandBeige">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-textPrimary mb-4 section-header-underline pb-4">
          Why <span className="text-textPrimary">Aakash Academic?</span>
        </h2>
        <p className="text-textSecondary font-exo text-lg max-w-2xl mx-auto mt-4">
          Built with cutting edge technology to provide the best learning experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group bg-brandBeige/50 backdrop-blur-sm p-8 border border-brandNavy/5 rounded-2xl shadow-sm hover:border-brandNavy/20 transition-all flex flex-col items-start"
          >
            <div className="mb-6 bg-[#F5F5F5] p-3 rounded-xl text-textPrimary group-hover:scale-110 group-hover:bg-textPrimary group-hover:text-white transition-all duration-300 shadow-sm">
              {feat.icon}
            </div>
            <h3 className="text-lg font-orbitron font-bold text-textPrimary mb-2 uppercase tracking-tight">{feat.title}</h3>
            <p className="text-textSecondary font-nunito text-sm leading-relaxed">{feat.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesGrid;
