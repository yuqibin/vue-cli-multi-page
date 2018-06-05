'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

process.env.NODE_ENV = 'development';

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  //del  注掉SPA的服务器
  // devServer: {
  //   clientLogLevel: 'warning',
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
  //     ],
  //   },
  //   hot: true,
  //   contentBase: false, // since we use CopyWebpackPlugin.
  //   compress: true,
  //   host: HOST || config.dev.host,
  //   port: PORT || config.dev.port,
  //   open: config.dev.autoOpenBrowser,
  //   overlay: config.dev.errorOverlay
  //     ? { warnings: false, errors: true }
  //     : false,
  //   publicPath: config.dev.assetsPublicPath,
  //   proxy: config.dev.proxyTable,
  //   quiet: true, // necessary for FriendlyErrorsPlugin
  //   watchOptions: {
  //     poll: config.dev.poll,
  //   }
  // },
  //end
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    //del   注释掉spa固定的单页出口  末尾动态配上出口
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    //end
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
  //add
    .concat(utils.createHtmlWebpackPlugin())
  //end
})
//del
// module.exports = new Promise((resolve, reject) => {
//   portfinder.basePort = process.env.PORT || config.dev.port
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err)
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port
//       // add port to devServer config
//       devWebpackConfig.devServer.port = port
//
//       // Add FriendlyErrorsPlugin
//       devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//         compilationSuccessInfo: {
//           messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
//         },
//         onErrors: config.dev.notifyOnErrors
//         ? utils.createNotifierCallback()
//         : undefined
//       }))
//
//       resolve(devWebpackConfig)
//     }
//   })
// })
//end
module.exports = devWebpackConfig;
