// Bloque l'accès aux cours tant que la personne n'est pas inscrite
let inscrit = false;
try {
  inscrit = localStorage.getItem("learnprod_inscrit") === "oui";
} catch (e) {
  inscrit = false;
}

if (inscrit) {
  // Inscrit : on laisse le cours s'afficher normalement
} else {
  // Pas inscrit : on cache la page, on prévient, puis on envoie vers l'inscription
  document.documentElement.style.visibility = "hidden";
  alert("Inscris-toi gratuitement pour accéder aux cours.");
  window.location.replace("login.html");
}