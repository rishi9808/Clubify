const Club = require("../model/Club");
const User = require("../model/User");
const router = require("express").Router();

// Create a club
router.post("/", async (req, res) => {
  try {
    const { name, admin_emails } = req.body;
    const admins = [];

    // Check if admin_emails is an array
    if (!Array.isArray(admin_emails)) {
      return res.status(400).send({ error: "admin_emails must be an array" });
    }

    // Check if user is a valid admin
    for (const email of admin_emails) {
      const user = await User.findOne({ email }).exec();
      if (user) {
        admins.push(user._id);
      } else {
        return res.status(400).send({ error: `User not found for email: ${email}` });
      }
    }

    // Create a new club
    const club = new Club({ name, admins });
    await club.save();
    res.send(club);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err);
  }
});

// Get club by id
router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id })
      .populate("admins")
      .exec();
    res.send(club);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err);
  }
});

module.exports = router;
