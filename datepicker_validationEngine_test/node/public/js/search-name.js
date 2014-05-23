require([
	'eventproxy'
	, 'search-by-hotel-name/main'
	]
	, function(Eventproxy, SearchByHotelName) {
	    $(document).ready(function () {
			var ep = new Eventproxy();
	    	SearchByHotelName.create(ep);

	    	ep.trigger('filter-data-ready',{
				success : 1
				, data : [
				[
					{
						id : 'zone-0'
						, name : '不限'
					}
					, {
						id : 'zone-1'
						, name : '观前'
					}
					, {
						id : 'zone-2'
						, name : '石路'
					}
					, {
						id : 'zone-3'
						, name : '圆融时代广场'
					}
				]
				, [
					{
						id : 'food-0'
						, name : '不限'
					}
					, {
						id : 'food-1'
						, name : '川菜'
					}
					, {
						id : 'food-2'
						, name : '湘菜'
					}
					, {
						id : 'food-3'
						, name : '苏帮菜'
					}
				]
				]
			});
		});
	}
);
