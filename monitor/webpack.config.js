// webpack.config.js
const path = require('path');

module.exports = {
    mode: "production",
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: "/",
        filename: 'final.js',
    },
    target: 'node',
    // Additional configuration goes here
};