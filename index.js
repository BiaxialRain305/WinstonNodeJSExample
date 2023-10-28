// Adjust the paths accordingly
const logger = require('./logger.js');
const otherFileFunction = require('./other.js');

// Get the full path to the current module's filename
const currentFilename = __filename.split("\\").pop();

// Example usage
function main() {
    logger.loginfo('This is an info message from index.js.', currentFilename);
    logger.logwarn('This is a warning message from index.js. FileName was purposed not added');
    logger.logerror('This is an error message from index.js. FileName was purposed not added');
    otherFileFunction();
}

main();