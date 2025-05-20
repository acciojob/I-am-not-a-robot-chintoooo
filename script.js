//your code here
const imageSources = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"
];

let tilesContainer = document.getElementById("tiles");
let resetBtn = document.getElementById("reset");
let verifyBtn = document.getElementById("verify");
let message = document.getElementById("para");
let selectedTiles = [];

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function loadImages() {
  // Step 1: Select a random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * imageSources.length);
  const duplicateImage = imageSources[duplicateIndex];

  // Step 2: Create a new array with the duplicate added
  const allImages = [...imageSources, duplicateImage];

  // Step 3: Shuffle the array
  const shuffledImages = shuffleArray(allImages);

  // Step 4: Render image elements
  tilesContainer.innerHTML = "";
  shuffledImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "tile";
    img.dataset.src = src;
    img.addEventListener("click", () => onTileClick(img));
    tilesContainer.appendChild(img);
  });
}

function onTileClick(imgElement) {
  if (selectedTiles.length === 2) return;

  if (!selectedTiles.includes(imgElement)) {
    imgElement.classList.add("selected");
    selectedTiles.push(imgElement);

    // Show reset button
    resetBtn.style.display = "inline-block";
  }

  if (selectedTiles.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedTiles;
  if (img1.dataset.src === img2.dataset.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

resetBtn.addEventListener("click", () => {
  selectedTiles.forEach(tile => tile.classList.remove("selected"));
  selectedTiles = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  message.textContent = "";
});

// Initial page load
loadImages();
