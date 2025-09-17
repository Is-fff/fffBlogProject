## HTML5十大新特性

**1.语义化标签**

"<nav>,<session>,<article>,<aside>,<footer>"等标签，可用于增强SEO

**2.增强型表单**

新增type=data/color/email/file等类型，支持多种输入，以及一些新属性如：placeholder，require，autofocus

**3.视频和音频**

"audio和video标签"

**4.Canvas绘图**

**5.SVG画图**

使用xml描述2D图形的语言，不容易失帧，缩放不模糊，常用于制作icon

**6.地理定位**

```js
navigator.geolocation.getCurrentPosition(handle_success, handle_error, PositionOptions);
```

**7.拖放API**

设置元素可拖拽：dragable=true

监听事件：dragStart（拖拽开始）,drop（放置元素）,dragEnd（拖拽结束）

**8.WebWorker**

JS是单线程运行的，在现代的计算机CPU计算能力中，单线程的执行难以发挥CPU的性能，因此出现了WebWorker为JS创造多线程环境，子线程在后台执行，work执行结果返回给主线程，主线程子线程相互独立互不干扰。(WebWorker不允许加载本地脚本文件，只允许加载网络js)

Web Worker有五个限制
（1)同源限制：分配给Worker线程运行的脚本文件，必须与主线程的脚本文件同源。
（2）**DOM限制**：worker只能读取navigator对象和location对象，无法使用window，document，parent对象。因为woker线程所在的全局对象与主线程的不一样，所以也无法读取主线程所在页面的DOM对象。（没有违法js单线程设计初衷，依然禁止多线程操作DOM）
（3）通信联系：主线程和子线程无法直接通信，因为它们不在同一个上下环境。
（4）脚本限制：woker线程不能执行alert()方法和confirm（）方法，但可以使用XMLHttpRequst对象发出AJAX请求。

**9.WebStorage**

HTML5之前使用的主要是cookie，新增的WebStorage包括：localStorage和SessionStorage

**10.WebSocket**

WebSocket是HTML5开始提供的一种在单个 TCP 连接上进行**全双工通讯**的协议。

```js
// 打开一个 web socket
var ws = new WebSocket("ws://localhost:xxxx/echo");

ws.onopen = function()//连接建立回调
{
    ws.send("发送数据");//消息发送
};

ws.onmessage = function (evt)//消息监听
{ 
    var received_msg = evt.data;
    alert("数据已接收...");
};

ws.onclose = function()//连接关闭回调
{
    alert("连接已关闭..."); 
};
```



## href和src的区别

src常用于script,img,audio,iframe标签，用于加载外部资源代替当前元素，当浏览器执行到src时，会暂停其它资源的下载和执行直到src资源下载执行完毕

href常用于link和a标签，主要用于在当前文档和引用资源之间建立联系，解析到href属性时，直接加载，不影响其它内容的加载解析