import { assertEquals } from "https://deno.land/std@0.215.0/assert/assert_equals.ts"
import userModel from "../models/user.ts"
import {
  createUser,
  loginUser
} from "../services/user.ts"
import { connectMongoDB } from "../utils/mongoose.ts"

//Connect to the database before running the tests
await connectMongoDB()

// Wait for the database to connect
await new Promise((resolve) => setTimeout(resolve, 1000))

// Test signup
Deno.test("Sign up", async (t) => {
  const username = "signup"
  const email = "signup@test.com"
  const password = "123456"
  const availableUsername = "signup2"
  const availableEmail = "signup2@test.com"

  await t.step("Create a user", async () => {
    const user = await createUser(username, email, password)
    assertEquals(user.username, username)
    assertEquals(user.email, email)
    assertEquals(user.password, "")
  })

  await t.step("Throw error if user exist", async () => {
    let errorMessage = ""
    try {
      await createUser(availableUsername, email, password)
    } catch (error) {
      errorMessage = error.message
    }
    assertEquals(errorMessage, "There is already an account with this email")

    try {
      await createUser(username, availableEmail, password)
    } catch (error) {
      errorMessage = error.message
    }
    assertEquals(errorMessage, "Username is already taken")
  })

  // Clean up
  await t.step("Delete the user", async () => {
    await userModel.deleteOne({ email: email })
  })
})

// Test login
Deno.test("Log in", async (t) => {
  const username = "login"
  const email = "login@test.com"
  const password = "123456"
  const nonExistentEmail = "login2@test.com"
  const wrongPassword = "1234567"

  await t.step("Create a user", async () => {
    await createUser(username, email, password)
  })

  await t.step("Log in", async () => {
    const user = await loginUser(email, password)
    assertEquals(user.username, username)
    assertEquals(user.email, email)
    assertEquals(user.password, "")
  })

  await t.step("Throw error if user does not exist", async () => {
    try {
      await loginUser(nonExistentEmail, password)
    } catch (error) {
      assertEquals(error.message, "User does not exist")
    }
  })

  await t.step("Throw error if password is incorrect", async () => {
    try {
      await loginUser(email, wrongPassword)
    } catch (error) {
      assertEquals(error.message, "Password is incorrect")
    }
  })

  // Clean up
  await t.step("Delete the user", async () => {
    await userModel.deleteOne({ email: email })
  })

})