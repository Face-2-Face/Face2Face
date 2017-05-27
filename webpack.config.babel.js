import webpack from 'webpack';
import path from 'path';

const config = {
  entry: './client/src/app.js',
  output: {
    path: path.join(__dirname, 'client/public/dist/bundle.js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        include: path.join(__dirname, 'client/src'),
        exclude: ['node_modules'],
        use: [
          { loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015']
            }
          }
        ]
      }
    ]
  }
};

export default config;
