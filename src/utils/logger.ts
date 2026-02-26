import pino from 'pino';
import { appendFileSync } from 'fs';

const level = process.env.LOG_LEVEL || 'info'
const LOG_FILE = './aurora.log'

// pino-pretty para consola (funciona en Bun como transport único)
const pinoLogger = pino({
  level,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
      ignore: 'pid,hostname',
    },
  },
})

// Escritura síncrona al archivo de log
const logToFile = (lvl: string, msg: string) => {
  const entry = JSON.stringify({
    level: lvl,
    time: new Date().toISOString(),
    msg,
  })
  appendFileSync(LOG_FILE, entry + '\n')
}

const wrap = (lvl: string) =>
  (msg: string) => {
    logToFile(lvl, msg);
    (pinoLogger as any)[lvl](msg)
  }

export const logger = {
  info: wrap('info'),
  error: wrap('error'),
  debug: wrap('debug'),
  warn: wrap('warn'),
  fatal: wrap('fatal'),
}
