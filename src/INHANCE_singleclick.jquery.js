// JQuery plugin to keep the same multiple events from being fired in a short period of time 
// version: 0.0.5
// date: 11/3/2017
// Author: Myeong Kim
// Example:
// $('#theButton').on('sclick', ....);

var INHANCE_singleclick = (function ($) {
	'use strict';
	var settings;
	var events = 'click.sclick touchstart.sclick touchend.sclick';
	var defaults = {
		delay: 300
	};
		
	function set(options) {
		settings = $.extend(defaults, options);
	}

	settings = defaults;

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
          if (timeTouchSaved && (timeCurr - timeTouchSaved < settings.delay * 2)) {
            tappedInTime = true;
          }
        }
        var timeSaved = $(this).data('whenSingleClicked');
        var timeDiff = timeCurr - timeSaved;
        var trigger = false;
        if (evt.type == 'touchstart' || evt.type == 'touchend') {
          if (tappedInTime && (!timeSaved || timeSaved && timeDiff > settings.delay)) {
            trigger = true;
          }
        }
        else if (!timeSaved || timeSaved && timeDiff > settings.delay) {
          trigger = true;
        } 
        
        if (trigger) {
          var originalType = evt.type;
          evt.type = 'sclick';

          $.event.dispatch.call(this, evt);
          evt.type = originalType;
          evt.preventDefault();

        }

        if (evt.type == 'click' || evt.type == 'touchend') $(this).data('whenSingleClicked', timeCurr);

        tappedInTime = false;
      });
    },
    remove: function () {
      $(this).off(events);
    }
	};
	
	return {
		set: set
	};
}(jQuery));