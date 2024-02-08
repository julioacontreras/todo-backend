import { statusHTTP } from '../adapters/server-http'
import { HTTPReturn } from '../adapters/server-http/types'
import { delteItem } from '../use-cases/delete-item'
import { ERROR_DELETING_COMMAND } from '../domain/constants'
import { eventBus } from '../adapters/event-bus'
import { logger } from '../adapters/logger'

eventBus.on('delete-item', async (data: unknown): Promise<HTTPReturn> => {
  logger.info(JSON.stringify({ 'cqrs-command': 'delete-item', data }))
  const id = (data as { id: string }).id
  try {
    await delteItem(id)
    return {
      response: {},
      code: statusHTTP.OK,
    }
  } catch (err) {
    logger.error((err as {message: string}).message)
    return {
      response: {
        error: {
          code: ERROR_DELETING_COMMAND,
          message: 'Error deleting items',
        },
      },
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
})
