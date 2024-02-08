import { connect } from 'mongoose'
import { setNoSql } from '../../adapters/no-sql'
import { useItemModel } from './item-model';

run().catch(err => console.log(err));

async function run() {
  const url = process.env.DATABASE_URL
  if (!url) {
    throw new Error('Not find database url in .env')
  }
  await connect(url);
  const noSql = {
    item: useItemModel()
  }
  setNoSql(noSql)
}
