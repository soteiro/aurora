import pino from 'pino';
import pinoPretty from 'pino-pretty';
import fs from 'fs';

const level = process.env.LOG_LEVEL || 'info'

const fileStream = fs.createWriteStream('./aurora.log', { flags: 'a' })

const prettyStream = pinoPretty({
  colorize: true,
  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
  ignore: 'pid,hostname',
})

export const logger = pino(
  { level },
  pino.multistream([
    { stream: prettyStream, level: level as pino.Level },
    { stream: fileStream, level: level as pino.Level },
  ])
);
