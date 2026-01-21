const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async ({ name, email, descriptionMessage }) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    const sender = {
      email: process.env.BREVO_SENDER_EMAIL,
      name: process.env.BREVO_SENDER_NAME || "Portfolio Contact",
    };

    const receivers = [
      {
        email: process.env.BREVO_SENDER_EMAIL, // tumhe khud ko mail
      },
    ];

    const emailData = {
      sender,
      to: receivers,
      replyTo: {
        email,
        name,
      },
      subject: "New Message from Portfolio",
      htmlContent: `
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

    const response = await tranEmailApi.sendTransacEmail(emailData);
    console.log("Brevo API email sent:", response.messageId);
  } catch (err) {
    console.error("Error in Brevo API sendEmail:", err?.response?.body || err);
  }
};

module.exports = sendEmail;
