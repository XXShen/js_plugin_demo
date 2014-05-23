define([
		'css!./main'
		, 'text!./template.html'
		, 'eventproxy'
	]
	, function (css, template, Eventproxy) {
		var eventproxy = new Eventproxy();
		eventproxy.addListener('say-hello', function (name) {
			debug.info('hello:' + name);
		});

		eventproxy.trigger('say-hello', 'joel');
	    return {
	    	init : function ($wrap, header, body) {
	    		var $box = $(template);
	    		header && $box.find('.box-header').text(header);
	    		$wrap.html($box);
	    	}
	    };
});