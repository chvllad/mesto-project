import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

const jsEntry = './src/components/index.js';
const htmlTemplate = './src/index.html';

export default (_env, argv) => {
  const mode = argv.mode ?? 'development';
  const devtool = mode === 'production' ? false : 'eval-source-map';

  return {
    entry: { main: jsEntry },
    output: {
      path: resolve('dist'),
      filename: 'main.js',
      publicPath: '',
    },
    mode,
    devtool,
    devServer: {
      static: resolve('dist'),
      compress: true,
      port: 8080,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: '/node_modules/',
        },
        {
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          type: 'asset/resource',
        },
        {
          test: /\.s?css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 3 },
            },
            'postcss-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.html?$/i,
          loader: 'html-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: htmlTemplate,
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
    ],
    optimization: {
      minimizer: ['...', new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      })],
    },
  };
};
