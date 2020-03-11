document.addEventListener("DOMContentLoaded", function(event) { //Ce code sera expliqué plus tard dans la session. 
    //Tout le code qui doit s'exécuter quand le chargement de la page est terminé
    document.getElementById("nom").innerHTML = prompt("Votre nom?")
    document.getElementById("date").innerHTML = Date(Date.now())
});
