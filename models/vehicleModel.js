const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    category: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    image: { type: String, required: true },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: "review" }],
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model("vehicle", vehicleSchema);

module.exports = Vehicle;
