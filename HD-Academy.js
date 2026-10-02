gsap.registerPlugin(ScrollTrigger);

    // ===== 3. LA SCÈNE 3D =====
    const canvas = document.getElementById("scene");
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 7;

    // Lumières : une douce partout, une plus forte d'un côté
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const lumiere = new THREE.DirectionalLight(0xffffff, 1);
    lumiere.position.set(3, 4, 5);
    scene.add(lumiere);

    // L'objet : un groupe de trois formes qui représentent un "réseau de neurones"
    const objet = new THREE.Group();
    scene.add(objet);

    const forme = new THREE.IcosahedronGeometry(1.8, 1);

    // 1) La structure en fil de fer
    const fil = new THREE.Mesh(
      forme,
      new THREE.MeshBasicMaterial({ color: 0x008751, wireframe: true })
    );
    objet.add(fil);

    // 2) Les "neurones" : un point sur chaque sommet
    const points = new THREE.Points(
      forme,
      new THREE.PointsMaterial({ color: 0x102fff, size: 0.09 })
    );
    objet.add(points);

    // 3) Le noyau plein au centre
    const noyau = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.8, 0),
      new THREE.MeshStandardMaterial({ color: 0xe8112d, flatShading: true })
    );
    objet.add(noyau);

    // Adapter la taille au navigateur
    function redimensionner() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", redimensionner);
    redimensionner();

    // ===== 4. LIER LA 3D AU SCROLL =====
    // "etat" contient les valeurs animées. GSAP les fait évoluer selon le scroll.
    const petitEcran = () => window.innerWidth < 700;
    const etat = { x: petitEcran() ? 0 : 2.6, z: 7, rotation: 0, couleur: 0 };

    const reduireMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Une seule timeline qui suit toute la page (scrub = lié au scroll)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "main",
        start: "top top",
        end: "bottom bottom",
        scrub: reduireMouvement ? true : 1.2
      }
    });
    const dx = () => (petitEcran() ? 0 : 2.6);

    tl.to(etat, { x: -dx(), z: 5.5, rotation: 1.6, couleur: 1 })   // section 2 : objet à gauche
      .to(etat, { x:  dx(), z: 6.5, rotation: 3.2, couleur: 2 })   // section 3 : objet à droite
      .to(etat, { x: -dx(), z: 4.8, rotation: 4.8, couleur: 3 })   // section 4 : objet à gauche
      .to(etat, { x: 0,     z: 9,   rotation: 6.4, couleur: 4 });  // fin : il s'éloigne au centre

    // Couleurs du drapeau béninois + bleu nuit, qui changent au fil des sections
    const palette = [0x008751, 0xe8112d, 0x10233f, 0x008751, 0xe8112d].map(c => new THREE.Color(c));
    const couleurActuelle = new THREE.Color();

    // ===== 5. BOUCLE D'ANIMATION =====
    function animer() {
      // Mélange entre deux couleurs voisines de la palette
      const i = Math.min(Math.floor(etat.couleur), palette.length - 2);
      couleurActuelle.copy(palette[i]).lerp(palette[i + 1], etat.couleur - i);
      fil.material.color.copy(couleurActuelle);

      // Position et taille selon le scroll
      objet.position.x = etat.x;
      camera.position.z = etat.z;
      objet.rotation.y = etat.rotation;

      // Petite rotation continue en plus (coupée si l'utilisateur demande moins de mouvement)
      if (!reduireMouvement) {
        objet.rotation.x += 0.002;
        noyau.rotation.y -= 0.01;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animer);
    }
    animer();

      window.addEventListener('click', function() {
      let son = document.getElementById('Bienvenue');
      son.play();
      },{once:true});
      console.log("Clique n'importe ou pour entendre le son");