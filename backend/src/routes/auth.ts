import { Router } from "express"
import validate from "../middleware/validate"
import authenticate from "../middleware/authenticate"
import { loginSchema, signUpSchema } from "../lib/authSchemas"
import { login, signup, me } from "../controllers/auth"

const authRouter = Router()

authRouter.post("/login", validate(loginSchema), login)
authRouter.post("/signup", validate(signUpSchema), signup)
authRouter.get("/me", authenticate, me)

export default authRouter