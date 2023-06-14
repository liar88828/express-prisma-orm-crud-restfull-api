import { validate } from "../validation/validation.js";
import {
  getUserValidation,
  loginUserValidation,
  registerUserValidation,
  updateUserValidation
} from "../validation/userValidation.js";
import { prismaClient } from "../app/db.js";
import { ResponseError } from "../error/responseError.js";
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

export const UserServices = async (request) => {
  // console.log("data" ,request)
  const user = validate(registerUserValidation, request)
  const countUser = await prismaClient.user.count({
    where: {
      username: user.username
    }
  })
  if (countUser === 1) {
    throw  new ResponseError(404, 'Username is ready exist')
  }

  user.password = await bcrypt.hash(user.password, 10)

  const data = await prismaClient.user
  .create({
    data: user,
    select: {
      username: true,
      name: true
    }
  })

  // console.log(data)
  return data

}

export const loginServices = async (request) => {

  const loginRequest = validate(loginUserValidation, request)
  // console.log(loginRequest)
  const user = await prismaClient.user.findUnique({
    where: { username: loginRequest.username },
    select: { username: true, password: true }
  })
  // console.log(user)
  if (!user) {
    throw new ResponseError(401, "Username or Password wrong")
  }
  // console.log(loginRequest.password, user.password)
  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
  // console.log(isPasswordValid)
  if (!isPasswordValid) {
    throw new ResponseError(401, "Password wrong")
  }
  // console.log(isPasswordValid)
  const token = uuid().toString()
  // console.log(token)
  const updateUser = await prismaClient.user.update({
    where: { username: user.username },
    data: { token: token },
    select: { token: true }
  })
  // console.log(updateUser)
  return updateUser
}

export const getServices = async (username) => {
  username = validate(getUserValidation, username)
  // console.log(username)
  const user = await prismaClient.user.findUnique({
    where: { username: username },
    select: { username: true, name: true }
  })
  // console.log(user)
  if (!user) {
    throw new ResponseError(404, 'user is not found')
  }
  return user
}
export const updateServices = async (request) => {
  const user = validate(updateUserValidation, request)
  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username
    }
  })

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, 'user is not found')
  }
  const data = {}
  if (user.name) data.name = user.name
  if (user.password) data.password = await bcrypt.hash(user.password, 10)

  return prismaClient.user.update({
    where: { username: user.username },
    data: data,
    select: { username: true, name: true }
  })
}

export const logoutServices = async (username) => {
  username = validate(getUserValidation, username)
  const user = await prismaClient.user.findUnique({ where: { username: username } })
  if (!user) throw new ResponseError(404, 'user is not found')

  return prismaClient.user.update({
    where: { username: username },
    data: { token: null },
    select: { username: true }
  })

}