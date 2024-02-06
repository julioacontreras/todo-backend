import { HTTPMethods } from 'fastify'

export type UseCaseName = string

export type AppError = {
  error: {
    code: string,
    message: string
  }
}

export type HTTPResponse = unknown

export type HTTPReturn = {
  response: HTTPResponse
  session?: unknown
  code: number
}

export type HTTPRequest = {
  command: UseCaseName
  settings: {
    params: unknown
  }
}

/** @type CallbackFunction
 *  Use case function. Here have use case instructions to be executed.
 *
 */
export type CallbackFunction = (
  request: any, // eslint-disable-line
) => Promise<HTTPReturn> | HTTPReturn

/** @type AppRoute
 *  Use case settings. Here have function and route to each use case.
 *
 */
export type AppRoute = {
  callback: CallbackFunction
  route: string
  method: HTTPMethods
}

/** @type RoutesMap
 *  Contain use cases to execute in server. Each route hace one use case.
 *
 */
export type RoutesMap = Map<UseCaseName, AppRoute>
