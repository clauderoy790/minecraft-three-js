import * as _ from 'lodash';

console.log('salut')

import * as webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';
import * as Webpack from 'webpack'
import * as WebpackDevServer from 'webpack'
// import * as webpackConfig from '../webpack.config'
import * as webpackConfig from '../webpack.config.js';
// const Webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const webpackConfig = require('./webpack.config.js');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

server.startCallback(() => {
  console.log('Successfully started server on http://localhost:8080');
  document.body.appendChild(component());
});
function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}
