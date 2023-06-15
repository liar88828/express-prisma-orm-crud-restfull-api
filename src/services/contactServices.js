import {
  createContactValidation,
  getContactValidation,
  searchContactValidation,
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

export const contactSearchServices = async (user, request) => {
  request = validate(searchContactValidation, request)

  //1 (page - 1 * size) = 0
  //1 (page - 2 * size) = 10
  const skip = ( request.page - 1 ) * request.size

  let filters = []
  filters.push({ username: user.username })
  if (request.name) {
    filters.push({
      OR: [
        { firstName: { contains: request.name } },
        { lastName: { contains: request.name } }
      ]
    })
  }

  if (request.email) {
    filters.push(
      { email: { contains: request.email } },
    )
  }

  if (request.phone) {
    filters.push(
      { phone: { contains: request.phone } },
    )
  }

  const contacts = await prismaClient.contact.findMany({
    where: { AND: filters },
    take: request.size,
    skip: skip
  })

  const totalItems = await prismaClient.contact.count({
    where: { AND: filters }
  })
  // console.log(totalItems)//15
  // console.log(contacts.length)//10

  return {
    data: contacts,
    paging: {
      page: request.page,
      totalItems: totalItems,
      totalPage: Math.ceil(totalItems / request.size)
    }
  }
}