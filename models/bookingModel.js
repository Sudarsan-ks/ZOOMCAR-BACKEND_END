const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
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
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;
