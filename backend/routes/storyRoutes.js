const express = require("express");

const router = express.Router();

const {
    getStories,
    getSingleStory,
    toggleBookmark,
    getBookmarks,
} = require("../controllers/storyController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getStories);

router.get("/bookmarks", protect, getBookmarks);

router.get("/:id", getSingleStory);

router.post("/:id/bookmark", protect, toggleBookmark);

module.exports = router;