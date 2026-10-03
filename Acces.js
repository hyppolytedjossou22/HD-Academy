// Bloque l'accès aux cours tant que la personne n'est pas inscrite
let inscrit = false;
try {
  inscrit = localStorage.getItem("HD-Academy_inscrit") === "oui";
} catch (e) {
  inscrit = false;
}

if (!inscrit) {
  // Pas inscrit : on cache la page, on prévient, puis on envoie vers l'inscription
  document.documentElement.style.visibility = "hidden";
  alert("Inscris-toi gratuitement pour accéder aux cours.");
  window.location.replace("login.html");
}
