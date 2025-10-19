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

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    memories.push({ text, x, y, image: null });

    const hue = Math.random() * 60 + 200; // blue-white range
    ctx.fillStyle = `hsl(${hue}, 100%, 85%)`;

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
