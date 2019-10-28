const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const CssModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[local]__[hash:base64:5]'
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
  entry: ['./src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle-[contenthash].js',
    publicPath: '/'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
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
          'css-loader',
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
    }),
    new CleanWebpackPlugin()
  ]
}

module.exports = merge.smartStrategy({
  entry: 'prepend', // or 'replace'
  'module.rules': 'prepend'
})(baseConfig, config)
