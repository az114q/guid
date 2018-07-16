const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'example'),
  },

  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['example']),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'index.html',
      template: './assets/index.ejs',
    })
  ],
  devServer: {
    contentBase: './example',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          },
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          },
        ]
      },
    ]
  }
}