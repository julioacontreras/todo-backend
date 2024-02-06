import { AppRoute } from '../../../../adapters/server-http/types'
import { RouteOptions } from 'fastify'
import { useRoute } from './useRoute'

export function factoryRequest (
  route: AppRoute,
  nameRoute: string,
): RouteOptions | undefined {
  return {
    method: route.method,
    url: route.route,
    handler: useRoute(route.callback, nameRoute),
  }
}
