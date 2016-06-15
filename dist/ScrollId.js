(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ScrollId"] = factory();
	else
		root["ScrollId"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _easeAnimate = __webpack_require__(1);
	
	var _easeAnimate2 = _interopRequireDefault(_easeAnimate);
	
	var _easyTouch = __webpack_require__(3);
	
	var _easyTouch2 = _interopRequireDefault(_easyTouch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * ScrollId
	 * Author limi58
	 * https://github.com/limi58/ScrollId
	 * http://www.imbgf.com
	 */
	
	var animate = new _easeAnimate2.default();
	
	function ScrollId(sequence) {
	  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  verifyParams(sequence, config);
	  var SEQUENCE = sequence;
	  var TOP_SEQUENCE = [];
	  var DURATION = config.duration || 'slow';
	  var EASE = config.ease || 'circleInOut';
	  var IS_LOOP = config.isLoop || true;
	  var IS_TOUCH = config.isTouch || false;
	
	  var SECTION_COUNT = SS('section').length;
	
	  var currentHash = '';
	  var targetHash = '';
	
	  start();
	
	  function verifyParams(sequence, config) {
	    if (Object.prototype.toString.call(sequence) !== '[object Array]') throw new Error('"sequence" should be a Array');
	    if (config != null) {
	      if (Object.prototype.toString.call(config) !== '[object Object]') throw new Error('"config" should be a Object');
	    }
	  }
	
	  function start() {
	    setTopSequence();
	    // setEase()
	    addEvent();
	    var currentHash = getCurrentHash();
	    // if current hash no first section, will animate to target hash
	    if (currentHash !== SEQUENCE[0]) {
	      setHash(SEQUENCE[0]);
	      setHash(currentHash);
	    }
	  }
	
	  function setTopSequence() {
	    TOP_SEQUENCE = SEQUENCE.map(function (id) {
	      return S('[data-scroll-id="' + id + '"]').offsetTop;
	    });
	  }
	
	  function addEvent() {
	    if (IS_TOUCH) onTouch();
	    // listen url hash change
	    window.addEventListener('hashchange', onHashChange);
	    // listen mouse wheel event
	    window.addEventListener('wheel', onWheel);
	  }
	
	  function onTouch() {
	    window.addEventListener('touchmove', function (e) {
	      return e.preventDefault();
	    });
	    // listen panup pandowm
	    var touch = new _easyTouch2.default(document.querySelector('body'));
	    touch.on('pan', function (e) {
	      switch (e.type) {
	        case 'panup':
	          setHashByScroll('down');
	          break;
	        case 'pandown':
	          setHashByScroll('up');
	          break;
	      }
	    });
	  }
	
	  function onWheel(e) {
	    e.preventDefault();
	    if (e.deltaY < 0) {
	      setHashByScroll('up');
	    } else {
	      setHashByScroll('down');
	    }
	  }
	
	  function onHashChange(e) {
	    e.preventDefault();
	    var hash = location.hash.replace('#!', '');
	    var sectionTop = getSectionTop(hash);
	    // $('html, body').stop()
	    animate.scrollAnimate(sectionTop, DURATION, EASE);
	  }
	
	  function getSectionTop(hash) {
	    var sectionIndex = SEQUENCE.indexOf(hash);
	    var top = TOP_SEQUENCE[sectionIndex];
	    return top;
	  }
	
	  function getCurrentHash() {
	    return location.hash.replace('#!', '');
	  }
	
	  function setHash(hash) {
	    location.hash = '#!' + hash;
	  }
	
	  // set hash to location by scroll direction
	  function setHashByScroll(direction) {
	
	    if (animate.isScrolling) return;
	
	    var currentHash = getCurrentHash() || SEQUENCE[0];
	    var currentHashIndex = SEQUENCE.indexOf(currentHash);
	    var targetHash = '';
	
	    if (direction === 'up') {
	      // is over top
	      if (currentHashIndex === 0 && IS_LOOP) {
	        targetHash = SEQUENCE[SECTION_COUNT - 1];
	      } else {
	        targetHash = SEQUENCE[currentHashIndex - 1];
	      }
	    } else {
	      if (currentHashIndex === SECTION_COUNT - 1 && IS_LOOP) {
	        targetHash = SEQUENCE[0];
	      } else {
	        targetHash = SEQUENCE[currentHashIndex + 1];
	      }
	    }
	    // change hash
	    setHash(targetHash);
	  }
	
	  function S(selector) {
	    return document.querySelector(selector);
	  }
	
	  function SS(selector) {
	    return document.querySelectorAll(selector);
	  }
	}
	
	module.exports = ScrollId;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Animate = __webpack_require__(2)
	module.exports = Animate

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.Animate=n():t.Animate=n()}(this,function(){return function(t){function n(u){if(e[u])return e[u].exports;var r=e[u]={exports:{},id:u,loaded:!1};return t[u].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){"use strict";function u(){this.interval=10,this.isDomRunning=!1,this.isScrolling=!1}var r=e(2),o=e(3);u.prototype={domAnimate:r,scrollAnimate:o},t.exports=u},function(t,n,e){"use strict";function u(t,n,e,u,i){r(e,i);var c=e/i,a=n-t,s=o(u,c,a).map(function(n){return(n+t).toFixed(4)});return s}function r(t,n){if(n>t||10>n)throw new Error('"duration" must greater than "interval" and "interval" should not less than 10')}var o=e(5);t.exports=u},function(t,n,e){"use strict";function u(t,n){var e=arguments.length<=2||void 0===arguments[2]?500:arguments[2],u=arguments.length<=3||void 0===arguments[3]?"quadInOut":arguments[3],i=o(t,n,e,u,this.interval);r.call(this,t,i,this.interval)}function r(t,n,e){var u=this,r=0,o=n[0].numbers.length;this.isDomRunning=!0;var i=setInterval(function(){n.forEach(function(n){c(t,n.attr,n.numbers[r],n.unit)}),r++,r>=o&&(clearInterval(i),u.isDomRunning=!1)},e)}function o(t,n,e,u,r){var o=[];for(var c in n){var a=c,l=i(t,a),f=parseFloat(l),p=parseFloat(n[c]),d=l.replace(f,"");o.push({attr:c,numbers:s(f,p,e,u,r),unit:d})}return o}function i(t,n){var e=a(t);return window.getComputedStyle(e,null)[n]}function c(t,n,e,u){a(t).style[n]=""+e+u}function a(t){return document.querySelector(t)}var s=e(1);t.exports=u},function(t,n,e){"use strict";function u(t){var n=this,e=arguments.length<=1||void 0===arguments[1]?500:arguments[1],u=arguments.length<=2||void 0===arguments[2]?"circleInOut":arguments[2];if(!this.isScrolling){var o=this.interval,i=r(document.body.scrollTop||document.documentElement.scrollTop,t,e,u,o),c=i.length,a=0;this.isScrolling=!0;var s=setInterval(function(){window.scrollTo(0,i[a]),a++,a>=c&&(clearInterval(s),n.isScrolling=!1)},o)}}var r=e(1);t.exports=u},function(t,n,e){!function(n,e){t.exports=e()}(this,function(){return function(t){function n(u){if(e[u])return e[u].exports;var r=e[u]={exports:{},id:u,loaded:!1};return t[u].call(r.exports,r,r.exports,n),r.loaded=!0,r.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){"use strict";function u(t){return t&&t.__esModule?t:{"default":t}}function r(t,n){for(var e=arguments.length<=2||void 0===arguments[2]?1:arguments[2],u=arguments.length<=3||void 0===arguments[3]?4:arguments[3],r=[],o=0;n>=o;o+=1){var c=i["default"][t](o/n).toFixed(u)*e;r.push(c)}return r}var o=e(7),i=u(o);t.exports=r},function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=1.70158;n.backIn=function u(t){function n(n){return n*n*((t+1)*n-t)}return t=+t,n.overshoot=u,n}(e),n.backOut=function r(t){function n(n){return--n*n*((t+1)*n+t)+1}return t=+t,n.overshoot=r,n}(e),n.backInOut=function o(t){function n(n){return((n*=2)<1?n*n*((t+1)*n-t):(n-=2)*n*((t+1)*n+t)+2)/2}return t=+t,n.overshoot=o,n}(e)},function(t,n){"use strict";function e(t){return 1-u(1-t)}function u(t){return(t=+t)<o?O*t*t:c>t?O*(t-=i)*t+a:l>t?O*(t-=s)*t+f:O*(t-=p)*t+d}function r(t){return((t*=2)<=1?1-u(1-t):u(t-1)+1)/2}Object.defineProperty(n,"__esModule",{value:!0}),n.bounceIn=e,n.bounceOut=u,n.bounceInOut=r;var o=4/11,i=6/11,c=8/11,a=.75,s=9/11,l=10/11,f=.9375,p=21/22,d=63/64,O=1/o/o},function(t,n){"use strict";function e(t){return 1-Math.sqrt(1-t*t)}function u(t){return Math.sqrt(1- --t*t)}function r(t){return((t*=2)<=1?1-Math.sqrt(1-t*t):Math.sqrt(1-(t-=2)*t)+1)/2}Object.defineProperty(n,"__esModule",{value:!0}),n.circleIn=e,n.circleOut=u,n.circleInOut=r},function(t,n){"use strict";function e(t){return t*t*t}function u(t){return--t*t*t+1}function r(t){return((t*=2)<=1?t*t*t:(t-=2)*t*t+2)/2}Object.defineProperty(n,"__esModule",{value:!0}),n.cubicIn=e,n.cubicOut=u,n.cubicInOut=r},function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=2*Math.PI,u=1,r=.3;n.elasticIn=function o(t,n){function u(e){return t*Math.pow(2,10*--e)*Math.sin((r-e)/n)}var r=Math.asin(1/(t=Math.max(1,t)))*(n/=e);return u.amplitude=function(t){return o(t,n*e)},u.period=function(n){return o(t,n)},u}(u,r),n.elasticOut=function i(t,n){function u(e){return 1-t*Math.pow(2,-10*(e=+e))*Math.sin((e+r)/n)}var r=Math.asin(1/(t=Math.max(1,t)))*(n/=e);return u.amplitude=function(t){return i(t,n*e)},u.period=function(n){return i(t,n)},u}(u,r),n.elasticInOut=function c(t,n){function u(e){return((e=2*e-1)<0?t*Math.pow(2,10*e)*Math.sin((r-e)/n):2-t*Math.pow(2,-10*e)*Math.sin((r+e)/n))/2}var r=Math.asin(1/(t=Math.max(1,t)))*(n/=e);return u.amplitude=function(t){return c(t,n*e)},u.period=function(n){return c(t,n)},u}(u,r)},function(t,n){"use strict";function e(t){return Math.pow(2,10*t-10)}function u(t){return 1-Math.pow(2,-10*t)}function r(t){return((t*=2)<=1?Math.pow(2,10*t-10):2-Math.pow(2,10-10*t))/2}Object.defineProperty(n,"__esModule",{value:!0}),n.expIn=e,n.expOut=u,n.expInOut=r},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var u=e(1),r=e(2),o=e(3),i=e(4),c=e(5),a=e(6),s=e(8),l=e(9),f=e(10),p=e(11),d={backIn:u.backIn,backOut:u.backOut,backInOut:u.backInOut,bounceIn:r.bounceIn,bounceOut:r.bounceOut,bounceInOut:r.bounceInOut,circleIn:o.circleIn,circleOut:o.circleOut,circleInOut:o.circleInOut,cubicIn:i.cubicIn,cubicOut:i.cubicOut,cubicInOut:i.cubicInOut,elasticIn:c.elasticIn,elasticOut:c.elasticOut,elasticInOut:c.elasticInOut,expIn:a.expIn,expOut:a.expOut,expInOut:a.expInOut,linear:s.linear,polyIn:l.polyIn,polyOut:l.polyOut,polyInOut:l.polyInOut,quadIn:f.quadIn,quadOut:f.quadOut,quadInOut:f.quadInOut,sinIn:p.sinIn,sinOut:p.sinOut,sinInOut:p.sinInOut};n["default"]=d},function(t,n){"use strict";function e(t){return+t}Object.defineProperty(n,"__esModule",{value:!0}),n.linear=e},function(t,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=3;n.polyIn=function u(t){function n(n){return Math.pow(n,t)}return t=+t,n.exponent=u,n}(e),n.polyOut=function r(t){function n(n){return 1-Math.pow(1-n,t)}return t=+t,n.exponent=r,n}(e),n.polyInOut=function o(t){function n(n){return((n*=2)<=1?Math.pow(n,t):2-Math.pow(2-n,t))/2}return t=+t,n.exponent=o,n}(e)},function(t,n){"use strict";function e(t){return t*t}function u(t){return t*(2-t)}function r(t){return((t*=2)<=1?t*t:--t*(2-t)+1)/2}Object.defineProperty(n,"__esModule",{value:!0}),n.quadIn=e,n.quadOut=u,n.quadInOut=r},function(t,n){"use strict";function e(t){return 1-Math.cos(t*i)}function u(t){return Math.sin(t*i)}function r(t){return(1-Math.cos(o*t))/2}Object.defineProperty(n,"__esModule",{value:!0}),n.sinIn=e,n.sinOut=u,n.sinInOut=r;var o=Math.PI,i=o/2}])})},function(t,n,e){const u=e(4);t.exports=u}])});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Touch = __webpack_require__(4)
	
	module.exports = Touch

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["Touch"] = factory();
		else
			root["Touch"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {
	
		'use strict';
		
		var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
		
		function Touch(dom) {
		  if (dom == null || (typeof dom === 'undefined' ? 'undefined' : _typeof(dom)) !== 'object') throw new Error('dom is invalid');
		  this.dom = dom;
		  this.startX = 0;
		  this.startY = 0;
		  this.endX = 0;
		  this.endY = 0;
		  this.actions = ['pan'];
		  this.effectiveDistance = 10;
		  this.callbacks = {
		    panFn: null
		  };
		}
		
		Touch.prototype = {
		  on: function on(action, cb) {
		    var _this = this;
		
		    if (typeof action !== 'string' || typeof cb !== 'function') throw new Error('"on" method params is invalid');
		    this.verifyAction(action);
		    this.setCallbacks(action, cb);
		    this.dom.addEventListener('touchstart', function (e) {
		      return _this.onTouchstart(e);
		    }, false);
		    this.dom.addEventListener('touchend', function (e) {
		      return _this.onTouchend(e);
		    }, false);
		  },
		
		  onTouchstart: function onTouchstart(e) {
		    this.startY = e.changedTouches[0].pageY;
		    this.startX = e.changedTouches[0].pageX;
		  },
		
		  onTouchend: function onTouchend(e) {
		    this.endX = e.changedTouches[0].pageX;
		    this.endY = e.changedTouches[0].pageY;
		    var distanceY = this.endY - this.startY;
		    var distanceX = this.endX - this.startX;
		    this.handlePanCb(distanceX, distanceY);
		  },
		
		  handlePanCb: function handlePanCb(distanceX, distanceY) {
		    if (this.callbacks.panFn == null) return;
		    // vertical direction
		    if (Math.abs(distanceY) > this.effectiveDistance && Math.abs(distanceY) >= Math.abs(distanceX)) {
		      this.callbacks.panFn({ type: distanceY < 0 ? 'panup' : 'pandown' });
		    } else if (Math.abs(distanceX) > this.effectiveDistance && Math.abs(distanceX) > Math.abs(distanceY)) {
		      // horizontal direction
		      this.callbacks.panFn({ type: distanceX < 0 ? 'panleft' : 'panright' });
		    }
		  },
		  setCallbacks: function setCallbacks(action, cb) {
		    switch (action) {
		      case 'pan':
		        this.callbacks.panFn = cb;
		        break;
		    }
		  },
		
		
		  verifyAction: function verifyAction(action) {
		    if (this.actions.indexOf(action) < 0) throw new Error('not exists "' + action + '" action, only support "' + this.actions.join(',') + '" at present.');
		  }
		
		};
		
		module.exports = Touch;
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=easy-touch.js.map

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ScrollId.js.map