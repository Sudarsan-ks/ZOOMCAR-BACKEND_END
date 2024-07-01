const express = require("express");
const Payment = require("../models/paymentModel");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();

const router = express.Router();

router.post("/add-payment", async (req, res) => {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const { user, booking, amount, currency } = req.body;

  try {
    const payment = {
      amount: currency === "INR" ? amount * 100 : amount,
      currency,
    };
    const Order = await razorpay.orders.create(payment);
    if (!Order) {
      res.status(500).json({ error: error.message });
    }

    const newPayment = new Payment({
      user,
      booking,
      amount,
      currency,
      paymentMethodId: Order.id,
    });
    await newPayment.save();

    res.json(Order);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/get-payment", async (req, res) => {
  try {
    const payment = await Payment.find();
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/get-payment/:id", async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(400).json({ message: "Not such payment found" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
