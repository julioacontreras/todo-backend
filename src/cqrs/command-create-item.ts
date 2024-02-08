import { statusHTTP } from '../adapters/server-http'
import { HTTPReturn } from '../adapters/server-http/types'
import { createItem } from '../use-cases/create-item'
import { ERROR_CREATING_COMMAND } from '../domain/constants'
import { eventBus } from '../adapters/event-bus'
import { logger } from '../adapters/logger'
import { Item } from 'src/domain/item'

eventBus.on('create-item', async (data: unknown): Promise<HTTPReturn> => {
  logger.info(JSON.stringify({ 'cqrs-command': 'create-item', data: data }))
  const item = data as Item
  try {
    const id = await createItem(item)
    return {
      response: { id },
      code: statusHTTP.OK,
    }
  } catch (err) {
    logger.error((err as {message: string}).message)
    return {
      response: {
        error: {
          code: ERROR_CREATING_COMMAND,
          message: 'Error creating items',
        },
      },
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
})
