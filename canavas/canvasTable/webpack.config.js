const path = require('path')
const Config = require('webpack-chain')
const webpackCleanPlugin = require('clean-webpack-plugin')
const config = new Config()

config
  .entry('entry')
    .add('./index.js')
    .end()
  .mode('production')
  .output
    .path(path.resolve(__dirname, 'dist'))
    .filename('[name].js')
    .end()
  .devServer.hot(true).end()
  .watch(true)


  config.plugin('clean')
    .use(webpackCleanPlugin)

module.exports = config.toConfig()