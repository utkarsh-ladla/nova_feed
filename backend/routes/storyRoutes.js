const express = require("express");

const router = express.Router();

const {
    getStories,
    getSingleStory,
} = require("../controllers/storyController");

router.get("/", getStories);

router.get("/:id", getSingleStory);

module.exports = router;