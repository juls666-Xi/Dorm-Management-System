const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/User");

const router = express.Router();

const DEFAULT_USERS = [
  {
    username: "admin",
    password: "admin123",
    name: "Admin Account",
    role: "Dorm Manager",
    initials: "AA",
    type: "admin",
  },
  {
    username: "maria.santos",
    password: "resident123",
    name: "Maria Santos",
    role: "Room 101 - Floor 1",
    initials: "MS",
    type: "occupant",
    room: "101",
  },
  {
    username: "james.reyes",
    password: "resident123",
    name: "James Reyes",
    role: "Room 205 - Floor 2",
    initials: "JR",
    type: "occupant",
    room: "205",
  },
];

const ensureDefaultUsers = async () => {
  const count = await User.estimatedDocumentCount();

  if (count > 0) {
    return;
  }

  await User.insertMany(DEFAULT_USERS);
  console.log("Seeded default login users.");
};

router.post("/login", async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: "Database is not connected. Check MONGO_URI and restart the API.",
      });
    }

    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required.",
      });
    }

    await ensureDefaultUsers();

    const normalizedUsername = String(username).trim().toLowerCase();
    const query = role
      ? { username: normalizedUsername, type: role }
      : { username: normalizedUsername };

    const user = await User.findOne(query);

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }

    return res.json({
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name,
        role: user.role,
        initials: user.initials,
        type: user.type,
        room: user.room,
      },
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
