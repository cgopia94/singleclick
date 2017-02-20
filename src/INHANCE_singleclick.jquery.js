// JQuery plugin to keep the same multiple events from being fired in a short period of time 
// version: 0.0.2
// date: 02/17/2017
// Author: Myeong Kim
// Example:
// $('#theButton').on('sclick', ....);

(function ($) {
  'use strict';
  var events = 'click.sclick touchstart.sclick touchend.sclick';
  var delay = 300;

  $.event.special.sclick = {
    setup: function () {
      $(this).on(events, function (evt) {
        var tappedInTime = false;
        var timeCurr = new Date().getTime();
        if (evt.type == 'touchstart') {
          $(this).data('whenTouched', timeCurr);
        }
        else if (evt.type == 'touchend') {
          var timeTouchSaved = $(this).data('whenTouched');
          if (timeTouchSaved && (timeCurr - timeTouchSaved < delay * 2)) {
            tappedInTime = true;
          }
        }
        var timeSaved = $(this).data('whenSingleClicked');
        var timeDiff = timeCurr - timeSaved;
        var trigger = false;
        if (evt.type == 'touchstart' || evt.type == 'touchend') {
          if (tappedInTime && (!timeSaved || timeSaved && timeDiff > delay)) {
            trigger = true;
          }
        }
        else if (!timeSaved || timeSaved && timeDiff > delay) {
          trigger = true;
        } 
        
        if (trigger) {
          var originalType = evt.type;
          evt.type = 'sclick';

          $.event.dispatch.call(this, evt);
          evt.type = originalType;


        }

        if (evt.type == 'click' || evt.type == 'touchend') $(this).data('whenSingleClicked', timeCurr);

        tappedInTime = false;
      });
    },
    remove: function () {
      $(this).off(events);
    }
  };
}(jQuery));
