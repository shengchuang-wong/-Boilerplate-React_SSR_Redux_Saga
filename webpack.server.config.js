const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./webpack.base.config');

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]__[hash:base64:5]',
    exportOnlyLocals: true
  }
};

const CssLoader = {
  loader: 'css-loader',
  options: {
    localIdentName: '[local]__[hash:base64:5]',
    exportOnlyLocals: true
  }
}

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [autoprefixer]
  }
};

const config = {
  mode: 'development',
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
          CssModuleLoader,
          postCssLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          CssLoader,
          postCssLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  }
};

module.exports = merge.smartStrategy(
  {
    entry: 'prepend', // or 'replace'
    'module.rules': 'prepend'
  }
)(baseConfig, config);