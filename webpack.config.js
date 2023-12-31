const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
    const isDevelopment = argv.mode !== 'production';

    return {
        entry: './src/index.js',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devServer: {
            port: 3000,
            hot: true,
        },
        // devtool: isDevelopment ? 'eval-source-map' : 'source-map',
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            cacheCompression: false,
                            compact: !isDevelopment,
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader','css-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './index.html' }), //
            // new MiniCssExtractPlugin({ filename: 'style.css' }),
        ],
        // performance: {
        //     hints: isDevelopment ? 'warning' : 'error',
        // },
    };
};