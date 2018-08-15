var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var publicPath = 'http://localhost:3000/';

module.exports = {
  // 入口文件
  /*
    所谓入口文件就是从这个文件中引入的资源都会被Webpack统一打包处理，
    无论它是图片资源，样式资源，还是JS资源。
    Webpack会根据配置对不同类型的资源文件进行不同方式的处理。
  */
  entry: ["./src/js/index.js"],

  // 出口地址 —— 用于输出
  /*
    path：设置当前输出路径
    filename：设置输出文件名
    publicPath：配置文件在html中引用的根路径，改变静态资源引入的相对路
                当图片等静态资源无法正常显示时，可考虑设置
    注意：
      关于地址的设置，开始的时候最好先不要设置子目录，
      当你保证自己的目录没有问题后，再设置子目录
      否则因为路径问题会出现很多莫名其妙的错误
      例如：
        because its MIME type ('text/html') is not a
        supported stylesheet MIME type,
        and strict MIME checking is enabled.
  */
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: '[name].[hash:8].js',
    publicPath: publicPath
  },
  // 设置环境：生产（production)/开发(development)
  mode: "development",
  module: {
    rules: [
      //css loader
      {
        test: /\.css$/,
        // 此处使用ExtractTextPlugin插件会将css单独成一个文件
        // 若不使用该文件，则会将css内联至html文件的body当中
        /*
          use: 值需要什么样的loader去编译文件
          fallback: 编译后用什么loader去提取css文件
        */
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },

  plugins: [
    // 该插件可以生成一个HTML文件，并将css、js等资源自动加载
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname,'./src/index.html')
    }),

    new ExtractTextPlugin('css/index.[chunkhash].css')
  ],

  // 服务器设置，当运行webpack-dev-server会加载此处的资源
  /*
    port：端口号
    注意：
    你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,
    实时编译后的文件都保存到了内存当中。
    因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件
  */
  devServer: {
    port: 3000,
    host: 'localhost'
  }
}
