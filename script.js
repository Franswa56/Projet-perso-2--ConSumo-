
let score = 0
// Récupération du canvas et du contexte de rendu
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Définition de la taille du canvas
canvas.width = 900;
canvas.height = 600;

// Sources des images
const imageSources = {
  sumo: 'assets/sumo.png',
  terrain: 'assets/terrain.png',
  sumoBack: 'assets/sumo-back.png',
  sumoLeft: 'assets/sumo-left.png',
  sumoRight: 'assets/sumo-right.png',
  fish: 'assets/fish.png',

};

// Images chargées
const images = {};
let imagesLoaded = 0;
const totalImages = Object.keys(imageSources).length;

// Position initiale du sumo
let sumoX = canvas.width / 2;
let sumoY = canvas.height / 2;

// États des touches
const keysPressed = {};
// Vitesse de déplacement
const speed = 2;

// Charge et surveille le chargement de toutes les images
Object.keys(imageSources).forEach(key => {
  images[key] = new Image();
  images[key].onload = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      gameLoop(); // Toutes les images sont chargées, commence le jeu
    }
  };
  images[key].src = imageSources[key];
});

// Fonctions de dessin
function drawSumo() {
  ctx.drawImage(currentSumoImage, sumoX - 25, sumoY - 25, 50, 50);
}

function drawBackground() {
  ctx.drawImage(images.terrain, 0, 0, canvas.width, canvas.height);
}

// Mise à jour de la position du sumo

let currentSumoImage = images.sumo; //image par défaut

function updatePosition() {

  if (keysPressed['ArrowLeft'] && sumoX - speed > 20) {
    sumoX -= speed;
    currentSumoImage = images.sumoLeft
  }
  if (keysPressed['ArrowRight'] && sumoX + speed < canvas.width - 20) {
    sumoX += speed;
    currentSumoImage = images.sumoRight
  }
  if (keysPressed['ArrowUp'] && sumoY - speed > 20) {
    sumoY -= speed;
    currentSumoImage = images.sumoBack;
  }
  if (keysPressed['ArrowDown'] && sumoY + speed < canvas.height  - 20) {
    sumoY += speed;
    currentSumoImage = images.sumo
  }
}

// Boucle de jeu principale
function gameLoop() {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawBackground(); // Dessine l'arrière-plan
  updatePosition(); // Met à jour la position du sumo
  drawSumo(); // Dessine le sumo
}

// Écouteurs d'événements pour les touches du clavier
document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key] = false;
});


// Propriétés pour les poissons
const fishProperties = {
    speed: 1,
    width: 35,
    height: 35,
    imageSrc: '/assets/fish.png'
  };
  
  // Tableau pour stocker les poissons
  let fishes = [];
  
  // Générer un poisson à un intervalle régulier
  setInterval(function() {
    const side = Math.floor(Math.random() * 4); // Choisir une bordure aléatoire
    let x, y, speedX, speedY;
  
    // Définir la position et la vitesse basées sur la bordure choisie
    switch (side) {
      case 0: // Haut
        x = Math.random() * canvas.width;
        y = -fishProperties.height;
        speedX = 0;
        speedY = fishProperties.speed;
        break;
      case 1: // Bas
        x = Math.random() * canvas.width;
        y = canvas.height;
        speedX = 0;
        speedY = -fishProperties.speed;
        break;
      case 2: // Gauche
        x = -fishProperties.width;
        y = Math.random() * canvas.height;
        speedX = fishProperties.speed;
        speedY = 0;
        break;
      case 3: // Droite
        x = canvas.width;
        y = Math.random() * canvas.height;
        speedX = -fishProperties.speed;
        speedY = 0;
        break;
    }
  
    // Ajouter le nouveau poisson au tableau
    fishes.push({
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      image: new Image()
    });
    fishes[fishes.length - 1].image.src = fishProperties.imageSrc;
  }, 2000); // Répétez toutes les 2000 ms (2 secondes)
  
  function updateFishes() {
    // Mettre à jour la position de chaque poisson
    for (let i = fishes.length - 1; i >= 0; i--) {
      fishes[i].x += fishes[i].speedX;
      fishes[i].y += fishes[i].speedY;
  
      // Retirer les poissons qui sont sortis du canvas
      if (fishes[i].x < -fishProperties.width || fishes[i].x > canvas.width + fishProperties.width ||
          fishes[i].y < -fishProperties.height || fishes[i].y > canvas.height + fishProperties.height) {
        fishes.splice(i, 1);
      }
    }
  }
  
  function drawFishes() {
    // Dessiner chaque poisson
    fishes.forEach(fish => {
      ctx.drawImage(fish.image, fish.x, fish.y, fishProperties.width, fishProperties.height);
    });
  }

  // Propriétés pour les pommes
