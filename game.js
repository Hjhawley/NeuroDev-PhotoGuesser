const imageList = [
  "images/1.jpg",
  "images/2.jpg"
];

let currentImages = [];
let currentIndex = 0;

let zoom = 5;            // start super zoomed-in
let zoomInterval = null;
let paused = false;

const startBtn = document.getElementById("startBtn");
const game = document.getElementById("game");
const photo = document.getElementById("photo");

const pauseBtn = document.getElementById("pauseBtn");
const judgeControls = document.getElementById("judgeControls");
const correctBtn = document.getElementById("correctBtn");
const incorrectBtn = document.getElementById("incorrectBtn");
const nextBtn = document.getElementById("nextBtn");

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadImage() {
  zoom = 5; // reset zoom
  paused = false;

  const src = currentImages[currentIndex];
  photo.src = src;
  photo.style.transform = `scale(${zoom})`;
}

function startZoom() {
  zoomInterval = setInterval(() => {
    if (paused) return;
    zoom -= 0.02;
    if (zoom < 1) zoom = 1;
    photo.style.transform = `scale(${zoom})`;
  }, 30);
}

function pauseZoom() {
  paused = true;
  pauseBtn.classList.add("hidden");
  judgeControls.classList.remove("hidden");
}

function resumeZoom() {
  paused = false;
  judgeControls.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
}

function revealFull() {
  zoom = 1;
  photo.style.transform = `scale(1)`;
  judgeControls.classList.add("hidden");
  nextBtn.classList.remove("hidden");
}

startBtn.onclick = () => {
  currentImages = shuffle([...imageList]);
  currentIndex = 0;

  startBtn.classList.add("hidden");
  game.classList.remove("hidden");

  loadImage();
  startZoom();
};

pauseBtn.onclick = pauseZoom;
document.body.addEventListener("keydown", (e) => {
  if (e.code === "Space") pauseZoom();
});

correctBtn.onclick = revealFull;
incorrectBtn.onclick = resumeZoom;

nextBtn.onclick = () => {
  currentIndex++;
  if (currentIndex >= currentImages.length) {
    alert("Out of photos!");
    return;
  }

  nextBtn.classList.add("hidden");

  loadImage();
};
