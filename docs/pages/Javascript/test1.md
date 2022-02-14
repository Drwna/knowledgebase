#### 数据类型

number string symbol bool undefined null object

类型转换

**number => string**

* String(n)
* n + ‘’

**string => number**

* Numer(s)
* parseInt(s) / parseFloat(s)
* s - 0
* bug `String(100000000000000000000)` => “1e+21”

**x => bool**

* Boolean(x)
* !!x

**x => string**

* String(x)
* x.toString()
* bug `1.toString()` 报错
* 解决：`(1).toString` 或 `1..toString` 或 `1 .toString()`

```javascript 
String(n)






```

<hr>

#### 变量声明

var a = 1  (不用)

let a = 1

const a = 1

**let**

* 遵循快作用域，即使用范围不能超出 {}
* 不能重复声明
* 可以赋值，也可以不赋值
* 必须先声明再使用，否则报错
* 全局声明的 let 变量，不会变成 window 的属性
* for 循环配合 let 有奇效

**const** 跟 let 几乎一样，不同的是，声明时就要赋值，赋值后不能改



<hr>

#### base64转码

window.btoa

正常字符串转为 Base64 编码的字符串

window.atob

Base64 编码对的字符串转为原来的字符串

<hr>

#### falsy

五个 falsy 值

falsy 就是相当于 false 但又不是 false 的值

分别是 **undefined、null、0、NaN、‘’**

还有一个 document.all



<hr>

#### 变量提升

JavaScript 引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部，这就叫做变量提升（hoisting）。

```
console.log(a);
var a = 1;
```

上面代码首先使用`console.log`方法，在控制台（console）显示变量`a`的值。这时变量`a`还没有声明和赋值，所以这是一种错误的做法，但是实际上不会报错。因为存在变量提升，真正运行的是下面的代码。

```
var a;
console.log(a);
a = 1;
```

最后的结果是显示`undefined`，表示变量`a`已声明，但还未赋值。



# AJAX



## Async JavaScript And XML

**AJAX 是浏览器上的功能**

浏览器可以请求，收响应

浏览器在 window 上加了一个 XMLHttpRequest 函数

用这个构造函数（类）可以构造一个对象

JS 通过它事实现 发请求，收响应.



