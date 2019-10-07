const path = require('path');

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
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  resolve: { 
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx'] ,
  }
}