import { HTTPReturn } from '../adapters/server-http/types'
import { statusHTTP } from '../adapters/server-http'
import { eventBus } from '../adapters/event-bus'

import { getSchemaQueryRequest, prepareErrorParamsRequest } from '../domain/validateQueryRequest'

export type QueryRequest = {
  nameQuery: string,
  data: unknown
}

/**
 * @api {get} /api/v1/query
 * @apiName Query
 *
 * @apiSuccess {json} return result
 */
export const query = async (request: QueryRequest): Promise<HTTPReturn> => {
  const schema = getSchemaQueryRequest()
  const { error } = schema.validate(request)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }

  const result = eventBus.emit(request.nameQuery)
  console.log({ result })

  return {} as HTTPReturn
}
