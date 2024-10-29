const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadButton = document.getElementById('downloadButton');

let uploadedImage = new Image();

// Handle image upload and display
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

// Start burn animation
function startBurn() {
  const burnEffect = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 20, canvas.width / 2, canvas.height / 2, canvas.width / 1.2);
  burnEffect.addColorStop(0, 'rgba(255, 69, 0, 0.8)');
  burnEffect.addColorStop(1, 'rgba(0, 0, 0, 0.9)');

  ctx.fillStyle = burnEffect;
  ctx.globalAlpha = 0.7;

  // Simple burn effect loop
  let burnInterval = setInterval(() => {
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha *= 0.95;
    if (ctx.globalAlpha <= 0.1) {
      clearInterval(burnInterval);
    }
  }, 100);
}

// Start kiss animation
function startKiss() {
  canvas.addEventListener('click', placeKiss);
}

function placeKiss(event) {
  const kissImage = new Image();
  kissImage.src = 'https://upload.wikimedia.org/wikipedia/commons/8/88/Red_Lips.png'; // Placeholder kiss mark
  const x = event.clientX - canvas.getBoundingClientRect().left - 25;
  const y = event.clientY - canvas.getBoundingClientRect().top - 25;

  kissImage.onload = () => {
    ctx.globalAlpha = 1;
    ctx.drawImage(kissImage, x, y, 50, 50);
  };

  // Remove the kiss event listener after the first click
  canvas.removeEventListener('click', placeKiss);
}

// Reset image to remove effects
function resetImage() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
}

// Download the edited image
function downloadImage() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'edited_image.png';
  link.click();
}
