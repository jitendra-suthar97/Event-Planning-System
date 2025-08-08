import { resend } from "./resend.ts";

export const sendMail = async (
  email: string,
  userName: string,
  verifyCode: number
) => {
  try {
    const html = `
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="UTF-8" />
          <title>Verification Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 24px;">
          <div style="max-width: 480px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 32px;">
            <h2>Hello ${userName}</h2>
            <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
            <div style="font-size: 2rem; font-weight: bold; letter-spacing: 4px; margin: 24px 0; color: #2d3748;">${verifyCode}</div>
            <p>If you did not request this code, please ignore this email.</p>
          </div>
        </body>
      </html>
    `;

    const response = await resend.emails.send({
      from: "EPlanner <onboarding@resend.dev>",
      to: email,
      subject: "Verification Code",
      html,
    });

    return { success: true, response };
  } catch (error) {
    console.error("Error sending verification email: ", error);
    throw error;
  }
};
