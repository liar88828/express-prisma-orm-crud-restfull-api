import {
  createContactValidation,
  getContactValidation,
  updateContactValidation
} from "../validation/contactValidation.js";
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

export const contactUpdateServices = async (user, request) => {
  const contact = validate(updateContactValidation, request)
  const totalContactInDatabase = await prismaClient.contact.count({
    where: { username: user.username, id: contact.id }
  })
  if (totalContactInDatabase !== 1) throw  new ResponseError(404, 'contact is not found')
  // console.log(totalContactInDatabase)
  return prismaClient.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    }
  })
}

export const contactDeleteServices = async (user, contactId) => {
  contactId = validate(getContactValidation, contactId)

  const totalInDatabase = await prismaClient.contact.count({ where: { id: contactId, username: user.username } })
  if (totalInDatabase !== 1) {
    throw new ResponseError(404, 'contact is not found')
  }

  return prismaClient.contact.delete({
    where: { id: contactId }
  })

}