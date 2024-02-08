import { Item } from 'src/domain/item'
import { PrismaClient } from '@prisma/client'

export function useItemModel(prisma: PrismaClient) {
    class ItemModel {
        model = prisma.item
      
        async findMany () {
          return await this.model.findMany()
        }
      
        async create (item: Item): Promise<string> {
          const result = await this.model.create({ data: item })
          return result.id
        }
      
        async deleteById (id: string) {
          await this.model.delete({ where: { id } })
        }

        async setIsCompleted (id: string, isCompleted: boolean) {
          await this.model.update({ 
            where: { id },
            data: {
              isCompleted 
            }
          })
        }
      }
      
      const itemModel = new ItemModel()
      
  return itemModel
}
