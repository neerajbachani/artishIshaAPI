
const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")

const ENV = require('../config/mail')


// https://ethereal.email/create
let nodeConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: ENV.EMAIL, // generated ethereal user
        pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Mailgen",
        link: 'https://mailgen.js/'
    }
})


const registerMail = async (req, res) => {
    const { username, userEmail, text, subject } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: ENV.EMAIL,
            pass: ENV.PASSWORD
        }
    }
    let transporter = nodemailer.createTransport(config);
    // body of the email
    var email = {
        body : {
            name: username,
            intro : text || 'Welcome to the Resin Gift Store.',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    }

    var emailBody = MailGenerator.generate(email);

    let message = {
        from : ENV.EMAIL,
        to: userEmail,
        subject : subject || "Signup Successful",
        html : emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then(() => {
            return res.status(200).send({ msg: "You should receive an email from us."})
        })
        .catch(error => res.status(500).send({ error }))

}

module.exports = registerMail