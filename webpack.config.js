const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {

  context: path.resolve(__dirname, './app'),

  entry: {
    app: './index.ts'
  },

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'http://localhost:9000/dist',
  },

  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },

  devServer: {
    open: true,
    publicPath: 'http://localhost:9000/dist',
    port: 9000
  },

  plugins: [
      new CheckerPlugin()
  ]
};
