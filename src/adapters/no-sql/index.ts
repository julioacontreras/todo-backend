import { Item } from '../../domain/item'

export interface ItemModel {
  findMany: () => Promise<Item[]>
  create: (item: Item) => Promise<string>
  deleteById: (id: string) => Promise<void>
  setIsCompleted: (id: string, isCompleted: boolean) => Promise<void>
}

export interface NoSQLAdapter {
  item: ItemModel
}

export let noSQL: NoSQLAdapter

export function setNoSql (instance: NoSQLAdapter) {
  noSQL = instance
}
