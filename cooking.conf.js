var path = require('path');
var cooking = require('cooking');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js'],
  },
  dist: './dist',
  template: './index.tpl',

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
  // , 'lint'
  extends: ['vue2', 'buble', 'autoprefixer']
});
cooking.add('output.filename', '[name].js');
cooking.add('entry.commons', [ __dirname + '/src/extension/background.js' ] );
cooking.add('plugin.commons', new webpack.optimize.CommonsChunkPlugin({names: ['commons'], children :true}));
cooking.add('plugin.html', new HtmlWebpackPlugin({
  chunks: ['manifest','vendor','app'],
  template: './src/view/index.html', //生成的html存放路径，相对于path
  inject: 'body'
}));

module.exports = cooking.resolve();
