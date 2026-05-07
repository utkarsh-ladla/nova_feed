const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

const app = express();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("NovaFeed Backend API is running...")

})
module.exports = app;