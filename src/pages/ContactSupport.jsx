import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactSupport = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you for reaching out! We'll get back shortly. ✨");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-brandBeige pt-[120px]">

      {/* Header */}
      <section className="px-6 md:px-20 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-brandNavy mb-4">We're Here to <span className="text-orange-500">Help</span></h1>
          <p className="text-gray-500 font-medium text-lg lg:text-xl">Have questions? Reach out to us anytime, we're here for you.</p>
        </motion.div>
      </section>

      {/* Contact Grid */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info Cards */}
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="bg-brandBeige p-8 rounded-3xl border border-brandNavy/5 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brandNavy mb-2">Email Us</h3>
              <p className="text-gray-500 font-medium mb-4">Our friendly team is here to help.</p>
              <a href="mailto:support@aakashacademics.com" className="text-blue-600 font-bold hover:underline">support@aakashacademics.com</a>
            </div>

            <div className="bg-brandBeige p-8 rounded-3xl border border-brandNavy/5 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brandNavy mb-2">Call Us</h3>
              <p className="text-gray-500 font-medium mb-4">Mon-Fri from 9am to 6pm.</p>
              <a href="tel:+918178858202" className="text-green-600 font-bold hover:underline">+91 81788 58202</a>
            </div>

            <div className="bg-brandBeige p-8 rounded-3xl border border-brandNavy/5 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-brandNavy mb-2">Visit Us</h3>
              <p className="text-gray-500 font-medium mb-4">Come say hello at our office.</p>
              <p className="text-gray-800 font-bold leading-relaxed">C 66 Avantika, <br />Rohini Sec 1, Delhi</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 bg-brandBeige p-8 md:p-12 rounded-[40px] border border-brandNavy/5 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 text-brandNavy/5">
                <MessageSquare className="w-48 h-48" />
             </div>
             
             <h2 className="text-3xl font-black text-brandNavy mb-8 relative z-10">Send us a Message</h2>
             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Full Name</label>
                      <input 
                         type="text" 
                         required
                         value={formData.name}
                         onChange={e => setFormData({ ...formData, name: e.target.value })}
                         className="w-full bg-lightBg2 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-brandNavy/10 border border-transparent transition-all font-medium" 
                         placeholder="Enter your name" 
                      />
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Email Address</label>
                      <input 
                         type="email" 
                         required
                         value={formData.email}
                         onChange={e => setFormData({ ...formData, email: e.target.value })}
                         className="w-full bg-lightBg2 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-brandNavy/10 border border-transparent transition-all font-medium" 
                         placeholder="Enter your email" 
                      />
                   </div>
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Subject</label>
                   <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-lightBg2 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-brandNavy/10 border border-transparent transition-all font-medium" 
                      placeholder="What is this about?" 
                   />
                </div>
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-2">Message</label>
                   <textarea 
                      rows="5"
                      required
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-lightBg2 px-6 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-brandNavy/10 border border-transparent transition-all font-medium resize-none" 
                      placeholder="How can we help?" 
                   ></textarea>
                </div>
                <button 
                   type="submit" 
                   disabled={submitting}
                   className="btn-primary w-full md:w-auto bg-brandNavy text-brandBeige px-12 py-5 rounded-2xl font-black text-lg shadow-xl shadow-brandNavy/20 hover:scale-105 hover:shadow-brandNavy/30 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                   {submitting ? 'Sending...' : 'Send Message'}
                   <Send className="w-5 h-5" />
                </button>
             </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactSupport;
