const nodemailer = require("nodemailer");
const sendEmail = async ({ name, email, descriptionMessage }) => {
  try {
    // Create a transporter

     const transporter = nodemailer.createTransport({
     host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS,
      },
    
    });

    // Define email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SENDER_EMAIL}>`,
      replyTo: email,
      to: process.env.RECEIVER_EMAIL,
      subject: ` New Message from Portfolio`,
      html: `
    <div style="max-width:600px;margin:auto;font-family:Arial;">
      <h2 style="background:#4CAF50;color:white;padding:10px;">
        New Contact Form Submission
      </h2>
      <div style="padding:15px;">
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b></p>
        <p style="background:#f4f4f4;padding:10px;">${descriptionMessage}</p>
      </div>
    </div>
  `,
    };
    // Send email

    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    console.log("Email sent: " + info.response);

  } catch (err) {
    console.log("Error in sendEmail util", err);
  }
};

module.exports = sendEmail;
