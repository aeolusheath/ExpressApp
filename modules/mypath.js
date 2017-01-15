
/*
 * mypath.js
 * 
 *
 */
var path = require('path');
var logger = __logService;

var ROOTPATH = 'apps';

/**
 * 本函数过滤aPath中apps之前的部分
 * @param aPath
 * @returns {string}
 */
function appName(aPath) {
    var pathArray = aPath.split(path.sep);
    while (pathArray.length && pathArray.shift() !== ROOTPATH);
    if (pathArray.length == 0) {
        logger.fatal("This is not a controller!");
        throw "Path " + aPath + " is not a valid app path!";
    }

    return pathArray.join('/');
}

exports.getAppName = appName;
exports.getModelName = appName;