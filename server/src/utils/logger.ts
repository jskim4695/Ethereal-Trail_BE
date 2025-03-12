// utils/logger.ts
import { createLogger, format, transports } from 'winston';
import client from 'prom-client'; // Prometheus client library

// Prometheus Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register }); // Default system metrics (CPU, Memory, etc.)

// Define custom Prometheus metrics for logs
const logLevelCounter = new client.Counter({
  name: 'winston_log_level_count',
  help: 'Count of log messages by level',
  labelNames: ['level'], // Label for log levels (info, warn, error, etc.)
});
register.registerMetric(logLevelCounter);

// Winston Logger configuration
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    }),
  ),
  transports: [new transports.Console(), new transports.File({ filename: 'logs/application.log' })],
});

// Override log methods to increment Prometheus metrics
['info', 'warn', 'error', 'debug'].forEach((level) => {
  (logger as any)[level] = (message: string) => {
    logger.log(level, message);
  };
});

// Export logger and Prometheus register
export { logger, register };
