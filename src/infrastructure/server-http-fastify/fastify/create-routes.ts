import { FastifyInstance } from 'fastify'

import {
  factoryRequest
} from './requests/factory-request'

import { AppRoute, RoutesMap } from '../../../adapters/server-http/types'

export function createUseCases (routes: RoutesMap, server: FastifyInstance) {
  routes.forEach((route:AppRoute, nameRoute: string) => {
    const request = factoryRequest(route, nameRoute)
    if (request) {
      server.route(request)
    }
  })
}
