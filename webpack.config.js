// 需要安装的组件
// 开发服务器：npm install --save-dev webpack-dev-server
// babel-loader：npm install --save-dev babel-loader babel-core
// babel转换规则：npm install --save-dev babel-preset-env
// react：npm install --save react react-dom
// react转换规则：npm install --save-dev babel-preset-react
// CSS加载loader：npm install --save-dev style-loader css-loader
// 自动添加浏览器前缀插件：npm install --save-dev postcss-loader autoprefixer
// 根据html模版文件，自动生成一个新的html，其中自动引用打包后的js文件：npm install --save-dev html-webpack-plugin
// react模块代码热加载：npm install --save-dev babel-plugin-react-transform react-transform-hmr
// 打包时分离css、js：npm install --save-dev extract-text-webpack-plugin

// webpack.config.js


// 导入webpack，以便使用BannerPlugin
const webpack = require('webpack');
// 导入html-webpack-plugin，以便使用html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    devtool: 'eval-source-map',

    // __dirname是node.js中的一个全局变量，指向当前执行脚本所在的目录
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/build/",
        filename: "bundle.js"
    },

    devServer: {
        contentBase: "./build", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true, // 实时刷新
        hot: true // 在修改组件代码后，自动刷新实时预览修改后的效果
    },

    // 配置loader
    module: {
        rules: [
            {
                // babel-loader解析ES6代码
                test: /(\.jsx|\.js)$/,
                // babel-loader会自动加载相同目录下的.babelrc里的babel配置选项
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },

            {
                // style-loader、css-loader解析css代码。默认情况下，css和js会打包到同一个文件中
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        // 避免不同模块下，相同的css类名造成冲突
                        options: {
                            module: true
                        }
                    },
                    {
                        // 自动添加浏览器前缀
                        loader: "postcss-loader",
                    }
                ]
            }
        ]
    },

    // 配置plugins
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            // 根据模版./app/index.tmpl.html生成index.html
            template: __dirname + "/app/index.tmpl.html"
        }),
        //热加载插件
        new webpack.HotModuleReplacementPlugin()
    ]
}