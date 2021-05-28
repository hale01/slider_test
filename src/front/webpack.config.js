const path = require('path');
const webpack = require('webpack');

const {VueLoaderPlugin} = require('vue-loader');
const CompressionPlugin = require('compression-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const CopyPlugin = require('copy-webpack-plugin');

let staticBasePath = '/build/';
let scssPath = path.resolve(__dirname, './scss');


module.exports = (env, argv) => {
    let isDevMode = false;
    let isProdMode = false;
    const mode = argv.mode || 'none';

     if (argv.mode === 'development') {
        isDevMode = true;
        staticBasePath = '/build/';
    }

    if (argv.mode === 'production') {
        isProdMode = true;
        staticBasePath = '/static/';
    }

    const config = {
        mode: mode,
        entry: ['./js/app.js'],
        output: {
            path: path.resolve(__dirname, './build/js'),
            filename: 'bundle.js',
            publicPath: staticBasePath + 'js/',
        },
        resolve: {
            extensions: ['.js', '.vue', '.json', '.scss', '.css'],
            modules: ['./node_modules'],
            alias: {
                'vue$': 'vue/dist/vue.cjs.js',
                '@': path.resolve(__dirname, './js'),
                styles: scssPath,
            },
            fallback: {
                url: require.resolve('url'),
            }
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {},
                },
                {
                    test: /\.css$/,
                    use: ['vue-style-loader', 'style-loader', 'css-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|jpg)$/,
                    use: [{

                        loader: 'file-loader',
                        options: {
                            outputPath: '../style_files',
                            publicPath: staticBasePath + 'style_files/',
                            name: '[path][name].[ext]',
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                    }
                },
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new CompressionPlugin(),
            new webpack.DefinePlugin({
                VARIABLES: JSON.stringify({
                    MODE: mode,
                    MODE_PROD: isProdMode,
                    MODE_DEV: isDevMode,
                    STATIC_PATH: staticBasePath,
                }),
            }),
            new SpriteLoaderPlugin({plainSprite: true}),
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, 'fonts'),
                        to: path.resolve(__dirname, 'build/fonts'),
                    },
                    {
                        from: path.resolve(__dirname, 'images'),
                        to: path.resolve(__dirname, 'build/images'),
                    },
                ]
            }),
        ]
    };

    if (isDevMode) {
        config.devtool = 'source-map';
    }

    if (isProdMode) {
        config.output.chunkFilename = '[name].[contenthash].js';
    }

    return config;
};

