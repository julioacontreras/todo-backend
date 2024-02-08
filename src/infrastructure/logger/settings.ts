import winston from 'winston'

const { combine, timestamp, printf, colorize, align } = winston.format

const today = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})
  .format(new Date())
  .split(' ')

export const path = `logs/${today[2]}/${today[1]}/${today[0]}`
export const todayToShowInFile = today.join('-')
export const format = combine(
  colorize({ all: true }),
  timestamp({
    format: 'YYYY-MM-DD hh:mm:ss.SSS A',
  }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
)
