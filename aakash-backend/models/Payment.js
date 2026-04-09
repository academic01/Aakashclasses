const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
  amount: Number,
  originalAmount: Number,
  discount: Number,
  couponUsed: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  status: {
    type: String,
    enum: ['pending','success','failed','refunded']
  },
  paymentMethod: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Payment', PaymentSchema);
