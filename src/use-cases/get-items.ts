import { Item } from '../domain/item'
import { repositoryNoSQL } from '../adapters/repository-no-sql'

export async function getItems (): Promise<Array<Item>> {
  console.log('get items!')
  return await repositoryNoSQL.item.findMany({})
}
