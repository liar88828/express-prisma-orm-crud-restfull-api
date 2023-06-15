import { prismaClient } from "../app/db.js";
import { validate } from "../validation/validation.js";
import { getContactValidation } from "../validation/contactValidation.js";
import { ResponseError } from "../error/responseError.js";
import { createAddressValidation, getAddressValidation } from "../validation/addressValidation.js";

const checkMustExist = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId)

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username
    }
  })
  if (totalContactInDatabase !== 1) throw  new ResponseError(404, 'contact is not found')
  return contactId
}
export const createAddressServices = async (user, contactId, request) => {
  contactId = await checkMustExist(user, contactId)

  const address = validate(createAddressValidation, request)
  address.contactId = contactId

  return prismaClient.address.create({
    data: address,
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  })
}

export const getAddressServicess = async (user, contactId, addressId) => {
  contactId = await checkMustExist(user, contactId)
  addressId = validate(getAddressValidation, addressId)
  const address = await prismaClient.address.findFirst({
    where: {
      contactId: contactId,
      id: addressId,
    },
    select: {
      id: true,
      street: true,
      city: true,
      province: true,
      country: true,
      postal_code: true,
    }
  })
  if (!address) throw new ResponseError(404, 'address is not found')
  return address
}