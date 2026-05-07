const asyncHandler = require("express-async-handler")

const Story = require("../models/Story");
const User = require("../models/User");

const getStories = asyncHandler(async (req, res) => {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalStories = await Story.countDocuments();

    const stories = await Story.find()
        .sort({
            points: -1,
        })
        .skip(skip)
        .limit(limit);

    res.json({
        success: true,

        currentPage: page,

        totalPages: Math.ceil(totalStories / limit),

        totalStories,

        count: stories.length,

        message: "Stories fetched successfully",

        stories,
    });
});

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

const toggleBookmark = asyncHandler(async (req, res) => {
    const storyId = req.params.id;

    const user = await User.findById(req.user._id);

    const story = await Story.findById(storyId);

    if (!story) {
        res.status(404);

        throw new Error("Story not found");
    }

    const alreadyAdded = user.bookmarks.includes(storyId);

    if (alreadyAdded) {

        user.bookmarks = user.bookmarks.filter(
            (id) => id.toString() !== storyId
        );

        await user.save();

        return res.json({
            success: true,
            message: "Bookmark removed successfully",
            bookmarks: user.bookmarks,
        });
    }

    user.bookmarks.push(storyId);

    await user.save();

    return res.json({
        success: true,
        message: "Bookmark added successfully",
        bookmarks: user.bookmarks,
    });
});

const getBookmarks = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate(
        "bookmarks"
    );

    res.json({
        success: true,
        message: "Bookmarks fetched successfully",
        bookmarks: user.bookmarks,
    })
})

module.exports = { getStories, getSingleStory, toggleBookmark, getBookmarks };