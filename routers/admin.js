const express = require("express")
const { block } = require("../controllers/admin")
const { getAccessToRoute, getAdminAccess } = require("../middlewares/autherization/auth")

const router = express.Router()
router.use([getAccessToRoute, getAdminAccess])

router.post("/block", block)

module.exports = router;