import { Schema, model, connect } from 'mongoose'
import { RepositoryNoSQL, setRepository } from '../../adapters/repository-no-sql'
import { Item } from 'src/domain/item';

const itemSchema = new Schema<Item>({
  title: { type: String, required: true },
  createdAt: { type: Number, required: true },
  isCompleted: Boolean
});

const ItemModel = model<Item>('Item', itemSchema);

run().catch(err => console.log(err));

async function run() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('Not find database url in .env')
  }
  
  await connect(url);

  const item = new ItemModel({
    title: 'Bill',
    createdAt: 123,
    isCompleted: false 
  });
  await item.save()
}

setRepository({
  findMany: () => {
    return ItemModel.find()
  }
} as unknown as RepositoryNoSQL)
