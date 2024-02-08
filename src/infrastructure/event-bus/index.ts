import {
  EventBusAdapter,
  FunctionCallback,
  Registry,
  Subscriber,
  setEventBus,
} from '../../adapters/event-bus'

export class EventBus implements EventBusAdapter {
  private subscribers: Subscriber
  private static nextId = 0
  private static instance?: EventBus = undefined

  private constructor () {
    this.subscribers = {}
  }

  public static getInstance (): EventBus {
    if (this.instance === undefined) {
      this.instance = new EventBus()
    }

    return this.instance
  }

  public emit<T> (event: string, arg?: T): unknown[] {
    const subscriber = this.subscribers[event]
    if (subscriber === undefined) {
      throw new Error('Not exist subscriber')
    }
    const result: unknown[] = Object.keys(subscriber).map((key) => {
      return subscriber[key](arg)
    })
    return result
  }

  public on (event: string, callback: FunctionCallback): Registry {
    const id = this.getNextId()
    if (!this.subscribers[event]) this.subscribers[event] = {}

    this.subscribers[event][id] = callback

    return {
      unregister: () => {
        if (this.subscribers[event] === undefined) {
          return
        }

        delete this.subscribers[event][id]
        if (Object.keys(this.subscribers[event]).length === 0)
          delete this.subscribers[event]
      },
    }
  }

  private getNextId (): number {
    return EventBus.nextId++
  }
}

setEventBus(EventBus.getInstance())
