{
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

  if(typeof module !== 'undefined' && typeof exports === 'object'){
    module.exports = Fingertip
  }else {
    window.Fingertip = Fingertip
  }
}