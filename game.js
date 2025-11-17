const IMAGE_COUNT = 2;

const imageList = Array.from(
    { length: IMAGE_COUNT },
    (_, i) => `images/${i + 1}.jpg`
);

let currentImages = [];
let currentIndex = 0;

let zoom = 5; // start super zoomed-in
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
    zoom = 7;
    paused = false;

    pauseBtn.classList.remove("hidden");
    judgeControls.classList.add("hidden");
    nextBtn.classList.add("hidden");

    const src = currentImages[currentIndex];
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
