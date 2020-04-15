const path = require('path');

module.exports = (env, { mode }) => ({
  entry: { app: './src/index.tsx' },
  output: {
    path: path.resolve(__dirname, 'dist', 'assets', 'built'),
    filename: 'app.js',
    publicPath: '/assets/built/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true
  },
  devtool: mode === 'development' ? 'source-map' : false,
  plugins: []
});
