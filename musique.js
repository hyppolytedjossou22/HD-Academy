// musique.js : musique de fond qui continue d'une page à l'autre
const FICHIER = "Harmonic_Universe(0).mp3"; // ← remplace par le nom de ton fichier audio

// Dans le dossier "cours", il faut remonter d'un dossier pour trouver le fichier
const dansCours = location.pathname.indexOf("/cours/") !== -1;
const musique = new Audio((dansCours ? "../" : "") + FICHIER);
musique.loop = true;     // recommence automatiquement
musique.volume = 0.4;    // volume doux (de 0 à 1)

// La personne a-t-elle déjà coupé le son ?
let coupee = false;
try { coupee = localStorage.getItem("musique_coupee") === "oui"; } catch (e) {}

// Reprendre là où la musique s'était arrêtée sur la page précédente
try {
  const temps = parseFloat(sessionStorage.getItem("musique_temps"));
  if (temps) {
    musique.addEventListener("loadedmetadata", function () {
      musique.currentTime = temps % musique.duration;
    });
  }
} catch (e) {}

window.addEventListener("pagehide", function () {
  try { sessionStorage.setItem("musique_temps", musique.currentTime); } catch (e) {}
});

// Les navigateurs interdisent le son avant un premier geste (clic, touche, toucher)
function demarrerAuPremierGeste() {
  if (!coupee) musique.play();
}
function lancer() {
  if (coupee) return;
  musique.play().catch(function () {
    ["pointerdown", "keydown", "touchstart"].forEach(function (evt) {
      window.addEventListener(evt, demarrerAuPremierGeste, { once: true });
    });
  });
}

// Bouton pour couper / remettre le son
const bouton = document.createElement("button");
bouton.type = "button";
bouton.style.cssText = "position:fixed;bottom:16px;right:16px;z-index:9999;padding:10px 14px;border:none;border-radius:999px;background:#10233f;color:#fff;font:600 14px Arial,sans-serif;cursor:pointer;";
function majBouton() {
  bouton.textContent = coupee ? "Son : coupé" : "Son : activé";
  bouton.setAttribute("aria-label", coupee ? "Activer la musique" : "Couper la musique");
}
bouton.addEventListener("click", function () {
  coupee = !coupee;
  try { localStorage.setItem("musique_coupee", coupee ? "oui" : "non"); } catch (e) {}
  if (coupee) { musique.pause(); } else { musique.play(); }
  majBouton();
});

majBouton();
document.body.appendChild(bouton);
lancer();