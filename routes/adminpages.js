var express = require('express');

var router = express.Router();

//Importando o model de pages
var Page = require('../models/page');


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

        Page.findOne({slug: slug}, function(err, page){
            if (page){
                req.flash('danger', 'Essa página existe escolha outra');
                res.render('admin/add-page', {
                    title: title,
                    slug: slug,
                    content: content
                });
            } else{
                var page = new Page({
                    title: title,
                    slug: slug,
                    content: content,
                    sorting: 0
                });

                page.save(function(err){
                    if (err) return console.log(err);
                    req.flash('sucess', 'Página salva com sucesso');
                    res.redirect('/admin/pages');
                });
            }
        });
        console.log('Página cadastrada com sucesso');
    }



});



module.exports = router;