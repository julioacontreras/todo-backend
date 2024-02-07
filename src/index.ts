import * as dotenv from 'dotenv'
dotenv.config()

// infrastructure
import './infrastructure/logger'
import './infrastructure/server-http-fastify'
import './infrastructure/event-bus'

// cqrs commands & queries
import './routes/register-query-get-items'

import { startApp } from './routes'

startApp()
