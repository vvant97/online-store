const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';

module.exports = {
  mode,
  devtool: devMode ? 'inline-source-map' : undefined,
  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: '/index.html' }],
    },
    port: 8000,
    watchFiles: ['./src/*'],
    open: true,
    hot: true,
  },
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js',
    clean: process.env.NODE_ENV === 'production',
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[contenthash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[contenthash][ext]',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `./src/assets/img`,
          to: `assets/img`,
          noErrorOnMissing: true,
          force: true,
        },
      ],
    }),
    new EslintPlugin({ extensions: 'ts' }),
    new NetlifyPlugin({
      redirects: [
        {
          from: '/*',
          to: '/index.html',
          status: 200,
        },
      ],
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
};
