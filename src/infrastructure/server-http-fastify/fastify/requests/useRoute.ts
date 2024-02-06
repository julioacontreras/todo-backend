import { CallbackFunction } from '../../../../adapters/server-http/types'

export function useRoute (callback: CallbackFunction, nameRoute: string) {
  async function getRoute (request: any, reply: any) {  // eslint-disable-line
    if (!callback) {
      return reply.status(500).send({ status: `Not exist use case ${nameRoute}` })
    }    
    try {
      const returnHTTP = await callback({
        params: request.params,
        query: request.query,
      })
      return reply.status(returnHTTP.code).send(returnHTTP.response)
    } catch (err) {
      return reply.status(500).send({ status: 'internal-error' })
    }
  }
  return getRoute 
}


