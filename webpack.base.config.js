const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ],
        }
      },
      {
        test: /\.(jpg|png|svg|gif|pdf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]'
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id][contenthash].css',
    }),
  ]
}