import { Item } from 'src/domain/item'

export async function getItems (): Promise<Array<Item>> {
  return Promise.resolve([
    {
      title: 'asd',
      createdAt: 2342,
      isDone: false,
    },
  ])
}
