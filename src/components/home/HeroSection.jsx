import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, TrendingUp, Users, BookOpen, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    const [xpWidth, setXpWidth] = useState(0);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setXpWidth(72);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, delay: 0.4, ease: "easeOut" }
        }
    };

    const floatingVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section id="hero-section" className="relative w-full min-h-[90vh] bg-white bg-graph bg-hero-gradients flex items-center overflow-hidden pt-24 md:pt-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-20 py-16 lg:py-24 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                
                {/* LEFT SIDE: 55% */}
                <motion.div 
                    className="w-full lg:w-[55%] flex flex-col items-start"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="bg-[#FFF8E7] border border-[#F5A623] rounded-full px-4 py-1.5 mb-6 shadow-sm"
                    >
                        <span className="text-[#F5A623] text-[13px] font-bold">🎓 India's #1 Gamified Learning Platform</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-[36px] md:text-[64px] font-black leading-[1.1] mb-5 font-outfit"
                    >
                        <span className="text-[#0D2240] block">Your Rank.</span>
                        <span className="text-[#0D2240] block">Your Rules.</span>
                        <span className="text-[#F5A623] block">Your Academy.</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-[#666666] text-lg md:text-[18px] font-semibold mb-4"
                    >
                        JEE | NEET | CUET | Boards | Government Exams
                    </motion.p>

                    {/* Description */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-[#888888] text-[15px] leading-relaxed max-w-[480px] mb-8"
                    >
                        Join 2,50,000+ students learning from India's top faculty. Earn XP, climb leaderboards, and crack your dream exam with Aakash Academics.
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex items-center gap-0 mb-10 w-full"
                    >
                        <div className="flex flex-col pr-4 md:pr-8 border-r border-[#E5E5E5]">
                            <span className="text-[#0D2240] text-xl md:text-[22px] font-black">2,50,000+</span>
                            <span className="text-[#888888] text-[13px]">Students</span>
                        </div>
                        <div className="flex flex-col px-4 md:px-8 border-r border-[#E5E5E5]">
                            <span className="text-[#0D2240] text-xl md:text-[22px] font-black">500+</span>
                            <span className="text-[#888888] text-[13px]">Courses</span>
                        </div>
                        <div className="hidden md:flex flex-col pl-4 md:px-8">
                            <span className="text-[#0D2240] text-xl md:text-[22px] font-black">98%</span>
                            <span className="text-[#888888] text-[13px]">Success Rate</span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons Row */}
                    <motion.div 
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                    >
                        <Link 
                            to="/courses" 
                            className="w-full sm:w-auto bg-[#0D2240] text-white px-7 py-3.5 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(13,34,64,0.3)] hover:bg-[#1a3a6b] transition-all transform hover:-translate-y-1"
                        >
                            <Play className="w-4 h-4 fill-white" /> Start Learning Free
                        </Link>
                        <Link 
                            to="/courses" 
                            className="w-full sm:w-auto bg-transparent border-2 border-[#0D2240] text-[#0D2240] px-7 py-3.5 rounded-full font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#0D2240] hover:text-white transition-all transform hover:-translate-y-1"
                        >
                            Explore Batches <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* RIGHT SIDE: 45% */}
                <div className="w-full lg:w-[45%] relative">
                    <motion.div 
                        className="relative z-10"
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {/* Main Visual Card */}
                        <div className="bg-[#0D2240] rounded-[24px] p-8 shadow-[0_20px_60px_rgba(13,34,64,0.25)] relative overflow-hidden group">
                           
                            {/* Student Greeting */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-full bg-[#1a3a6b] border border-white/10 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white/80" />
                                </div>
                                <span className="text-white font-bold text-lg">Welcome back, Rahul! 👋</span>
                            </div>

                            {/* XP Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-white text-[13px] font-medium opacity-90">Level 4 — Scholar</span>
                                    <span className="text-white text-[12px] opacity-70">4,200 / 5,000 XP</span>
                                </div>
                                <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${xpWidth}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="h-full bg-[#F5A623] rounded-full shadow-[0_0_10px_rgba(245,166,35,0.5)]"
                                    />
                                </div>
                            </div>

                            {/* Streak Row */}
                            <div className="bg-[#F5A623]/15 border border-[#F5A623]/20 rounded-[12px] p-4 flex items-center gap-3 mb-6">
                                <span className="text-2xl">🔥</span>
                                <span className="text-[#F5A623] font-bold">Day 14 Streak!</span>
                            </div>

                            {/* Stats Mini Grid */}
                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="bg-white/10 p-3 rounded-[12px] backdrop-blur-sm border border-white/5">
                                    <div className="text-white font-bold text-xl mb-0.5">24 <span className="text-sm font-normal">🏆</span></div>
                                    <div className="text-white/60 text-[11px] uppercase tracking-wider">Tests Done</div>
                                </div>
                                <div className="bg-white/10 p-3 rounded-[12px] backdrop-blur-sm border border-white/5">
                                    <div className="text-white font-bold text-xl mb-0.5">120h <span className="text-sm font-normal">⏱</span></div>
                                    <div className="text-white/60 text-[11px] uppercase tracking-wider">Watched</div>
                                </div>
                                <div className="bg-white/10 p-3 rounded-[12px] backdrop-blur-sm border border-white/5">
                                    <div className="text-white font-bold text-xl mb-0.5">#452 <span className="text-sm font-normal">📊</span></div>
                                    <div className="text-white/60 text-[11px] uppercase tracking-wider">Global Rank</div>
                                </div>
                                <div className="bg-white/10 p-3 rounded-[12px] backdrop-blur-sm border border-white/5">
                                    <div className="text-white font-bold text-xl mb-0.5">8 <span className="text-sm font-normal">🎖</span></div>
                                    <div className="text-white/60 text-[11px] uppercase tracking-wider">Badges</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Badges (Desktop Only) */}
                        <div className="hidden lg:block">
                            <motion.div 
                                variants={floatingVariants}
                                animate="animate"
                                className="absolute -top-6 -left-10 bg-white shadow-xl px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2 z-20"
                                style={{ animationDelay: '0s' }}
                            >
                                <span className="text-sm font-bold text-[#0D2240]">🥇 AIR 47 — Rohan S.</span>
                            </motion.div>
                            
                            <motion.div 
                                variants={floatingVariants}
                                animate="animate"
                                className="absolute -bottom-4 -right-6 bg-white shadow-xl px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2 z-20"
                                style={{ animationDelay: '1s' }}
                            >
                                <span className="text-sm font-bold text-[#0D2240]">🔥 2.5L+ Students</span>
                            </motion.div>

                            <motion.div 
                                variants={floatingVariants}
                                animate="animate"
                                className="absolute top-1/4 -right-12 bg-white shadow-xl px-4 py-2 rounded-full border border-gray-100 flex items-center gap-2 z-20"
                                style={{ animationDelay: '0.5s' }}
                            >
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-sm font-bold text-[#0D2240]">⚡ Live Now • 1.2k</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
