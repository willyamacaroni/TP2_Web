/* eslint-disable semi */
'use strict'
document.addEventListener('DOMContentLoaded', function (event) { // Ce code sera expliqué plus tard dans la session. 
  // Tout le code qui doit s'exécuter quand le chargement de la page est terminé
  document.getElementById('bouton').addEventListener('click', lancerDés)
});

function lancerDés () {
  document.getElementById('dé1').innerHTML = Math.ceil(Math.random() * 6)
  document.getElementById('dé2').innerHTML = Math.ceil(Math.random() * 6)
}