var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var config = require('./config/database');

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

app.get('/', function(req, res){
    
    res.send('Funcionando');

});


//iniciando o servidor
var porta = config.porta;
app.listen(porta, function(){
    console.log('servidor rodando na porta:' + porta);
});