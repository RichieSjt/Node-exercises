const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    const welcomeMessage = {
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Welcome!',
        text: `Hello ${name}, welcome to the task application! Let me know how you get along with the app.`
    }
    sgMail.send(welcomeMessage)
}

const sendCancelationEmail = (email, name) => {
    const cancelationMessage = {
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}, Is there anything we could have done to have kept you on board?`
    }
    sgMail.send(cancelationMessage)
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}