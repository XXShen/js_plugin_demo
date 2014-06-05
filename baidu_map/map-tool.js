(function(win) {
    var defaultOpt = {
        enableDragging: true,
        enableScrollWheelZoom: true,
        enableDoubleClickZoom: true,
        enableKeyboard: true,
        zoomLevel: 15
    };

    function SuperMap(map, opt) {
        this.map = map;
        this.opt = opt;
    };

    SuperMap.prototype.getMap = function() {
        return this.map;
    };

    SuperMap.prototype.getOpt = function() {
        return this.opt;
    };

	//todo 控件的位置和是否打开的配置
    // 导航控件
    SuperMap.prototype.addNavigationControl = function() {
        var ctrl_nav = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
        });
        this.map.addControl(ctrl_nav);
    };

    // 缩略图控件
    SuperMap.prototype.addOverviewControl = function() {
        var ctrl_ove = new BMap.OverviewMapControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            isOpen: true
        });
        this.map.addControl(ctrl_ove);
    };

    // 添加比例尺控件
    SuperMap.prototype.addScaleControl = function() {
        var ctrl_sca = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        this.map.addControl(ctrl_sca);
    };

    SuperMap.prototype.createLabel = function(text, offset){
    	if(!text){
    		throw 'text needed';
    	}
    	if(!offset){
    		throw 'offset needed';
    	}
    	return new BMap.Label(text, {
    		offset: new BMap.Size(offset.x, offset.y)
    	});
    };

	//钉在地图上的那个东西
    SuperMap.prototype.createMarker = function(point, icon){
    	if(!point){
    		throw 'point needed';
    	}
    	var baiduPoint = new BMap.Point(point.x, point.y);
    	var marker = new BMap.Marker(baiduPoint, icon && {
            icon: icon
        });
    	return marker;
    };

	SuperMap.prototype.createIcon = function(url, size, offset) {
	    var icon = new BMap.Icon(url, new BMap.Size(size.width, size.height));
	    return icon;
	};

	SuperMap.prototype.createInfoWindow = function(text) {
		var infoWindow = new BMap.InfoWindow(text);
		return infoWindow;
	};

    SuperMap.create = function(id, centerPoint, opt) {
        opt = $.extend({}, defaultOpt, opt);
        if (!SuperMap.valid(id, centerPoint, opt)) {
            return;
        }
        var map = new BMap.Map(id);
        map.centerAndZoom(centerPoint, opt.zoomLevel);
        opt.enableDragging && map.enableDragging();
        opt.enableScrollWheelZoom && map.enableScrollWheelZoom();
        opt.enableDoubleClickZoom && map.enableDoubleClickZoom();
        opt.enableKeyboard && map.enableKeyboard();
        var superMap = new SuperMap(map, opt);
        return superMap;
    };

    SuperMap.valid = function(id, centerPoint, opt) {
        if (id === undefined) {
            throw 'id needed!'
        }
        if (centerPoint === undefined) {
            throw 'centerPoint needed!'
        }
        return true;
    };

    win.SuperMap = SuperMap;
})(window);
