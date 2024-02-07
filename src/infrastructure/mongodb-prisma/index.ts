import { PrismaClient } from '@prisma/client'
import { RepositoryNoSQL, setRepository } from '../../adapters/repository-no-sql'

(async () => {
    console.log('S1')
    const prisma = new PrismaClient()
    console.log('S2')
    await prisma.$connect()
    console.log('S3')
    await prisma.item.create({
      data: {
        name: 'asda',
        createdAt: 123123,
        isCompleted:  false
      }
    })


    const items = await prisma.item.findMany()
    console.dir(items, { depth: Infinity })


    setRepository(prisma as unknown as RepositoryNoSQL)
})()
