const base = require('./webpack.base')
const merge = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')

const { DIST_DIR } = require('./webpack.constants')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: DIST_DIR,
    open: false,
    hot: true
  }
})
