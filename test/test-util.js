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

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: { username: 'test' }
  })
}