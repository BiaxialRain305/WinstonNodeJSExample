 // Adjust the path accordingly
const logger = require('./logger.js');

// Get the full path to the current module's filename
const currentFilename = __filename.split("\\").pop();


// Example usage - Use a different name for the function
function otherFileFunction() { 
    logger.loginfo('This is the second info from other.js.', currentFilename);
    logger.logwarn('This is the second warning from other.js.', currentFilename);
    logger.logerror('This is the second error from other.js.', currentFilename);
}

// Export the function
module.exports = otherFileFunction; 
