---
lang: zh-CN
title: JavaScript
description: Javascript
---

## 数据类型

### 基本数据类型

Number，String，Boolean，Undefined，Null，Symbol，BigInt

### 引用数据类型有五种

Object，Array，Function，Date，RegExp

## 数组方法总结

### 改变原数组方法

arr.pop()，arr.push()，arr.shift()，arr.unshift()，arr.reverse()，arr.sort()

arr.splice(index，len，[item]) //从下标index处开始**删除**len个元素，并替换为item,返回值为被删的项目数组

### 不改变数组的方法

arr.join()，arr.toString()，arr.indexOf()，arr.find()，arr.forEach()，arr.concat()

arr.slice(begin,[end])，截取[begin,end/tail)的数组返回**(左闭右开)**，不改变原数组

### 其它方法

arr.map()，arr.filter()，arr.reduce((prev,cur)=>{},init)

## 内存管理

js中的变量都存储在内存中，而内存又给变量开辟了两个存储空间：栈空间和堆空间

基本数据类型：栈空间

引用数据类型：堆空间（对象）

**为什么这么放？？**

### 栈的优缺点

**优点**：先入后出，存取速度快，**有利于快速分配和释放内存，不会出现内存碎片的问题**

**缺点**：

有限大小，超出栈空间大小时会溢出

局部性，只能在局部作用域访问，不适合存储和长期保存大量数据

### 堆的优缺点

**特点：**无序存储，动态分配，手动释放

**优点**：动态分配，不受限于栈的大小限制，可以存储大量和复杂的数据结构

**缺点**：内存泄漏，如果没有手动释放内存容易引发内存泄漏

​	   分配和释放内存的速度较慢

**栈存储函数调用和局部变量，采用先进后出的存储方式；堆存储复杂的数据结构和对象，采用动态分配的存储方式。**

## JS中为什么0.1+0.2 != 0.3

因为浮点数是以二进制形式存储和计算的，包含符号位，指数位，尾数位

数字转二进制的原则：**乘二取整**

```js
0.1 * 2 = 0.2 --------------- 取整数 0，小数 0.2
0.2 * 2 = 0.4 --------------- 取整数 0，小数 0.4
0.4 * 2 = 0.8 --------------- 取整数 0，小数 0.8
0.8 * 2 = 1.6 --------------- 取整数 1，小数 0.6
0.6 * 2 = 1.2 --------------- 取整数 1，小数 0.2
0.2 * 2 = 0.4 --------------- 取整数 0，小数 0.4
0.4 * 2 = 0.8 --------------- 取整数 0，小数 0.8
0.8 * 2 = 1.6 --------------- 取整数 1，小数 0.6
0.6 * 2 = 1.2 --------------- 取整数 1，小数 0.2
...
//无限循环
//对于浮点数，二进制无法精确表示。
```

因此转化之后的二进制相加，会有多余的尾数

### 解决方案

1. 缩放成整数计算
2. toFixed()保留小数
3. Math.round四舍五入

## 深浅拷贝

- 浅拷贝（shallow copy）：只复制指向某个对象的指针，而不复制对象本身，新旧对象共享一块内存。
- 深拷贝（deep copy）：复制并创建一个一模一样的对象，不共享内存，修改新对象，旧对象保持不变。

**浅拷贝实现**

Object.assign,Array.from(),Array.concat(),[...obj]

**深拷贝实现**

递归，JSON.parse(JSON.stringify(Obj))(无法深拷贝方法function)

## 什么是内存泄漏，以及如何判断和检测

内存泄漏是指程序中**已分配的内存未能成功释放**，导致**可用内存逐渐减少**的现象

### 判断和检测：浏览器开发者工具Performance，Memory

1.录制Performance,查看js堆内存使用折线图，如果**内存下限**一直升高，很可能发生内存泄漏

2.进入Memory,录制快照对比，采用Gmail的Three Snapshotd对比法

1. 打开DevTools, 切换至Memory面板
2. 先记录一个堆内存快照
3. 在你的页面上执行可能发生泄漏的操作
4. 再记录一个堆内存快照
5. 重复执行多几遍步骤3
6. 最后记录一个堆内存快照
7. 选择最后一个堆内存快照，找到顶栏的“All objects”, 切换至”Objects allocated between snapshots 1 and 2”（也可以对2，3执行同样的操作）

可以查看到快照之间新生成的对象，以及它们有没有被释放。（尽量在开发环境检测，生产环境的变量名会被打包混淆）

### Memeory快照中的Detached DOM tree

