# ScrollId
A full screen pages scrolling plugin,depend on jQuery and may be Hammer.js

一个轻量级的 **滚动插件**，以 `location.hash` 变化为驱动，替换浏览器默认的动作，缓动到指定 hash 的 id 位置。样式稍加处理即可成为 **全屏滚动插件** 。
# Demo
Demo is [here](http://www.imbgf.com/home/about)
# Including files
    <script type="text/javascript" src='jquery.js'></script>
    <script type="text/javascript" src='ScrollId.js'></script>
# Usage 
## 1. 构建HTML
推荐以下结构，当然标签和 id 可以随意。本插件主要作用是 **整屏滚动到指定 id**，因此必须设置每块的id

    <div class='container'>
        <section id="sec0">1</section>
    	<section id='sec1'>2</section>
        <section id='sec2'>3</section>
        // ...
    </div>
## 2. 确保容器100%高度
从根节点到每屏的 `section` 高度都要设为100%

    html,body{height:100%}
    .container{height:100%}
    section{height:100%}
## 3. 实例化 ScrollId 并运行
 实例化

    var scroll = new ScrollId();
配置，config() 接受 2 个参数，类型都为 object。
第一个参数是每块屏的配置，结构为

     {
        id 名称 : 
       {
          beforeFun : 离开该屏之前的callback（可选）,
          afterFun : 到达该 id 后的callback（可选）
       }
       ...
     }
第二个参数是一般设置，结构为

    {配置项 : 值}
例如，以下配置的是有三个 id 为 sec0 sec1 sec2 的 full page .在离开 sec2 前会弹出字符串 "b"，在滚动到 sec 之后会弹出字符串 "a"，滚动速度是 1000 毫秒

    scroll.config(
		{
			sec0 : {},
			sec1 : {},
			sec2 : {
				beforeFun : function(){alert('b')},
				afterFun : function(){alert('a')}
			}
		},
		{
			speed : 1000
		}
	)

配置完成之后就可以执行 run() 运行了

    scroll.run();
# 配置项
| 配置项        | 默认值           |说明|
| :---------: |:-------------:| :--------:|
| speed   | 500 |滚动速度|
| ease      | "easeInOutQuint"      | 缓动类型|
| isLoop | true      |  是否循环滚动|
| isTouch| false| 是否适用于触摸（依赖[Hammer.js](https://github.com/hammerjs/hammer.js)）|

# 公共方法
*  setHashByScroll( isSrollTop )

`isSrollTop：`true 为向上一块屏滚动，反之

# Browser support
All modern browsers exclude IE8 -