import { Item } from '../../domain/item'

export interface ItemModel {
  findMany: (arg: Object) => Promise<Item[]>
}

export interface RepositoryNoSQL {
  item: ItemModel
}

export let repositoryNoSQL: RepositoryNoSQL

export function setRepository (instance: RepositoryNoSQL) {
  repositoryNoSQL = instance
}
