## 数据类型

### 基本数据类型

Number，String，Boolean，Undefined，Null，Symbol，BigInt

### 引用数据类型有五种

Object，Array，Function，Date，RegExp

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

### 普通模式

1.this指向window

2.全局函数的this指向window

3.箭头函数的this指向外层最近的this

### 严格模式

严格模式下，全局函数this指向为undefined

```js
"use strict"
console.log(this);//window
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