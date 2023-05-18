const Club = require("../model/Club");
const User = require("../model/User");
const router = require("express").Router();

// Create a club
router.post("/", async (req, res) => {
  try {
    const { name, admin_emails } = req.body;
    const admins = [];

    // Check if user is a valid admin
    for (const email of admin_emails) {
      const user = await User.findOne({ email }).exec();
      admins.push(user._id);
    }

    // Create a new club
    const club = new Club({ name, admins });
    await club.save();
    res.send({ club });
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err);
  }
});

module.exports = router;
