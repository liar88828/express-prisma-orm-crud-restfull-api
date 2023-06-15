import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getController, logoutController, updateController } from "../controller/userController.js";
import {
  contactCreateController, contactDeleteController,
  contactGetController,
  contactUpdateController,
} from "../controller/contactController.js";

export const userRouter = new express.Router()
userRouter.use(authMiddleware)
//user Api
userRouter.get('/api/users/current', getController)
userRouter.patch('/api/users/current', updateController)
userRouter.delete('/api/users/logout', logoutController)

//Contact Api
userRouter.post('/api/contacts', contactCreateController)
userRouter.get('/api/contacts/:contactId', contactGetController)
userRouter.put('/api/contacts/:contactId', contactUpdateController)
userRouter.delete('/api/contacts/:contactId', contactDeleteController)
