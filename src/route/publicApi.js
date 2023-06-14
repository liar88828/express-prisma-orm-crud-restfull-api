import express from 'express'
import { loginController, registerController } from "../controller/userController.js";

export const publicRouter = new express.Router()
publicRouter.post('/api/users', registerController)
publicRouter.post('/api/users/login', loginController)

