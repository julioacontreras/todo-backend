import { statusHTTP } from '../adapters/server-http'
import { HTTPReturn } from '../adapters/server-http/types'
import { getItems } from '../use-cases/get-items'
import { ERROR_GETING_ITEMS } from '../domain/constants'
import { eventBus } from '../adapters/event-bus'
import { logger } from '../adapters/logger'

eventBus.on('get-items', async (): Promise<HTTPReturn> => {
  logger.info(JSON.stringify({ 'cqrs-query': 'get-items' }))
  try {
    const response = await getItems()
    return {
      response,
      code: statusHTTP.OK,
    }
  } catch (err) {
    logger.error((err as {message: string}).message)
    return {
      response: {
        error: {
          code: ERROR_GETING_ITEMS,
          message: 'Error getting items',
        },
      },
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
})
