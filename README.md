# micro-messenger

## 简介

`micro-messenger` 是基于
[`postMessage`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)
API 封装的，用于微前端架构下应用间通信的一个很小巧的类库，可应用于各种技术栈搭建的微前端架构中，也
可用于非微前端架构下跨窗口进行消息广播与监听及数据传递。


## 安装

为了便于此类库迭代初期的升级维护，暂不将此类库作为npm包进行发布。

目前，对此类库的使用，可直接clone此repo的main分支源码于项目目录下，建议将源码放置于 `src/libs` 目录下。
目录结构应类似于：

``` bash
- src
  - libs
    - micro-messenger
```

## 引用

基于webpack、rollup等打包工具的基础上，对此类库的应用可使用如下方式：

1. 配置了目录别名。如：`src` 目录别名配置为 `@`

```javascript
import messenger from '@/libs/micro-messenger'
```

2. 未配置目录别名。此情况需使用文件相对路径方式引入。

```javascript
import messenger from '<relative_path>/libs/micro-messenger'
```

## 初始化messenger对象

在对具体的消息和数据进行传递前，需要初始化一个 `messenger` 对象。示例如下：

```javascript
let childOneMessenger = messenger('MicroChildOne')
```

在上方初始化示例中，我们向 `messenger` 构造函数传入了一个 `string` 类型的参数。这个参数的作用是
在多个 `messenger` 对象共存时区分事件的顶级命名空间，避免事件命名冲突。 需要注意的是，对于事件顶
级命名空间的管理应在开发前对各个团队进行约束，避免命名空间冲突的情况。

## 消息广播

当某一个 `messenger` 对象需要向其它 `messenger` 对象广播消息进行通信时，可调用 `broadcast`
方法，该方法接受两个参数，事件的类型以及该事件携带的数据。具体如下例所示：

```javascript
childOneMessenger.broadcast('myMessage', {storage: 100})
```

在上方例子中，通过 `myMessenger` 广播了一个 `myMessage` 消息，我们虽然没有显示的添加事件顶级
命名空间，但 `broadcast` 方法默认会补充 `MicroChildOne:` 作为该消息类型的前缀。要注意的是，
在广播事件的时候，不能使用 `.` 作为命名空间的一部分，因为此符号是添加消息监听时用来添加额外命名空
间的分隔符。

## 消息监听

如果我们需要在某个应用中监听其它应用的 `messenger` 广播出的消息，我们需要调用 `on` 方法进行监听。
例子如下：

```javascript
let mainMessenger = messenger('MicroMain')
mainMessenger.on('MicroChildOne:myMessage', function(data){
  console.log('Got data from salve one', data)
})
```

对于消息的监听，可以通过 `.` 字符为分割，为消息类型添加命名空间，便于消息监听的解绑。例子如下：

```javascript
mainMessenger.on('MicroChildOne:myMessage.namespace1', function(){})
```

## 解除消息监听

如果要对某一个或某一系列监听的消息解除监听，可以使用 `off` 方法。对于某消息绑定的具体的某一个回调
进行解除绑定，示例如下：

```javascript
mainMessenger.on('MicroChildOne:myMessage', myHandler)
mainMessenger.off('MicroChildOne:myMessage', myHandler)
```

对于某一消息绑定的所有回调进行解除绑定，示例如下：

```javascript
mainMessenger
.on('MicroChildOne:myMessage', myHandler1)
.on('MicroChildOne:myMessage', myHandler2)
mainMessenger.off('MicroChildOne:myMessage')
```

对于某一消息绑定的回调按照绑定时的命名空间进行解除绑定，示例如下：

```javascript
mainMessenger
.on('MicroChildOne:myMessage.namespace1', myHandler1)
.on('MicroChildOne:myMessage.namespace2', myHandler2)
mainMessenger.off('MicroChildOne:myMessage.namespace1')
```

如果要彻底解除一个 `messenger` 对象监听的所有消息，调用示例如下：

```javascript
mainMessenger
.on('MicroChildOne:myMessage', myHandler1)
.on('MicroChildOne:myMessage2', myHandler2)
.on('MicroChildTwo:myMessage', myHandler3)
mainMessenger.off()
```

## 更多内容

更多内容请参考 [`doc/api.md` 文档](https://github.com/micro-frontends-lab/micro-messenger/blob/main/doc/api.md)。
