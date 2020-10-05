const express = require("express")
const router = express.Router()
const { checkVideoExist } = require("../middlewares/database/databaseErrorHalpers")
const { getAllVideos, getSingleVideo, addNewVideo, editVideo, deleteVideo, watchVideo } = require("../controllers/video")
const { getAccessToRoute, getAdminAccess } = require("../middlewares/autherization/auth")

router.get("/", getAccessToRoute, getAllVideos)
router.get("/:id", getAccessToRoute, checkVideoExist, getSingleVideo)
router.post("/add", getAccessToRoute, getAdminAccess, addNewVideo)
router.post("/:id/edit", getAccessToRoute, getAdminAccess, checkVideoExist, editVideo)
router.get("/:id/delete", getAccessToRoute, getAdminAccess, checkVideoExist, deleteVideo)

router.post("/:id/watch", getAccessToRoute, checkVideoExist, watchVideo)

module.exports = router