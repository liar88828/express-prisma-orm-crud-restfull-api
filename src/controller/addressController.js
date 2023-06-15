import { createAddressServices, getAddressServicess } from "../services/addressServices.js";

export const createAddressController = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body
    const contactId = req.params.contactId
    const data = await createAddressServices(user, contactId, request)
    res.status(200).json({ data })
  } catch ( e ) {
    next(e)
  }
}
export const getAddressController = async (req, res, next) => {
  try {
    const user = req.user
    const contactId = req.params.contactId
    const addressId = req.params.addressId
    const data = await getAddressServicess(user, contactId, addressId)
    res.status(200).json({ data })
  } catch ( e ) {
    next(e)
  }
}
