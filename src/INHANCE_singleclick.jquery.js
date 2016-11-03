// JQuery plugin to keep the same multiple events from being fired in a short period of time 
// version: 0.0.1
// date: 11/03/2016
// Author: Myeong Kim
// Example:
// $('#theButton').sclick().on('click', function (evt) {...});

(function ($) {
	'use strict';
	$.fn.sclick = function(options) {
		var settings;

		var defaults = {
			events: 'click',
			delay: 300
		};

		settings = $.extend(defaults, options);

		return this.each(function () {
			$(this).on(settings.events.split(' ').join('.sclick '), function (evt) {
				var timeSaved = $(this).data('whenSingleClicked');
				var timeCurr = new Date().getTime();
				var timeDiff = timeCurr - timeSaved;
				if (timeSaved && timeDiff < settings.delay) {
					evt.stopImmediatePropagation();
				}
				
				$(this).data('whenSingleClicked', timeCurr);
				
			});
		});
	};
}(jQuery));