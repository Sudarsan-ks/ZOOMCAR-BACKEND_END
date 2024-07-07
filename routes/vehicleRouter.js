const express = require("express");
const Vehicle = require("../models/vehicleModel");
const auth = require("./auth");

const router = express.Router();

router.post("/add-vehicle", async (req, res) => {
  try {
    const newVechile = new Vehicle(req.body);
    await newVechile.save();
    res.json("Vehicle added sucessfully");
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.get("/get-vehicle", auth, async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/get-vehicle/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/get-vehicle/brand/:brand", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ brand: req.params.brand });
    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for the specified brand" });
    }
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching vehicles",
      error: err.message,
    });
  }
});

router.get("/get-vehicle/model/:model", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ model: req.params.model });
    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for the specified model" });
    }
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching vehicles",
      error: err.message,
    });
  }
});

router.get("/get-vehicle/category/:category", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ category: req.params.category });
    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for the specified category" });
    }
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching vehicles",
      error: err.message,
    });
  }
});

router.get("/get-vehicle/year/:year", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ year: req.params.year });
    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for the specified year" });
    }
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching vehicles",
      error: err.message,
    });
  }
});

router.get("/get-vehicle/price/:pricePerDay", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      pricePerDay: { $lt: req.params.pricePerDay },
    });
    if (vehicles.length === 0) {
      return res
        .status(404)
        .json({ message: "No vehicles found for the specified year" });
    }
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred while fetching vehicles",
      error: err.message,
    });
  }
});

router.put("/edit-vehicle/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body);
    if (!vehicle) {
      return res.status(404).send({ message: "Vehicle not found" });
    } else {
      res.json(vehicle);
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.delete("/delete-vehicle/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).send({ message: "Vehicle not found" });
    } else {
      res.send("Vehicle deleted");
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

module.exports = router;
