const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            require: [true, "Email is required"],
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            require: [true, "Password is required"],
            minlength: 6
        },
        bookmark: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Story"
            },
        ],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", userSchema);