var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');

//conectando ao db
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Conectado ao banco');
});


// iniciando o app
var app = express();

//setando pasta de views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Diretório público
app.use(express.static(path.join(__dirname, 'public')));

//Add body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Express Session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
//  cookie: { secure: true }
}));

// Express Validator middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
                , root = namespace.shift()
                , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    },
    customValidators: {
        isImage: function (value, filename) {
            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                case '':
                    return '.jpg';
                default:
                    return false;
            }
        }
    }
}));

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});






//Setar as rotas
var pages = require('./routes/pages.js');
var adminpages = require('./routes/adminpages.js')

app.use('/', pages);
app.use('/admin/pages', adminpages);


//iniciando o servidor
var porta = config.porta;
app.listen(porta, function(){
    console.log('servidor rodando na porta:' + porta);
});