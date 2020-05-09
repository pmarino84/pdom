module.exports = function (env, argv) {
  return require(`./webpack.${env}.js`)
}