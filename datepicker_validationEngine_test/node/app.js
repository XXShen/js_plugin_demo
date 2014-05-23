var express = require('express');
var app = express();
var partials = require('express-partials');
var routes = require('./routes');
var config = require('./config');
var util = require('./lib/util');
var logger = util.logger;


app.configure(function() {
    app.use(express.compress()); //gzip / deflate。放在前面来保证后面的内容被压缩

    app.use(partials()); //使用  partials，为了使用 layout express 3.X不支持 ejs的layout
    app.set('views', __dirname + '/views'); //设置模板路径，比如index.jade
    app.engine('.html', require('ejs').__express);
    app.set('view engine', 'html'); //配置模板解析引擎

    //由于Session需要加密session_id，所以一定要传入一个密钥字符串（任意）来加密
    app.use(express.cookieParser());

    //以下两行 与app.use(express.bodyParser());  https://github.com/senchalabs/connect/wiki/Connect-3.0
    app.use(express.urlencoded());
    app.use(express.json());

    //全局错误处理，不让服务器停掉
    app.use(function(err, req, res, next) {
        console.error(err.stack);
        res.send(500, {
            error: 'something error happen'
        });
        logger.error('unknow error :' + err);
    });

    process.on('exit', function() {
        logger.error('node exit!!!');
    });


});


// 定义开发环境
app.configure('development', function() {
    //静态服务器
    app.use('/public', express.static(__dirname + '/public'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

// 定义生产环境
app.configure('production', function() {
    var oneYear = 31557600000;
    app.use('/public', express.static(__dirname + '/public', {
        maxAge: oneYear
    }));
    app.use(express.errorHandler());
});

routes(app);

app.listen(config.port, function() {
    logger.info("dcai100-admin listening on port %d in %s mode", config.port, app.settings.env); //app.settings.env 模式 
});