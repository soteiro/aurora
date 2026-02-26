import pino from 'pino';

const level = process.env.LOG_LEVEL || 'info'

export const logger = pino({
  level,
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
        },
        level,
      },
      {
        target: 'pino/file',
        options: { destination: './aurora.log', mkdir: true },
        level,
      },
    ],
  },
});
