# ScrollId
A full screen pages scrolling plugin by hash change

以 `location.hash` 变化为驱动，缓动到指定 hash 的 id 位置。体积10k。

# Demo
[here](demo/demo.html)

# Install
```
npm install --save scroll-id
```

or 

```html
<script type="text/javascript" src='ScrollId.min.js'></script>
```

# Usage 
## HTML

标签和 `data-scroll-id` 的值随意，必须有 `data-scroll-id` 属性

```html 
<div class='container'>
  <section data-scroll-id="1">第1屏</section>
  <section data-scroll-id='2'>第2屏</section>
  <section data-scroll-id='3'>第3屏</section>
</div>
```

## 确保容器100%高度（可选）

如果要实现全屏滚动，从根节点到每屏的 `section` 高度都要设为100%

```css
html,body{height:100%}
.container{height:100%}
section{height:100%}
```

## Run

```js
ScrollId(['1', '2', '3'], {
    duration : 1000,
    isTouch: true
  }
)
```

**void ScrollId(arr sequence [,obj config])**

`sequence`  id 滚动顺序，`['1', '3', '3']` 则会从 `data-scroll-id` 为 1 的 section 滚动到 3 的 section

`config` 设置

# Config
| 配置项        | 默认值           |说明|
| :---------: |:-------------:| :--------:|
| duration   | 500 |滚动持续时间|
| ease      | "circleInOut"      | [缓动类型](https://github.com/limi58/ease-generator#generator) |
| isLoop | true      |  是否循环滚动|
| isTouch| false| 是否适用于触摸 |

# Browser support
chrome firefox edge ie9+