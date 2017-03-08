var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const PORT = 3001;

app.use(bodyParser.json());


// servo la index.html
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,"..","client","index.html"));
});

// servo utenti 
var utenti = require('./cartella utenti/utenti.js');
app.use('/users',utenti)

app.listen(PORT,function(){
    console.log('server start at http://localhost:' + PORT);
});