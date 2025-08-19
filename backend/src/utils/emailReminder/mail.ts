import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendReminderEmail = async (
  guestEmail: string,
  eventTitle: string,
  eventDate: Date
) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: guestEmail,
    subject: `📅 Reminder: ${eventTitle} is coming up!`,
    html: `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e5e5; border-radius: 8px; background-color: #fafafa;">
    <h2 style="color: #333; margin-bottom: 16px;">📅 Event Reminder</h2>

    <p style="font-size: 15px; color: #555; line-height: 1.6;">
      Dear Guest,
    </p>

    <p style="font-size: 15px; color: #555; line-height: 1.6;">
      This is a friendly reminder about your upcoming event:
    </p>

    <div style="background-color: #fff; padding: 15px; border-radius: 6px; border: 1px solid #ddd; margin: 20px 0;">
      <p style="margin: 0; font-size: 16px; font-weight: bold; color: #222;">
        ${eventTitle}
      </p>
      <p style="margin: 4px 0 0; font-size: 14px; color: #555;">
        Date & Time: <b>${new Date(eventDate).toLocaleString()}</b>
      </p>
    </div>

    <p style="font-size: 15px; color: #555; line-height: 1.6;">
      We look forward to your participation and hope you have a great experience.
    </p>

    <p style="margin-top: 24px; font-size: 14px; color: #888;">
      — The Events Team
    </p>
  </div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reminder sent to ${guestEmail}`);
  } catch (error) {
    console.error("Error sending reminder:", error);
  }
};

export const sendVerificationCode = async (
  userEmail: string,
  userName: string,
  code: number
) => {
  const mailOptions = {
    from: `"Event App" <EPlanner>`,
    to: userEmail,
    subject: "Verify Your Email - EPlanner",
    html: `<!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="UTF-8" />
          <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background: #fafafa;">
        <h2 style="color: #333;">Hello ${userName},</h2>
        <p style="font-size: 15px; color: #555;">
          Please use the following code to verify your email address:
        </p>

        <div style="margin: 20px 0; padding: 15px; background: #fff; border: 1px dashed #ccc; border-radius: 8px; text-align: center;">
          <h1 style="margin: 0; color: #2b6cb0; letter-spacing: 2px;">${code}</h1>
        </div>

        <p style="font-size: 14px; color: #888;">
          This code will expire in <b>2 minutes</b>.
        </p>
      </div>
        </body>
      </html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return { success: false, response: "Failed to send verification email" };
  }
};
