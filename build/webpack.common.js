const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const projectRootUrl = path.resolve(__dirname, '../')

let lastPrams = process.argv[process.argv.length - 1];
// 项目生成目录
const fileNameDIY = lastPrams.indexOf('.js') < 0 ? lastPrams : 'dist';

const config = {
  entry: projectRootUrl + '/src/index.jsx',
  // context: path.resolve(__dirname, ''),
  output: {
    filename: 'bundle.js', // 项目打包文件
    path: projectRootUrl + fileNameDIY + '/', // 项目打包输出路径
    publicPath: '/' // 打包后引用的资源路径
  },

  // 设置打包文件大小
  performance: {
    hints: 'warning',  // 枚举，警告
    maxAssetSize: 5120000, // 单文件超过5MB，命令行告警（以字节为单位）
    maxEntrypointSize: 10240000, // 首次加载文件总和超过10MB，命令行告警（以字节为单位）
  },
  // // 此处。。。
  // target: 'node',
  // node: {
  //   __dirname: true,
  //   __filename: true,
  // },

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      // 使用'awesome-typescript-loader' 编译 '.tsx' 文件
      // { test: /\.tsx?$/, use: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, use: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader','sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: projectRootUrl + '/src/assets/scss/style.scss'
            }
          }
        ]
      }, 
      {
        test: /(\.jsx|\.js)$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              "env", "react", "stage-0"
            ]
          }
        }],
        exclude: /node_modules/
      },
      { test: /\.(png|svg|jpg|gif)$/, use: 'file-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, use: 'file-loader' }
    ]
  },

  // 按照官方文档的解释，如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，
  // 那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。
  // 出处放开的话，页面会报错：Reference Error: React is not defined
  // externals: {
  //   'react': 'React'
  // },
  plugins: [
    new CleanWebpackPlugin(['../' + fileNameDIY]), // 清除dist
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.ProvidePlugin({ // 引用(隐式)全局变量，
      "React": "react"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true) // 模块排序，可减少文件大小
  ] ,
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
          priority: 10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}

// // 据说可以解决浏览器页面自动刷新的问题
// // 项目到目前为止，浏览器确实不能自能刷新
// if (module.hot) {
//   module.hot.accept();
// }

module.exports = config;
