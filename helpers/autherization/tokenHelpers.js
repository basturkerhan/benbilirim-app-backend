const sendJwtToClient = (user, res) => {
    const token = user.generateJwtFromUser()

    return res
        .status(200)
        .json({
            status: true,
            access_token: token
        })
}

const isTokenIncluded = req => {
    return (
        req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
    )
}

const getAccessTokenFromHeader = req => {
    const authorization = req.headers.authorization
    const access_token = authorization.split(" ")[1]
    return access_token
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
}