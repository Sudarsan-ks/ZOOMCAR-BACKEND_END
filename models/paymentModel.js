const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "succeeded", "failed"],
      default: "pending",
    },
    paymentMethodId: { type: String, required: true },
    razorpayPaymentId: { type: String }, 
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
