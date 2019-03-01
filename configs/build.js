const devConfig = require('./dev');

const config = {
  ...devConfig,
  devtool: false,
  mode: 'production',
  target: 'electron-main',
};

config.output.filename = 'app.min.js';

const cssLoader = config.module.rules
  .find(({ test }) => test.toString() === '/\\.(scss|css)$/')
  .use.find(loader => loader.loader === 'css-loader');

cssLoader.options = {
  ...cssLoader.options,
  sourceMap: false,
  localIdentName: '[local]_[hash:base64:12]'
};

module.exports = config;