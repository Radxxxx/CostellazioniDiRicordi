const canvas = document.getElementById('sky');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let memories = [];

// Aggiungi ricordo
document.getElementById('addMemoryBtn').addEventListener('click', () => {
    const text = document.getElementById('memoryText').value;
    const fileInput = document.getElementById('memoryImage');
    if (!text) return alert("Inserisci un testo per il ricordo.");

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    memories.push({ text, x, y, image: null });

    // Disegna stella
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Reset form
    document.getElementById('memoryText').value = '';
    fileInput.value = '';
});

// Enter key submits memory
document.getElementById('memoryText').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('addMemoryBtn').click();
    }
});

// Esporta costellazione come PNG
document.getElementById('exportBtn').addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'costellazione.png';
    link.click();
});
