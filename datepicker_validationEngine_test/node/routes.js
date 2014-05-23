var config = require('./config');
var indexPage = require('./controllers/index');

module.exports = function(app){
    //网站首页
    app.get('/', indexPage.render);
    // 酒店名称搜索页
    app.get('/search-name', function(req, res, next) {
    	res.render('search-name');
	});
	app.get('/a', function(req, res, next) {
    	res.render('commodity-warehousing');
	});
	app.get('/date', function(req, res, next) {
    	res.render('date_validation');
	});
};