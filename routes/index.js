var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',name:'kevin','age':19});
});
router.get('/getJSON',function(req,res,next){
	res.json({name:'kevin'});
})

module.exports = router;
