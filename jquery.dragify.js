/*!
 * Copyright 2015 Towry Wang
 *
 * @license MIT, http://towry.me/mit-license.html#2015
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
  function _getPosition(s) {
    var left = parseInt(s.css('left'));
    var top = parseInt(s.css('top'));

    left = isNaN(left) ? 0 : left;
    top = isNaN(top) ? 0 : top;

    return {
      left: left,
      top: top
    }
  }

  return this.each(function() {
    var self = $(this);

    if (self.css('position') === 'static') {
      self.css('position', 'relative');
    }
    self.css('cursor', 'move');
    self.attr('dragify', 1);
  });
}

}(jQuery));
