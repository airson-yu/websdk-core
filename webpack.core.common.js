const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const VueLoaderPlugin = require('vue-loader/lib/plugin');
require("babel-polyfill"); //es5

module.exports = {
    entry: ['babel-polyfill', './src/websdk.core.js'],
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'iTRUNK CONSOLE WEB SDK'
        }),
        //new VueLoaderPlugin()
    ],
    output: {
        filename: 'websdk.core.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'websdk',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            /*{
                test: /\.vue$/,
                loader: 'vue-loader',//https://vue-loader-v14.vuejs.org/zh-cn/options.html
                options: {
                    transformToRequire: {
                        img: 'src',
                        image: 'xlink:href',
                        audio: 'src',
                        video: 'src',
                        source: 'src',
                    }
                }
            },*/
            /*{
                test: /\.less$/,
                use: [
                    'less-loader'
                ]
                //loader: 'less-loader' // 将 Less 编译为 CSS
            },*/
            {
                test: /\.less$/, use: [
                    {
                        loader: 'vue-style-loader' // creates style nodes from JS strings
                    }, {
                        loader: 'css-loader' // translates CSS into CommonJS
                    }, {
                        loader: 'less-loader', // compiles Less to CSS
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            // 它会应用到普通的 `.css` 文件
            // 以及 `.vue` 文件中的 `<style>` 块
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,//正则表达式匹配图片规则
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 512,//限制打包图片的大小：
                        //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
                        name: 'assets/sdk/img/[name].[ext]',//[name]-[hash:8] images:图片打包的文件夹；
                        //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                        //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                    }
                }]
            },
            {
                test: /\.(ttf|svg|woff|woff2)$/,//正则表达式匹配图片规则
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 512,
                        name: 'assets/sdk/fonts/[name].[ext]',//'assets/font/[name]-[hash:8].[ext]'
                    }
                }]
            },
            {
                test: /\.(wav|mp3)$/,//正则表达式匹配图片规则
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 512,
                        name: 'assets/sdk/audio/[name].[ext]',
                    }
                }]
            }
        ]
    }
};