var express = require('express');
var path = require('path');

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
var porta = 3000;
app.listen(porta, function(){
    console.log('servidor rodando na porta:' + porta);
});