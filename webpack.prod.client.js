const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]__[hash:base64:5]',
  }
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [autoprefixer]
  }
};

const config = {
  mode: 'production',
  entry: ['./src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle-[contenthash].js',
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
          'sass-loader'
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.s(a|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          postCssLoader,
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template/index.html'
    }),
  ]
};

module.exports = merge.smartStrategy(
  {
    entry: 'prepend', // or 'replace'
    'module.rules': 'prepend'
  }
)(baseConfig, config);