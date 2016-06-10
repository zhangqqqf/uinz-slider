const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/example.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './example.js'
  },
  module: {
    loaders: [
      {test: /\.js?$/, include: path.resolve(__dirname, 'src'), exclude: /node_modules/, loader: 'babel'},
    ]
  },
};
