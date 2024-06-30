const express = require("express");
const Payment = require("../models/paymentModel");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/add-payment", async (req, res) => {
  const { user, booking, amount, currency, paymentMethodId } = req.body;

  try {
    const payment = {
      user,
      booking,
      currency,
      amount: currency === "INR" ? amount * 100 : amount,
    };
    const razorpayOrder = await razorpay.orders.create(payment);

    const newPayment = new Payment({
      user,
      booking,
      amount,
      currency,
      paymentMethodId: razorpayOrder.id,
    });
    await newPayment.save();

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
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

router.put("/edit-payment/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body);
    if (!payment) {
      return res.status(400).json({ message: "No such payment found" });
    }
    res.json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-payment/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(400).json({ message: "No such payment found" });
    }
    res.json({ message: "Payment deleted Sucessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
