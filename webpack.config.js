const webpack = require('webpack')
const path = require('path')
const DEBUG = process.env.NODE_ENV !== 'production'

module.exports = {
  devtool: DEBUG ? 'cheap-module-source-map' : '',
  
  entry: {
    'scroll-id': './src/scroll-id.js',
  },

  output: {
    library: 'ScrollId',
    libraryTarget: 'umd',
    // publicPath: 'http://localhost:3000/',
    path: path.join(__dirname, 'dist'),
    filename: "[name].js"
  },

  module: {
    rules: [{
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(otf|eot|svg|ttf|woff)/,
        use: 'url-loader?limit=268192'
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.json', '.scss', '.jsx'],
    // alias 可以设置别名
    alias: {
      // 'config': path.join(__dirname, 'config.js')
    }
  },

  plugins: DEBUG ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function(module) {
    //     return module.context && module.context.indexOf('node_modules') !== -1
    //   }
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest'
    // }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    compress: false,
    hot: true,
    hotOnly: true,
    inline: true,
    host: "0.0.0.0",
    port: 8080,
    clientLogLevel: "info",
  },
}
