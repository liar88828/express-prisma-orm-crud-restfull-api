import { contactCreateServices, contactGetServices } from "../services/contactServices.js";

export const contactCreateController = async (req, res, next) => {
  try {
    const user = req.user
    const request = req.body
    // console.log('test',request)
    const result = await contactCreateServices(user, request)
    // console.log()
    res.status(200).json({ data: result })
  } catch ( e ) {
    next(e)
  }
}

export const contactGetController = async (req, res, next) => {
  try {
    const user = req.user

    const contactId = req.params.contactId
    const result = await contactGetServices(user, contactId)
    // console.log('test',result)
    res.status(200).json({ data: result })
  } catch ( e ) {
    next(e)
  }
}