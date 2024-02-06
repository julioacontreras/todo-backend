import { setServerHTTP } from '../../adapters/server-http'

import {
  RoutesMap,
  AppRoute,
  UseCaseName,
} from '../../adapters/server-http/types'

import { ServerHTTP } from '../../adapters/server-http/server-http'

import startServer from './fastify'

function useServerHTTP (): ServerHTTP {
  const useCases: RoutesMap = new Map<UseCaseName, AppRoute>()

  function add (useCaseName: UseCaseName, settings: AppRoute): void {
    useCases.set(useCaseName, settings)
  }

  function run (): void {
    startServer(useCases)
  }

  return {
    routes: useCases,
    add,
    run,
  }
}

setServerHTTP(useServerHTTP())
