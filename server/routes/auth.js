const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// register a new user
router.post('/register', async(req, res) => {
    //  hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //  create a new user
    const user = new User({
        ...req.body,
        password: hashedPassword
    })

    try {
        await user.save()
        res.send({ user })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// login a user
router.post('/login', async(req, res) => {
    // check if the email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email does not exist')

    // check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({ error: 'Invalid password' })

    // create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.send({ user , token: `Bearer ${token}`})
})

// verify the current user wheather they are registered or not
router.get('/verifyToken', async(req, res) => {
        if (req.user) {
            res.send({ user: req.user });
        } else {
            res.status(400).send({ error: "Invalid token" });
        }
});

// get user details
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate(
            "participatedEvents adminOfClub"
        )

        res.send(user);


    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

// update user details
router.post("/:id", async(req, res) => {
    try{
        const user = await User.findOne({ _id : req.params.id })

        const { name, email, dateOfBirth, rollNo, branch, batch, mobileNo } = req.body

        user.name = name
        user.email = email
        user.dateOfBirth = dateOfBirth
        user.rollNo = rollNo
        user.branch = branch
        user.batch = batch
        user.mobileNo = mobileNo

        await user.save()
        res.send(user)
    } catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
})

module.exports = router;
