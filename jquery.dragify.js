/*!
 * Copyright 2015 Towry Wang
 *
 * @license MIT License, http://towry.me/mit-license/
 */

;(function($) {

$.fn.dragify = function() {
  var target;
  var position;
  var dragPoint = {};
  var mouseUp = true;

  $(document).on('mousedown', function(e) {
    e.preventDefault();

    var self = $(e.target);

    if (self.attr('dragify') === "1") {
      target = self;
      mouseUp = false;

      position = _getPosition(self);

      dragPoint.x = e.clientX;
      dragPoint.y = e.clientY;

      $(document).on('mousemove', _moveHandler);
    }
  })

  $(document).on('mouseup', function(e) {
    mouseUp = true;

    if (!target) {
      return;
    }

    $(document).off('mousemove', document, _moveHandler);
  })

  function _moveHandler(e) {
    if (mouseUp || !target) {
      return;
    }

    target.css('left', position.left + e.clientX - dragPoint.x + 'px');
    target.css('top', position.top + e.clientY - dragPoint.y + 'px');  
  }

  // s instanceof jQuery = true
  function _getPosition (s) {
    var top, left;
    
    if (s.css('position') === 'relative') {
      left = (parseInt(s.css('left'), 10) || 0);
      top = (parseInt(s.css('top'), 10) || 0);
    } else {
      var pos = s.offset();
      var margs = _getMargins(s);

      left = pos.left - margs.left;
      top = pos.top - margs.top;
    }

    return {
      left: left,
      top: top
    }
  }

  // bad, too bad
    function _getMargins (s) {
      return {
        left: (parseInt(s.css('marginLeft'), 10) || 0),
        top: (parseInt(s.css('marginTop'), 10) || 0)
      }
    }

  return this.each(function () {
    var self = $(this);

    if (self.css('position') === 'static') {
      self.css('position', 'relative');
    }
    self.css('cursor', 'move');
    self.attr('dragify', 1);
  });
}

}(jQuery));
