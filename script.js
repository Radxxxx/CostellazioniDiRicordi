const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');

// Canvas Dimentions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Memories placeholder
let memories = [];

// Add Memory
document.getElementById('addMemoryBtn').addEventListener('click', () => {
    const text = document.getElementById('memoryText').value;
    const fileInput = document.getElementById('memoryImage');
    if (!text) return alert("Inserisci un testo per il ricordo.");

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    memories.push({ text, x, y, image: null });

    // Draw A Star
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Reset Form
    document.getElementById('memoryText').value = '';
    fileInput.value = '';
});

// Export PNG
document.getElementById('exportBtn').addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'costellazione.png';
    link.click();
});
