// const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const { DIST_DIR, STATIC_DIR } = require('./webpack.constants')

module.exports = {
  output: {
    path: DIST_DIR,
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.html', '.css']
  },
  module: {
    rules: [
      // { test: /\.html$/, exclude: [/node_modules/, STATIC_DIR], loader: 'raw-loader' },
      { test: /\.html$/, exclude: [/node_modules/, STATIC_DIR], loader: 'html-loader', options: { esModule: true } },
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.css$/, loaders: [MiniCssExtractPlugin.loader, 'css-loader'] },
      { test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader" }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css", chunkFilename: "[id].css" })
  ]
}
