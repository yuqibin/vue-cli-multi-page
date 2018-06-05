/**
 * created by qbyu2 on 2018-05-30
 * express 私服
 * */
'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');   //文件监控(前面配置了从views下面监控)
const webpackHotMiddleware = require('webpack-hot-middleware');   //热加载
const config = require('../config');
const devWebpackConfig = require('./webpack.dev.conf');
const proxyMiddleware = require('http-proxy-middleware');   //跨域

const proxyTable = config.dev.proxyTable;

const PORT = config.dev.port;
const HOST = config.dev.host;
const assetsRoot = config.dev.assetsRoot;
const app = express();
const router = express.Router();
const compiler = webpack(devWebpackConfig);

let devMiddleware  = webpackDevMiddleware(compiler, {
  publicPath: devWebpackConfig.output.publicPath,
  quiet: true,
  stats: {
    colors: true,
    chunks: false
  }
});

let hotMiddleware = webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
  heartbeat: 2000
});

app.use(hotMiddleware);
app.use(devMiddleware);

Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {
      target: options
    };
  }
  app.use(proxyMiddleware(context, options));
});

//双路由   私服一层控制私服路由    vue的路由控制该页面下的路由
app.use(router)
app.use('/static', express.static(path.join(assetsRoot, 'static')));

let sendFile = (viewname, response, next) => {
  compiler.outputFileSystem.readFile(viewname, (err, result) => {
    if (err) {
      return (next(err));
    }
    response.set('content-type', 'text/html');
    response.send(result);
    response.end();
  });
};

//拼接方法
function pathJoin(patz) {
  return path.join(assetsRoot, patz);
}

/**
 * 定义路由(私服路由 非vue路由)
 * */

// favicon
router.get('/favicon.ico', (req, res, next) => {
  res.end();
});

// http://localhost:8080/
router.get('/', (req, res, next)=>{
  sendFile(pathJoin('index.html'), res, next);
});

// http://localhost:8080/home
router.get('/:home', (req, res, next) => {
  sendFile(pathJoin(req.params.home + '.html'), res, next);
});

// http://localhost:8080/index
router.get('/:index', (req, res, next) => {
  sendFile(pathJoin(req.params.index + '.html'), res, next);
});

module.exports = app.listen(PORT, err => {
  if (err){
    return
  }
  console.log(`Listening at http://${HOST}:${PORT}\n`);
})
