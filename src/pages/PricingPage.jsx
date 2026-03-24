import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Zap, Star, Layout, DollarSign, ArrowRight, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('yearly');
  const { enrollInCourse } = useAppContext();

  const plans = [
    { 
      name: 'Scholar (Free)', 
      price: 0, 
      desc: 'Free learning resources for everyone.',
      features: ['Limited Live Classes', 'Chapter-wise Practice', 'Free PYQs', 'Community Doubt Support'],
      cta: 'Get Started Free',
      icon: <Check className="w-8 h-8 text-green-500" />,
      highlight: false
    },
    { 
      name: 'Prime (Best Value)', 
      price: billingCycle === 'yearly' ? 4999 : 599, 
      desc: 'Advanced coaching for serious aspirants.',
      features: ['Unlimited Live Classes', 'Personal AI Mentor', 'Exclusive Mock Tests', 'Downloadable Notes', 'Doubt Solving in 15m'],
      cta: 'Buy Prime Now',
      icon: <Star className="w-8 h-8 text-brandYellow" />,
      highlight: true
    },
    { 
      name: 'Elite (Premium)', 
      price: billingCycle === 'yearly' ? 9999 : 1299, 
      desc: '1-on-1 coaching for top ranks.',
      features: ['Everything in Prime', 'Weekly 1:1 Mentoring', 'Parent Reports', 'Custom Test Engine', 'Scholarship Entry'],
      cta: 'Upgrade to Elite',
      icon: <Zap className="w-8 h-8 text-brandNavy" />,
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-white bg-graph pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-brandNavy mb-6 section-header-underline pb-4">
             Select Your <span className="text-brandNavy">Plan</span>
           </h1>
           <p className="text-textSecondary font-exo text-lg max-w-2xl mx-auto mb-10">Invest in your future. Premium education, transparent pricing, no hidden fees.</p>
           
           {/* Billing Toggle */}
           <div className="flex bg-[#F5F5F5] p-1.5 rounded-full w-fit mx-auto border border-[#E5E5E5] shadow-sm">
             <button 
               onClick={() => setBillingCycle('monthly')}
               className={`px-8 py-2 rounded-full font-orbitron font-bold text-xs uppercase tracking-widest transition-all ${billingCycle === 'monthly' ? 'bg-white shadow-md text-brandNavy' : 'text-textMuted'}`}
             >Monthly</button>
             <button 
               onClick={() => setBillingCycle('yearly')}
               className={`px-8 py-2 rounded-full font-orbitron font-bold text-xs uppercase tracking-widest transition-all ${billingCycle === 'yearly' ? 'bg-brandNavy shadow-md text-white' : 'text-textMuted'}`}
             >Yearly (-20%)</button>
           </div>
        </div>

        {/* Pricing Cards */}
        <div id="pricing-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
           {plans.map((plan, index) => (
             <motion.div 
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.6 }}
               className={`relative ${plan.highlight ? 'border-2 border-brandNavy shadow-2xl scale-[1.05]' : 'border border-[#E5E5E5] shadow-lg'} bg-white p-8 md:p-12 rounded-[3rem] flex flex-col items-center text-center group transition-all hover:-translate-y-2`}
             >
                {plan.highlight && (
                  <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-brandYellow text-brandNavy px-6 py-1.5 rounded-full font-orbitron font-black text-[10px] tracking-[0.2em] shadow-md uppercase">Recommended</div>
                )}
                
                <div className="p-4 bg-[#F9F9F9] rounded-2xl mb-6 shadow-sm border border-[#F0F0F0]">
                   {plan.icon}
                </div>
                
                <h3 className="text-2xl font-orbitron font-black text-brandNavy mb-2 uppercase">{plan.name}</h3>
                <p className="text-sm font-exo text-textMuted mb-8 font-semibold">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-4xl font-orbitron font-black text-brandNavy">₹{plan.price}</span>
                   <span className="text-textMuted font-exo font-bold uppercase tracking-widest text-[10px]">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                </div>

                <div className="w-full space-y-4 mb-10 text-left">
                   {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <Check className={`w-4 h-4 ${plan.highlight ? 'text-brandYellow' : 'text-green-500'}`} />
                         <span className="text-sm font-exo font-semibold text-textSecondary uppercase tracking-tight">{f}</span>
                      </div>
                   ))}
                </div>

                <Link 
                  to={plan.price === 0 ? "/signup" : `/checkout?plan=${plan.name.toLowerCase()}`}
                  className={`w-full py-4 rounded-2xl font-orbitron font-bold uppercase tracking-widest text-sm transition-all shadow-md flex items-center justify-center gap-2 ${plan.highlight ? 'bg-brandNavy text-white hover:bg-brandBlue' : 'bg-white border-2 border-brandNavy text-brandNavy hover:bg-brandNavy hover:text-white'}`}
                >
                   {plan.price === 0 ? <UserPlus className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                   {plan.cta}
                </Link>
             </motion.div>
           ))}
        </div>

        {/* Comparison Table Link */}
        <div className="text-center p-12 bg-[#F9F9F9] border border-[#E5E5E5] rounded-[2.5rem] shadow-sm">
           <Layout className="w-10 h-10 text-textMuted mx-auto mb-4" />
           <h3 className="text-2xl font-orbitron font-bold text-brandNavy mb-2 uppercase">Still Unsure?</h3>
           <p className="text-textSecondary font-exo mb-8 max-w-xl mx-auto font-medium">Download our plan comparison PDF or speak with a career counselor to find the perfect fit for your preparation.</p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-secondary px-10 py-3 uppercase tracking-widest text-xs flex items-center gap-2 justify-center">Download PDF <Check className="w-4 h-4" /></button>
              <button className="btn-primary px-10 py-3 uppercase tracking-widest text-xs flex items-center gap-2 justify-center">Talk to Expert <ArrowRight className="w-4 h-4" /></button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default PricingPage;
