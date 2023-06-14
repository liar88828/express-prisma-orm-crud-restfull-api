import { web } from "./app/web.js";
import { logger } from "./app/logging.js";

web.listen(3000, () => {
  // console.log('start')
  logger.info('App Start')
})