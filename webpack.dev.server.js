const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const baseConfig = require('./webpack.base.config')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const StartServerPlugin = require('start-server-webpack-plugin')
const webpack = require('webpack')

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]__[hash:base64:5]',
    exportOnlyLocals: false
  }
}

const CssLoader = {
  loader: 'css-loader',
  options: {
    localIdentName: '[local]__[hash:base64:5]',
    exportOnlyLocals: false
  }
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [autoprefixer]
  }
}

const sassOptions = {
  loader: 'sass-resources-loader',
  options: {
    resources: './src/client/assets/scss/*.scss' // Import all scss
  }
}

const config = {
  mode: 'development',
  target: 'node',
  entry: ['webpack/hot/poll?1000', './src/server/index'],
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  watch: true,
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          CssModuleLoader,
          postCssLoader,
          'sass-loader',
          sassOptions
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          CssLoader,
          postCssLoader,
          'sass-loader',
          sassOptions
        ]
      }
    ]
  },
  plugins: [
    new StartServerPlugin('server.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackBar({
      name: 'server',
      color: 'gold'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new CleanWebpackPlugin()
  ]
}

module.exports = merge.smartStrategy({
  entry: 'prepend', // or 'replace'
  'module.rules': 'prepend'
})(baseConfig, config)
