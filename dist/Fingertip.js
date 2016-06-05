'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

{
  var Fingertip = function Fingertip(dom) {
    this.dom = dom;
    this.startY = 0;
    this.endY = 0;
    this.actions = ['pan'];
    this.effectiveDistance = 10;
    this.callbacks = {
      panFn: null
    };
  };

  Fingertip.prototype = {
    on: function on(action, cb) {
      var _this = this;

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
    },

    onTouchend: function onTouchend(e) {
      this.endY = e.changedTouches[0].pageY;
      var distance = this.endY - this.startY;
      if (Math.abs(distance) > this.effectiveDistance && this.callbacks.panFn != null) {
        this.callbacks.panFn({ type: distance < 0 ? 'panup' : 'pandown' });
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

  if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = Fingertip;
  } else {
    window.Fingertip = Fingertip;
  }
}
