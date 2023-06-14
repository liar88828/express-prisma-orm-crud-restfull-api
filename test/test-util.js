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