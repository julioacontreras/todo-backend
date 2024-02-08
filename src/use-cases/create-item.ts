import { Item } from '../domain/item'
import { noSQL } from '../adapters/no-sql'

export async function createItem (item: Item): Promise<string> {
  return await noSQL.item.create(item)
}