const appleProperties = {
    speed: 1,
    width: 35,
    height: 35,
    imageSrc: '/assets/apple.png'
  };
  
  // Tableau pour stocker les pommes
  let apples = [];
  
  // Générer une pomme à un intervalle régulier
  setInterval(function() {
    const side = Math.floor(Math.random() * 4); // Choisir une bordure aléatoire
    let x, y, speedX, speedY;
  
    // Définir la position et la vitesse basées sur la bordure choisie
    switch (side) {
      case 0: // Haut
        x = Math.random() * canvas.width;
        y = -appleProperties.height;
        speedX = 0;
        speedY = appleProperties.speed;
        break;
      case 1: // Bas
        x = Math.random() * canvas.width;
        y = canvas.height;
        speedX = 0;
        speedY = -appleProperties.speed;
        break;
      case 2: // Gauche
        x = -appleProperties.width;
        y = Math.random() * canvas.height;
        speedX = appleProperties.speed;
        speedY = 0;
        break;
      case 3: // Droite
        x = canvas.width;
        y = Math.random() * canvas.height;
        speedX = -appleProperties.speed;
        speedY = 0;
        break;
    }
  
    // Ajouter la nouvelle pomme au tableau
    apples.push({
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      image: new Image()
    });
    apples[apples.length - 1].image.src = appleProperties.imageSrc;
  }, 2000); // Répétez toutes les 2000 ms (2 secondes)
  
  function updateApples() {
    // Mettre à jour la position de chaque pomme
    for (let i = apples.length - 1; i >= 0; i--) {
      apples[i].x += apples[i].speedX;
      apples[i].y += apples[i].speedY;
  
      // Retirer les pommes qui sont sorties du canvas
      if (apples[i].x < -appleProperties.width || apples[i].x > canvas.width + appleProperties.width ||
          apples[i].y < -appleProperties.height || apples[i].y > canvas.height + appleProperties.height) {
        apples.splice(i, 1);
      }
    }
  }
  
  function drawApples() {
    // Dessiner chaque pomme
    apples.forEach(apple => {
      ctx.drawImage(apple.image, apple.x, apple.y, appleProperties.width, appleProperties.height);
    });
  }

  const sumoWidth = 30;
  const sumoHeight = 30;

  function checkFishCollisions() {
    for (let i = 0; i < fishes.length; i++) {
      let fish = fishes[i];
      if (sumoX < fish.x + fishProperties.width &&
          sumoX + sumoWidth > fish.x &&
          sumoY < fish.y + fishProperties.height &&
          sumoY + sumoHeight > fish.y) {
        // Collision détectée avec un poisson
        console.log("perdu avec un poisson");
        // Recharger la page
        window.location.reload();
      }
    }
  }

  function checkAppleCollisions() {
    for (let i = 0; i < apples.length; i++) {
      let apple = apples[i];
      if (sumoX < apple.x + appleProperties.width &&
          sumoX + sumoWidth > apple.x &&
          sumoY < apple.y + appleProperties.height &&
          sumoY + sumoHeight > apple.y) {
         // Collision détectée avec une pomme
         score ++
         console.log(score);
         apples.splice(i, 1);
         // Gestion de la fin du jeu ou de la perte d'une vie
      }
    }
  }
  
  function gameLoop() {
    requestAnimationFrame(gameLoop);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    updatePosition();
    drawSumo();
    drawApples();
    updateApples();
    updateFishes();  // Mettre à jour et dessiner les poissons
    drawFishes();
    checkFishCollisions();
    checkAppleCollisions();
  }
  
  gameLoop(); // Début de la boucle de jeu