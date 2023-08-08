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

export enum EmailType {
  RESET_PASSWORD,
  EMAIL_VERIFICATION
}

export const sendEmail = async (
  to: string,
  token: string,
  type: EmailType,
  username?: string
) => {
  // Create forgot password url
  const forgotPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`
  // Create verify email url
  const verifyEmailUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`
  // Create email subject
  let subject = ''
  // Create email html
  let html = ''

  // Check email type
  switch (type) {
    case EmailType.RESET_PASSWORD:
      subject = 'Reset Your Password'
      html = pug.renderFile(`${__dirname}/../../views/forgotPassword.pug`, { forgotPasswordUrl })
      break
    case EmailType.EMAIL_VERIFICATION:
      subject = 'Verify Your Email'
      html = pug.renderFile(`${__dirname}/../../views/verifyEmail.pug`, { username, verifyEmailUrl })
      break
  }

  // Wrap sendMail function in a promise
  return new Promise((resolve, reject) => {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
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