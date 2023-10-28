const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');


// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

// Define log format with custom timestamp format
const customTimestamp = () => {
    return new Date().toLocaleString('en-US', { // EST
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true // 12-hour clock with AM/PM
    });
};

// Create logger
const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({ format: customTimestamp }),
        format.uncolorize(), // Remove ANSI color codes (optional)
        format.printf(({ timestamp, level, filename, message }) => {
            const logMessage = filename ? `${timestamp} [${level}] (${filename}) ${message}` : `${timestamp} [${level}] ${message}`;
            return logMessage;
        })
    ),

    transports: [
        new transports.Console({
            timestamp: customTimestamp, // Use the custom timestamp function
            colorize: true
        }),
        new transports.File({
            filename: path.join(logsDir, 'activity.log'), // Set the log file path here
            maxsize: 5242880, // 5MB maximum file size
            maxFiles: 5, // Keep up to 5 old log files
            tailable: true, // Append to the existing log file
        }),
    ],
});

// Use these functions instead of the default ones to include the filename its coming from
logger.logdebug = (message, filename = '') => { // 4
    logger.debug({ message, filename });
};

logger.logverbose = (message, filename = '') => { // 3
    logger.verbose({ message, filename });
};

logger.loginfo = (message, filename = '') => { // 2
    logger.info({ message, filename });
};

logger.logwarn = (message, filename = '') => { // 1
    console.log(filename)
    logger.warn({ message, filename });
};

logger.logerror = (message, filename = '') => { // 0
    logger.error({ message, filename });
};



module.exports = logger;
