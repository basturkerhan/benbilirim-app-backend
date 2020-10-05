const express = require("express")
const { login, register, forgotPassword, resetPassword, logout, me } = require("../controllers/auth")
const { getAccessToRoute } = require("../middlewares/autherization/auth")

const router = express.Router()
router.post("/login", login)
router.post("/register", register)
router.post("/forgotpassword", forgotPassword)
router.post("/resetpassword", resetPassword)
router.get("/logout", getAccessToRoute, logout)

module.exports = router;