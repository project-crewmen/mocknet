function convertTimeToSeconds(timeString) {
    // Regular expression to match the value and unit
    const regex = /^(\d+)\s*(ms|micros|us|ns)?$/;

    // Extract value and unit from the input string
    const match = timeString.match(regex);

    if (!match) {
        console.error('Invalid time format');
        return null;
    }

    const value = parseFloat(match[1]);
    const unit = match[2] || 'ms'; // Default to milliseconds if no unit is specified

    // Convert to seconds based on the unit
    switch (unit) {
        case 's':
            return value;
        case 'ms':
            return value / 1000; // Convert milliseconds to seconds
        case 'micros':
        case 'us':
            return value / 1e6; // Convert microseconds to seconds
        case 'ns':
            return value / 1e9; // Convert nanoseconds to seconds
        default:
            console.error('Unsupported time unit');
            return null;
    }
}

module.exports = { convertTimeToSeconds }