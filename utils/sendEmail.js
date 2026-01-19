const nodemailer = require("nodemailer");
const sendEmail = async({name, email,   descriptionMessage}) =>{
    try{
        // Create a transporter

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Define email options
        const mailOptions = {
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
replyTo: email
,
  to: process.env.EMAIL_USER,
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
  `
        };
        // Send email

    await transporter.sendMail(mailOptions);

    }catch(err){
        console.log("Error in sendEmail util", err);
    }
}

module.exports = sendEmail;