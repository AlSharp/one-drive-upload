const {merge} = require('webpack-merge');
const common = require('./webpack.common');

const path = require('path');

const {publicPath} = require('./secrets');

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath,
    path: path.join(__dirname, "dist")
  }
})