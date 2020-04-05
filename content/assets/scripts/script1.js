/* eslint-disable semi */
'use strict'
let consommations = [];
let res = {};

function lancerAnalyse () {
  const nbJoursAnalyser = document.getElementById('nbJours')
  const nbPrompt = nbJoursAnalyser.value;
  if (nbPrompt) {
    for (let i = 0; i < nbPrompt; i++) {
      consommations.push(parseInt(prompt('nombre de consommations consomé')));
    }
  }
}




/*
document.addEventListener('DOMContentLoaded', function (event) { // Ce code sera expliqué plus tard dans la session. 
  // Tout le code qui doit s'exécuter quand le chargement de la page est terminé
  document.getElementById('nom').innerHTML = prompt('votre nom?');
  document.getElementById('date').innerHTML = Date(Date.now());
});
*/

