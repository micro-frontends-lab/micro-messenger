# micro-messenger API文档

## 数据结构

```bash
@typedef {Object} MessengerInstance - 通过messenger构造函数生成的对象实例
@property {string} name - messenger实例对象唯一名称
```


## 构造函数

### messenger (name)

创建 `messenger` 实例。

```bash
@param {string} name
@returns {MessengerInstance}
```

```javascript
// @example
let myMessenger = messenger('myMessenger')
```

## 实例方法

### .broadcast (msgType, data)

向其它 `messenger` 实例广播消息。

```bash
@param {string} msgType
@param {Object} data
@returns {MessengerInstance}
```

```javascript
// @example
myMessenger.broadcast('myMessage', {storage: 100})
```

### .off (msgType, callback)

解除绑定的消息监听。

```bash
@param {string} msgType
@param {Function} [callback]
@returns {MessengerInstance}
```

```javascript
// @example 解除某一个具体的消息回调
anotherMessenger.off('myMessenger:myMessage', myHandler)
// @example 解除某一个消息所有具备.namespace1命名空间的回调
anotherMessenger.off('myMessenger:myMessage.namespace1')
// @example 解除某一个消息所有的回调
anotherMessenger.off('myMessenger:myMessage')
// @example 解除 messanger 对象上所有的消息回调
anotherMessenger.off()
```

### .on (msgType, callback)

添加消息监听。

```bash
@param {string} msgType
@param {Function} [callback]
@returns {MessengerInstance}
```

```javascript
// @example 绑定消息监听
mainMessenger.on('MicroChildOne:myMessage', function(data){
    console.log('Got data from salve one', data)
})
// @example 绑定消息监听并添加消息命名空间
mainMessenger.on('MicroChildOne:myMessage.namespace1', function(){})
```
