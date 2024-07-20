import { Request, Response, NextFunction } from "express"
import { z, ZodError } from 'zod'

const validate = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation Error',
          fields: error.errors.map(err => {
            return err.path.join('.')
          })
        })
      }
    }
  }
}

export default validate