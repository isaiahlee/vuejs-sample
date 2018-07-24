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
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    // {
    //     // test: "/src/main/resources/templates/test/test.ftl"
    //     rewrites: [
    //         { from: /^\/$/, to: path.posix.join(config.dev.assetsPublicPath, 'src/main/resources/templates/test/test.ftl') },
    //     ],
    // },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    // quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.dev.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ])
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('../css/[name].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
  ]
})

// const pages = utils.getEntry('./src/main/resources/templates/**/App.vue');
// for (var pathname in pages) {
//     console.log('pathname: ', pages[pathname] + '.ftl');
//     var conf = {
//         filename: pathname + '.html',
//         template: pages[pathname] + '.ftl',
//         inject: true,
//         minify: {
//             //removeComments: true,
//             //collapseWhitespace: true,
//             //removeAttributeQuotes: true
//         },
//         chunksSortMode: 'dependency'
//     };
//
//     if (pathname in devWebpackConfig.entry) {
//         conf.chunks = ['manifest', 'vendor', pathname];
//         conf.hash = true;
//     }
//     devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
// }


const vindex = utils.getEntry('./src/main/resources/templates/**/vindex.ftl');
for (var index in vindex) {

  let indexFile = vindex[index];
  console.log('vindex: ', JSON.stringify(indexFile));
//     vindex:  {"dirname":"./src/main/resources/templates/vue/sub","pathname":"vue/sub","fullpath":"./src/main/resources/templates/vue/sub/vindex.ftl"}
// vindex:  {"dirname":"./src/main/resources/templates/vue","pathname":"vue","fullpath":"./src/main/resources/templates/vue/vindex.ftl"}
  var conf = {
    filename: 'vindex.ftl',
    template: indexFile.fullpath,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
  };

  // let pathname;
  // if (pathname in devWebpackConfig.entry) {
  //     conf.chunks = ['manifest', 'vendor', pathname];
  //     conf.hash = true;
  // }

  devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// const ftlTemplates = utils.getEntry('./src/main/resources/templates/**/*.ftl');
// let ftlOptions = [];
// for (var ftl in ftlTemplates) {
//     // console.log('ftl: ', JSON.stringify(ftlTemplates[ftl]));
//
//     let ftlFile = ftlTemplates[ftl];
//     let conf = {
//         from: ftlFile.fullpath,
//         to: ftlFile.pathname
//     };
//
//     ftlOptions.push(conf);
// }
// devWebpackConfig.plugins.push(new CopyWebpackPlugin(ftlOptions));

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
