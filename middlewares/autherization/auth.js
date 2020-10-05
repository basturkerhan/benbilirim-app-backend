const { isTokenIncluded, getAccessTokenFromHeader } = require("../../helpers/autherization/tokenHelpers")
const CustomError = require("../../helpers/errors/CustomError")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const asyncHandler = require('express-async-handler');

const getAccessToRoute = (req, res, next) => {
    if (!isTokenIncluded(req)) {
        return next(new CustomError("Lütfen bir token giriniz", 401))
    }
    const access_token = getAccessTokenFromHeader(req);
    jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("Lütfen geçerli bir token giriniz", 401))
        }
        req.user = {
            id: decoded.id,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
        }
        next();
    })
}

const getAdminAccess = asyncHandler(async (req, res, next) => {
    const { id } = req.user
    const user = await User.findById(id)
    if (user.role !== "admin") {
        return next(new CustomError("Bu alana giremezsiniz, admin rolünz yok", 403));
    }
    next();
})

module.exports = {
    getAccessToRoute,
    getAdminAccess
}