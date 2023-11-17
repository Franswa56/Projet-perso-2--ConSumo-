
let score = 0
let isPaused = false;
let sumoWalkStep = 1;
let lastChangeTime = 0

let sumoWidth = 50;
let sumoHeight = 50;

let sumoLife = 3;

let hasPlayedGongSound = false;

let objectInterval = 500;

const gameOver = document.querySelector(".game-over");
  // Tableau pour stocker les objets
  let objects = [];
// Récupération du canvas et du contexte de rendu
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Définition de la taille du canvas
canvas.width = 900;
canvas.height = 600;

// Sources des images
const imageSources = {
  sumo: 'assets/sumo.png',
  sumo2: 'assets/sumo2.png',
  terrain: 'assets/terrain.png',
  sumoBack: 'assets/sumo-back.png',
  sumoBack2: 'assets/sumo-back2.png',
  sumoLeft: 'assets/sumo-left.png',
  sumoLeft2: 'assets/sumo-left2.png',
  sumoRight: 'assets/sumo-right.png',
  sumoRight2: 'assets/sumo-right2.png',
  fish: 'assets/fish.png',
  rottenApple: 'assets/rotten-apple.png',
  apple: 'assets/apple.png',
  littleFish: 'assets/little-fish.png'

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
const speed = 1.5;

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
  ctx.drawImage(currentSumoImage, sumoX - 25, sumoY - 25, sumoHeight, sumoWidth);
}

function drawBackground() {
  ctx.drawImage(images.terrain, 0, 0, canvas.width, canvas.height);
}

// Mise à jour de la position du sumo

let currentSumoImage = images.sumo; //image par défaut

// Animation de marche
function changeSumoImage(direction) {
  sumoWalkStep = sumoWalkStep === 1 ? 2 : 1;
  let imagePrefix;

  switch (direction) {
    case 'right':
      imagePrefix = 'sumoRight';
      break;
    case 'left':
      imagePrefix = 'sumoLeft';
      break;
    case 'down': 
      imagePrefix ='sumo'
      break
    case 'up':
      imagePrefix = 'sumoBack'
      break
    // Ajoutez d'autres directions si nécessaire
    default:
      return; // Ne rien faire si la direction n'est pas reconnue
  }
  currentSumoImage = images[imagePrefix + (sumoWalkStep === 1 ? '' : '2')];
}

function updatePosition() {
  const currentTime = Date.now();
  if (keysPressed['ArrowLeft'] && sumoX - speed > 20) {
    sumoX -= speed;
    if (currentTime - lastChangeTime > 80) {
      changeSumoImage('left');
      lastChangeTime = currentTime;
    }
  }
  if (keysPressed['ArrowRight'] && sumoX + speed < canvas.width - 20) {
    sumoX += speed;
    if (currentTime - lastChangeTime > 80) {
      changeSumoImage('right');
      lastChangeTime = currentTime;
    }
  }
  if (keysPressed['ArrowUp'] && sumoY - speed > 20) {
    sumoY -= speed;
    if (currentTime - lastChangeTime > 80) {
      changeSumoImage('up');
      lastChangeTime = currentTime;
  }
}
  if (keysPressed['ArrowDown'] && sumoY + speed < canvas.height  - 20) {
    sumoY += speed;
    if (currentTime - lastChangeTime > 80) {
      changeSumoImage('down');
      lastChangeTime = currentTime;
  }
}
}
// gestion de la pause 
document.addEventListener('keydown', (event) => {
    if (event.key === 'p' || event.key === 'P') {
      isPaused = !isPaused;
      console.log(isPaused)
    }
  });

// Boucle de jeu principale
function gameLoop() {
    if (!isPaused) {
  requestAnimationFrame(gameLoop);
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  drawBackground(); // Dessine l'arrière-plan
  updatePosition(); // Met à jour la position du sumo
  drawSumo(); // Dessine le sumo
}}

// Écouteurs d'événements pour les touches du clavier
document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keysPressed[event.key] = false;
});



