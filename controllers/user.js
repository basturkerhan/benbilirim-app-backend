const asyncHandler = require('express-async-handler');
const User = require("../models/User")
const CustomError = require("../helpers/errors/CustomError")

const getAllUsers = asyncHandler(async (req, res, next) => {
    let query = User.find()

    // Pagination
    const page = parseInt(req.query.page)
    const limit = 11
    const startIndex = (page - 1) * limit
    const endIndex = page * limit;
    const total = await User.countDocuments();

    //Population
    const populateObject = {
        path: "",
        select: "firstName lastName point"
    }
    query = query.populate(populateObject)

    const pagination = {}
    pagination.now = {
        page: page,
        limit: limit,
    }
    if (startIndex > 0) {
        pagination.previous = {
            page: page - 1,
            limit: limit,
        }
    }
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit: limit
        }
    }
    //Sort
    query = query.sort("-point")
    query = query.skip(startIndex).limit(limit);

    const queryResults = await query;

    res.status(200).json({
        success: true,
        count: queryResults.length,
        pagination: pagination,
        data: queryResults
    })
})


const me = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ _id: req.user.id })
    res.status(200).json(user)
})

module.exports = {
    me,
    getAllUsers
}