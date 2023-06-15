import express from 'express'
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getController, logoutController, updateController } from "../controller/userController.js";
import {
  contactCreateController,
  contactDeleteController,
  contactGetController,
  contactSearchController,
  contactUpdateController,
} from "../controller/contactController.js";
import {
  createAddressController,
  deleteAddressController,
  getAddressController,
  listAddressController,
  updateAddressController
} from "../controller/addressController.js";

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
userRouter.get('/api/contacts/', contactSearchController)

//Address API
userRouter.post('/api/contacts/:contactId/addresses', createAddressController)
userRouter.get('/api/contacts/:contactId/addresses/:addressId', getAddressController)
userRouter.put('/api/contacts/:contactId/addresses/:addressId', updateAddressController)
userRouter.delete('/api/contacts/:contactId/addresses/:addressId', deleteAddressController)
userRouter.get('/api/contacts/:contactId/addresses/', listAddressController)
