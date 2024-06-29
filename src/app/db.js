import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

let log = {
  log: [
    {
      emit: 'event',
      level: "query"
    },
    {
      emit: 'event',
      level: "error"
    },
    {
      emit: 'event',
      level: "info"
    },
    {
      emit: 'event',
      level: "warn"
    },
  ]

}
export const prismaClient = new PrismaClient(log)

prismaClient.$on('error', (e) => {
  logger.error(e)
})

prismaClient.$on('warn', (e) => {
  logger.warn('\u001b[1;31m',e)
})

prismaClient.$on('info', (e) => {
  logger.info(e)
})

prismaClient.$on('query', (e) => {
  logger.info(e)
})

