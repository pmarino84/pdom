const HtmlWebpackPlugin = require('html-webpack-plugin')

function page(name, title, pathToEntryFile, template, filename, chunks) {
  const pluginOptions = {
    hash: true,
    minify: true,
    title: title,
    template: template,
    chunks: chunks ? chunks.concat([name]) : [name],
    inject: 'body',
    filename: filename //relative to root of the application
  }
  // console.log(name + 'page plugin options: ', pluginOptions)

  return {
    entry: { [name]: pathToEntryFile },
    plugins: [new HtmlWebpackPlugin(pluginOptions)]
  }
}

module.exports = {
  page
}
