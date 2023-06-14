import { prismaClient } from "../app/db.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization")
  if (!token) {
    res.status(401).json({ errors: "Unauthorized" })
  } else {
    const user = await prismaClient.user.findFirst({ where: { token } })
    // console.log(user)
    if (!user) {
      res.status(401).json({ errors: "Unauthorized" })
    } else {
      req.user = user
      // console.log(req.user)
      next()
    }
  }
}