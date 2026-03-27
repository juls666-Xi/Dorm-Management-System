const express = require("express");
const Resident = require("../models/Resident");

const router = express.Router();

router.get("/", async (_req, res, next) => {
  try {
    const residents = await Resident.find().sort({ createdAt: -1 }).limit(100);
    res.json(residents);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { fullName, roomNumber, status, monthlyRent } = req.body;

    if (!fullName || !roomNumber) {
      return res.status(400).json({
        message: "fullName and roomNumber are required.",
      });
    }

    const resident = await Resident.create({
      fullName,
      roomNumber,
      status,
      monthlyRent,
    });

    return res.status(201).json(resident);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
