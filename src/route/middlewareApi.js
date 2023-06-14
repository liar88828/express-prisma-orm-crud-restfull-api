import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getController } from "../controller/userController.js";

export const userRouter = new express.Router()
userRouter.use(authMiddleware)
userRouter.get('/api/users/current', getController)

