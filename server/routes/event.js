const router = require("express").Router();
const Club = require("../model/Club");
const Event = require("../model/Event");
const User = require("../model/User");
const verifyClubAdmin = require("../helper/verifyClubAdmin");

//create event
router.post("/", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.body.club });
    verifyClubAdmin(club, req.user);
    const event = new Event({ ...req.body });
    await event.save();
    club.events.push(event._id);
    await club.save();
    res.send(event);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

//get event details
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id }).populate(
      "club prizes.winner"
    );

    const eventJSON = event.toJSON();
    res.send({
      ...eventJSON,
      prizes: eventJSON.prizes.map((prize) => ({
        ...prize,
        winnerEmail: prize.winner?.email,
      })),
    });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//get event participants
router.get("/:id/participants", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id }).populate(
      "participants"
    );

    res.send(event.participants);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

//delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    const club = await Club.findOne({ _id: event.club });
    verifyClubAdmin(club, req.user);

    await event.deleteOne({ _id: req.params.id });

    res.send({ success: true });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

// update event
router.post("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    const club = await Club.findOne({ _id: req.body.clubId });
    verifyClubAdmin(club, req.user);

    const { name, description, details, dates } = req.body;

    const prizesArray = req.body.prizes;
    delete req.body.prizes;
    event.prizes = []; // removes all elements from array

    for (const prize of prizesArray) {
      const email = prize.winnerEmail;
      const user = await User.findOne({ email }).exec();
      event.prizes.push({
        type: prize.type,
        amount: prize.amount,
        winner: user?._id,
      });
    }

    event.name = name;
    event.description = description;
    event.details = details;
    event.dates = dates;
    await event.save();
    res.send(event);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

//register in event or add Participants
router.post("/:id/register", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    const participant = await User.findOne({ _id: req.user._id });
    if (!event.participants.includes(req.user._id)) {
      participant.participatedEvents.push(event._id);
      event.participants.push(req.user._id);
    }

    await event.save();
    await participant.save();
    res.send(event);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

//remove participants or leave event
router.delete("/:id/participants", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });
    const participantId = req.body.participant;
    const participant = await User.findOne({ _id: participantId });
    event.participants = event.participants.filter(
      (id) => id.toString() !== participantId
    );

    participant.participatedEvents = participant.participatedEvents.filter(
      (id) => id.toString() !== event._id
    );
    await event.save();
    res.send(event);
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
