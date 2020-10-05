const asyncHandler = require("express-async-handler")
const CustomError = require("../../helpers/errors/CustomError")
const Video = require("../../models/Video")

const checkVideoExist = asyncHandler(async (req, res, next) => {
    const video_id = req.params.id || req.params.video_id
    const video = await Video.findById(video_id)
    if (!video) {
        return next(new CustomError("Böyle bir video bulunamadı", 400))
    }
    req.data = video
    next()
})

module.exports = {
    checkVideoExist
}