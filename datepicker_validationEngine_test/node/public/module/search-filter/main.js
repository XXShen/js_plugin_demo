define([
		'lodash'
		, 'css!./filter.css'
	]
	, function (_) {
		var Filter = function (param, callbacks) {
			if(this.isInitParamValid(param, callbacks)){
				this.condition = [];
				_.extend(this, param);
				this.callbacks = callbacks;

				// render
				var html = _.template(param.template, {data:param.data});
				this.$el.html(html);

				// bind events
				this.$el.on('click', '.filter-condition a', _.bind(this.onChangeConditon, this));
			}
		};

		Filter.prototype.isInitParamValid = function (param, callbacks) {
			if(!validTools.notEmpty$(param.$el, '$el')){
				return false;
			}
			if(!validTools.notEmpty$(param.template, 'template')){
				return false;
			}
			if(!validTools.notUndefined(param.eventproxy, 'eventproxy')){
				return false;
			}
			if(!validTools.notUndefined(callbacks, 'callbacks')){
				return false;
			}
			return true;
		};

		Filter.prototype.getCondition = function () {
			return this.condition;
		};

		Filter.prototype.onChangeConditon = function (evt) {
			this.callbacks.onChangeConditon(evt);
			this.calConditon();
		};

		Filter.prototype.calConditon = function () {
			this.condition = this.callbacks.calConditon(this.$el);
			this.eventproxy.trigger('condition-change');
		};

		var Search = function (param, callbacks) {
			if(this.isInitParamValid(param, callbacks)){
				_.extend(this, param);
				_.extend(this, callbacks);
				this.$searchBtn.click(_.bind(this.onSearch, this));
				this.eventproxy.addListener('condition-change', _.bind(this.onSearch, this));
				this.eventproxy.addListener('search', _.bind(this.doSearch, this));
				this.eventproxy.addListener('search-result-ready', _.bind(this.onSearchResult, this));
			}
		};

		Search.prototype.isInitParamValid = function(param, callbacks) {
			if(!validTools.notEmpty$(param.$input, '$el')){
				return false;
			}

			if(!validTools.notEmpty$(param.$searchBtn, '$searchBtn')){
				return false;
			}

			if(!validTools.notUndefined(callbacks, 'callbacks')){
				return false;
			}

			if(!validTools.notUndefined(callbacks.doSearch, 'doSearch')){
				return false;
			}

			return true;
		};

		Search.prototype.onSearch = function () {
			var searchText = $.trim(this.$input.val());
			var filters = this.filter.getCondition();
			this.eventproxy.trigger('search', {
				searchText : searchText
				, filters : filters
			});
		};

		Search.prototype.doSearch = function (data) {
			this.callbacks.doSearch(data);
		};

		Search.prototype.onSearchResult = function (data) {
			this.callbacks.onSearchResult(data);
		};

	    return {
	    	Search : Search
	    	, Filter : Filter
	    };
});