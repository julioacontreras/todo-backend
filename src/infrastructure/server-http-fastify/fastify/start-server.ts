import fastify from 'fastify'
import { RoutesMap } from '../../../adapters/server-http/types'
import { logger } from '../../../adapters/logger'
import { createUseCases } from './create-routes'
import helmet from '@fastify/helmet'

export async function startServer (useCases: RoutesMap): Promise<void> {
  const server = fastify({
    logger: true,
  })

  const env = process.env.NODE_ENV || 'production' 
  logger.info(env)

  // -------------------------
  //   set CORS
  // -------------------------
  if (env === 'development') {
    await server.register(import('@fastify/cors'))
  }

  if (env === 'production') {
    // -------------------------
    //   set Security
    // -------------------------
    await server.register(
      helmet,
      // Example disables the `contentSecurityPolicy` middleware but keeps the rest.
      { contentSecurityPolicy: false }      
    )

    // -------------------------
    //   set compression hook
    // -------------------------
    await server.register(
      import('@fastify/compress'),
      { global: false }
    )    
  }

  // -------------------------
  //   add use cases from application
  // -------------------------
  createUseCases(useCases, server)

  // -------------------------
  //   start server
  // -------------------------
  const port = process.env.TODO_SERVICE_PORT
  if (!port) {
    throw 'Dont have port selected in server'
  }

  await server.listen({ 
    port: Number(port),
    host: '0.0.0.0',
  }, (err, address) => {
    if (err) {
      logger.error(err.toString())
      process.exit(1)
    }
    logger.info(`Server listening at ${address}`)
  })
}
