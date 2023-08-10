import express from "express"

import { authRouter } from "./auth"
import { blueprintRouter } from "./blueprint"
import { usersRouter } from "./user"

const router = express.Router()

router.use('/auth', authRouter)
router.use('/blueprints', blueprintRouter)
router.use('/users', usersRouter)

export default router