require(['./vendor/lodash.min','alert/main']
	, function(_, alert) {
    $(document).ready(function () {
    	alert.init($('#alert-box-wrap'));
		// $.ajax({
		// 	url : '/rs/cities'
		// 	, dataType: 'json'
		// }).done(function(data){
		// 	console.log(data);
		// });
	});
});
