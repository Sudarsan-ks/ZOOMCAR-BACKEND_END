const express = require("express");
const Payment = require("../models/paymentModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const router = express.Router();

router.post("/add-payment", async (req, res) => {
  const { user, booking, amount, currency, paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
      return_url: "https://localhost:5000",
    });

    const newPayment = new Payment({
      user,
      booking,
      amount,
      currency,
      paymentMethodId: paymentIntent.id,
      status: paymentIntent.status,
    });
    await newPayment.save();

    res.status(200).json({ paymentIntent });
  } catch (err) {
    return res.status(500).json({ message: err.message });
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
