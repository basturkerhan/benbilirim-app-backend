const mongoose = require("mongoose")
const Schema = mongoose.Schema

const VideoSchema = new Schema({
    path: {
        type: String,
        required: [true, "Video yolunu vermek zorunludur"],
        unique: true
    },
    isGoal: {
        type: Boolean,
        required: [true, "Videoda gol olup olmadığını girmeniz gerekmektedir."]
    },
    waitTime: {
        type: Number,
        required: [true, "Videonun hangi zamanda duracağını vermeniz gerekmektedir."]
    },
    usersWatching: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        }
    ]
})

module.exports = mongoose.model("Video", VideoSchema)