const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vehicle",
      required: true,
    },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
