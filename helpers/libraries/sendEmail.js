const nodemailer = require("nodemailer");

const sendEmail = async function (mailOptions) {
    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })

    transporter.sendMail(mailOptions);
}


module.exports = sendEmail