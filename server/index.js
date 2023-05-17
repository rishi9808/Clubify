const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/auth');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors())

// Route Middlewares
app.use('/api/user', authRoute);


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