使用 [server.js](https://github.com/Drwna/ajax-demo-1/blob/main/server.js) 作为我们的服务器

启动 `node server.js 8888`

server.js

```javascript
var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
    }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    /******** 从这里开始看，上面不要看 ************/

    console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

    if (path === '/index.html') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        let string = fs.readFileSync('public/index.html').toString()
        const page1 = fs.readFileSync('db/page1.json')
        const array = JSON.parse(page1)
        const result = array.map(item => `<li>${item.id}`).join('')
        string = string.replace('{{ page1 }}', `<ul id='xxx'>${result}</ul>`)
        response.write(string)
        response.end()
    } else if (path === '/main.js') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/main.js'))
        response.end()
    } else if (path === '/style.css') {
        response.statusCode = 200
        response.setHeader('Content-type', 'text/css;charset=utf-8')
        response.write(fs.readFileSync('public/style.css'))
        response.end()
    } else if (path === '/2.js') {
        response.statusCode = 200
        response.setHeader('Content-type', 'text/javascript;charset=utf-8')
        response.write(fs.readFileSync('public/2.js'))
        response.end()
    } else if (path === '/3.html') {
        response.statusCode = 200
        response.setHeader('Content-type', 'text/html;charset=utf-8')
        response.write(fs.readFileSync('public/3.html'))
        response.end()
    } else if (path === '/4.xml') {
        response.statusCode = 200
        response.setHeader('Content-type', 'text/xml;charset=utf-8')
        response.write(fs.readFileSync('public/4.xml'))
        response.end()
    } else if (path === '/5.json') {
        response.statusCode = 200
        response.setHeader('Content-type', 'application/json;charset=utf-8')
        response.write(fs.readFileSync('public/5.json'))
        response.end()
    } else if (path === '/page2') {
        response.statusCode = 200
        response.setHeader('Content-type', 'application/json;charset=utf-8')
        response.write(fs.readFileSync('db/page2.json'))
        response.end()
    } else if (path === '/page3') {
        response.statusCode = 200
        response.setHeader('Content-type', 'application/json;charset=utf-8')
        response.write(fs.readFileSync('db/page3.json'))
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(`你输入的路径不存在对应的内容`)
        response.end()
    }

    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)
```



## 挑战一 加载 CSS

以前用 `<link rel = stylesheet href = “1.css"/>`

现在用 AJAX 加载 CSS

四个步骤：

1. 创建 HttpRequest 对象 (即 XMLHttpRequest)
2. 调用对象的 open 方法
3. 监听对象的 onload & onerror 事件
    * 改用 [onreadystatechange](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/onreadystatechange) 事件 [readystate 值](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/readyState)
    * 在事件处理函数里操作 CSS 文件内容
4. 调用对象的的 sedn 方法（发送请求）

```js
getCSS.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/style.css');
    request.onload = () => {
        // 创建 style 标签
        const style = document.createElement('style')
		//  填写 style 内容
        style.innerHTML = request.response
        // 插到 head 里
        document.head.appendChild(style)
    }
    request.onerror = () => {
        console.log('加载失败')
    }
//  request.onreadystatechange = () => {
//     if(request.readyState === 4) {
//         if(request.status >= 200 %% request.status < 300){
//             console.log(1)
//             const style = document.createElement('style')
//             style.innerHTML = request.response
//             document.head.appendChild(style)
//         }
//     }
// }
    request.send()
}
```



## 挑战二 加载 JS

以前用 ` <script src='2.js'></script>`

现在用 AJAX

四个步骤：

1. 创建 HttpRequest 对象 (即 XMLHttpRequest)

2. 调用对象的 open 方法

3. 监听对象的 onreadystatechange 事件

   ----在事件处理函数里操作 JS 文件内容

4. 调用对象的的 sedn 方法（发送请求）

```javascript
getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/2.js')
    request.onreadystatchange = () => {
       if(request.readyState === 4) {
           if(request.status >= 200 && request.status < 300){
               // 创建 script 标签
               const script = document.createElemt('script')
               // 填写 script 内容
               script.innerHTML = request.response
               // 插到 body 里
               document.body.appendChild(script)
           }
       }
    }
}
```



## 挑战三 加载 HTML

四个步骤：

1. 创建 HttpRequest 对象 (即 XMLHttpRequest)

2. 调用对象的 open 方法

3. 监听对象的 onreadystatechange 事件

   ----在事件处理函数里操作 HTML 文件内容

4. 调用对象的的 sedn 方法（发送请求）

```javascript
getHTML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '3.html');
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const div = document.createElement('div');
                div.innerHTML = request.response;
                document.body.appendChild(div);
            } else {
                alert('加载失败');
            }
        }
    }
    request.send();
}
```



## 挑战四 加载 XML

[XML](https://developer.mozilla.org/zh-CN/docs/Web/XML/XML_introduction)

四个步骤：

1. 创建 HttpRequest 对象 (即 XMLHttpRequest)

2. 调用对象的 open 方法

3. 监听对象的 onreadystatechange 事件

   ----在事件处理函数里操作 responseXML

4. 调用对象的的 sedn 方法（发送请求）

```xml
<!-- demo 4.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<message>
    <warning>
         Hello World
    </warning>
</message>
```

```javascript
getXML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '4.xml');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            // dom 对象
            console.log(request.responseXML)
            const dom = request.responseXML;
            const text = dom.getElementsByTagName('warning')[0].textContent;
            console.log(text.trim());
        }
    }
    request.send();
}
```



## 1-4总计

HTTP是个框，什么都能装

可以装 HTML 、CSS、JS、XML...

记得设置正确的 Content-Type

只要你知道知道怎么解析这些内容，就可以使用这些内容

解析方法：

* 得到 CSS 之后生成 style 标签
* 得到 JS 之后生成 script 标签
* 得到 HTML 之后使用 inner HTML 和 DOM API
* 得到 XML 之后使用 responseXML 和 DOM API
* 不同类型的数据有不同类型的解析方法



## 挑战五 加载 JSON

JSON：JavaScript Object Notion

[介绍 JSON](https://www.json.org/json-zh.html)

JSON 支持的数据类型

* string - 只支持双引号，不支持单引号和无引号
* number - 支持科学计数法
* bool - true 和 false
* null - 没有 undefined
* object
* array
* 不支持函数，不支持变量（所以也不支持引用）



window.JSON

**JSON.parse**

* 将符合 JSON 语法的字符串转换成 JS 对应的数据类型
* JSON 字符串 => JS 数据
* 由于 JSON 只有 6 种类型，所以转成的数据也有 6 种
* 如果不符合 JSON 语法，则抛出一个 Error 对象
* 一般用 try catch 捕获

**JSON.stringify**

* 是 JSON.parse 的逆运算
* JS 数据 => JSON 字符串
* 由于 JS 的数据类型比 JSON 多，所以不一定能成功
* 如果失败，就抛出一个 Error 对象



加载 JSON 四个步骤：

1. 创建 HttpRequest 对象 (即 XMLHttpRequest)

2. 调用对象的 open 方法

3. 监听对象的 onreadystatechange 事件

   ----在事件处理函数里使用 JSON.parse

4. 调用对象的的 sedn 方法（发送请求）

```json
{
    "name": "frank",
    "age": 18,
    "xxx": null
}
```

```javascript
getJSON.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '/5.json');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response)
            const object = JSON.parse(request.response);
            console.log(object);
            myName.textContent = object.name;
        }
    }
    request.send()
}
```



## 应用 加载分页


```javascript
let n = 1;
getPage.onclick = () => {
   const request = new XMLHttpRequest();
   request.open('GET', `/page${n + 1}`);
   request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
         const array = JSON.parse(request.response);
         array.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item.id;
            xxx.appendChild(li)[n];
         });
         n += 1;
      }
   }
   request.send()
}
```



**[本文源码](https://github.com/Drwna/ajax-demo-1)**



[原生js XMLhttprequest请求onreadystatechange执行两次问题解决](https://blog.csdn.net/kis_wuyan/article/details/116231729)

