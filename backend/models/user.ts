import { model, Schema } from 'npm:mongoose@^6.7'

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.path('username').required(true, 'Username is required')
userSchema.path('email').required(true, 'Email is required')
userSchema.path('password').validate(function (password: string) {
  return password.length >= 6
}, 'Password must be at least 6 characters')

export default model('userModel', userSchema)
