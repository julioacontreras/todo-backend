import { Item } from '../domain/item'
import { noSQL } from '../adapters/no-sql'

export async function getItems (): Promise<Array<Item>> {
  return await noSQL.item.findMany()
}
