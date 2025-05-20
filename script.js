//your code here
const imageSources = [
  "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"
];

const tilesContainer = document.getElementById("tiles");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

let selectedTiles = [];

// Utility: Shuffle array
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// Setup images
function setupTiles() {
  message.textContent = "";
  selectedTiles = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  tilesContainer.innerHTML = "";

  // Step 1: Choose a duplicate randomly
  const duplicateIndex = Math.floor(Math.random() * imageSources.length);
  const duplicateImage = imageSources[duplicateIndex];

  // Step 2: Create image list
  const imageList = [...imageSources, duplicateImage]; // now 6 images
  const shuffledImages = shuffle(imageList);

  // Step 3: Render
  shuffledImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.src = src;
    img.classList.add("tile");

    img.addEventListener("click", () => handleTileClick(img));

    tilesContainer.appendChild(img);
  });
}

// Handle tile click
function handleTileClick(tile) {
  // Prevent re-selecting same tile
  if (tile.classList.contains("selected") || selectedTiles.length === 2) return;

  tile.classList.add("selected");
  selectedTiles.push(tile);

  resetBtn.style.display = "inline-block";

  if (selectedTiles.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset state
resetBtn.addEventListener("click", () => {
  selectedTiles.forEach(tile => tile.classList.remove("selected"));
  selectedTiles = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.textContent = "";
});

// Verify selection
verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedTiles;

  if (img1.dataset.src === img2.dataset.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

setupTiles();
