// Se lance quand la personne clique sur "Créez votre compte"
const formulaire = document.getElementById("loginForm");
const message = document.getElementById("message");

formulaire.addEventListener("submit", function (e) {
  e.preventDefault(); // empêche la page de se recharger

  const prenom = document.getElementById("prenom").value.trim();
  const mdp = document.getElementById("mdp").value;
  const confirmation = document.getElementById("mdp2").value;

  if (mdp.length < 6) {
    message.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
    return;
  }
  if (mdp !== confirmation) {
    message.textContent = "Les deux mots de passe ne sont pas identiques.";
    return;
  }

  // On retient seulement que la personne est inscrite (jamais le mot de passe)
  try {
    localStorage.setItem("learnprod_inscrit", "oui");
    localStorage.setItem("learnprod_prenom", prenom);
  } catch (err) {
    message.textContent = "Impossible d'enregistrer l'inscription sur cet appareil.";
    return;
  }

  window.location.href = "index.html";
});
