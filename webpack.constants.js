const path = require('path')

const SRC_DIR = path.resolve(__dirname, 'src')
const DIST_DIR = path.resolve(__dirname, 'build')
const STATIC_DIR = path.resolve(__dirname, 'static')

module.exports = {
  SRC_DIR,
  DIST_DIR,
  STATIC_DIR
}
