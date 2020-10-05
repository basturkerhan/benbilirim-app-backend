const express = require("express")
const auth = require("./auth")
const video = require("./video")
const user = require("./user")
const admin = require("./admin")
const router = express.Router()

router.use("/auth", auth)
router.use("/videos", video)
router.use("/users", user)
router.use("/admin", admin)

module.exports = router;