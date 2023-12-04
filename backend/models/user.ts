import { model, Schema } from 'npm:mongoose@^6.7'

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
})

userSchema.path('name').required(true, 'Name is required')
userSchema.path('email').required(true, 'Email is required')
userSchema.path('password').validate(function (password: string) {
  return password.length >= 6
}, 'Password must be at least 6 characters')

export default model('User', userSchema)
