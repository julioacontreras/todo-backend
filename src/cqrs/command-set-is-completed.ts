import { statusHTTP } from '../adapters/server-http'
import { HTTPReturn } from '../adapters/server-http/types'
import { setIsCompleted } from '../use-cases/set-is-completed'
import { ERROR_CREATING_COMMAND } from '../domain/constants'
import { eventBus } from '../adapters/event-bus'
import { logger } from '../adapters/logger'
import { Item } from 'src/domain/item'

eventBus.on('set-is-completed', async (data: unknown): Promise<HTTPReturn> => {
  logger.info(JSON.stringify({ 'cqrs-command': 'set-is-completed', data }))
  const id = (data as { id: string }).id
  const isCompleted = (data as { isCompleted: boolean }).isCompleted
  try {
    await setIsCompleted(id, isCompleted)
    return {
      response: { id, isCompleted },
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
