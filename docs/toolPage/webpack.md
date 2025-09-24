---
lang: zh-CN
title: 前端构建工具
description: 前端构建工具
---

## WebPack的作用

- 代码转换(Loader)：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等等
- 文件优化(Plugin)：压缩 JavaScript、CSS、html 代码，压缩合并图片等
- 代码分割(代码分离)：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
- 模块合并：在采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件
- 自动刷新(HMR热更新)：监听本地源代码的变化，自动构建，刷新浏览器
- 代码校验(ESLint和Stylelint)：在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

## 原理

Webpack是一个**静态模块打包器**，当Webpack处理应用程序时，他会递归地构建一个**依赖关系图**，其中包含应用程序所需要的每个模块，并将所有模块打包成**一个或多个bundle**，打包过程就像一条生产线，需要经过一系列的处理流程才能将源文件转换成输出结果，Webpack使用**Tapable**来组织它的生产线，使用**广播事件**在每个生产线每个结点向外广播信息，插件可以监听到这些时间并通过Webpack提供的api获取当前输出，并对资源做进一步的处理，Webpack的事件流机制保证了插件的有序性。

## 生命周期

### 初始化

读取配置文件，初始化参数

### 编译

根据入口文件构建依赖图

### 模块解析和转换

模块被解析，编译，转换为标准模块

### 优化

对依赖关系进行优化

### 生成

生成最终的输出wen'j


## 常见的配置

- entry：制定入口文件，可以是单个或者多个js文件。这个配置决定了webpack从哪个配置开始生成依赖关系图。

- output：设置webpack打包后输出的目录和文件名称，包括path、filename和public path等
- module：配置了不同的loaders来处理不同的模块，例如，对于css文件，可以使用css-loader和style-loader
- resolve：设置webpack如何解析模块依赖，包括别名、扩展名等。
- plugins：使用不同的插件可以增强webpack的功能，例如，使用html-webpack-plugin可以讲打包后的js文件自动引用到html文件中。
- optimization：可以使用optimization.splitChunks和optimization.runtimeChunk配置代码拆分和运行时代码提取等优化策略
- externals：用于配置排除打包的模块，例如可以将jquery作为外置扩展，避免将其打包到应用程序中。
- devtool：配置source-map类型
- context：webpack使用的根目录，string类型必须是绝对类型
- target：指定webpack编译的目标环境
- performance：输出文件的性能检查配置
- noParse；不用解析和处理的模块
- stats：控制台输出日志控制

## 常见loader和plugin

### loader：

- babel-loader：将ES6+的代码转换成ES5的代码
- css-loader；解析css文件，并处理css中的依赖关系
- style-loader：将css代码注入到HTML文档中
- file-loader：解析文件路径，将文件赋值到输出目录，并返回文件路径
- url-loader：类似于file-loader，但是可以将小于指定大小的文件转成base64编码的DataUrl格式

### plugin：

- HtmlWebpackPlugin：生成HTML文件，并自动将打包后的js和css文件引入到HTML文件中
- CleanWebpackPlugin：清除输出目录
- ExtraTextWebpackPlugin：将CSS代码提取到单独的CSS文件中
- DefinePlugin：定义全局变量
- UglifyJsWebpackPlugin：压缩js代码
- HotModuleReplacementPlugin：热模块替换，用于在开发环境下实现热更新

## loader的执行顺序为什么是后写的先执行

## package-lock.json的作用

package.json虽然指定了依赖的版本，但是不够精确，npm install时，如果依赖有更新，会下载最新依赖。

package-lock.json记录了依赖的版本并将其锁定，npm install时，只会下载package-lock.json中指定的版本，有利于团队项目依赖版本的统一管理。

## Webpack和Vite的区别

### 1. 构建速度

Webpack需要将**所有模块打包到一个文件**中，每次修改都需要重新构建整个项目。（全量更新）

而 Vite 采用的是**基于浏览器原生 `ES` 模块**的特性，即只会对修改的模块进行重新构建。（增量更新）

因此在大型项目中，`Vite` 的构建速度要比 `Webpack` 快得多。

### 3. 配置复杂度

`Webpack` 的**配置非常灵活**，可以处理各种不同的情况。但是这也导致了配置比较复杂，需要花费一些时间去学习和调试。

而 `Vite` 的配置则相对来说要简单得多，大部分情况下只需要简单地配置几个选项就可以完成配置。

### 4. 插件生态

`Webpack` 已经有着**非常庞大的插件生态圈**，这些插件可以为开发者提供各种不同的功能，如压缩代码、优化性能等。

而 `Vite` 还比较年轻，尽管已经有一些插件可以使用，但是相对于 `Webpack` 来说还是比较少的。

### 5.编译方式

webpack在编译过程中，会将**所有模块打包为一个bundle.js**文件，然后再运行这个文件。

而vite在**开发模式下**，**没有打包的步骤**，它利用了**浏览器的ES Module Imports**特性，只有在真正需要时才编译文件。**在生产模式下，vite使用Rollup进行打包**，提供更好的tree-shaking，代码压缩和性能优化。

### 总结

webpack由于其丰富的功能和扩展性，适合于大型、复杂的项目。

而vite凭借其轻量和速度，更适合于中小型项目和快速原型开发。

## WebPack按需打包，异步加载

### require.ensure(dependencies,callback,errorCallback,chunkName) 

```js
require.ensure(['./a'],function(require){
    let b = require('./b');
    let a = require('./a');
    console.log(a+b);
})
//执行到这里时，才异步加载这个文件，并且将a,b文件打包到一起
```

### import()  已将require.ensure取代

特点 1：import() 返回 promise 对象
特点 2：**相较于 import 命令**，import()可以实现**动态加载**,其路径可以根据情况改变
特点 3：import()适用在运行阶段，而不是像 import 一样在编译阶段，这意味着 import(),可以使用在 JS 代码中，比如条件判断，函数中等

```js
import('lodash').then(_ => {//按需加载lodash
    // Do something with lodash (a.k.a '_')...
  })
```

## WebPack实现代码分割

三种方式

- **入口起点**：使用 entry 配置手动地分离代码。
- **防止重复**：使用 **入口依赖** 或者 **SplitChunksPlugin** 去重和分离 chunk。
- **动态导入**：通过模块的内联函数调用分离代码。

### 入口起点

即配置多个入口文件和公共模块共享，实现代码分割

```js
 module.exports = {
   mode: 'development',
   entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',//共享公共模块
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',//公共模块
   },
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   optimization: {
    runtimeChunk: 'single',//必须配置，防止运行报错
  },
 };
```

### SplitChunkPlugin

```js
   optimization: {
       splitChunks: {
       		chunks: 'all',
             //配置maxSize保证每个打包模块的最大大小
    },
   },
```

### 动态导入

import() ， require.ensure()