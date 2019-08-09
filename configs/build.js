const devConfig = require('./dev');

const config = {
    ...devConfig,
    devtool: false,
    mode: 'production',
    target: 'electron-main',
};

module.exports = config;
