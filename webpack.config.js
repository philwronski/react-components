// The path module provides utilities for working with file and directory paths.
var path = require('path');
// The ExtractTextPlugin modules provides utilities for moves every require("style.css") in entry chunks into a separate css output file.
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//  Identifies common modules and put them into a commons chunk.
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  // Absolute path for resolving entry option.
  context: path.resolve(__dirname, "src"),
  // Entry point for the bundle
  entry: {
    main: './index.js'
  },
  // Output compilation file.
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      // Support for ES6.
      {
        test: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // Compile SASS file and extracts it from html file.
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style', // The backup style loader
          'css?sourceMap!sass?sourceMap'
        )
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'), // Extract CSS into an external file.
    new CommonsChunkPlugin("js/commons.js")
  ]
};
