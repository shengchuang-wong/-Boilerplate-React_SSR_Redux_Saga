const path = require('path')
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
        options: {
          presets: [
            '@babel/react',
            [
              '@babel/env',
              { modules: false, targets: { browsers: ['last 2 versions'] } }
            ]
          ]
        }
      },
      {
        test: /\.(jpg|png|svg|gif|pdf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]'
        }
      }
      // {
      //   test: /\.(html)$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attrs: [':data-src']
      //     }
      //   }
      // }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx']
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       // Merge all the CSS into one file
  //       styles: {
  //         name: 'styles',
  //         test: /\.s?css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  plugins: [new LoadablePlugin()]
}
