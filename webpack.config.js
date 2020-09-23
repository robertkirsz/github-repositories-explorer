const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: `${__dirname}/dist`
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: './index.html' })
  ],
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
}
