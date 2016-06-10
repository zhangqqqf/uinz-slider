const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './example/index.js',
  output: {
    path: './example',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},
    ]
  },
};
