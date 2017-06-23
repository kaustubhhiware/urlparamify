var path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules:[
      {test: /\.js$/, include: [path.join(__dirname, 'src')], exclude: /node_modules/, use: 'babel-loader'},
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: "urlparamify",
    libraryTarget: "commonjs-module"
  }
};
