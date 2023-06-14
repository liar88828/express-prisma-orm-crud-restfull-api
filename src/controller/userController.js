import { getServices, loginServices, UserServices } from '../services/userServices.js'

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
    // console.log(result)
    res
    .status(200).json({ data: result })
  } catch ( e ) {
    next(e)
  }
}