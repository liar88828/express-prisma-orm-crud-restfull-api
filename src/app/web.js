import express from 'express'
import { publicRouter } from "../route/publicApi.js";
import { userRouter } from "../route/middlewareApi.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";

export const web = express()

web.use(express.json())
web.use(publicRouter)
web.use(userRouter)
web.use(errorMiddleware)