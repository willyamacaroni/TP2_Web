/* eslint-disable semi */
'use strict'
let resultats = {};
let donneesFruitsLegumes = [];
let donneesExercise = [];
let nbJour = 0;
let nbJoursSuccesFruitsLegumes = 0;
let nbJoursSuccesExercise = 0;
document.getElementById('alerteSucces').classList.remove('alert-success')
document.getElementById('alerteSucces').classList.remove('alert-danger')
do {
  nbJour++;
  let message = `Combien de fruits et légumes avez-vous consommé au jour ${nbJour}`;
  let reponse = parseInt(prompt(message));
  donneesFruitsLegumes.push(reponse);
  if (reponse >= 30) {
    nbJoursSuccesFruitsLegumes++
  }
  message = `Combien de minutes d'exercise avez-vous fait au jour ${nbJour}`;
  reponse = parseInt(prompt(message));
  donneesExercise.push(reponse);
  if (reponse >= 30) {
    nbJoursSuccesExercise++
  }
  message = `Voulez vous poursuivre au jour ${nbJour + 1}? Sinon, entrez "stop" pour arrêter`;
  reponse = prompt(message);
  if (reponse.toUpperCase() === 'STOP') {
    break;
  }
}
while (true);

resultats = {
  moyenneFruitsLegumes: (somme(donneesFruitsLegumes) / donneesFruitsLegumes.length),
  minimumFruitsLegumes: (Math.min(...donneesFruitsLegumes)),
  ratioSuccesFruitsLegumes: (nbJoursSuccesFruitsLegumes / donneesFruitsLegumes.length),
  moyenneMinutesExercise: (somme(donneesFruitsLegumes) / donneesFruitsLegumes.length),
  minimumMinutesExercise: (Math.min(...donneesExercise)),
  ratioSuccesMinutesExercise: (nbJoursSuccesExercise / donneesExercise.length)
}

afficherResultats();

/**
 * renvoie la somme d'un tableau
 * @param {*} leTableau Le tableau dont on veut la somme
 * @returns Le tableau qui a été envoyer en paramètre
 */
function somme (leTableau) {
  let somme = (leTableau.reduce((a, b) => a + b, 0));
  return somme;
}

/**
 *
 *Affiche les résultats
 */
function afficherResultats () {
  document.getElementById('nbJours').innerHTML = `nombre de jours: ${nbJour}`;
  document.getElementById('resultatsFruitsETLegumes').innerHTML = `Moyenne de fruit(s) et légume(s) par jour : ${resultats.moyenneFruitsLegumes.toFixed(2)}<br />
  Minimum de fruit(s) et légume(s) par jour : ${resultats.minimumFruitsLegumes}<br />
  Ratio des journées respectant le défi : ${(resultats.ratioSuccesFruitsLegumes * 100).toFixed(2)}%<br />`;
  for (let i = 0; i < nbJour; i++) {
    document.getElementById('resultatsFruitsETLegumes').innerHTML += `Jour ${i + 1}: ${donneesFruitsLegumes[i]} <br />`;
  }
  document.getElementById('resultatsExercise').innerHTML = `Moyenne de minute(s) d'exercice par jour : ${resultats.moyenneMinutesExercise.toFixed(2)}<br />
  Minimum de minute(s) d'exercice par jour : ${resultats.minimumMinutesExercise}<br />
  Ratio des journées respectant le défi : ${(resultats.ratioSuccesMinutesExercise * 100).toFixed(2)}%<br />`;
  for (let i = 0; i < nbJour; i++) {
    document.getElementById('resultatsExercise').innerHTML += `Jour ${i + 1}: ${donneesExercise[i]} <br />`;
  }
  if ((resultats.ratioSuccesFruitsLegumes * 100 > 60) && (resultats.ratioSuccesMinutesExercise * 100 > 60)) {
    document.getElementById('texteAlerteSucces').innerHTML = 'Succès du défi!';
    document.getElementById('alerteSucces').classList.add('alert-success');
  } else {
    document.getElementById('texteAlerteSucces').innerHTML = 'Échec du défi!';
    document.getElementById('alerteSucces').classList.add('alert-danger');
  }
}
