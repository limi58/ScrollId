# ScrollId
full page scroll by hash change

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

```html
<div class='container'>
  <section data-scroll-id="1">page 1</section>
  <section data-scroll-id='2'>page 2</section>
  <section data-scroll-id='3'>page 3</section>
</div>
```

## CSS

```css
html,body{height:100%}
.container{height:100%}
section{height:100%}
```

## Run

```js
ScrollId(['1', '2', '3'], {
  duration : 1000,
  isTouch: true,
  onLeave: id => console.log(`leave ${id}`),
  onDone: id => console.log(`done ${id}`),
})

or

ScrollId.default(['1', '2', '3'], {
  duration : 1000,
  isTouch: true,
  onLeave: id => console.log(`leave ${id}`),
  onDone: id => console.log(`done ${id}`),
})
```

**void ScrollId(arr sequence [,obj config])**

`sequence`  scroll order

`config`

# Config
| key | default value | desc |
| :-: |:-:| :-:|
| duration   | 500 |scroll duration|
| ease      | "circleInOut"      | [ease type](https://github.com/limi58/ease-generator#generator) |
| isLoop | true      |  is loop|
| isTouch | false | is touch mode |
| onLeave | null | leave function |
| onDone | null | done function |

# Browser support
exclude ie8-
