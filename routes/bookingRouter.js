const express = require("express");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const auth = require("./auth");

const router = express.Router();

router.post("/add-booking", async (req, res) => {
  const { user, vehicle, startDate, endDate, totalPrice } = req.body;
  try {
    const isBooking = await Booking.findOne({ user: user, vehicle: vehicle });
    if (isBooking) {
      return res
        .status(400)
        .json({ message: "This user already booked the specified vehicle" });
    }
    const newbooking = new Booking({
      user,
      vehicle,
      startDate,
      endDate,
      totalPrice,
    });
    await newbooking.save();
    await User.updateOne(
      { _id: user },
      { $push: { bookings: newbooking._id } }
    );
    res
      .status(201)
      .json({ bookingID: newbooking._id, message: "Booked Sucessfully" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/get-booking", auth, async (req, res) => {
  const userID = req.user._id;
  try {
    const booking = await Booking.find({ user: userID }).populate(
      "user vehicle"
    );
    if(booking.length===0){
      return res.status(500).json({message:"No booking found for the particular user."})
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/get-booking/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate(
      "user vehicle"
    );
    if (!booking) {
      return res.status(400).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/edit-booking/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body
    ).populate("user vehicle");
    if (!booking) {
      return res.status(400).json({ message: "Booking not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-booking/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(400).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted Sucessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
