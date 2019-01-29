// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], factory);
  } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
  } else {
      // Browser globals (root is window)
      root.unscroll = factory();
}
}(typeof self !== 'undefined' ? self : this, function () {



function unscroll(elements) {

  // Store reusable vars
  this.set = function (id, value) {
    if (!window.unscrollStore) {
      window.unscrollStore = {};
    }
    window.unscrollStore[id] = value;
  };

  // Get reusable vars
  this.get = function (id) {
    return window.unscrollStore ? window.unscrollStore[id] : null;
  };


  // Get the width of the scroll bar in pixel
 this.getScrollbarWidth = function() {
    if (this.get('scrollbarWidth')) {
      return this.get('scrollbarWidth') + 'px';
    }
    const scrollElement = document.createElement('div');
    scrollElement.style.width = '100px';
    scrollElement.style.height = '100px';
    scrollElement.style.overflow = 'scroll';
    scrollElement.style.position = 'absolute';
    scrollElement.style.top = '-10000';
    
    document.body.appendChild(scrollElement);
    var scrollbarWidth = scrollElement.offsetWidth - scrollElement.clientWidth;
    document.body.removeChild(scrollElement);
    
    this.set('scrollbarWidth', scrollbarWidth);
    this.set('pageHasScrollbar', scrollbarWidth > 0);

    return scrollbarWidth + 'px';
  }

  // Add unscroll class to head
  function addUnscrollClassName () {
      if (document.getElementById('unscroll-class-name')) {
        return;
      }
    var css = '.unscrollable { overflow-y: hidden !important; }',
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('id', 'unscroll-class-name');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
  }
  
  // Check if the page has a scrollbar
  this.pageHasScrollbar = function() {
    this.getScrollbarWidth();
    return this.get('pageHasScrollbar') === true && document.body.scrollHeight > document.body.clientHeight;
  }
   
  // Get the elements to adjust, force body element
  this.getElementsToAdjust = function(elements) {
    if (typeof elements === 'string') {
        elements = [[elements, 'padding-right']];
    }
    
    elements.forEach(function (element, index) {
        if (typeof element === 'string') {
        elements[index] = [element, 'padding-right'];
        }
    });
    
    let bodyFound = false;
    for (var i = 0; i < elements.length; i++) {
      if (elements[i][0].indexOf('body') !== -1) {
        bodyFound = true;
      }
    };
    
    if (bodyFound === false) {
        elements.push(['body', 'padding-right']);
    }
    
    return elements;
  }

  // Make the page unscrollable
    if (!this.pageHasScrollbar()) {
      return;
    }
        
    elements = this.getElementsToAdjust(elements);

    for (var i = 0; i < elements.length; i++) {
        const elementsDOM = document.querySelectorAll(elements[i][0]);
        for (var j = 0; j < elementsDOM.length; j++) {
            if (elementsDOM[j].getAttribute('data-unscroll')) {
                return;
            }
            var attribute = elements[i][1];
            const computedStyles = window.getComputedStyle(elementsDOM[j]);
            const computedStyle = computedStyles.getPropertyValue(attribute);
            elementsDOM[j].setAttribute('data-unscroll', attribute);
            if (!computedStyle) {
                computedStyle = '0px';
            }
            const operator = attribute == 'padding-right' || attribute == 'right' ? '+' : '-';
            elementsDOM[j].style[attribute] = 'calc(' + computedStyle + ' ' + operator + ' ' + this.getScrollbarWidth() + ')';
        }
    }
    addUnscrollClassName();
    document.body.classList.add('unscrollable');
}

unscroll.reset = function () {
  elements = document.querySelectorAll('[data-unscroll]');

  for (var i = 0; i < elements.length; i++) {
      var attribute = elements[i].getAttribute('data-unscroll');
      elements[i].style[attribute] = null;
      elements[i].removeAttribute('data-unscroll');
  }
  document.body.classList.remove('unscrollable');
}

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return unscroll;
}));


