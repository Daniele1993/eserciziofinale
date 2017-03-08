var express = require('express');
var router = express.Router();
var listaUtenti = require('./db.json');
var jsonfile = require('jsonfile');
var path = require('path');


router.get('/',function(req,res){
    res.json(listaUtenti);
});

router.get('/id/:id',function(req,res){
    var id= req.params.id;
    
    var utente = listaUtenti.find(function(el){
        return el.Id == id;
    });
if(utente){
    res.status(200).json(utente);
}else{
    res.status(404).send("utente non trovato");
}

//res.status(200).json(utente);
});

router.get('/sesso',function(req,res){
    var sesso = req.query.sesso;
    var listaFiltrata = listaUtenti.filter(function(el){
        return el.Sesso == sesso;
    });
    if(listaFiltrata.length){
       res.status(200).json(listaFiltrata); 
    }else{
        res.status(404).send("nessun utente di sesso: " + sesso);
    }
});

router.get('/nome',function(req,res){
    var nome = req.query.nome;
    var listaFiltrata = listaUtenti.filter(function(el){
        return el.Nome == nome;
    });
    if(listaFiltrata.length){
        res.status(200).json(listaFiltrata);
    } else{
        res.status(400).send("nessun utente con nome:" + nome);
    } 
});

router.delete('/id/:id',function(req,res){
    var id = req.params.id;
    var utente = listaUtenti.find(function(el){
        return el.Id == id;
    });
    var indice = listaUtenti.indexOf(utente);
    listaUtenti.splice(indice,1);
    res.json(listaUtenti);
    jsonfile.writeFile(path.join(__dirname,"db.json"),listaUtenti,function(err){

    });
    //res.send("cancello :" + utente);
});

router.post('/',function(req,res){
  var nuovo = req.body;
  var max = 0;
  for(let i = 0; i<listaUtenti.length; i++){
    if(listaUtenti[i].Id>=max){
      max= listaUtenti[i].Id;
    };
  };
  //assegno un nuovo id
nuovo.Id =max +1;

//inserisco l'utente
listaUtenti.push(nuovo);
 console.log(listaUtenti);


//salvo su file
jsonfile.writeFile(path.join(__dirname,"db.json"),listaUtenti,
  function(err){
    
});

  //mando la nuova lista al client
  res.json(listaUtenti);

});

router.put('/id/:id',function(req,res){
    var id = req.params.id;
    var aggiornato = req.body;
    var vecchio = listaUtenti.find(function(el){
        return el.id == Id;
    });
    var indice = listaUtenti.indexOf(vecchio);
    listaUtenti.splice(indice,1,aggiornato);
   
    jsonfile.writeFile(path.join(__dirname,"db.json"),listaUtenti,
    function(err){
        console.log(err);
    });
});




module.exports = router;