// Propriétés pour les objet
const objectProperties = {
    speed: 1,
    width: 35,
    height: 35,
  };
  
  const keys = ['apple', 'apple', 'rottenApple', 'rottenApple', 'fish','littleFish'];

  function createNewObject() {
    const randomIndex = Math.floor(Math.random() * keys.length);
    const imageKey = keys[randomIndex];
  
    const side = Math.floor(Math.random() * 4);
    let x, y, speedX, speedY;
  
    // Définir la position et la vitesse basées sur la bordure choisie
    switch (side) {
      case 0: // Haut
        x = Math.random() * canvas.width;
        y = -objectProperties.height;
        speedX = 0;
        speedY = objectProperties.speed;
        break;
      case 1: // Bas
        x = Math.random() * canvas.width;
        y = canvas.height;
        speedX = 0;
        speedY = -objectProperties.speed;
        break;
      case 2: // Gauche
        x = -objectProperties.width;
        y = Math.random() * canvas.height;
        speedX = objectProperties.speed;
        speedY = 0;
        break;
      case 3: // Droite
        x = canvas.width;
        y = Math.random() * canvas.height;
        speedX = -objectProperties.speed;
        speedY = 0;
        break;
    }
  
    return {
      x: x,
      y: y,
      speedX: speedX,
      speedY: speedY,
      image: images[imageKey],
      type: imageKey
    };
  }
  
  // Générer un objet à un intervalle régulier
  setInterval(function() {
    const newObject = createNewObject();
    objects.push(newObject);
  }, objectInterval);
  
  function updateObject() {
    // Mettre à jour la position de chaque poisson
    for (let i = objects.length - 1; i >= 0; i--) {
      objects[i].x += objects[i].speedX;
      objects[i].y += objects[i].speedY;
  
      // Retirer les poissons qui sont sortis du canvas
      if (objects[i].x < -objectProperties.width || objects[i].x > canvas.width + objectProperties.width ||
          objects[i].y < -objectProperties.height || objects[i].y > canvas.height + objectProperties.height) {
        objects.splice(i, 1);
      }
    }
  }
  
  function drawObject(object) {
    // Dessiner chaque poisson
    objects.forEach(object => {
      ctx.drawImage(object.image, object.x, object.y, objectProperties.width, objectProperties.height);
    });
  }

  // Affichage du score 

  function displayAndUpdateScore(score) {
    const scoreScreen = document.querySelector(".score"); // Sélectionne l'élément avec la classe 'score'
  
    // Assurez-vous que l'élément scoreScreen existe avant de continuer
    if (scoreScreen) {
      scoreScreen.textContent = `Score: ${score}`; // Met à jour le texte de l'élément avec le score actuel
    console.log ("yes")
    }
  }

  function checkObjectsCollisions() {
    for (let i = 0; i < objects.length; i++) {
      let object = objects[i];
      if (sumoX < object.x + objectProperties.width &&
          sumoX + sumoWidth > object.x &&
          sumoY < object.y + objectProperties.height &&
          sumoY + sumoHeight > object.y) {
            displayAndUpdateScore(score)
            if (score > 50 && !hasPlayedGongSound) {
              objectInterval = 100;
              objectProperties.speed = 1.5;
              sumoHeight = 65;
              sumoWidth = 65;
              const gongSound = document.getElementById('gongSound');
              gongSound.play();
              hasPlayedGongSound = true; // Mettez à jour la variable
            }

        // Effets des objets

        if (object.type === 'apple' ) {
          score += 8;
          console.log(score);
          // Jouer le son 
          const appleSound = document.getElementById('appleSound');
          appleSound.play();
          // Supprimez l'objet
          objects.splice(i, 1);
        } 
        else if (object.type === 'rottenApple') {
          score -= 6;
          console.log(score)
          
          const throwUpSound = document.getElementById('throwUpSound');
          throwUpSound.play();

          objects.splice(i, 1);
        }
        else if (object.type === 'littleFish') {
          score += 10
          appleSound.play();
          objects.splice(i, 1);
        }
        else if (object.type === 'fish') {
          const aieSound = document.getElementById('aie');
          aieSound.play();
          objects.splice(i, 1);
          sumoLife -= 1;
        }               
      }
    }
  }

  
  function gameLoop() {
    if (sumoLife === 0) {
      cancelAnimationFrame(animationFrameId); // Arrête la boucle de jeu
      // Gérer la fin du jeu ici, comme afficher un message ou enregistrer le score
      canvas.style.display = 'none'
      gameOver.style.display = 'block'
      return; // Arrête l'exécution de la fonction
    }
  
    // Le reste de la logique de jeu...
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    updatePosition();
    drawSumo();
    updateObject();  // Mettre à jour et dessiner les objets
    drawObject();
    checkObjectsCollisions();
  
    animationFrameId = requestAnimationFrame(gameLoop); // Un seul appel à la fin de la fonction
  }
  gameLoop(); // Début de la boucle de jeu