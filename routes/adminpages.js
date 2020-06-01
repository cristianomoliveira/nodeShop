var express = require('express');

var router = express.Router();

//Importando o model de pages
var Page = require('../models/page');


//GET index
router.get('/', function(req, res){

    Page.find({}).sort({sorting: 1}).exec(function(err, pages){

        res.render('admin/pages', {
            pages:pages
        });
    
    });
    
   
    
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
                    sorting: 100
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






// Sort pages function
function sortPages(ids, callback) {
    var count = 0;

    for (var i = 0; i < ids.length; i++) {
        var id = ids[i];
        count++;

        (function (count) {
            Page.findById(id, function (err, page) {
                page.sorting = count;
                page.save(function (err) {
                    if (err)
                        return console.log(err);
                    ++count;
                    if (count >= ids.length) {
                        callback();
                    }
                });
            });
        })(count);

    }
}

/*
 * POST reorder pages
 */
router.post('/reorder-pages', function (req, res) {
    var ids = req.body['id[]'];

    sortPages(ids, function () {
        Page.find({}).sort({sorting: 1}).exec(function (err, pages) {
            if (err) {
                console.log(err);
            } else {
                req.app.locals.pages = pages;
            }
        });
    });

});



//GET editar páginas
router.get('/edit-page/:slug', function(req, res){
    
   Page.findOne({slug: req.params.slug}, function(err, page){

        if (err) 
            return console.log(err);



        res.render('admin/edit-page', {
            title: page.title,
            slug: page.slug,
            content: page.content,
            id: page._id
        });

    });

   


});

   



module.exports = router;