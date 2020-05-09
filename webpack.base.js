const path = require('path')

const { SRC_DIR, DIST_DIR, STATIC_DIR } = require('./webpack.constants')
const commons = require('./webpack.common')
const merge = require('webpack-merge')
const { page } = require('./webpack.utils')

const homePage = page('app', 'Virtual DOM', path.resolve(SRC_DIR, 'index.js'), path.resolve(STATIC_DIR, 'index.html'), path.resolve(DIST_DIR, 'index.html'), ['vendors'])
const base = merge(commons, homePage)

module.exports = base
