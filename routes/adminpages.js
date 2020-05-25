var express = require('express');

router = express.Router();


//GET index
router.get('/', function(req, res){
    
   

    res.send('Página administrativa');

});




//GET adicionar páginas
router.get('/add-page', function(req, res){
    
    var title = "";
    var slug = "";
    var content = "";

    res.render('admin/add-page', {
        title: title,
        slug: slug,
        content: content
    });


});




module.exports = router;