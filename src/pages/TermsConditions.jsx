import React from 'react';

import { motion } from 'framer-motion';
import { FileText, Gavel, Users, Info } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-brandBeige pt-[120px]">

      {/* Header Section */}
      <section className="px-6 md:px-20 py-16 text-center border-b border-brandNavy/5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <Gavel className="w-16 h-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-brandNavy mb-4">Terms & <span className="text-orange-500">Conditions</span></h1>
          <p className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-sm text-center">Last Updated: March 30, 2026</p>
          <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
             Please read these terms carefully before using our platform. Your access to the service is conditioned on your acceptance and compliance with these terms.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="p-10 bg-brandBeige border border-brandNavy/5 rounded-[48px] shadow-sm hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-8">
                  <Users className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-brandNavy mb-6 uppercase tracking-tight">1. User Eligibility</h3>
               <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                  <p>Students must be of legal age (or have guardian consent) to register and pay for courses.</p>
                  <p>You agree to provide true and accurate information while creating your account.</p>
                  <p>One account is permitted per student; sharing accounts may lead to permanent termination.</p>
               </div>
            </div>

            <div className="p-10 bg-brandBeige border border-brandNavy/5 rounded-[48px] shadow-sm hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-8">
                  <FileText className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-brandNavy mb-6 uppercase tracking-tight">2. Course Access & Content</h3>
               <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                  <p>All content is the property of Aakash Academics and protected by intellectual property laws.</p>
                  <p>Reproduction, distribution, or resale of study material is strictly prohibited.</p>
                  <p>Course access duration varies by program and will be specified at the time of purchase.</p>
               </div>
            </div>

            <div className="p-10 bg-brandBeige border border-brandNavy/5 rounded-[48px] shadow-sm hover:shadow-md transition-all">
               <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-8">
                  <Info className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-black text-brandNavy mb-6 uppercase tracking-tight">3. Payments & Refund</h3>
               <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                  <p>All payments are processed securely through authorized partners.</p>
                  <p>Fees are non-refundable unless specifically stated in a course-specific guarantee.</p>
                  <p>We reserve the right to change our pricing structure at any time with prior notice.</p>
               </div>
            </div>

            <div className="p-10 bg-brandNavy text-brandBeige rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col justify-center">
               <div className="absolute top-0 right-0 p-12 text-brandBeige/5">
                  <Gavel className="w-48 h-48" />
               </div>
               <h3 className="text-2xl font-black mb-6 relative z-10 uppercase tracking-tight">Important Note</h3>
               <p className="text-gray-400 font-medium leading-relaxed relative z-10 mb-8">
                  By clicking "Join Now" or purchasing a course, you agree to these legal terms in their entirety. 
                  Violation of these terms may result in immediate account suspension without refund.
               </p>
               <a href="/contact" className="bg-orange-500 text-brandNavy px-8 py-4 rounded-xl font-black inline-flex items-center gap-2 group w-fit relative z-10">
                  Contact Support <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </a>
            </div>

        </div>
      </section>

    </div>
  );
};

export default TermsConditions;
function ArrowRight(props) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}
