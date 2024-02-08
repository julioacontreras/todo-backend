import * as dotenv from 'dotenv'
dotenv.config()

// infrastructure
import './infrastructure/logger'
import './infrastructure/server-http-fastify'
import './infrastructure/event-bus'
import './infrastructure/mongodb-mongoose'

// cqrs commands & queries
import './cqrs/query-get-items'
import './cqrs/command-create-item'
import './cqrs/command-delete-item'
import './cqrs/command-set-is-completed'

import { startApp } from './routes'

startApp()
