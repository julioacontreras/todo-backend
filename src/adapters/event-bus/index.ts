export interface Registry {
  unregister: () => void
}

export type FunctionCallback = (arg?: unknown) => Promise<unknown>
export interface Callable {
  [key: string]: FunctionCallback
}

export interface Subscriber {
  [key: string]: Callable
}

export interface EventBusAdapter {
  emit<T>(event: string, arg?: T): unknown[]
  on(event: string, callback: FunctionCallback): Registry
}

export let eventBus: EventBusAdapter

export function setEventBus (instance: EventBusAdapter) {
  eventBus = instance
}
