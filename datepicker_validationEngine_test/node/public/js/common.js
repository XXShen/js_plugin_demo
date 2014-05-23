// requirejs config
require.config({
	baseUrl: '/public'
	, paths: {
		'eventproxy' : 'vendor/eventproxy'
		, 'lodash' : 'vendor/lodash.min'
		, 'search-filter' : 'module/search-filter'
		, 'search-by-hotel-name' : 'module/search-by-hotel-name'
		, 'alert' : 'module/alert'
	}
	, map: {
		'*': {
		    'css': 'vendor/require-css'
		    , 'text': 'vendor/require-text'
	  	}
	}
});

$.ajaxSetup({
	headers : {
		accept: "application/json; charset=utf-8"
	}
});

!(function (ctx, undef) {
	ctx.validTools = ctx.validTools || {};
	var validTools = ctx.validTools;
	validTools.notUndefined = function  (obj, name) {
		if(obj === undef){
			debug.error(name + ' needed!');
		}
		return true;
	};

	validTools.notEmpty$ = function ($el, name) {
		if(!$el || $el.length === 0){
			debug.error(name + ' need not jquery obj!');
			return false;
		}
		return true;
	};
})(window , undefined);
