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



//POST adicionar páginas
router.post('/add-page', function(req, res){
    
    req.checkBody('title', 'O título deve possuir algum valor').notEmpty();
    req.checkBody('content', 'O Conteúdo deve possuir algum valor').notEmpty();

    var title = req.body.title;
    var slug = req.body.slug.replace(/\s+/g, '-').toLowerCase();
   

    if (slug == "") slug = title.replace(/\s+/g, '-').toLowerCase();

    var content = req.body.content;

    var errors = req.validationErrors();

    if (errors){

        res.render('admin/add-page', {
            errors: errors,
            title: title,
            slug: slug,
            content: content
        });
    

    }else {

        console.log('Página cadastrada com sucesso');
    }



});



module.exports = router;