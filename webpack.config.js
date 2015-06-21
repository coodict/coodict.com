var path             = require('path');
var webpack          = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
      app: path.resolve(__dirname, "app/app.jsx"),
      vendors: ['react', 'reflux', 'react-router', 'react-bootstrap', 'jwt-decode', 'brace', 'highlight.js', 'react-select', 'reqwest']
    },
    output: {
        path: path.resolve(__dirname, 'app/build'),
        filename: "bundle.js"
    },
    module: {
      loaders: [{
        test: /\.jsx$/,

        // There is not need to run the loader through
        // vendors
        loader: 'babel'
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]
};
