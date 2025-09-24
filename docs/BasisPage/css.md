---
lang: zh-CN
title: CSS
description: CSS
---

## BFC

1.BFC是一个块级元素，块级元素在垂直方向上依次排列。

2.BFC是一个独立的容器，内部元素不会影响容器外部的元素。

3.属于同一个BFC的两个盒子，外边距margin会发生重叠，并且取最大外边距。

### 如何创建BFC?

给父级元素添加以下任意样式

html 根元素

浮动元素：float 除 none 以外的值

绝对定位元素：position (absolute、fixed)

display 为 inline-block、table-cells、flex

overflow 除了 visible 以外的值 (hidden、auto、scroll)

### BFC有什么作用

解决margin塌陷的问题

解决当父级元素没有高度时，子级元素浮动会使父级元素高度塌陷的问题

实现两栏布局

```css
.box1{
    width:100px;
    heigth:50px;
    float:left;
    /**给固定宽度的元素设置浮动**/
}
.box2{
    height:50px;
    overflow:hidden;/**自适应的盒子设置为BFC**/
}
```

### 特点

1.内部的盒子在垂直方向从上到下排列,盒子垂直方向的间距由margin决定

2.BFC(空间)中的盒子依然会margin 重叠和穿透, 不同BFC则不会.

3.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
4.计算BFC的高度时，浮动元素的高度也参与计算

## css圆形和三角形

圆形

```css
{
    width: 100px;

    height: 100px;

    background-color: red;

    border-radius: 50%;
}  
```

三角形

```css
width:0px;
height:0px;
//宽高为0
//至少设置两个值（一个是透明）才会显示一个三角形
border-bottom: 100px solid red;
border-left: 100px solid transparent;
border-right: 100px solid transparent;
border-top: 100px solid transparent;
```



## CSS两种引入方式Link和import的区别

引入方式

    link是HTML标签,用于在HTML文档中引入外部资源,如CSS文件。
    @import是CSS语法,用于在CSS文件中引入其他CSS文件。

**加载顺序**

    link引入的CSS文件会与HTML文档并行加载,不会阻塞HTML文档的解析。
    @import引入的CSS文件会在页面加载完成后再下载。

兼容性

    link引入的方式兼容性更好,可以被所有浏览器识别。
    @import在一些较老的浏览器上可能不被支持。

网络请求，import减少请求次数

    使用link引入多个CSS文件可能会导致更多的HTTP请求,增加页面加载时间。
    使用@import可以将多个CSS文件合并到一个CSS文件中,减少HTTP请求。

js角度

```
js可以通过创建dom标签（link）来控制样式，而@import是css语法，不支持
js控制样式时最好使用link，因为link是并行加载，dom加载完成之后css也加载完了，而import是异步加载可能导致js设置的样式失效。
```

**总结**：出于性能考虑，建议使用link标签并行加载，但是@import标签有利于css模块化并减少网络请求次数。

## 绘制0.5px的线

目的：在CSS中直接设置`border-width`为0.5px通常不会得到理想中的0.5个物理像素宽度的线条，尤其**在高DPI屏幕下，由于浏览器会对小于1px的数值进行四舍五入处理**，所以直接写0.5px可能会被渲染成1px的线条。

1.使用transform缩放

```css
        .line1{
            height: 1px;
            width: 50%;
            background-color: yellow;
            transform: scaleY(0.5);//垂直方向缩放为0.5px
            transform-origin: 50% 100%;//修改缩放中心使得位置保持不变
        }
```

2.使用box-shadow阴影

```css
        .line1 {
            height: 1px;
            width: 50%;
            background: none;
            box-shadow: 0 0.5px 0 0 #000;
            //阴影水平方向 阴影垂直方向 阴影模糊半径 阴影扩散半径
        }
```

3.使用svg绘制

## flex:1

flex属性是flex-grow,flex-shrink,flex-basis的简写

flex-grow:**flex容器有剩余空间时可用，用于分配剩余空间的属性**，**默认值为0，表示不伸展**。（剩余空间伸展比例）

flex-shrink:flex容器空间不足时可用，**默认值为1，代表当项目空间不足时子item等比例收缩**，**设置为0时则不会收缩**，item会超出容器范围(空间不足收缩比例)

flex-basis:**想要平均分配item所占空间时可用，或自定义每个item占多少空间**，默认值auto(所占空间比例)

flex:1  代表  flex-grow: 1、flex-shrink：1、flex-basis：0%  (可以用于自动占据剩下空间)

```css
div{
	flex:x y z;
	//flex-grow: x、flex-shrink：y、flex-basis：z
    flex:n;//非负
    //flex-grow: n、flex-shrink：1、flex-basis：0%
    flex:n m;//非负
    //flex-grow: n、flex-shrink：m、flex-basis：0%   
    flex:n;//长度
    //flex-grow: 0、flex-shrink：1、flex-basis：n
}
```

## CSS预处理器 Less语法

1.采用@声明变量

2.嵌套语法

3.&父级选择器

4.mixin混入样式

5.extends继承样式

## 为什么要加-webkit-前缀

这些前缀叫做浏览器私有前缀，由于各浏览器厂家大多都希望能够兼w3c标准，而制定css标准的过程是相对较慢的，当一些新属性开发出来之后，浏览器厂家在经过大量测试认为该属性可以投入使用时，此时w3c标准还未制定，浏览器厂家在发布该属性时就会加载内核私有前缀，避免日后标准制定完成时出现变更。因此，加私有前缀可以兼容旧版本浏览器的一些新属性使得css能够正常渲染

### 常用前缀

-moz- : Firefox
-webkit- : Safari & Chrome
-o- : Opera
-khtml- : Konqueror
-ms- : Internet Explorer
-chrome- : Google Chrome专用前缀

## CSS3新特性

(1) 实现圆角（border-radius），阴影（box-shadow）；

(2) 文字特效（text-shadow），线性渐变（gradient），旋转（transform）；

(3) 增加了更多的CSS选择器；

(4) 多重背景图片；

(5) 媒体查询，多栏布局；

(6) border-image：图片边框。

## 水平垂直居中方案总结

### flex布局

```css
.father {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background: skyblue;
}
```

### grid布局

```css
.father {
        display: grid;
        align-items:center;
        justify-content: center;
        width: 200px;
        height: 200px;
        background: skyblue;

    }
```
### table布局

```css
.father {
    display: table-cell;//表格布局
    width: 200px;
    height: 200px;
    background: skyblue;
    vertical-align: middle;//垂直居中
    text-align: center;
}
.son {
    display: inline-block;//行内块
    width: 100px;
    height: 100px;
    background: red;
}
```
### 定位+（margin:auto/transform/margin:负值）

```css
.father {
    position: relative;
    width: 200px;
    height: 200px;
    background: skyblue;
}
.son {
    position: absolute;
    /**margin负值**/
    top: 50%;
    left: 50%;
    margin-left:-50px;
    margin-top:-50px;
    /**margin:auto**/
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    /**transform**/
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    /**变量**/
    top:calc(50% - 50px);
    left:calc(50% - 50px);
    
    width: 100px;
    height: 100px;
    background: red;
}
```
