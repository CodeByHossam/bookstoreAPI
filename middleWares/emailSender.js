const nodemailer = require("nodemailer");

// Message object function defined outside the callback
function createMessageObject(email, htmlWithLink) {
  let message = {
    from: "Book Store API <example@example.com>", // Ensure to use a valid email address
    to: email,
    subject: "Change the password of your account ✔",
    text: "Please click on the link to change your password!",
    html: htmlWithLink,
  };
  return message;
}

// Current implementation using Ethereal (trial) email service
function sendEmail(email, htmlWithLink) {
  // Generate SMTP service account from ethereal.email
  nodemailer.createTestAccount((err, account) => {
    if (err) {
      console.error("Failed to create a testing account. " + err.message);
      return process.exit(1);
    }

    console.log("Credentials obtained, sending message...");

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    // Send the email
    transporter.sendMail(
      createMessageObject(email, htmlWithLink),
      (err, info) => {
        if (err) {
          console.log("Error occurred. " + err.message);
          return process.exit(1);
        }

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    );
  });
}

/* 
// Future implementation for real email service
// To use this, uncomment and replace the current sendEmail function
// Also add these environment variables to .env:
// EMAIL_SERVICE=gmail
// EMAIL_USER=your-email@gmail.com
// EMAIL_PASS=your-app-specific-password

async function sendRealEmail(email, htmlWithLink) {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `Book Store API <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Change the password of your account ✔",
      text: "Please click on the link to change your password!",
      html: htmlWithLink,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
*/

module.exports = sendEmail;
