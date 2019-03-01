const { resolve } = require('path');
const autoprefixer = require('autoprefixer');

const port = process.env.PORT || 3000;

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-renderer',
  entry: [resolve(__dirname, '../app/index.js')],
  output: {
    path: resolve(__dirname, '../app/dist'),
    publicPath: `http://localhost:${port}/app/dist/`,
    filename: 'app.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-react"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:4]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer('last 2 versions', 'ie 10')
              ]
            }
          },
          'sass-loader'
        ]
      },
    ]
  }
};