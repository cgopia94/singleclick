// JQuery plugin to keep the same multiple events from being fired in a short period of time 
// version: 0.0.2
// date: 02/17/2017
// Author: Myeong Kim
// Example:
// $('#theButton').sclick('click', function (evt) {...});

(function ($) {
	'use strict';
	$.fn.sclick = function(events, target, handler, delay) {
		if (typeof target == 'function') {
			delay = handler;
			handler = target;
		}
		events = events || 'click';
		target = target || '';
		delay = delay || 300;

		var tappedInTime = false;
		
		return this.each(function () {
			
			events = events.replace('tap', 'touchstart touchend');
			
			$(this).on(events.split(' ').join('.sclick '), target, function (evt) {
				var timeCurr = new Date().getTime();
				if (evt.type == 'touchstart') {
					$(this).data('whenTouched', timeCurr);
				}
				else if (evt.type == 'touchend') {
					var timeTouchSaved = $(this).data('whenTouched');
					if (timeTouchSaved && (timeCurr - timeTouchSaved < delay)) tappedInTime == true;
				}
				var timeSaved = $(this).data('whenSingleClicked');
				var timeDiff = timeCurr - timeSaved;
				if ((timeSaved && timeDiff < delay) || ((evt.type == 'touchstart' || evt.type == 'touchend') && !tappedInTime)) {
					evt.stopImmediatePropagation();
					return;
				}
				
				$(this).data('whenSingleClicked', timeCurr);

				tappedInTime = false;

				if (typeof handler == 'function') handler.call(this, evt);
			});
		});
	};
}(jQuery));