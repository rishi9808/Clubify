const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const verifyToken = require('./helper/verifyToken');

const authRoute = require('./routes/auth');
const clubRoute = require('./routes/club');
const eventRoute = require('./routes/event');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors())

app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Route Middlewares
//this middleware checks which user is accessing the routes using the token and stores the user in req.user
app.use(async(req, res, next) => {
    try{
        const auth = req.headers["authorization"];
        if (auth) {
            const token = auth.replace("Bearer ", "");
            const user = await verifyToken(token);
            req.user = user;
        }
    }
    catch(err){
        console.log(err);
    }
    next();
});

app.use('/api/user', authRoute);
app.use('/api/club', clubRoute);
app.use('/api/event', eventRoute);


const main = async () => {
// Connect to DB
await mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('Connected to DB');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
}

main().catch((err) => {
    console.log(err);
}
);
