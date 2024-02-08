import { Schema, model, Types } from 'mongoose'
import { Item } from 'src/domain/item'

const itemSchema = new Schema<Item>({
  title: { type: String, required: true },
  createdAt: { type: Number, required: true },
  isCompleted: Boolean,
})

export class ItemModel {
  model = model<Item>('Item', itemSchema)

  async findMany () {
    return await this.model.find()
  }

  async create (item: Item): Promise<string> {
    const instance = new this.model(item)
    const result = await instance.save()
    return result.id
  }

  async deleteById (id: string) {
    console.log({id})
    await this.model.deleteOne({ _id: new Types.ObjectId(id) })
  }

  async setIsCompleted (id: string, isCompleted: boolean) {
    await this.model.updateOne(
      { _id: id },
      {
        isCompleted 
      }
    )
  }
}

const itemModel = new ItemModel()

export function useItemModel() {
  return itemModel
}
