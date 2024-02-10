import nodemailer from "npm:nodemailer"

const nodemailerUser = Deno.env.get("NODEMAILER_USER")
const nodemailerPass = Deno.env.get("NODEMAILER_PASS")

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: nodemailerUser,
    pass: nodemailerPass,
  },
})

// Function to send an email with a token for password renewal
const sendPasswordResetEmail = async (recipientEmail: string, token: string): Promise<void> => {
  try {
    // Compose the email message
    const mailOptions = {
      from: nodemailerUser,
      to: recipientEmail,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: https://ficsitdb.app/reset-password?token=${token}`,
    }

    // Send the email
    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error(error.message)
  }
}

export { sendPasswordResetEmail }