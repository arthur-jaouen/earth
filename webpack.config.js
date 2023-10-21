import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import autoprefixer from 'autoprefixer'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

const config = (env) => ({
  mode: env.dev ? 'development' : 'production',
  target: env.dev ? 'web' : 'browserslist',
  devtool: env.dev ? 'inline-source-map' : 'source-map',
  entry: './src/index.tsx',
  output: {
    path: path.resolve('./dist'),
    publicPath: env.dev ? '/' : './',
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: env.dev ? ['react-refresh/babel'] : [],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          { loader: env.dev ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer({ grid: 'autoplace' })],
              },
            },
          },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[contenthash][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
      title: 'Earth',
    }),
    new ForkTsCheckerWebpackPlugin(),
    ...(env.dev
      ? [new ReactRefreshWebpackPlugin()]
      : [
          new CleanWebpackPlugin(),
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].css',
          }),
        ]),
    ...(env.analyze ? [new BundleAnalyzerPlugin()] : []),
  ],
  stats: 'minimal',
  ignoreWarnings: [/auto-fill/],
  devServer: {
    open: true,
  },
})

export default config
