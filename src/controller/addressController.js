import {
  createAddressServices,
  deleteAddressServicess,
  getAddressServicess, listAddressServicess,
  updateAddressServicess
} from "../services/addressServices.js";

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
export const updateAddressController = async (req, res, next) => {
  try {
    const user = req.user
    const contactId = req.params.contactId
    const addressId = req.params.addressId
    const request = req.body
    request.id = addressId
    delete request.contactId
    // console.log(request)
    const data = await updateAddressServicess(user, contactId, request)
    res.status(200).json({ data })
  } catch ( e ) {
    next(e)
  }
}

export const deleteAddressController = async (req, res, next) => {
  try {
    const user = req.user
    const contactId = req.params.contactId
    const addressId = req.params.addressId
    await deleteAddressServicess(user, contactId, addressId)
    res.status(200).json({ data: "Ok" })
  } catch ( e ) {
    next(e)
  }
}

export const listAddressController = async (req, res, next) => {
  try {
    const user = req.user
    const contactId = req.params.contactId
    const result = await listAddressServicess(user, contactId)
    res.status(200).json({ data: result })
  } catch ( e ) {
    next(e)
  }
}
