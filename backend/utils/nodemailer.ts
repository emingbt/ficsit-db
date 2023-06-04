import { TRPCError } from '@trpc/server'
import nodemailer from 'nodemailer'
import pug from 'pug'

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})


export const sendForgotPasswordEmail = async (
  to: string,
  username: string,
  token: string
) => {
  // Create forgot password url
  const forgotPasswordUrl = `${process.env.CLIENT_URL}/reset-password/${token}`

  // Wrap sendMail function in a promise
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Reset Your Password",
      html: pug.renderFile(`${__dirname}/../../views/../views/forgotPassword.pug`, { username, forgotPasswordUrl })
    }, async (err, info) => {
      // If error, throw an error
      if (err) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: err.message
        })
      }

      // If success, return email address
      resolve(info.accepted[0])
    })
  })
}