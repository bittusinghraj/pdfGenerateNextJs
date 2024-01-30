const winston = require('winston');

// Define the log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Set the logging level (e.g., 'info', 'warn', 'error')
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Log to console
        new winston.transports.File({ filename: 'logs/app.log' }) // Log to a file
    ]
});

module.exports = logger;
