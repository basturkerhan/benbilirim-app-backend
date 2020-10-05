const express = require("express")
const router = express.Router()
const { getAccessToRoute } = require("../middlewares/autherization/auth")
const { me, getAllUsers } = require("../controllers/user")

router.get("/", getAllUsers)
router.get("/me", getAccessToRoute, me)

module.exports = router