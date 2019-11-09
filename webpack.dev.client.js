const path = require('path')
const autoprefixer = require('autoprefixer')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

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
  mode: 'development',
  entry: ['react-hot-loader/patch', './src/client/index.js'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.module\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
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
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          'css-loader',
          postCssLoader,
          'sass-loader',
          sassOptions
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 3001,
    historyApiFallback: true,
    writeToDisk: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        // Merge all the CSS into one file
        styles: {
          name: false,
          test: /\.s?css$/,
          chunks: 'all',
          minChunks: 1,
          // reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new WebpackBar({
      name: 'client',
      color: '#136fd3'
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
