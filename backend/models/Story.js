const mongoose = require("mongoose")

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0,
    },
    author: {
        type: String,
        required: true
    },
    postAt: {
        type: String,
        default: "Unknown"
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Story", storySchema);  