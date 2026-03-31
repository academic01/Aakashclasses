import React from 'react';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-brandBeige pt-[120px]">

      {/* Header Section */}
      <section className="px-6 md:px-20 py-16 text-center border-b border-brandNavy/5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-brandNavy mb-4">Privacy Policy</h1>
          <p className="text-gray-500 font-bold mb-4 uppercase tracking-widest text-sm">Last Updated: March 30, 2026</p>
          <p className="text-gray-600 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
             Your privacy is important to us. This policy outlines how we collect, use, and transfer your personal information.
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-20 py-24">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
          {/* Sidebar Navigation (Desktop) */}
          <div className="hidden md:flex flex-col gap-4 w-1/4 h-fit sticky top-[150px]">
            <a href="#collection" className="font-bold text-gray-800 hover:text-orange-500 transition-colors">Information Collection</a>
            <a href="#usage" className="font-bold text-gray-800 hover:text-orange-500 transition-colors">How We Use It</a>
            <a href="#sharing" className="font-bold text-gray-800 hover:text-orange-500 transition-colors">Information Sharing</a>
            <a href="#security" className="font-bold text-gray-800 hover:text-orange-500 transition-colors">Data Security</a>
            <a href="#cookies" className="font-bold text-gray-800 hover:text-orange-500 transition-colors">Cookies Policy</a>
          </div>

          {/* Policy Body */}
          <div className="flex-1 text-gray-700 leading-relaxed font-outfit text-lg space-y-12">
            
            <div id="collection" className="scroll-mt-[150px]">
              <h2 className="text-3xl font-black text-brandNavy mb-6 flex items-center gap-3">
                <Eye className="w-8 h-8 text-orange-500" /> Information We Collect
              </h2>
              <p className="mb-4">
                We collect personal information such as your name, email address, mobile number, and age to provide you with the best learning experience.
              </p>
              <ul className="list-disc ml-6 space-y-3 font-medium text-gray-600">
                <li>Account Details: Name, Email, Password, Phone</li>
                <li>Device Information: IP, Browser type, OS</li>
                <li>Usage Data: Courses viewed, test performance, session duration</li>
              </ul>
            </div>

            <div id="usage" className="scroll-mt-[150px]">
              <h2 className="text-3xl font-black text-brandNavy mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-500" /> How We Use Your Data
              </h2>
              <p className="mb-4">
                Your data helps us personalize your dashboard, recommend courses, and track your educational progress accurately.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 font-bold text-sm text-blue-800">Customized Learning Paths</div>
                <div className="p-6 bg-green-50 rounded-2xl border border-green-100 font-bold text-sm text-green-800">Support Communications</div>
                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 font-bold text-sm text-orange-800">Product Improvements</div>
                <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 font-bold text-sm text-purple-800">Legal Compliance</div>
              </div>
            </div>

            <div id="security" className="scroll-mt-[150px]">
              <h2 className="text-3xl font-black text-brandNavy mb-6 flex items-center gap-3">
                <Lock className="w-8 h-8 text-red-500" /> Information Security
              </h2>
              <p className="mb-4">
                We maintain appropriate technical and organizational measures to prevent unauthorized access or disclosure of your personal information.
              </p>
              <p>
                All sensitive data like passwords are encrypted using multi-level hashing.
              </p>
            </div>

            <div className="p-10 bg-brandNavy text-brandBeige rounded-[40px] text-center">
               <h3 className="text-2xl font-black mb-4">Questions about our policy?</h3>
               <p className="mb-8 font-medium text-gray-400">Reach out to our privacy officer for any concerns or data requests.</p>
               <a href="mailto:privacy@aakashacademics.com" className="bg-orange-500 text-brandNavy px-10 py-4 rounded-xl font-black hover:bg-orange-400 transition-colors">
                  Contact Privacy Team
               </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
