const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let memories = [];

// Add Memory
document.getElementById('addMemoryBtn').addEventListener('click', () => {
    const text = document.getElementById('memoryText').value;
    const fileInput = document.getElementById('memoryImage');
    if (!text) return alert("Inserisci un testo per il ricordo.");

    const bottomBar = document.getElementById('bottom-bar');
    const bottomBarHeight = bottomBar.offsetHeight;
    const x = Math.random() * canvas.width;
    const y = Math.random() * (canvas.height - bottomBarHeight);
    memories.push({ text, x, y, image: null });

    // Draw Star
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

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
      tooltip.style.left = `${event.clientX + 15}px`;
      tooltip.style.top = `${event.clientY - 10}px`;
      tooltip.innerHTML = `<p>${memory.text}</p>`;
      break;
    }
  }

  if (!found) tooltip.style.display = 'none';
});
