const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const env = require('dotenv')
const emailTemplate = fs.readFileSync('./welcome.html', 'utf-8');
const compiledEmailTemplate = ejs.compile(emailTemplate);

env.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    }
});

const SendMail = (email) => {
    const emailHtml = compiledEmailTemplate({ username: 'John Doe' });
    const mailOptions = {
        from: 'aicorex2@gmail.com',
        to: email,
        subject: 'Welcome to our app!',
        html: emailHtml
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email Terkirim : ', email);
        }
    });
}

SendMail('aicorex4@gmail.com');
