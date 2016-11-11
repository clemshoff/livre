var http = require('http');


var express = require('express');
var app = express();
var path = require('path');

httpServer = http.createServer(app);
httpServer.listen(1337);

var io = require('socket.io').listen(httpServer);


app.use(express.static(__dirname + '/public'));
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/*var EventEmitter = require('events').EventEmitter;
var livreCharg = new EventEmitter();

livreCharg.on('livreCharg', function(){
    console.log(message);
});*/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/test', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var databaseConnection ;
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient ;
var url = 'mongodb://localhost/livre' ;

MongoClient.connect(url, function(error, db){
    if (error) throw error;
  console.log("Connecté à la base de données 'livre'");
  databaseConnection = db ;

  //databaseConnection.collection("livre").find().toArray(function (error, results) {
  //    if (error) throw error;
    //  console.log("Recherhce dans 'livre'");
    //  console.log(results);
  //  });

      /* results.forEach(function(err,results){
          console.log(results._id);
       });*/


});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {

  res.sendFile(__dirname + "/Public/" + 'index.html');
  console.log('index');
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




io.sockets.on('connection', function(socket){
  console.log('new user');



socket.on('initialCharg', function(user){
  var lesLivres ;
  databaseConnection.collection("livre").find().toArray(function (error, results) {
        if (error) throw error;
        console.log("Recherhce dans 'livre'");
        console.log(results[1].name);
        lesLivres = results ;
        console.log(lesLivres.length);
        socket.emit('TousLivres', { lesLivres} );
  });
});





  socket.on('transmission', function(user){
    console.log(user);
    console.log(user.auteur);
    var objNew = { name: user.livre, auteur: user.auteur, annee : user.annee, categorie : user.categorie, resume : user.resume };
    databaseConnection.collection("livre").insert(objNew, null, function (error, results) {
      if (error) throw error;

      console.log("Le document a bien été inséré");
      socket.emit('newLivre', { name: user.livre, auteur: user.auteur, annee : user.annee, categorie : user.categorie, resume : user.resume } );
    });
  });
});
