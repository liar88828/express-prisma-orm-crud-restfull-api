import { prismaClient } from "../app/db.js";
import { validate } from "../validation/validation.js";
import { getContactValidation } from "../validation/contactValidation.js";
import { ResponseError } from "../error/responseError.js";
import {
  createAddressValidation,
  getAddressValidation,
  updateAddressValidation
} from "../validation/addressValidation.js";

const checkMustExist = async (user, contactId) => {
  // console.log(contactId)
  contactId = validate(getContactValidation, contactId)
  // console.log('test',contactId)

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      username: user.username,
      id: contactId
    }
  })
  // console.log(totalContactInDatabase)
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

export const updateAddressServicess = async (user, contactId, request) => {
  contactId = await checkMustExist(user, contactId)
  // console.log(contactId)
  const address = validate(updateAddressValidation, request)
  // console.log(address)
  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contactId: contactId,
      id: address.id,
    },
  })
  if (totalAddressInDatabase !== 1) throw  new ResponseError(404, 'address is not found')

  return prismaClient.address.update({
    where: {
      id: address.id
    },
    data: {
      street: address.street,
      city: address.city,
      province: address.province,
      country: address.country,
      postal_code: address.postal_code,
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
}

export const deleteAddressServicess = async (user, contactId, addressId) => {
  contactId = await checkMustExist(user, contactId)
  addressId = validate(getAddressValidation, addressId)

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      contactId: contactId,
      id: addressId
    }
  })

  if (totalAddressInDatabase !== 1) throw  new ResponseError(404, 'addres is not found')

  return prismaClient.address.delete({
    where: { id: addressId }
  })

}

export const listAddressServicess = async (user, contactId) => {
  contactId = await checkMustExist(user, contactId)

  return prismaClient.address.findMany({
      where: { contactId: contactId },
      select: {
        id: true,
        street: true,
        city: true,
        province: true,
        country: true,
        postal_code: true,
      }

    }
  )

}
