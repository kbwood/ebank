const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  // mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        exclude: /node_modules/,
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      base: '/ebank/',
      favicon: './src/assets/favicon.ico',
      template: 'index.html',
      title: 'EBank training site',
    }),
  ],
  output: {
    clean: true,
    filename: 'ebank.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
