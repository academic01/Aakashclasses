import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, ArrowLeft, Trophy, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { processPayment } = useAppContext();
  const [loading, setLoading] = useState(false);
  
  const courseId = searchParams.get('courseId');
  const courseTitle = searchParams.get('title') || searchParams.get('plan') || 'Selected Course';
  const price = parseInt(searchParams.get('price')) || (courseTitle.includes('elite') ? 9999 : 4999);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to continue to checkout');
      navigate('/login?redirect=checkout');
    }
  }, [user]);

  const handlePayment = () => {
    setLoading(true);
    
    // Check if Razorpay is loaded (from index.html script)
    if (!window.Razorpay) {
      toast.error('Razorpay SDK failed to load. Please refresh.');
      setLoading(false);
      return;
    }

    const options = {
      key: 'rzp_test_mockkey', // Replace with your key
      amount: price * 100, // Amount in paise
      currency: "INR",
      name: "Aakash Academics",
      description: `Enrollment for ${courseTitle}`,
      image: "/aakashlogo.png",
      handler: function (response) {
        toast.success('Payment Successful!');
        processPayment(courseId || courseTitle, response);
        navigate('/dashboard?purchase=success');
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
      },
      theme: {
        color: "#0D2240",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
        toast.error('Payment Failed: ' + response.error.description);
        setLoading(false);
    });
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-textMuted hover:text-brandNavy font-exo font-bold text-xs uppercase mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Selection
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-6"
          >
             <div className="bg-white p-8 rounded-[2.5rem] border border-[#E5E5E5] shadow-lg">
                <h2 className="text-xl font-orbitron font-bold text-brandNavy mb-6 uppercase tracking-tight">Order Summary</h2>
                <div className="space-y-4 mb-10">
                   <div className="flex justify-between items-center py-4 border-b border-[#F0F0F0]">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-brandNavy/5 rounded-xl flex items-center justify-center border border-brandNavy/10">
                            <Trophy className="w-5 h-5 text-brandNavy" />
                         </div>
                         <div>
                            <div className="text-xs font-orbitron font-bold text-brandNavy uppercase tracking-widest leading-tight">{courseTitle}</div>
                            <div className="text-[10px] text-textMuted uppercase font-bold">Billing Cycle: Lifetime Access</div>
                         </div>
                      </div>
                      <span className="font-orbitron font-bold text-brandNavy">₹{price}</span>
                   </div>
                   <div className="flex justify-between text-xs font-exo font-bold text-textMuted uppercase">
                      <span>GST (18%)</span>
                      <span>Included</span>
                   </div>
                </div>
                
                <div className="flex justify-between items-center bg-[#F9F9F9] p-4 rounded-xl border border-dashed border-[#E5E5E5]">
                   <span className="text-xs font-orbitron font-bold text-brandNavy uppercase">Total Amount</span>
                   <span className="text-2xl font-orbitron font-bold text-brandNavy tracking-widest">₹{price}</span>
                </div>
             </div>

             <div className="bg-brandYellow/5 p-6 rounded-2xl border border-brandYellow/20 flex gap-4 items-start">
                <CheckCircle className="w-6 h-6 text-brandYellow shrink-0" />
                <p className="text-xs font-exo font-semibold text-brandNavy leading-relaxed opacity-80 uppercase tracking-tight">
                  You are eligible for our 7-day money-back guarantee. If you are not satisfied with the course, get a full refund no questions asked.
                </p>
             </div>
          </motion.div>

          {/* Secure Checkout Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E5E5E5] shadow-xl flex flex-col items-center text-center"
          >
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6 border border-green-100">
                <ShieldCheck className="w-8 h-8" />
             </div>
             <h3 className="text-2xl font-orbitron font-bold text-brandNavy mb-4 uppercase">Secure Gateway</h3>
             <p className="text-textSecondary font-exo text-sm mb-10 font-medium tracking-tight">Click the button below to initiate the secure payment via Razorpay. Your transaction is 256-bit encrypted.</p>
             
             <div className="w-full space-y-4 mb-2">
                <button 
                  disabled={loading}
                  onClick={handlePayment}
                  className="btn-primary w-full py-5 text-xs uppercase tracking-[0.2em] font-orbitron flex items-center justify-center gap-3 shadow-xl"
                >
                   {loading ? (
                     <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                   ) : (
                     <><CreditCard className="w-5 h-5" /> PAY ₹{price} SECURELY</>
                   )}
                </button>
             </div>
             <div className="flex items-center gap-1.5 text-[9px] font-orbitron font-bold text-textMuted tracking-widest uppercase">
                <Lock className="w-3 h-3" /> PCI DSS Compliant
             </div>

             <div className="mt-12 pt-8 border-t border-[#F0F0F0] w-full flex items-center justify-center gap-6 grayscale opacity-40">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="Paypal" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="Visa" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4" alt="Mastercard" />
             </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
