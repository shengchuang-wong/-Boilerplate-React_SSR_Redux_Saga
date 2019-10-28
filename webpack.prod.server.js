const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const baseConfig = require('./webpack.base.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
  mode: 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: ['./src/server/index.js'],
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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id][contenthash].css'
    })
  ]
}

module.exports = merge.smartStrategy({
  entry: 'prepend', // or 'replace'
  'module.rules': 'prepend'
})(baseConfig, config)
