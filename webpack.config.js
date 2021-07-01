const path = require('path');
const BUILD_DIR = path.resolve(__dirname, './public/build');
const APP_DIR = path.resolve(__dirname, './client');

module.exports = {
    mode: 'development',
    entry: {
        main: APP_DIR + '/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
              },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                }
                ]
            }
        ]
            
        
    }
}