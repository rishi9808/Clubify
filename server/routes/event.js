const router = require("express").Router()
const Club = require("../model/Club")
const Event = require("../model/Event")
const verifyClubAdmin = require("../helper/verifyClubAdmin")

// create event
router.post("/", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.body.club })
    verifyClubAdmin(club, req.user)
    const event = new Event({ ...req.body })
    await event.save()
    club.events.push(event._id)
    await club.save()
    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})


// get all events
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id }).populate("club")

    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

// get all event participants
router.get("/:id/participants", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id }).populate(
      "participants"
    )

    res.send(event.participants)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})


// delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
    const club = await Club.findOne({ _id: event.club })
    verifyClubAdmin(club, req.user)

    await event.deleteOne({ _id: req.params.id })

    res.send({ success: true })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

// update event
router.post("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
    const club = await Club.findOne({ _id: req.body.clubId })
    verifyClubAdmin(club, req.user)

    // req.body = { name: '', desc: '' .... }
    for (const key in Object.keys(req.body)) {
      event[key] = req.body[key]
    }

    await event.save()
    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})

module.exports = router
