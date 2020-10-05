const asyncHandler = require("express-async-handler")
const CustomError = require("../helpers/errors/CustomError")
const Video = require("../models/Video")
const User = require("../models/User")

const getAllVideos = asyncHandler(async (req, res) => {
    console.log("geldimm")
    const videos = await Video.find()
    res.status(200).json({
        status: true,
        data: videos
    })
})


const getSingleVideo = asyncHandler(async (req, res) => {
    const video = req.data

    res.status(200).json({
        status: true,
        data: video
    })
})

const addNewVideo = asyncHandler(async (req, res, next) => {
    const info = req.body
    const video = await Video.create({
        ...info
    })
    if (!video) {
        return next(new CustomError("Video oluşturulamadı, lütfen bilgileri kontrol et", 400))
    }
    res.status(200).json({
        status: true,
        message: "Video oluşturuldu",
        data: video
    })
})

const editVideo = asyncHandler(async (req, res, next) => {
    let video = req.data
    const { isGoal, waitTime } = req.body

    video.isGoal = isGoal
    video.waitTime = waitTime
    video = await video.save()

    res.status(200).json({
        status: true,
        message: "Video güncellendi"
    })
})

const deleteVideo = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    await Video.findByIdAndDelete(id)
    res.status(200).json({
        status: true,
        message: "Video silindi"
    })
})

const watchVideo = asyncHandler(async (req, res, next) => {

    const video = req.data
    const user = await User.findById(req.user.id)
    const { isGoal, count } = req.body
    let message = ""

    if (video.usersWatching.includes(user.id)) {
        message = "Bu video daha önce izlenmiş"
    }
    else {
        if (isGoal === video.isGoal) {
            user.point += count
            message = `BİLDİN! +${count} Puan Kazandın.`
        } else {
            user.point -= count
            message = `BİLEMEDİN! -${count} Puan Kaybettin.`
        }
        await user.save()

        video.usersWatching.push(user.id)
        await video.save()
    }



    res.status(200).json({
        status: true,
        user: user,
        message: message
    })
})

module.exports = {
    getAllVideos,
    getSingleVideo,
    addNewVideo,
    editVideo,
    deleteVideo,
    watchVideo,
}