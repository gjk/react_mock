const base = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const pro = merge(base, {
  mode: 'production',
  // Enable sourcemaps for debuggering webpack's output.
  // 调试使用source-map
  devtool: 'cheap-module-source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({})
    ]
  }
});

// 打包
webpack(pro, (err, stats) => {
  if(err) throw err

  // 写文件
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log('  打包失败了亲！！！\n')
    process.exit(1)
  }

  console.warn('  恭喜，打包完成。\n')
})

module.exports = {
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
