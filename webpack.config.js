const path = require('path');

module.exports = {
  entry: './src/index.js',
  plugins: [],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'release'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}