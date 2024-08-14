const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { esmodules: true } }],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|bmp|webp|svg)$/, // Handle various image formats
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Inline images below 8KB as base64 URLs, otherwise fallback to file-loader
              name: '[name].[hash:8].[ext]',
              outputPath: 'static/media/', // Output folder for images
              esModule: false, // To avoid issues with React's handling of imports
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '.env'), // Load the .env file from the project root
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.ico',
      publicPath: process.env.PUBLIC_URL || '/',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@templates': path.resolve(__dirname, 'src/components/templates'),
      '@pages': path.resolve(__dirname, 'src/components/pages'),
      '@src': path.resolve(__dirname, 'src'),
      antd: path.resolve(__dirname, 'node_modules/antd'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build', 'js'),
    publicPath: process.env.PUBLIC_URL || '/',
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
};
