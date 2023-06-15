import { createContactValidation, getContactValidation } from "../validation/contactValidation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/responseError.js";

export const contactCreateServices = async (user, request) => {
  const contact = validate(createContactValidation, request)
  contact.username = user.username

  return prismaClient.contact.create({
    data: contact,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    }
  })
}

export const contactGetServices = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId)

  const contact = await prismaClient.contact.findFirst({
    where: {
      username: user.username,
      id: contactId
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true
    }
  })
  if (!contact) throw new ResponseError(404, 'contact id not found')
  return contact

}