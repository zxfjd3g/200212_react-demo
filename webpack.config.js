const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');//打包带着html文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');//每次打包自动清理dist
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // entry: path.resolve(__dirname,'src/index.js'),//入口
    // entry:'./src/index.js',//入口
    entry: ["@babel/polyfill", "./src/index.js"],
    
    output: {
        path: path.resolve(__dirname, 'dist'),//打包完成后的文件放在哪，dist文件夹会自动创建好
        filename: 'main.js',
        publicPath: '/'// 引入打包的文件时路径以/开头
    },

    //配置各种loader
    module:{
        rules:[
            //解析ES6
            {
                test: /\.jsx?$/, // 能处理js和jsx文件
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    //本身并不能解析es6语法，它依赖的是babel/preset-env去解析的
                    //babel/preset-env包含了一系列的ES6语法解析的插件,每个插件对应一个ES6语法
                    //babel-loader它就是依靠这些插件去解析的
                    options: {
                        presets: [
                            '@babel/preset-env',  // ES6==>ES5
                            '@babel/preset-react', // jsx ==> js
                        ], 
                        plugins: [
                            "@babel/plugin-proposal-class-properties" // 解析类属性 组件类中的state
                        ]
                    }
                }
            },
            //打包CSS
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]//使用loader的时候有顺序，从后往前
            },
            //打包图片，内部会使用到file-loader
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',//内部会使用到file-loader
                        options: {
                            limit: 8192*100, 
                            //如果图片小于这个值，会被base64编码为一个字符串，提高效率，减少请求
                            name:'[hash:8].[ext]' //打包后的图片名字，截取哈希值的前八位就ok
                        }
                    }
                ]
            },
            //配置loader处理字体图标
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },

    //配置插件完成其它搞不定的功能
    plugins:[
        new HtmlWebpackPlugin({
            //得去找我要配置的html文件
            template:'./public/index.html'
        }),
        new CleanWebpackPlugin(),//自动清理dist文件夹插件,
        new CopyPlugin([ //为了把public下除了index.html文件外的其余所有，给dist目录下拷贝一份
            {
                from:path.resolve(__dirname,'public'),
                to:path.resolve(__dirname,'dist'),
                ignore:['index.html']
            }
        ]),
    ],

    mode:'development',//配置启动模式，开发模式还是生产模式

    devServer: {
        port:8080,//服务启动的端口
        open:true,//是否自动打开浏览器
        quiet:true,//输出少量的提示信息
        proxy: {
            '/api': {//这个/api其实是为了告诉代理，以后什么样的请求，需要给我代理转发
                target: 'http://localhost:4000',
                //转发的目标地址，不需要路径，因为转发的时候会把发送请求的路径默认频道目标后面
                //我们发http://localhost:8080/api/users/info
                //最终转发的目标会变为http://localhost:4000/api/users/info

                pathRewrite: {'^/api' : ''},
                //真正的目标地址应该是http://localhost:4000/users/info
                //这一行在干的活就是把/api去掉，不就是真正的目标地址？

                changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
            }
        },
        historyApiFallback: true,// 任意的 404 响应都被替代为 index.html 备胎
    },

    devtool:'cheap-module-eval-source-map',//定位出错所在的原始代码行

    resolve:{
        extensions: [".js", '.jsx', ".json"],//解决导入省略后缀名称
        alias:{
            //给路径取别名,以后导入vue的时候，默认是在找'vue/dist/vue.esm.js'
            // 'vue$':'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')//取别名，让@代替根路径下的src  '/src'
        }
    }
};