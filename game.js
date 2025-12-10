const PHOTO_COUNT = 49;
const ZOOM_LEVEL = 8;
let zoom = ZOOM_LEVEL;

const photoList = Array.from(
  { length: PHOTO_COUNT },
  (_, i) => `photos/${i + 1}.jpg`
);

let currentPhotos = [];
let currentIndex = 0;

let zoomInterval = null;
let paused = false;

const startButton = document.getElementById("startButton");
const game = document.getElementById("game");
const photo = document.getElementById("photo");

const pauseButton = document.getElementById("pauseButton");
const hostControls = document.getElementById("hostControls");
const rightButton = document.getElementById("rightButton");
const wrongButton = document.getElementById("wrongButton");
const nextButton = document.getElementById("nextButton");
const rightMessage = document.getElementById("rightMessage");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadPhoto() {
  // Stop and clear any existing confetti
  if (typeof confetti !== "undefined" && typeof confetti.reset === "function") {
    confetti.reset();
  }

  zoom = ZOOM_LEVEL;
  paused = false;

  pauseButton.classList.remove("hidden");
  hostControls.classList.add("hidden");
  nextButton.classList.add("hidden");
  rightMessage.classList.add("hidden");

  const src = currentPhotos[currentIndex];
  photo.src = src;
  photo.style.transform = `scale(${zoom})`;
}

function startZoom() {
  clearInterval(zoomInterval);
  zoomInterval = setInterval(() => {
    if (paused) return;
    zoom -= 0.01;
    if (zoom < 1) zoom = 1;
    photo.style.transform = `scale(${zoom})`;
  }, 30);
}

function pauseZoom() {
  paused = true;
  pauseButton.classList.add("hidden");
  hostControls.classList.remove("hidden");
}

function resumeZoom() {
  paused = false;
  hostControls.classList.add("hidden");
  pauseButton.classList.remove("hidden");
}

/* confetti */
var count = 200;
var defaults = {
  origin: { y: 0.7 },
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
}

function revealFull() {
  zoom = 1;
  photo.style.transform = `scale(${zoom})`;
  hostControls.classList.add("hidden");
  nextButton.classList.remove("hidden");
  rightMessage.classList.remove("hidden");

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

startButton.onclick = () => {
  currentPhotos = shuffle([...photoList]);
  currentIndex = 0;

  startButton.classList.add("hidden");
  game.classList.remove("hidden");

  loadPhoto();
  startZoom();
};

pauseButton.onclick = pauseZoom;
document.body.addEventListener("keydown", (e) => {
  if (e.code === "Space") pauseZoom();
});

rightButton.onclick = revealFull;
wrongButton.onclick = resumeZoom;

nextButton.onclick = () => {
  currentIndex++;
  if (currentIndex >= currentPhotos.length) {
    alert("Out of photos.\nGame Over!");
    return;
  }

  nextButton.classList.add("hidden");

  loadPhoto();
};
