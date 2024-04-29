const path = require('path');

module.exports = {
    mode: 'production',
    entry: './server.js',
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: 'final.js',
    },
    target: 'node',
};
