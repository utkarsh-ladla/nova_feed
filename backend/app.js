const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const morgan = require('morgan')
const storyRoutes = require('./routes/storyRoutes')
const scrapeRoutes = require('./routes/scrapeRoutes')
const authRoutes = require('./routes/authRoutes');

const {
    notFound,
    errorHandler,
} = require("./middleware/errorMiddleware");

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (req, res) => {
    res.send("NovaFeed Backend API is running...")

})
app.use('/api/auth', authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scrapeRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;