import { HTTPReturn } from '../adapters/server-http/types'
import { statusHTTP } from '../adapters/server-http'

import { getItems } from '../use-cases/get-items'

import { getSchemaQueryRequest, prepareErrorParamsRequest } from '../domain/validateQueryRequest'
import { ERROR_GETING_ITEMS } from '../domain/constants'

export type CommandRequest = {
  nameQuery: string,
  data: unknown
}

/**
 * @api {post} /api/v1/query
 * @apiName Query
 *
 * @apiSuccess {json} return result
 */
export const command = async (request: CommandRequest): Promise<HTTPReturn> => {
  const schema = getSchemaQueryRequest()
  const { error } = schema.validate(request)
  if (error){
    return {
      response: prepareErrorParamsRequest(error),
      code: statusHTTP.INTERNAL_SERVER_ERROR,
    }
  }
  
  try {
    const response = await getItems()
    return {
      response,
      code: statusHTTP.OK,
    }
  } catch(err) {
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
}
