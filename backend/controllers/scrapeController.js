const asyncHandler = require("express-async-handler")

const scrapeStories = require("../scraper/scrapeStories");

const scrapeNews = asyncHandler(async (req, res) => {
    await scrapeStories();
    resizeBy.status(200).json({
        success: true,
        message: "News scraped successfully",
    });
})

module.exports = { scrapeNews };