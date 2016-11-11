(function($){
  var socket = io.connect('http://localhost:1337');

  window.onload = function() {
    socket.emit('initialCharg', {name : 1});
  };



/*  socket.on('TousLivres', function(livre){

    alert(livre);
    var objNew = { name: user.livre, auteur: user.auteur, annee : user.annee, categorie : user.categorie, resume : user.resume };

  });*/
  socket.on('TousLivres', function(livres){

        for (var i = 0; i < livres.lesLivres.length; i++) {
        var $newdiv1 = $( "<div id='block'><h1><strong>" + livres.lesLivres[i].name + "</strong></h1>" +
        "<p><strong>Auteur : </strong>"+ livres.lesLivres[i].auteur + "</p>" +
        "<p><strong>Annee : </strong>" + livres.lesLivres[i].annee+ "</p>" +
        "<p><strong>Categorie : </strong>" + livres.lesLivres[i].categorie +  "</p>"  +
        "<p class='resume'><strong>Resume : </strong>" + livres.lesLivres[i].resume + "</p></div>" );
        $( "body" ).append( $newdiv1 );
        $( "#blockt" ).before($newdiv1);
        }
    });








socket.on('newLivre', function(livres){

      //alert('Hey');
      var $newdiv1 = $( "<div id='block'><h1><strong>" + livres.name + "</strong></h1>" +
      "<p><strong>Auteur : </strong>"+ livres.auteur + "</p>" +
      "<p><strong>Annee : </strong>" + livres.annee+ "</p>" +
      "<p><strong>Categorie : </strong>" + livres.categorie +  "</p>"  +
      "<p class='resume'><strong>Resume : </strong>" + livres.resume + "</p></div>" );
      $( "body" ).append( $newdiv1 );
      $( "#blockt" ).before($newdiv1);

  });




  $("#button").click(function(event){
    event.preventDefault();
    socket.emit('transmission', {
      auteur : document.getElementById("formAuteur").value ,
      livre : document.getElementById("formTitle").value,
      annee : document.getElementById("formAnnee").value,
      categorie : document.getElementById("formCategorie").value,
      resume : document.getElementById("formResume").value
    });
  });

})(jQuery);



/*$(window).load(function(){
  socket.emit('initialCharg', {name : 1});
  alert('hhh');
});*/
