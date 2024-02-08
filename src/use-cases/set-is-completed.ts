import { noSQL } from '../adapters/no-sql'

export async function setIsCompleted (id: string, isCompleted: boolean): Promise<void> {
  await noSQL.item.setIsCompleted(id, isCompleted)
}
