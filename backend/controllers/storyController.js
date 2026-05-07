const asyncHandler = require("express-async-handler")

const Story = require("../models/Story");

const getStories = asyncHandler(async (req, res) => {
    const stories = await Story.find().sort({
        points: -1,
    })
    res.json({
        success: true,
        count: stories.length,
        message: "Stories fetched successfully",
        stories,
    })
})

const getSingleStory = asyncHandler(async (req, res) => {
    const story = await Story.findById(req.params.id)

    if (!story) {
        res.status(404);

        throw new Error("Story not found");
    }
    res.json({
        success: true,
        message: "Story fetched successfully",
        story,
    })
})

module.exports = { getStories, getSingleStory };