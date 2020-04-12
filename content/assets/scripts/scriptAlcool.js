/* eslint-disable semi */
'use strict'

const boutonSubmit = document.getElementById('form_submit');
const boutonRecommencer = document.getElementById('form_recommencer');
const resultatsAlcool = document.getElementById('resultats_alcool');

let consommations = [];
let resultats = {};
initialiser();

/**
 *
 * Réinitialise le tableau de consommations, l'objet résultats, les alertes et la section "resultatsAlcool" à leur valeurs initiale.
 */
function initialiser () {
  consommations = [];
  resultats = {};
  document.getElementById('echec').style.display = 'block'
  document.getElementById('succes').style.display = 'block'
  resultatsAlcool.style.display = 'none';
}

/**
 *
 * Lance l'analyse
 */
function lancerAnalyse () {
  initialiser();
  const nbJoursAnalyser = parseInt(document.getElementById('form_nbJours').value);
  const nbPrompt = nbJoursAnalyser;
  if (nbPrompt) {
    for (let i = 0; i < nbPrompt; i++) {
      let message = `nombre de consommations consomé. (jour ${i + 1})`
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

/**
 *
 * Effectue les calculs et insère les résultats dans l'objet "résultats"
 */
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

/**
 * renvoie la somme d'un tableau
 * @param {*} leTableau Le tableau dont on veut la somme
 * @returns Le tableau qui a été envoyer en paramètre
 */
function somme (leTableau) {
  return leTableau.reduce((a, b) => a + b, 0);
}

/**
 *
 * Calcul l'age à partir de la date de naissance
 * @param {*} dateNaissance La date de naissance de la personne dont on veut connaitre l'âge
 * @returns retourne un nombre qui est l'age de la personne
 */
function calculAge (dateNaissance) {
  var ajd = new Date();
  var age = ajd.getFullYear() - dateNaissance.getFullYear();
  var m = ajd.getMonth() - dateNaissance.getMonth();
  if (m < 0 || (m === 0 && ajd.getDate() < dateNaissance.getDate())) {
    age--;
  }
  return age;
}

/**
 *détermine les recommandations d'éduc'alcool dépendamment du sexe de la personne
 *
 */
function recommandations () {
  if (resultats.sexe === 'Homme') {
    resultats.recommandationJour = 3;
    resultats.recommandationSemaine = 15;
  } else {
    resultats.recommandationJour = 2;
    resultats.recommandationSemaine = 10;
  }
}

/**
 *
 * Détermine le nombre de jours sans alcool et fait une moyenne pour le nombre de jours total.
 * @param {*} leTableau Le tableau de consommations remplis lors du chargement de la page.
 */
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

/**
 *
 * Fait le calcul pour déterminer le nombre de jours où le nb de consommations de l'utilisateur cette journée là
 * dépassse la recommendation d'éduc'alcool
 * @param {*} leTableau  Le tableau de consommations remplis lors du chargement de la page.
 */
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

/**
 *
 * Affiche les résultats
 */
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

