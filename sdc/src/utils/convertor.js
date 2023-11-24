function convertSizeToBytes(memory) {
    const sizeRegex = /^(\d+)\s*(TB|GB|MB|KB|B)?$/i; // Case-insensitive regex for size with optional unit

    const match = memory.match(sizeRegex);

    if (!match) {
        console.error('Invalid memory format');
        return null;
    }

    const size = parseInt(match[1]);
    const unit = (match[2] || 'B').toUpperCase(); // Default to bytes if no unit provided

    const unitToBytes = {
        'B': 1,
        'KB': 1024,
        'MB': 1024 * 1024,
        'GB': 1024 * 1024 * 1024,
        'TB': 1024 * 1024 * 1024 * 1024,
    };

    if (!(unit in unitToBytes)) {
        console.error('Unsupported memory unit');
        return null;
    }

    const bytes = size * unitToBytes[unit];

    return bytes;
}

module.exports = { convertSizeToBytes }