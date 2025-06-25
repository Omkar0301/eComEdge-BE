const nodemailer = require('nodemailer');
const path = require('path');
const pug = require('pug');
const config = require('../config');

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

const sendSupportEmail = async ({ name, email, message }) => {
  const html = pug.renderFile(path.join(__dirname, '../views/emails/support.pug'), {
    name,
    email,
    message
  });

  const mailOptions = {
    from: config.email.sender,
    to: config.email.receiver,
    subject: 'New Support Request',
    html
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendSupportEmail };
