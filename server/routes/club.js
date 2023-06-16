const router = require("express").Router();
const Club = require("../model/Club");
const User = require("../model/User");
const checkSuperAdmin = require("../helper/checkSuperAdmin");
const verifyClubAdmin = require("../helper/verifyClubAdmin");

// create a new club (only super admin )
router.post("/", checkSuperAdmin, async (req, res) => {
  try {
    const { name, admin_emails } = req.body;
    const admins = [];
    for (const email of admin_emails) {
      const user = await User.findOne({ email }).exec();
      if (!admins.includes(user._id)) admins.push(user._id);
    }

    const club = new Club({ name, admins });
    await club.save();
    for (const admin of admins) {
      const user = await User.findOne({ _id: admin });
      user.adminOfClub.push(club._id);
      await user.save();
    }

    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// get details of requested club
router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id }).populate(
      "admins events"
    );

    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// delete the given club
router.delete("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    verifyClubAdmin(club, req.user);

    await Club.deleteOne({ _id: req.params.id });

    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// update club name
router.post("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    verifyClubAdmin(club, req.user);
    const { name } = req.body;
    club.name = name;
    await club.save();
    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// add admin to club
router.post("/:id/admin", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    verifyClubAdmin(club, req.user);
    const { admin_emails } = req.body;

    const admins = club.admins.map((id) => id.toString());

    for (const email of admin_emails) {
      const user = await User.findOne({ email }).exec();
      const id = user._id.toString();
      if (!admins.includes(id)) {
        admins.push(id);
        user.adminOfClub.push(club._id);
        await user.save();
      }
    }

    club.admins = admins;
    await club.save();
    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

// remove admin from club
router.delete("/:clubId/admin/:userId", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    verifyClubAdmin(club, req.user);

    const admin_id = req.params.userId;
    const user = await User.findOne({ _id: admin_id });
    club.admins = club.admins.filter((id) => id.toString() !== admin_id);

    user.adminOfClub = user.adminOfClub.filter(
      (id) => id.toString() !== req.params.clubId
    );
    await club.save();
    await user.save();
    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
