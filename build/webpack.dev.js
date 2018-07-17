const base = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');

const dev = merge(base, {
  mode: 'development',
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin({
      // multiStep: true // 分两步更新，先编译热点，再编译普通模块
    }),
    new webpack.NamedModulesPlugin() // 和热更新一起使用，显示模块的相对路径，建议用于开发环境。
  ],
  // Enable sourcemaps for debuggering webpack's output.
  // 调试使用source-map
  devtool: 'source-map',
  devServer: {
    port: 8120, // 不解释
    host: '127.0.0.1', // 不解释
    contentBase: './', //
    publicPath: '/',
    compress: true, // 开启虚拟服务器时，进行代码压缩。
    historyApiFallback: true, // true: 不弹出404页面
    open: true, // 自动打开浏览器
    overlay: { // 是否在浏览器上全屏显示编译的errors and warnings
      errors: true,
      warnings: false
    },
    hot: true,
    quiet: true, // 在终端显示错误信息，可与类似 FriendlyErrorsPlugin 等错误美化插件配合使用
    // publicPath: '/static/', // 变换请求路径，有待验证具体效果。

    // 假设你主机名为 localhost:8080,请求 API 的 url 是 http：//your_api_server.com/user/list。
    // '/proxy'：当触发请求 API 事件时，请求 url 是http：//localhost:8080/proxy/user/list。
    // changeOrigin：如果 true，那么 http：//localhost:8080/proxy/user/list 变为 http：//your_api_server.com/proxy/user/list。
    // pathRewrite：重写路径。匹配 /proxy ，然后变为''，那么 url 最终为 http：//your_api_server.com/user/list。
    // proxy: {
    //   '/api': { // 自定义名字，可随意修改
    //     target: 'http://test.api.com', // 不同域名多接口地址
    //     changeOrigin: true, //
    //     pathRewrite: {
    //       '^/api': '' // 把 api 转换成''
    //     }
    //   }
    // },
    watchOptions: {
      aggregateTimeout: 500, // 毫秒数，改变了文件，在重新编译之前的延迟
      poll: 1000 , // 以毫秒数检查是否有文件改动
      ignored: /node_modules/ // 排除的文件
    }
  }
});

module.exports = dev;
