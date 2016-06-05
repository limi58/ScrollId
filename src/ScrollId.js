/**
 * ScrollId
 * Author limi58
 * https://github.com/limi58/ScrollId
 * http://www.imbgf.com
 */
function ScrollId(sequence, config = {}) {

  const SEQUENCE = sequence
  let TOP_SEQUENCE = []
  const DURATION = config.duration || 'slow'
  const EASE = config.ease || 'easeInOutQuint'
  const IS_LOOP = config.isLoop || true
  const IS_TOUCH = config.isTouch || false

  const SECTION_COUNT = $('section').length
  const BODY_HEIGHT = $('body').height()

  let currentHash = ''
  let targetHash = ''

  start()

  function start(){
    setTopSequence()
    setEase()
    addEvent()
    const currentHash = getCurrentHash()
    // if current hash no first section, will animate to target hash
    if(currentHash !== SEQUENCE[0]) {
      setHash(SEQUENCE[0])
      setHash(currentHash)
    }
  }

  function setTopSequence(){
  	TOP_SEQUENCE = SEQUENCE.map(id => {
  		return $(`[data-scroll-id="${id}"]`).position().top
  	})
  }

  function addEvent(){
    if(IS_TOUCH) onTouch()
    // listen url hash change
    window.addEventListener('hashchange', onHashChange)
    // listen mouse wheel event
    window.addEventListener('wheel', onWheel)
  }

  function onTouch(){
    window.addEventListener('touchmove', e => e.preventDefault())
    // listen panup pandowm
    const fingertip = new Fingertip(document.querySelector('body'))
    fingertip.on('pan', e => {
      switch(e.type){
        case 'panup': setHashByScroll('down')
          break
        case 'pandown': setHashByScroll('up')
        	break
      }
    })
  }

  function onWheel(e){
  	e.preventDefault()
  	if(e.deltaY < 0){
  	  setHashByScroll('up');
  	}else{
  	  setHashByScroll('down');
  	}
  }

  function onHashChange(e){
  	e.preventDefault()
  	const hash = location.hash.replace('#!', '')
  	const sectionTop = getSectionTop(hash)
  	$('html, body').stop()
  	$('body, html').animate({'scrollTop': sectionTop} , DURATION , EASE)
  }

  function getSectionTop(hash){
    const sectionIndex = SEQUENCE.indexOf(hash)
    const top = TOP_SEQUENCE[sectionIndex]
    return top
  }

  function getCurrentHash(){
    return location.hash.replace('#!','')
  }

  function setHash(hash){
    location.hash = `#!${hash}`
  }

  // set hash to location by scroll direction
  function setHashByScroll(direction){

    if($('html, body').is(':animated')) return
    
    const currentHash = getCurrentHash() || SEQUENCE[0]
    const currentHashIndex = SEQUENCE.indexOf(currentHash)
    let targetHash = ''
    
    if(direction === 'up'){
      // is over top
      if(currentHashIndex === 0 && IS_LOOP){
        targetHash = SEQUENCE[SECTION_COUNT - 1]
      }else{
        targetHash = SEQUENCE[currentHashIndex - 1]
      }
    }else{
      if(currentHashIndex === SECTION_COUNT - 1 && IS_LOOP){
        targetHash = SEQUENCE[0]
      }else{
        targetHash = SEQUENCE[currentHashIndex + 1]
      }
    }
    // change hash
    setHash(targetHash)
  }

  // t: current time, b: begInnIng value, c: change In value, d: duration
  function setEase(){
    $.easing['jswing'] = $.easing['swing']
    $.extend($.easing, {
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
    })
  }

  if(typeof module !== 'undefined' && typeof exports === 'object'){
    module.exports = ScrollId
  }else {
    window.ScrollId = ScrollId
  }

}

function Fingertip(dom){
  this.dom = dom
  this.startY = 0
  this.endY = 0
  this.actions = ['pan']
  this.effectiveDistance = 10
  this.callbacks = {
    panFn: null,
  }
}

Fingertip.prototype = {
  on: function(action, cb){
    this.verifyAction(action)
    this.setCallbacks(action, cb)
    this.dom.addEventListener('touchstart', e => this.onTouchstart(e), false)
    this.dom.addEventListener('touchend', e => this.onTouchend(e), false)
  },

  onTouchstart: function(e){
    this.startY = e.changedTouches[0].pageY
  },

  onTouchend: function(e){
    this.endY = e.changedTouches[0].pageY
    const distance = this.endY - this.startY
    if(Math.abs(distance) > this.effectiveDistance && this.callbacks.panFn != null){
      this.callbacks.panFn({type: distance < 0 ? 'panup' : 'pandown'})
    }
  },

  setCallbacks(action, cb){
    switch(action){
      case 'pan':
        this.callbacks.panFn = cb 
        break
    }
  },

  verifyAction: function(action){
    if(this.actions.indexOf(action) < 0) 
      throw new Error(`not exists "${action}" action, only support "${this.actions.join(',')}" at present.`)
  },

}






