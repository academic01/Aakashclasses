import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Rocket } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-brandBeige">
      {/* Hero Section */}
      <section className="px-6 md:px-20 py-20 text-center relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-outfit font-black text-brandNavy mb-6 leading-tight">
            Empowering Students Through <span className="text-orange-500">Quality Education</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium mb-10 leading-relaxed">
            At Aakash Academics, we believe that education is the key to unlocking a world of possibilities. 
            Our mission is to provide high-quality, accessible, and engaging learning experiences for students across India.
          </p>
        </motion.div>
      </section>

      {/* Our Values */}
      <section className="px-6 md:px-20 py-20 bg-lightBg2/30">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Users />, title: "Student Centric", desc: "Every decision we make starts with the student's needs and success." },
            { icon: <Target />, title: "Goal Oriented", desc: "We focus on clear objectives to help students achieve their exam targets." },
            { icon: <Award />, title: "Excellence", desc: "We strive for perfection in our teaching methods and study materials." },
            { icon: <Rocket />, title: "Innovation", desc: "Using technology to make learning more interactive and effective." }
          ].map((val, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-brandBeige p-8 rounded-3xl shadow-sm border border-brandNavy/5"
            >
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-brandNavy mb-3">{val.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-20 py-24 bg-brandNavy text-brandBeige rounded-[60px] mx-6 md:mx-20 my-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">50,000+</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Happy Students</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">200+</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Expert Tutors</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">1,000+</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Study Modules</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black mb-2">95%</div>
            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Success Rate</div>
          </div>
        </div>
      </section>

      {/* Our Mission Detail */}
      <section className="px-6 md:px-20 py-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-black text-brandNavy mb-6">Join the Revolution in Learning</h2>
            <p className="text-gray-600 text-lg font-medium mb-8 leading-relaxed">
              Founded in 2026, Aakash Academics has been at the forefront of digital learning. 
              We combine traditional teaching excellence with modern digital tools to ensure 
              every student gets the attention they deserve.
            </p>
            <button className="btn-primary bg-brandNavy text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-xl shadow-brandNavy/20">
              Explore Courses
            </button>
          </div>
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80" 
              alt="Education" 
              className="rounded-[40px] shadow-2xl"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
