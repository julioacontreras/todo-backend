export interface Registry {
  unregister: () => void
}

export interface Callable {
  [key: string]: Function
}

export interface Subscriber {
  [key: string]: Callable
}

export interface EventBusAdapter {
  emit<T>(event: string, arg?: T): unknown
  on(event: string, callback: Function): Registry
}

export let eventBus: EventBusAdapter

export function setEventBus (instance: EventBusAdapter) {
  eventBus = instance
}