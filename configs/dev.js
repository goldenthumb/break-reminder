const { resolve } = require('path');

const port = process.env.PORT || 3000;

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-renderer',
  entry: [resolve(__dirname, '../app/renderer/index.js')],
  output: {
    path: resolve(__dirname, '../app/renderer/dist'),
    publicPath: `http://localhost:${port}/app/renderer/dist/`,
    filename: 'app.min.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'ts-loader'
        }]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-react"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.(scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:4]'
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
