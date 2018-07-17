# react_mock

一个 react + webpack + mockjs 的测试项目，目前准备添加 flux/redux 用于学习和踩坑

## infomtion

### dev

`npm run dev`

### build 打包到项目根目录

1. `npm run build` // 默认打包到dist
2. `npm run build -- yourselfFileName` // 自定义打包文件夹名词

### test

`npm run test`

## webpack

### 配置说明

#### webpack.common.js

仅说明`module`和`plugins`中的选项

#### module rules

    {
        test: /\.scss$/,

        // 此处需要注意：loader 的顺序是从右向左执行，
        // 即：先 sass-loader 把 scss 编译成 css，再由 css-loader 编译成 css 文件，最后由 style-loader 把 css 插入到 html 中
        use: ['style-loader', 'css-loader', 'sass-loader',
        {
          loader: 'sass-resources-loader', //此处为了公共的sass样式能够全局加载，而不用每个组件都单独引用。
          options: {
            resources: projectRootUrl + '/src/assets/scss/style.scss'
          }
        }
      ]
    }

#### plugins

`CleanWebpackPlugin` // 清理文件夹

`HtmlWebpackPlugin` // 热更新

`ProvidePlugin` // 使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入

`OccurrenceOrderPlugin` // 模块排序，可减少文件大小

### `package.json`中配置项说明

`--no-inline`vs`--inline` // 默认开启inline模式，可以通过`--no-inline`关闭默认

`--devtool eval-source-map` // 调试模块使用

`--hot` // 热加载  ps: 据说配置这个后，仍然需要在`plugins`中配置`webpack.HotModuleReplacementPlugin`

`--colors` // 表示给显示出来的进度加点颜色

`--content-base` // 表示设置目录

`--quiet` // 控制台中不输出打包的信息

`--compress` // 开启gzip压缩

`--progress` // 显示打包的进度


## bug及解决方案

1. ` setState(...): Can only update a mounted or mounting component. This usually means you called setState() on an unmounted component. This is a no-op. `

原因是因为在组件挂载（mounted）之后进行了异步操作，比如ajax请求或者设置了定时器等，而在callback中进行了setState操作。当切换路由时，组件已经被卸载（unmounted）了，此时异步操作中callback还在执行，因此setState没有得到值。
