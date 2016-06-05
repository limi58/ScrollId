# ScrollId
A full screen pages scrolling plugin by hash change

轻量级的 **滚动插件**，以 `location.hash` 变化为驱动，替换浏览器默认的动作，缓动到指定 hash 的 id 位置。样式稍加处理即可成为 **全屏滚动插件** 。

# Demo
在demo文件夹里

# Including files
```html
<script type="text/javascript" src='jquery.js'></script>
<script type="text/javascript" src='ScrollId.js'></script>
```

# Usage 
## 1. 构建HTML
推荐以下结构，标签和 `data-scroll-id` 可以随意，但是必须要有 `data-scroll-id` 属性，插件主要作用是 **整屏滚动到指定 id**，因此必须设置每块的 `data-scroll-id`
```html 
<div class='container'>
  <section data-scroll-id="1">第1屏</section>
  <section data-scroll-id='2'>第2屏</section>
  <section data-scroll-id='3'>第3屏</section>
</div>
```
## 2. 确保容器100%高度
如果要实现全屏滚动，从根节点到每屏的 `section` 高度都要设为100%
```css
html,body{height:100%}
.container{height:100%}
section{height:100%}
```

## 3. 调用 ScrollId 运行
```js
ScrollId(['1', '2', '3'], {
    duration : 1000,
    isTouch: true
  }
)
```
`ScrollId(sequence, config)` 接受 2 个参数，类型都为 array, object.

第一个参数是 id 滚动顺序，`['1', '3', '3']` 则会从 `data-scroll-id` 为 1 的 section 滚动到 3 的 section

第二个参数是设置

# 配置项
| 配置项        | 默认值           |说明|
| :---------: |:-------------:| :--------:|
| duration   | 500 |滚动持续时间|
| ease      | "easeInOutQuint"      | 缓动类型|
| isLoop | true      |  是否循环滚动|
| isTouch| false| 是否适用于触摸 |

# Browser support
chrome firefox edge ie9+