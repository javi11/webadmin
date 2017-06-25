import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import helpers from './helpers';

export default {
  entry: {
    polyfills: './client/src/polyfills.ts',
    vendor: './client/src/vendor.ts',
    app: './client/src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?limit=1024&name=./assets/fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: 'file-loader?name=assets/img/[name].[hash].[ext]'
      },
      {
        test: /\app.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\app.scss$/,
        use: [
          'to-string-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: 'css-loader?sourceMap&minimize'
        })
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
          fix: false
        }
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new CopyWebpackPlugin([
      {
        from: helpers.root('src', 'assets', 'i18n'),
        to: 'assets/i18n'
      },
      {
        from: helpers.root('src', 'assets', 'img'),
        to: 'assets/img'
      }
    ]),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills', 'manifest']
    }),

    new HtmlWebpackPlugin({
      template: './client/src/index.html'
    })
  ],

  performance: {
    // This sizes are intended for web use. For mobile friendly apps, they should be lower
    maxEntrypointSize: 5000000,
    maxAssetSize: 2000000
  }
};
