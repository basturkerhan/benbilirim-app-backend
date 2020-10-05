const asyncHandler = require('express-async-handler');
const User = require("../models/User")
const CustomError = require("../helpers/errors/CustomError")


const block = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return next(new CustomError("Bu email adresiyle bir kullanıcı bulunamadı", 400))
    }
    user.blocked = true
    await user.save()
    res.status(200).json({
        status: true,
        message: "Kullanıcı başarıyla bloklandı"
    })
})

module.exports = {
    block
}