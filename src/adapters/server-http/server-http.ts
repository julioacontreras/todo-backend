import { AppRoute, RoutesMap as RouteMap, UseCaseName as RouteName } from './types'

export interface ServerHTTP {
  routes: RouteMap
  add: (routeName: RouteName, request: AppRoute) => void
  run: () => void
}
