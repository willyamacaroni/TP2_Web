/* eslint-disable semi */
'use strict'

const boutonSubmit = document.getElementById('form_submit');
const boutonRecommencer = document.getElementById('form_recommencer');
const resultatsAlcool = document.getElementById('resultats_alcool');

let consommations = [];
let resultats = {};
initialiser();

function initialiser () {
  consommations = [];
  resultats = {};
  document.getElementById('echec').style.display = 'block'
  document.getElementById('succes').style.display = 'block'
  resultatsAlcool.style.display = 'none';
}

function lancerAnalyse () {
  initialiser();
  const nbJoursAnalyser = parseInt(document.getElementById('form_nbJours').value);
  const nbPrompt = nbJoursAnalyser;
  if (nbPrompt) {
    for (let i = 0; i < nbPrompt; i++) {
      let message = `nombre de consommations consomé. (jour ${i+1})`
      consommations.push(parseInt(prompt(message)));
    }
  }
  calculsResultats();
  recommandations();
  calculRatioJoursExces(consommations);
  calculRatioSansAlcool(consommations);
  if (Math.max(...consommations) < resultats.recommandationJour) {
    resultats.respectRecommandations = 'Vous respectez les recommandations!'
    document.getElementById('echec').style.display = 'none';
  } else {
    resultats.respectRecommandations = 'Vous ne respectez pas les recommandations'
    document.getElementById('succes').style.display = 'none';
  }
  affichageResultats();
}

function calculsResultats () {
  const nbJoursAnalyser = parseInt(document.getElementById('form_nbJours').value);
  resultats = {
    nom: document.getElementById('form_nom').value,
    prenom: document.getElementById('form_prenom').value,
    sexe: document.getElementById('form_sexe').value,
    age: (calculAge(document.getElementById('form_dateNaissance').value)),
    nbJours: nbJoursAnalyser,
    nbSemainesComplete: Math.floor(nbJoursAnalyser / 7),
    moyenneParJour: (somme(consommations) / consommations.length),
    moyenneParSemaine: ((somme(consommations) / consommations.length) * 7),
    maxUneJournee: (Math.max(...consommations)),
    ratioJoursSansAlcool: null,
    ratioJoursExces: null,
    recommandationJour: null,
    recommandationSemaine: null
  }
}

function somme (leTableau) {
  return leTableau.reduce((a, b) => a + b, 0);
}

function calculAge (dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function recommandations () {
  if (resultats.sexe === 'Homme') {
    resultats.recommandationJour = 3;
    resultats.recommandationSemaine = 15;
  } else {
    resultats.recommandationJour = 2;
    resultats.recommandationSemaine = 10;
  }
}

function calculRatioSansAlcool (leTableau) {
  let joursSansAlcool = 0
  for (let i = 0; i < consommations.length; i++) {
    if (consommations[i] === 0) {
      joursSansAlcool++;
    }
  }
  const ratioJoursSansAlcool = joursSansAlcool / consommations.length
  resultats.ratioJoursSansAlcool = (Math.round(ratioJoursSansAlcool * 100) / 100);
}

function calculRatioJoursExces (leTableau) {
  let nbJoursExces = 0
  for (let i = 0; i < consommations.length; i++) {
    if (consommations[i] > resultats.recommandationJour) {
      nbJoursExces++;
    }
  }
  const ratioJoursExces = nbJoursExces / consommations.length
  resultats.ratioJoursExces = (Math.round(ratioJoursExces * 100) / 100);
}

function affichageResultats () {
  resultatsAlcool.getElementsByTagName('p')[0].innerHTML = `${resultats.nom}, ${resultats.prenom}<br/>
  Âge : ${resultats.age} ans<br/>
  Période : ${resultats.nbJours} jours Semaine(s) complète(s) : ${resultats.nbSemainesComplete}<br/>
  Moyenne par jour : ${resultats.moyenneParJour}<br/>
  Consommations sur une semaine : ${resultats.moyenneParSemaine} Recommandation : ${resultats.recommandationSemaine}<br/>
  Maximum en une journée : ${resultats.maxUneJournee} Recommandation : ${resultats.recommandationJour}<br/>
  Ratio de journée(s) excédante(s) : ${resultats.ratioJoursExces * 100}%<br/>
  Ratio de journée(s) sans alcool : ${resultats.ratioJoursSansAlcool * 100}%<br/>
  ${resultats.respectRecommandations}`;
  resultatsAlcool.style.display = 'block';
}

boutonSubmit.addEventListener('click', lancerAnalyse)
boutonRecommencer.addEventListener('click', initialiser)

