const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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


router.post('/login', async(req, res) => {
    // check if the email exists
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email does not exist')

    // check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid password')

    // create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.send({ user , token: `Bearer ${token}`})
})

module.exports = router;
