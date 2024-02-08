import winston from 'winston'
import { setLogger } from '../../adapters/logger'
import { format, path, todayToShowInFile } from './settings'

const loggerWiston = winston.createLogger({
  level: 'info',
  format,
  transports: [
    new winston.transports.File({ filename: `${path}/error-${todayToShowInFile}.log`, level: 'error' }),
    new winston.transports.File({ filename: `${path}/combined-${todayToShowInFile}.log` }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  loggerWiston.add(new winston.transports.Console({
    format: winston.format.simple(),
  }))
}

const logger = {
  info (message: string) {
    loggerWiston.info(message)
  },
  error (message: string) {
    loggerWiston.error(` 💩 ${message}`)
  }
}

setLogger(logger)
