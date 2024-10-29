const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadButton = document.getElementById('downloadButton');
const imageContainer = document.getElementById('imageContainer');

let uploadedImage = new Image();
let currentMode = 'burn';

// Handle image upload and display on canvas
imageUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImage.src = reader.result;
      uploadedImage.onload = () => {
        canvas.width = uploadedImage.width;
        canvas.height = uploadedImage.height;
        ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
        downloadButton.disabled = false;
      };
    };
    reader.readAsDataURL(file);
  }
});

// Toggle between burn and kiss modes
function toggleMode() {
  currentMode = currentMode === 'burn' ? 'kiss' : 'burn';
  document.getElementById('modeButton').innerText = currentMode === 'burn' ? '🔥 Mode' : '💋 Mode';
}

// Start animation at clicked point
canvas.addEventListener('click', (e) => {
  const x = e.clientX - canvas.getBoundingClientRect().left;
  const y = e.clientY - canvas.getBoundingClientRect().top;
  if (currentMode === 'burn') {
    startFire(x, y);
  } else {
    placeKiss(x, y);
  }
});

// Fire effect particles
function startFire(x, y) {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = `${x + (Math.random() - 0.5) * 30}px`;
    particle.style.top = `${y + (Math.random() - 0.5) * 30}px`;
    imageContainer.appendChild(particle);

    setTimeout(() => imageContainer.removeChild(particle), 1000);
  }
}

// Place kiss effect
function placeKiss(x, y) {
  const kissMark = document.createElement('div');
  kissMark.classList.add('kiss-mark');
  kissMark.style.left = `${x - 25}px`;
  kissMark.style.top = `${y - 25}px`;
  imageContainer.appendChild(kissMark);

  setTimeout(() => imageContainer.removeChild(kissMark), 2000);
}

// Reset image to original
function resetImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
}

// Download edited image
function downloadImage() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'edited_image.png';
  link.click();
}
