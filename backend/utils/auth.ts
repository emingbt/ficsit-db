import jwt from 'jsonwebtoken'

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '1d'
  })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!)
}

export const generateResetPasswordToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_RESET_PASSWORD_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '30d'
  })
}

export const verifyResetPasswordToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET!)
}

export const generateEmailConfirmationToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_EMAIL_CONFIRMATION_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '30d'
  })
}

export const verifyEmailConfirmationToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_EMAIL_CONFIRMATION_SECRET!)
}