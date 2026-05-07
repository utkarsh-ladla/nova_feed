require("dotenv").config()
const app = require("./app")
const connectDB = require("./config/db")
const scrapeStories = require("./scraper/scrapeStories")
const PORT = process.env.PORT || 5000;

connectDB()

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await scrapeStories();
});