'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * ScrollId
 * Author limi58
 * https://github.com/limi58/ScrollId
 * http://www.imbgf.com
 */
function ScrollId(sequence) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];


  var SEQUENCE = sequence;
  var TOP_SEQUENCE = [];
  var DURATION = config.duration || 'slow';
  var EASE = config.ease || 'easeInOutQuint';
  var IS_LOOP = config.isLoop || true;
  var IS_TOUCH = config.isTouch || false;

  var SECTION_COUNT = $('section').length;
  var BODY_HEIGHT = $('body').height();

  var currentHash = '';
  var targetHash = '';

  start();

  function start() {
    setTopSequence();
    setEase();
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
      return $('[data-scroll-id="' + id + '"]').position().top;
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
    var fingertip = new Fingertip(document.querySelector('body'));
    fingertip.on('pan', function (e) {
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
    $('html, body').stop();
    $('body, html').animate({ 'scrollTop': sectionTop }, DURATION, EASE);
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

    if ($('html, body').is(':animated')) return;

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

  // t: current time, b: begInnIng value, c: change In value, d: duration
  function setEase() {
    $.easing['jswing'] = $.easing['swing'];
    $.extend($.easing, {
      def: 'easeOutQuad',
      swing: function swing(x, t, b, c, d) {
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
      },
      easeInQuad: function easeInQuad(x, t, b, c, d) {
        return c * (t /= d) * t + b;
      },
      easeOutQuad: function easeOutQuad(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      easeInOutQuad: function easeInOutQuad(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
      },
      easeInCubic: function easeInCubic(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
      },
      easeOutCubic: function easeOutCubic(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
      },
      easeInOutCubic: function easeInOutCubic(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
      },
      easeInQuart: function easeInQuart(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
      },
      easeOutQuart: function easeOutQuart(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      },
      easeInOutQuart: function easeInOutQuart(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
      },
      easeInQuint: function easeInQuint(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
      },
      easeOutQuint: function easeOutQuint(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
      },
      easeInOutQuint: function easeInOutQuint(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
      },
      easeInSine: function easeInSine(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
      },
      easeOutSine: function easeOutSine(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
      },
      easeInOutSine: function easeInOutSine(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      },
      easeInExpo: function easeInExpo(x, t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
      },
      easeOutExpo: function easeOutExpo(x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOutExpo: function easeInOutExpo(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function easeInCirc(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
      },
      easeOutCirc: function easeOutCirc(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
      },
      easeInOutCirc: function easeInOutCirc(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
      },
      easeInElastic: function easeInElastic(x, t, b, c, d) {
        var s = 1.70158;var p = 0;var a = c;
        if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
        if (a < Math.abs(c)) {
          a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      },
      easeOutElastic: function easeOutElastic(x, t, b, c, d) {
        var s = 1.70158;var p = 0;var a = c;
        if (t == 0) return b;if ((t /= d) == 1) return b + c;if (!p) p = d * .3;
        if (a < Math.abs(c)) {
          a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
      },
      easeInOutElastic: function easeInOutElastic(x, t, b, c, d) {
        var s = 1.70158;var p = 0;var a = c;
        if (t == 0) return b;if ((t /= d / 2) == 2) return b + c;if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
          a = c;var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
      },
      easeInBack: function easeInBack(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
      },
      easeOutBack: function easeOutBack(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
      },
      easeInOutBack: function easeInOutBack(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
      },
      easeInBounce: function easeInBounce(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
      },
      easeOutBounce: function easeOutBounce(x, t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
          return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
          return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
          return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
          return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
      },
      easeInOutBounce: function easeInOutBounce(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
      }
    });
  }

  if (typeof module !== 'undefined' && (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = ScrollId;
  } else {
    window.ScrollId = ScrollId;
  }
}

function Fingertip(dom) {
  this.dom = dom;
  this.startY = 0;
  this.endY = 0;
  this.actions = ['pan'];
  this.effectiveDistance = 10;
  this.callbacks = {
    panFn: null
  };
}

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
