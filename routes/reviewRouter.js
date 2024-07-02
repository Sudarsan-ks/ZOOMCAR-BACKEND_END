const express = require("express");
const Review = require("../models/reviewModel");
const Vehicle = require("../models/vehicleModel");

const router = express.Router();

router.post("/add-review", async (req, res) => {
  const { user, vehicle, rating, comment } = req.body;
  try {
    const isReview = await Review.findOne({ user: user, vehicle: vehicle });
    if (isReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed the vehicle" });
    }
    const newReview = new Review({
      user,
      vehicle,
      rating,
      comment,
    });
    await newReview.save();
    await Vehicle.updateOne(
      { _id: vehicle },
      { $push: { review: newReview._id } }
    );
    res.status(201).json("Reviewed Sucessfully");
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/get-review", async (req, res) => {
  try {
    const review = await Review.find().populate("user vehicle");
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/get-review/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user vehicle"
    );
    if (!review) {
      return res.status(400).json({ message: "Vehicle not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/edit-review/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body
    ).populate("user vehicle");
    if (!review) {
      return res.status(400).json({ message: "Vehicle not found" });
    }
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/delete-review/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(400).json({ message: "Vehicle not found" });
    }
    res.json({ message: "Review deleted Sucessfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
