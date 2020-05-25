var express = require('express');

router = express.Router();


router.get('/', function(req, res){
    
    res.render('index',{
        title:'Admin da Minha Loja'
    });

    //res.send('admin');

});



module.exports = router;