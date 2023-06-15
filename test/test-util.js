import { prismaClient } from "../src/app/db.js";
import bcrypt from "bcrypt";

export const sendDataUserTest = {
  password: "rahasia",
  username: "test",
  name: 'test'
}

export const loginUserTest = {
  username: "test",
  password: "rahasia",
}

const userDataTest = {
  username: "test",
  password: 'rahasia',
  name: "test",
  token: "test"
}

const createDataContactTest = {
  username: "test",
  firstName: 'test',
  lastName: "test",
  email: "test@pzn.com",
  phone: "08123123123"
}
export const removeAfterTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test"
    }
  })
}
export const createTestUser = async () => {
  userDataTest.password = await bcrypt.hash('rahasia', 10)
  // console.log(userDataTest.password)
  await prismaClient.user.create({
    data: userDataTest
  })
}
export const getUserTest = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: 'test'
    }
  })
}

export const removeAllTestContact = async () => {
  return prismaClient.contact.deleteMany({
    where: {
      username: 'test'
    }
  })
}

export const createContactTest = async () => {
  return prismaClient.contact.create({
    data: createDataContactTest
  })
}

export const createManyContactTest = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: "test",
        firstName: 'test ' + i,
        lastName: "test " + i,
        email: `test${ i }@pzn.com`,
        phone: "08123123123" + i,
      }
    })
  }
}

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: { username: 'test' }
  })
}

export const removeAllTestAddress = async () => {
  await prismaClient.address.deleteMany({
    where: {
      Contact: {
        username: 'test'
      }
    }
  })
}

export const createAddress = {
  street: "jalanTest",
  city: "kotaTest",
  province: "provinceTest",
  country: "indonesia",
  postal_code: "123123"
}
// export let data = Object.freeze(createAddress)

export const createAdressDataTest = async () => {
  const contact = await getTestContact()
  createAddress.contactId = contact.id
  await prismaClient.address.create({ data: createAddress })
}
export const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      Contact: {
        username: "test"
      }
    }
  })
}