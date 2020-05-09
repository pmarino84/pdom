const base = require('./webpack.base')
const merge = require('webpack-merge')
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin')

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new BabelMinifyWebpackPlugin({}, {})
  ]
})