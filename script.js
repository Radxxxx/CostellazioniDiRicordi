const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas); // adjust when window resizes
resizeCanvas(); // call once on page load

let memories = [];

 // Draw Star
function drawStar(x, y){
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    console.log("Draw Star function Worked");
    }

// Add Memory
document.getElementById('addMemoryBtn').addEventListener('click', () => {
    const text = document.getElementById('memoryText').value;
    const fileInput = document.getElementById('memoryImage');
    if (!text) return alert("Inserisci un testo per il ricordo.");

    const bottomBar = document.getElementById('bottom-bar');
    const bottomBarHeight = bottomBar.offsetHeight;

    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height - bottomBarHeight);

    if (fileInput.files.length > 0){
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageData = e.target.result;
            console.log("Image data len: ", imageData.length);
            memories.push({ text, x, y, image: imageData });

            drawStar(x, y);
        };

        reader.readAsDataURL(file);
    }else{
        memories.push({ text, x, y, image: null });
        drawStar(x, y);
    }

    console.log("Add memory button clicked");

    // Reset Form
    document.getElementById('memoryText').value = '';
    fileInput.value = '';
});

// Enter Key Submits Memory
document.getElementById('memoryText').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('addMemoryBtn').click();
    }
});

// Expot Constellation as PNG
document.getElementById('exportBtn').addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'costellazione.png';
    link.click();
});

const tooltip = document.getElementById("tooltip");

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  let found = false;

  for (const memory of memories) {
    const dx = mouseX - memory.x;
    const dy = mouseY - memory.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) { 
      found = true;
      tooltip.style.display = 'block';
      
      tooltip.innerHTML = `
        <p>${memory.text}</p>
        ${memory.image ? `<img src="${memory.image}" width="150" style="display:block;">` : ''}
      `;

      const tooltipRect = tooltip.getBoundingClientRect();

      let left = event.clientX + 15;
      if (left + tooltipRect.width > window.innerWidth) {
        left = event.clientX - tooltipRect.width - 15; 
      }

      let top = event.clientY - 10;
      if (top + tooltipRect.height > window.innerHeight) {
        top = window.innerHeight - tooltipRect.height - 10; 
      }
      if (top < 0) top = 10;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;

      break;
    }
  }

  if (!found) tooltip.style.display = 'none';
});

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  const touchX = event.clientX - rect.left;
  const touchY = event.clientY - rect.top;

  let found = false;

  for (const memory of memories) {
    const dx = touchX - memory.x;
    const dy = touchY - memory.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 15) {
      found = true;
      tooltip.style.display = 'block';
      tooltip.innerHTML = `
        <p>${memory.text}</p>
        ${memory.image ? `<img src="${memory.image}" width="150" style="display:block;">` : ''}
      `;

      // Center tooltip on screen (mobile-friendly)
      tooltip.style.left = '50%';
      tooltip.style.top = '50%';
      tooltip.style.transform = 'translate(-50%, -50%)';
      tooltip.style.maxWidth = '80vw';
      tooltip.style.textAlign = 'center';

      break;
    }
  }

  if (!found) {
    tooltip.style.display = 'none';
  }
});

document.querySelector('form').addEventListener('submit', e => e.preventDefault());