一个DOM节点只有在没有被页面的DOM树或者Javascript引用时，才会被垃圾回收。当一个节点处于“detached”状态，表示它已经不在DOM树上了，但Javascript仍旧对它有引用，所以暂时没有被回收。Detached DOM tree往往会造成内存泄漏

### 常见的内存泄漏的场景

1.定时器未被清除

2.闭包的私有变量保存

3.未移除的事件监听

4.console.log()的对象保存，打印的对象不会被回收

## DOM如何插入一个兄弟结点

**insertBefore(newNode,referenceNode)**方法，用于在父节点的指定位置插入子结点，即在referenceNode前插入newNode,当referenceNode为null,则插入到末尾

代码实现

```html
<body>
    <div id="item1"> 1111</div>
    <div id="item2">2222</div>
    <script>
        var newNode = document.createElement('h1');
        newNode.innerText = '新节点';
        var item1 = document.getElementById('item1');
        //获取父节点，使用insertBefore在item1的下一个兄弟结点之前插入新元素
        //即实现在item1后面插入新节点
        item1.parentNode.insertBefore(newNode, item1.nextSibling);
        //dom.nextSibling,dom.preSibling获取上/下个兄弟节点
    </script>
</body>
```

## Javascript引擎

SpiderMonkey：第一款JavaScript引擎，是JavaScript作者开发的

Chakra:微软开发的，用于IE浏览器

JavaScriptCore： webKit中内置的JavaScript引擎，Apple公司开发的

V8：Google开发的强大的JavaScript引擎，也帮助Chrome在众多浏览器中脱颖而出

 

## V8引擎的垃圾回收机制

**准确式垃圾回收机制**。从根对象开始（根对象可以是全局对象、活动函数栈等），遍历内存中的对象，并给所有可达的对象打上标记。**可达对象指的是能够从根对象出发直接或间接访问到的对象**。未被标记的对象则被视为不可达，即被判定为垃圾。清除阶段：遍历整个堆内存，将未被标记的对象进行回收，并释放其占用的内存空间。这些未被标记的对象被认为是不再被程序所使用的垃圾对象。

**分代回收机制**。V8 中将堆内存分为 新生代 和 老生代 两区域，采用不同的垃圾回收器也就是不同的策略管理垃圾回收。（V8垃圾回收是并行回收）

新生代 的内存一般都不大，所以使用 **Scavenge** 算法 进行垃圾回收效果比较好。老生代 一般占用内存较大，因此采用的是 **标记清除算法**。（导致产生大量内存碎片，因此使用标记整理算法整理）

 

## javascript垃圾回收机制原理

解决内存的泄露，垃圾回收机制会定期（周期性）找出那些不再用到的内存（变量），然后释放其内存。

##  requestAnimationFrame

window的一个api，可以调节重新渲染，大幅提高网页性能。其中最重要的，它可以将**某些代码放到下一次重新渲染时执行**。避免短时间内触发大量reflow。常用于动画。

主要特点：

与屏幕刷新同步：requestAnimationFrame 会与浏览器的屏幕刷新频率同步，通常是每秒 60 次，这意味着动画会在每秒刷新 60 次，呈现更平滑的效果。

自动优化：浏览器会自动暂停或者降低频率执行 requestAnimationFrame 的回调函数，当页面不可见或者被隐藏时，以节省 CPU 和电池消耗。

最佳化性能：使用 requestAnimationFrame 可以避免一些问题，比如在不可见的标签页中运行动画会浪费资源，而 requestAnimationFrame 可以确保动画只在页面可见时执行。

```js
function animate(DOMHighResTimeStamp) { //会获得一个参数，代表上一帧渲染的结束时间戳（ms）
  //done();
  requestAnimationFrame(animate); //这个函数是一次性的，如果需要持续性动画，必须要递归调用
} 
requestAnimationFrame(animate);
```

##  DOM是什么

Document Object Model文档对象模型，把每一个html标签和其中的属性看成一个对象，使得在js中可以实现对html标签元素进行操作（控制html标签的接口）。

BOM:Browser Object Model浏览器对象模型，window，location，为了控制浏览器行为的接口。

## this指向问题

**ES5中未浏览器添加了第二种运行模式："严格模式"，因此，javascript在浏览器运行时的this指向需要分两种情况讨论。**

**函数的this指向是在定义的时候确定而不是在调用的时候确定的**

### 普通模式

1.this指向window

2.全局函数的this指向window

3.箭头函数的this指向外层最近的this

### 严格模式

严格模式下，全局函数this指向为undefined

```js
"use strict"
console.log(this);//undefined
var fn = function(){console.log(this);}
fn()//undefined
```

使用bind,call,apply可以改变普通函数的this指向

一旦使用bind函数改变了this的指向，该函数的this指向不会再改变，即使再次使用call或者bind改变，也依然是第一次的值

