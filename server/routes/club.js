const router = require("express").Router();
const Club = require("../model/Club");
const User = require("../model/User");
const checkSuperAdmin = require("../helper/checkSuperAdmin");
const verifyClubAdmin = require("../helper/verifyClubAdmin");

router.post("/", checkSuperAdmin, async (req, res) => {
  try {
    const { name, admin_emails } = req.body;
    const admins = [];

    for (const email of admin_emails) {
      const user = await User.findOne({ email }).exec();
      admins.push(user._id);
    }

    const club = new Club({ name, admins });
    await club.save();
    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id }).populate("admins");

    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

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

router.post("/:id/admin", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.id });
    verifyClubAdmin(club, req.user);
    const { admin_emails } = req.body;

    const admins = club.admins.map((id) => id.toString());

    for (const email of admin_emails) {
      const user = await User.findOne({ email }).exec();
      const id = user._id.toString();
      if (!admins.includes(id)) admins.push(id);
    }

    club.admins = admins;
    await club.save();
    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

router.delete("/:clubId/admin/:userId", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    verifyClubAdmin(club, req.user);

    const admin_id = req.params.userId;
    club.admins = club.admins.filter((id) => id.toString() !== admin_id);
    await club.save();
    res.send(club);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
