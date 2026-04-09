const crypto = require('crypto');
const instance = require('../config/razorpay');
const Payment = require('../models/Payment');
const User = require('../models/User');
const Course = require('../models/Course');

const paymentController = {
  // POST /api/payments/create-order
  createOrder: async (req, res) => {
    try {
      const { courseId } = req.body;
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      const amountInPaise = Math.round(course.price * 100);

      const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `receipt_order_${Date.now()}`,
      };

      const order = await instance.orders.create(options);
      
      res.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/payments/verify
  verifyPayment: async (req, res) => {
    try {
      const { razorpayOrderId, razorpayPaymentId, razorpaySignature, courseId } = req.body;

      const sign = razorpayOrderId + "|" + razorpayPaymentId;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'secret123')
        .update(sign.toString())
        .digest("hex");

      if (razorpaySignature === expectedSign) {
        // Payment is authentic
        const paymentRecord = new Payment({
          userId: req.user._id,
          courseId: courseId,
          amount: 0, // Should be populated from course price
          razorpayOrderId,
          razorpayPaymentId,
          razorpaySignature,
          status: 'success'
        });
        await paymentRecord.save();

        // Enroll User
        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            enrolledCourses: {
              courseId: courseId,
              enrolledAt: Date.now()
            }
          }
        });

        return res.json({ success: true, message: 'Payment verified successfully' });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid signature' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = paymentController;