```js
let fn1 = function(){
    console.log(this);
}
let fn2 = fn1.bind(obj1);
fn2();//obj1
//同一个函数两次bind
fn1.bind(obj2)();//obj2
//对bind之后的函数再bind
fn2.bind(obj3)();//obj1
```

**bind生成的新函数无法再被改变this指向** 



## 如何判断空对象

### 1.Object.keys()

```js
if(Object.keys(obj).length===0)return true
```

### 2.for...in

```js
let isEmpty = true;
for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        isEmpty = false;
        break;
    }
}
```

### 3.JSON.stringify

```js
if (JSON.stringify(obj) === '{}')return true;
```

### 4.`Object.getOwnPropertyNames()` 或 `Object.getOwnPropertySymbols()`

```js
if (Object.getOwnPropertyNames(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0)return true;
```

### 5.Reflect.ownKeys()

最为全面，返回所有键名，包括不可枚举和Symbol键名

```js
if (Reflect.ownKeys(obj).length === 0) return true;
```

### 6.Object.entries()

返回所有可枚举键值对

```js
if(Object.entries(obj).length === 0) return true;
```

**Symbol类型的key是不可枚举的！！**

## JS数组存储模式

其它语言常规的存储模式：一块存放相同类型内容的连续的空间

BUT，JS数组允许存放不同类型的元素

```js
let arr = [1,"a",true]
```

并且JS数组支持动态修改length，如push,pop

因此V8引擎对数组的存储模式进行了优化。

### 如何做

采用**快数组(快速模式)**和**慢数组(字典模式)**来存储数组

### 快数组

与C++/C的模式相同，采用**连续的空间**来存放数组。

### 慢数组

采用hashTable形式来存储数组，即一个只允许键名为索引值的字典

慢数组在访问元素时，会先**将索引值强制转换为字符类型**，通过键名去访问元素

### 区别

- **存储方式**方面：快数组内存中是连续的，慢数组在内存中是零散分配的。
- **内存使用**方面：由于快数组内存是连续的，可能需要开辟一大块供其使用，其中还可能有很多空洞，是比较费内存的。慢数组不会有空洞的情况，且都是零散的内存，比较节省内存空间。
- **遍历效率**方面：快数组由于是空间连续的，遍历速度很快，而慢数组每次都要寻找`key` 的位置，遍历效率会差一些。**快数组的遍历效率比满慢数组高很多**

### 快数组转慢数组

**默认情况下**，对数组的声明，都会先采用快速模式，为数组开辟一定大小的连续空间。

- 当新容量**大于等于3倍**的扩容后的容量，会转变为慢数组。
- 当**加入的索引值`index`比当前容量`capacity`差值大于等于`1024`** 时，也就是至少有`1024`个`HOLEY`时，即会转为慢数组

```js
let arr = new Array(2000)//声明，此时容量为0,默认快数组
arr[1026] = 1;//存在1026个holey空位置，转为慢数组
```

### 慢数组转快数组

当慢数组的元素可存放在快数组中且长度小于 `Smi::kMaxValue` 且当前慢数组相对于快数组仅节省了少于或等于`50%`的空间，则转变为快数组。

## arguments参数类数组

`arguments` 是一个对应于传递给函数的参数的**类数组**对象

类数组：允许使用索引下标访问元素，拥有length属性，不能使用数组方法(pop,slice,sort)；

```js
let arrayLike = {0: 'I', 1: 'Love', 2: 'You', 3:'!', length: 4 };
```

**但是**

可以使用Array.prototype.xxx.call()来使用数组方法(因为arguments允许遍历，通过改变this来调用)

```js
//类数组转数组
var args = Array.prototype.slice.call(arguments);
```

### 严格模式和非严格模式下的区别

在严格模式下，无论参数如何变化，arguments对象都不会随之改变

在非严格模式下，参数的重新赋值会更新到arguments对象中

```js
//非严格
const func1 = function(a){
	console.log(arguments[0]);//0;
	a = 1;
	console.log(arguments[0]);//1;
}
//严格
"use strict"
const func2 = function(a){
	console.log(arguments[0]);//0;
	a = 1;
	console.log(arguments[0]);//0;
}
func1(0);
func2(0);
```

## 对象冻结

Object.freeze()冻结对象（浅冻结，只冻结第一层），不可修改、新增、删除对象属性，在非严格模式中这些行为会静默忽略，在严格模式下报错。

Object.isFrozen()判断对象是否冻结。

Object.seal()封闭对象，可以修改属性值，但是不能添加/修改属性。

Object.preventExtensions()禁止扩展，不允许新增对象属性。

