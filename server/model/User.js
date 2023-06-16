const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    regNo: {
      type: String,
      required: true,
      unique: true,
      min: 6,
    },
    branch: {
      type: String,
      required: true,
      max: 255,
      min: 3,
    },
    batch: {
      type: Number,
      required: true,
      length: 4,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    participatedEvents: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    ],
    adminOfClub: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
