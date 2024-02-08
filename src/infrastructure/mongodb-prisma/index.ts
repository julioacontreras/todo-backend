import { PrismaClient } from '@prisma/client'
import { setNoSql } from '../../adapters/no-sql'
import { useItemModel } from './item-model'

(async () => {
    const prisma = new PrismaClient()
    await prisma.$connect()
    const noSql = {
      item: useItemModel(prisma)
    }
    setNoSql(noSql)
})()
