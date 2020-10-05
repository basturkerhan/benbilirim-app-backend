const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "İsim alanı boş bırakılamaz"]
    },
    lastName: {
        type: String,
        required: [true, "Soyisim alanı boş bırakılamaz"]
    },
    email: {
        type: String,
        required: [true, "Lütfen email adresinizi giriniz"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Lütfen geçerli bir mail adresi giriniz."
        ]
    },
    password: {
        type: String,
        required: [true, "Şifre alanı zorunludur"],
        minlength: [6, "Şifre en az 6 haneli olmalıdır"],
        select: false
    },
    point: {
        type: Number,
        default: 0
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    blocked: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
})

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    console.log("Sınır aşıldı")
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err)
            this.password = hash
            next()
        })
    })

})

UserSchema.methods.getResetPasswordTokenFromUser = function () {
    const randomHexString = crypto.randomBytes(15).toString("hex")

    const resetPasswordToken = crypto
        .createHash('SHA256')
        .update(randomHexString)
        .digest("hex")

    this.resetPasswordToken = resetPasswordToken
    const { RESET_PASSWORD_EXPIRE } = process.env;
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE)

    return resetPasswordToken
}


UserSchema.methods.generateJwtFromUser = function () {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
    const payload = {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY)
    return token
}


module.exports = mongoose.model("User", UserSchema);