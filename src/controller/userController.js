import { getServices, loginServices, updateServices, UserServices } from '../services/userServices.js'

export const registerController = async (req, res, next) => {
  try {
    const result = await UserServices(req.body)
    res.status(200)
    .json({ data: result })
  } catch ( e ) {
    next(e)
  }
}
export const loginController = async (req, res, next) => {
  try {
    const result = await loginServices(req.body)
    res.status(200)
    .json({ data: result })
  } catch ( e ) {
    next(e)
  }
}
export const getController = async (req, res, next) => {
  // console.log('test')
  try {
    const username = req.user.username
    const result = await getServices(username)
    res
    .status(200)
    .json({ data: result })
  } catch ( e ) {
    next(e)
  }
}
export const updateController = async (req, res, next) => {
  try {
    const username = req.user.username
    const request = req.body
    request.username = username
    const result = await updateServices(request)
    res
    .status(200)
    .json({ data: result })
  } catch ( e ) {
    next(e)
  }
}