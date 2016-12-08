var path = require('path');
var cooking = require('cooking');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js'],
    popup: ['babel-polyfill', './src/popup/main.js'],
  },
  dist: './dist',
  template: {
    'index.html': {
      chunks: ['manifest','vendor','app'],
      template: './index.tpl'
    },
    'popup.html': {
      chunks: ['manifest','vendor','popup'],
      template: './index.tpl'
    }
  },

  devServer: {
    port: 8080,
    publicPath: '/'
  },

  // production
  clean: true,
  hash: true,
  sourceMap: true,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: './',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'buble', 'autoprefixer']
});
cooking.add('output.filename', '[name].js');
cooking.add('entry.background', [ __dirname + '/src/extension/background.js' ] );
cooking.add('entry.content', [ __dirname + '/src/extension/content.js' ] );

module.exports = cooking.resolve();
