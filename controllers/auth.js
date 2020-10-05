const asyncHandler = require('express-async-handler');
const User = require("../models/User")
const CustomError = require("../helpers/errors/CustomError")
const { comparePassword } = require("../helpers/input/inputHelpers");
const { sendJwtToClient } = require('../helpers/autherization/tokenHelpers');
const sendEmail = require("../helpers/libraries/sendEmail")


const register = asyncHandler(async (req, res) => {
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    res.json({
        status: true,
        data: user
    })
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new CustomError("Bu email adresine ait bir kullanıcı bulunamadı", 400))
    }
    if (!comparePassword(password, user.password)) {
        return next(new CustomError("Girdiğiniz şifre doğru değil", 400))
    }
    if (user.blocked) {
        return next(new CustomError("Bu email adresine ait kullanıcı bloke edilmiştir", 400))
    }

    sendJwtToClient(user, res)
})

const forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return next(new CustomError("Bu email adresine ait bir hesap bulunmamaktadır", 400))
    }

    const resetPasswordToken = user.getResetPasswordTokenFromUser()
    await user.save()

    const resetPassordUrl = `${process.env.FRONT_END_URL}/resetpassword/${resetPasswordToken}`

    const emailTemplate = `<h3>Şifre Sıfırlama Bağlantısı</h3>
                           <p>Sayın ${user.firstName} ${user.lastName}, <a href="${resetPassordUrl}">Şifrenizi sıfırlamak için tıklayınız</a></p>`
    try {
        await sendEmail({
            from: `"Benbilirim" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Benbilirim Şifre Sıfırlama Adresi",
            html: emailTemplate
        })
        res
            .status(200)
            .json({
                status: true,
                message: "email gönderildi"
            })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        return next(new CustomError("email bulunamadı", 400))
    }

})

const resetPassword = asyncHandler(async (req, res, next) => {
    const { resetPasswordToken } = req.query
    const { password } = req.body
    console.log(resetPasswordToken, password)
    if (!resetPasswordToken) {
        return next(new CustomError("Geçersiz bir sıfırlama bağlantısına sahipsiniz", 400))
    }

    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new CustomError("Zamanı geçmiş veya geçersiz bir şifre sıfrlama talebinde bulundunuz. Lütfen tekrar talepte bulunun", 400))
    }
    user.password = password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    return res
        .status(200)
        .json({
            status: true,
            message: "Şifreniz başarıyla sıfırlandı"
        })
})

const logout = asyncHandler(async (req, res, next) => {
    const { NODE_ENV } = process.env
    return res
        .status(200)
        .cookie({
            httpOnly: true,
            expires: new Date(Date.now()),
            security: NODE_ENV === "development" ? false : true
        })
        .json({
            status: true,
            message: "Başarıyla çıkış yapıldı"
        })
})

const me = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id })
    res.status(200).json(user)
})


module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
    me
}