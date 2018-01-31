const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const APP_DIR = path.resolve(__dirname, 'src/main');
const BUILD_DIR = path.resolve(__dirname, 'src/main/resources/static');


module.exports = {
    entry: APP_DIR + '/javascript/index.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};