import * as dotenv from 'dotenv'
dotenv.config()

// infrastructure
import './infrastructure/logger'
import './infrastructure/server-http-fastify'
import './infrastructure/event-bus'
import './infrastructure/mongodb-mongoose'

// cqrs commands & queries
import './cqrs/query-get-items'

import { startApp } from './routes'

startApp()
