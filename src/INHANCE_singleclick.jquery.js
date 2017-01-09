// JQuery plugin to keep the same multiple events from being fired in a short period of time 
// version: 0.0.1
// date: 01/09/2017
// Author: Myeong Kim
// Example:
// $('#theButton').sclick().on('click', function (evt) {...});

(function ($) {
	'use strict';
	$.fn.sclick = function(events, target, delay) {
		events = events || 'click';
		target = target || '';
		delay = delay || 300;
		
		return this.each(function () {
			$(this).on(events.split(' ').join('.sclick '), target, function (evt) {
				var timeSaved = $(this).data('whenSingleClicked');
				var timeCurr = new Date().getTime();
				var timeDiff = timeCurr - timeSaved;
				if (timeSaved && timeDiff < delay) {
					evt.stopImmediatePropagation();
				}
				
				$(this).data('whenSingleClicked', timeCurr);
				
			});
		});
	};
}(jQuery));