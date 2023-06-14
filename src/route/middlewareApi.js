import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getController, logoutController, updateController } from "../controller/userController.js";

export const userRouter = new express.Router()
userRouter.use(authMiddleware)
userRouter.get('/api/users/current', getController)
userRouter.patch('/api/users/current', updateController)
userRouter.delete('/api/users/logout', logoutController)

