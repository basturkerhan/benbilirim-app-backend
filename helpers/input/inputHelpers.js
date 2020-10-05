const bcrypt = require("bcryptjs")

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword)
}

module.exports = {
    comparePassword
}