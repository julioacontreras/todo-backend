import { HTTPReturn } from '../adapters/server-http/types'
import { statusHTTP } from '../adapters/server-http'
import { getSchemaCommandRequest, prepareErrorParamsRequest } from '../domain/validateCommandRequest'
import { eventBus } from '../adapters/event-bus'

export type CommandRequest = {
  body: {
    nameCommand: string,
    data: unknown
  }
}

/**
 * @api {post} /api/v1/command
 * @apiName Command
 *
 * @apiSuccess {json} return result
 */
export const command = async (request: CommandRequest): Promise<HTTPReturn> => {
  const schema = getSchemaCommandRequest()
  const { error } = schema.validate(request.body)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
  const results = eventBus.emit(request.body.nameCommand, request.body.data)
  return await results[0] as HTTPReturn

}
