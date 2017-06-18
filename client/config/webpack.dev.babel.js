import webpackMerge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import commonConfig from './webpack.common.babel.js';
import helpers from './helpers';

export default webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    filename: '[name].js'
  },

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    port: 8080,
    proxy: [
      {
        context: ['/api/**'],
        target: 'http://localhost:3020',
        secure: false
      }
    ]
  },

  performance: {
    hints: false
  }
});
