

## nextTick() 

### Vue环境

是一个vue框架定义的API,作用是在下次 DOM 更新循环结束之后执行延迟回调，开发者可以在这个时候获取最新渲染的视图

### Nodejs环境

node 中的 nextTick 是 node 自带全局的变量 process 的一个方法，**process.nextTick 是一个微任务，在 node 的所有微任务中最先执行，是优先级最高的微任务**。浏览器中是没有这一个方法的。

这对于需要高性能、低延迟的场景非常有用，例如在某些异步操作完成后立即执行清理工作或状态更新。

**使用场景**
异步操作前的准备工作：在开始一个耗时的异步操作之前，进行一些轻量级的初始化或验证工作。
递归异步操作中的回调控制：避免递归调用中的栈溢出问题。
状态同步：在事件循环的当前阶段结束后，但不希望阻塞其他宏任务的情况下，更新内部状态。
资源释放：在异步操作结束时立即执行资源释放逻辑。

## nextTick在Nodejs环境不同模块中的执行时机

nodejs模块化分为两种模块，一种是 **ES6 模块**，简称 **ESM**；另一种是 Node.js 专用的 CommonJS 模块，简称 **CJS**。这两种模块**不兼容。**

### ES6 模块和 CommonJS 模块有很大的差异。

**语法上面**，CommonJS 模块使用`require()`加载和`module.exports`输出，ES6 模块使用`import`和`export`。

**用法上面**，**`require()`是同步加载**，后面的代码必须等待这个命令执行完，才会执行。**`import`命令则是异步加载**，或者更准确地说，ES6 模块有一个独立的静态解析阶段，依赖关系的分析是在那个阶段完成的，最底层的模块第一个执行。

**重点来了**

由于commonjs加载模块时是同步加载，因此nextTick代码可以被优先执行，在当前其它所有微任务之前执行（事件循环）

而ES6加载模块采用的是异步加载，采用的是async await模式加载模块，本身就可以看成一个微任务，所以nextTick会延迟到当前代码执行后再执行。

## 取消网络请求

### 原生fetch

```js
const controller = new AbortController();//新建AbortController
const signal = controller.signal;//获得标识符
 
fetch(url, { signal }).then(response => {
}).catch(error => {
    
});
 
//暂停signal标记的请求
controller.abort();
```

### axios

```js
const source = axios.CancelToken.source();
 
axios.get('/api/data', {
  cancelToken: source.token
}).then(response => {
  // 请求成功处理
}).catch(error => {
  // 错误处理
});
 
// 在需要的时候取消请求
source.cancel('请求取消的原因');
```

## 对函数式编程的理解

函数式编程是一种基于数学函数计算的**编程范式**。它强调使用**纯函数**、**不可变性**和**高阶函数**来解决问题。

### 纯函数

没有任何副作用，相同的输入获得相同的输出（易于测试）

### 不可变性

在创建数据结构后，不可对其进行修改

### 高阶函数，函数柯里化

一个函数的参数/返回值也是一个函数

### 优点

可复用性，易于测试，易于维护，更优雅的函数组合，更加简洁

### 缺点

错误使用闭包导致内存泄漏，递归性能问题

