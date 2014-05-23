var config = require('../config');
var logFilePath = config.logFilePath;
var log4js = require('log4js');
var logger = log4js.getLogger();
var fs = require('fs');
if(!fs.existsSync(logFilePath)) {
    fs.mkdirSync(logFilePath);
}
log4js.configure({
  "maxLogSize": 20480,
  "backups": 3,
  appenders: [
    { type: 'console' },
    { type: 'file', filename: logFilePath + '/log.log' }
  ]
});

module.exports.logger = logger;


