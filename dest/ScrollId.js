/**
 * ScrollId
 * 2015/7/12
 * link      : https://github.com/limi58/ScrollId
 * copyright : limi58 , http://www.imbgf.com
 */

'use strict';
(function(exportName){

	// 集成 jQuery.easing
	jQuery.easing['jswing'] = jQuery.easing['swing'];

	jQuery.extend( jQuery.easing,
	{
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d) {
			return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d) {
			if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
			return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	});

	var ScrollId = function(idInfoObj,scrollInfoObj){
		
	}

	ScrollId.prototype = {
		config:function(idInfoObj,scrollInfoObj){
			this.idInfoObj = idInfoObj;
			this.scrollInfoObj = scrollInfoObj || {};

			this.speed = this.scrollInfoObj.speed || 'slow';
			this.ease = this.scrollInfoObj.ease || 'easeInOutQuint';
			this.isLoop = this.scrollInfoObj.isLoop || true;
			this.interval = this.scrollInfoObj.interval || 250;
			this.isTouch = this.scrollInfoObj.isTouch || false;

			this.idInfoObjLength = this.getIdInfoObjLength();
			this.firstId = this.getFirstId();

			this.currentHash = '';
			this.targetHash = '';
		},

		run:function(){

			// 设置各个id的top 和顺序
			this.setInit();

			if(this.isTouch){
				// 阻止触摸划屏的默认动作
				window.addEventListener('touchmove',function(e){
					e.preventDefault();
				})

				// 监听panup pandowm
				var hammertime = new Hammer(document.getElementsByTagName('body')[0]);
				hammertime.on('pandown panup', function(e) {
				    switch(e.type){
				    	case 'panup':this.setHashByScroll(false);break;
				    	case 'pandown':this.setHashByScroll(true);break;
				    }
				}.bind(this));
			}

			// 监听 url 的 hash 变化
			window.addEventListener('hashchange',function(e){
				e.preventDefault();

				var hash=(location.hash).replace('#!',''),
					top=this.idInfoObj[hash]['top'],
					targetHash = this.targetHash,
					currentHash = this.currentHash;
				$('html,body').stop();
				// beforeFun
				try{
					this.idInfoObj[currentHash]['beforeFun']();
				}catch(e){}
				$('body,html').animate({'scrollTop':top} , this.speed , this.ease , this.idInfoObj[targetHash]['afterFun']);
			}.bind(this))


			// 监听鼠标滚轮事件 firefox
			window.addEventListener('DOMMouseScroll',function(e){
				e.preventDefault();
				if(e.detail < 0){
					this.setHashByScroll(true);
				}else{
					this.setHashByScroll(false);
				}
			}.bind(this))

			// 监听鼠标滚轮事件 chrome
			window.addEventListener('mousewheel',function(e){
				e.preventDefault();
				if(e.wheelDelta > 0){
					this.setHashByScroll(true);
				}else{
					this.setHashByScroll(false);
				}
			}.bind(this))
		},

		// 获取 idInfoObj 的一级子对象个数
		getIdInfoObjLength:function(){
			var idInfoObjLength = 0;
			for(var i in this.idInfoObj){
				idInfoObjLength ++;
			}
			return idInfoObjLength;
		},

		// 获取 idInfoObj 的第一个一级子对象
		getFirstId:function(){
			var count = 0 , firstId = '';
			for(var i in this.idInfoObj){
				if(count == 0) {
					firstId = i;
				}else{
					break;
				}
				count ++;
			}
			return firstId;
		},

		// 获取每个滚动对象 id 的离屏幕的 top 值和顺序并赋值给 idInfoObj
		setInit:function(){
			var i = 0;
			for(var ii in this.idInfoObj){
				var idStr = '#' + ii;
				this.idInfoObj[ii]['top'] = (parseFloat($(idStr).position().top)).toFixed(1);
				this.idInfoObj[ii]['alias'] = i;
				i ++;
			}
		},
		
		// 根据滚动方向设置 hash
		setHashByScroll:function(isSrollTop){

			if($('html,body').is(':animated'))return;
			
			this.currentHash = (location.hash).replace('#!','') || this.firstId;
			var currentAlias = this.idInfoObj[this.currentHash]['alias'],
				targetAlias = 0;
			
			if(isSrollTop){
				// 向上滚轮
				targetAlias = currentAlias - 1;
				// 是否向上越界
				if(targetAlias < 0 && this.isLoop){
					targetAlias = this.idInfoObjLength - 1;
				}
			}else{
				// 向下滚轮
				targetAlias = currentAlias + 1;
				// 向下越界
				if(targetAlias >= this.idInfoObjLength) targetAlias = 0;
			}
			// 获取目标hash
			for(var i in this.idInfoObj){
				if(this.idInfoObj[i]['alias'] == targetAlias) {
					this.targetHash = i;
					break;
				}
			}
			// 改变hash
			location.hash = '#!' + this.targetHash;
		},

		delay:function(callback,num){
			var time =  this.interval * num;
			setTimeout(callback,time);
		},

	}

	window[exportName] = ScrollId;

})('ScrollId')

