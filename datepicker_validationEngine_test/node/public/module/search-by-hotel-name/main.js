define([
	'eventproxy'
	, 'lodash'
	, 'search-filter/main'
	, 'text!./filter.html'
	]
	, function(Eventproxy
		, _
		, searchFilter
		, filterTemp
	) {
		var SearchByHotelName = function (ep) {
			this.$input = $('#search-input');
			this.$searchBtn = $('#search-btn');

			var Search = searchFilter.Search;
			var Filter = searchFilter.Filter;

			var filter;
			var search;
			ep.all('filter-data-ready', _.bind(function (data) {
				if(data.success !== 1){
					debug.error('error');
				}
				filter = new Filter(
					{
						$el : $('.filter-items')
						, template :filterTemp
						, data : data.data
						, eventproxy : ep
					}
					, {
						onChangeConditon : function (evt) {
							var $clickedItem = $(evt.currentTarget);
							$clickedItem
								.closest('.filter-condition')
								.find('a')
								.removeClass('active');
							$clickedItem.addClass('active');
						}
						, calConditon : function ($el) {
							var condition = [];
							var $allCondition = $el.find('.filter-condition .active');
							$allCondition.each(function(){
								var $this = $(this);
								condition.push({
									name : $this.text()
									, id : $this.data('id')
								});
							});
							return condition;
						}
					}
				);

				search = new Search(
					{
						$input : this.$input
						, $searchBtn : this.$searchBtn
						, eventproxy : ep
						, filter : filter
					}
					, {
						doSearch : function  (data) {
							debug.info('search-text: ' + data.searchText);
							debug.info('filters', data.filters);
							ep.trigger('search-result-ready', [{
								'name' : '金茂一号'
							}]);
						}
						, onSearchResult : function (data) {
							debug.info('render search-result',data);
						}
					}
				);
			}, this));

		};

		SearchByHotelName.create = function (ep) {
			return new SearchByHotelName(ep);
		};

		return {
			'create' : SearchByHotelName.create
		}
	}
);
