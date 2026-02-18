import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  // Configuramos el transporte para desarrollo
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      }
    : undefined,
});

