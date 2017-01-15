



module.exports=function(app){
    var logger = __logService,
        myPath = require(custom_modules + "/mypath"),
        APPNAME = myPath.getAppName(__dirname),
        APPURL = "/" ;

    //write your url
    app.get('/',function(req,res,next){
    	 logger.enter();
 		 res.render('index', { title: 'Express',name:'kevin','age':19});

    });

};