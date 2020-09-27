const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }]
  },
  plugins: [new HtmlPlugin({ template: 'src/index.html' }), new CopyPlugin({ patterns: [{ from: 'src/static' }] })],
  resolve: {
    // Allow absolute imports from these two directories
    modules: ['src', 'node_modules']
  },
  devServer: {
    // Make the app accessible in local network
    host: '0.0.0.0',
    // The best year
    port: 1987,
    // Less output in the terminal, and a bit faster build too!
    stats: 'errors-only'
  },
  devtool: 'eval-source-map'
}
