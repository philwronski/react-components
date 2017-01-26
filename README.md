# How to install a React development environment

## Summary
- [Install Node.js](#Install Node.js)
- [Install Atom editor](#Install Atom editor)
  - test


## Install Node.js
Node.js is essential for developping with React.

1. Go to https://nodejs.org/en/ and download the latest (LTS) version of node.js
2. Double-click on the installer and follow the steps.

###### Bonus
For better management of node.js, you can install nvm (node version manager). Go [here](https://github.com/creationix/nvm/blob/master/README.markdown#installation) and follow the steps.

## Install Atom editor
Atom is a lightweight and hackable text editor. It is especially suitable for web development.

1. Go to https://atom.io and download Atom.
2. Double-click on the installer and follow the steps.

#### Install Atom packages
Atom has lot of packages. Among them some stand out.
- **Nuclide** provides a first-class development environment for React.
- **Minimap** add a preview of the full source code.
- **File-icon** assign file extension icons and colours for improved visual grepping.
- **Emmet** add abbreviations to write code.
- **Docblockr** help you to write documentation in your code.

## Package.json
In Node.js development, all project needs a package.json file to describe them and manage dependencies.

Initialize a project with this command line:
```sh
npm init
```

## React
Use npm to install react and react-dom.
```sh
npm install --save react react-dom
```

## Install and configure Webpack
Webpack is a module bundler. Webpack takes modules with dependencies and generates static assets representing those modules. It's a powerful tool for web development.

#### Installation
You need to have node.js installed.
```sh
npm install webpack -g
```
In our case, Webpack needs loaders and plugins to bundler ES6 and React code. It also supports sass.
Install them with:
```sh
# Babel for transpiling ES6 code to ES5.
npm install --save-dev babel-core
npm install --save-dev babel-loader
npm install --save-dev babel-preset-es2015

# Deprecated, see to replace it with postcss-loader.
npm install --save-dev autoprefixer-loader

# CSS and SASS loaders.
npm install --save-dev css-loader
npm install --save-dev node-sass
npm install --save-dev sass-loader
npm install --save-dev style-loader

# Plugin to extract <style> tags content to external file.
npm install --save-dev extract-text-webpack-plugin
```
#### Configuration

Webpack requires some configuration settings to carry out its work and the best practice is doing it via a config file called **webpack.config.js**.

```javascript
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
```
Babel needs to be configured with **.babelrc** file.

```javascript
{
  "presets" : ["es2015", "react"]
}
```

## Initialize a project

## Extra
Yo generator.
