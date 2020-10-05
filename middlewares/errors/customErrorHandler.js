const CustomError = require("../../helpers/errors/CustomError")

const customErrorHandler = (err, req, res, next) => {
    let customError = err
    console.log(customError)

    if (err.code === 11000) {
        customError = new CustomError("Aynı email adresi tekrar kullanılamaz", 400)
    }
    if (err.name === "CastError") {
        customError = new CustomError("Geçersiz token bilgisi", 400)
    }
    if (customError.name === "SyntaxError") {
        customError = new CustomError("Sözdizimsel Hata", 400)
    }
    if (customError.name === "ValidationError") {
        customError = new CustomError(err.message, 400)
    }

    res
        .json({
            status: false,
            message: customError.message || "Bilinmeyen bir hata oluştu"
        })
}

module.exports = customErrorHandler;