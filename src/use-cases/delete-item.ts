import { noSQL } from '../adapters/no-sql'

export async function delteItem (id: string): Promise<void> {
  await noSQL.item.deleteById(id)
}
