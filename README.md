Costellazioni di Ricordi 🌌


Descrizione del progetto:

Costellazioni dei Ricordi è un sito web interattivo che permette agli utenti di creare una mappa stellare personale dei propri ricordi. Ogni “stella” rappresenta un ricordo, contenente testo e, opzionalmente, un’immagine. L’utente può aggiungere ricordi liberamente, osservare la loro disposizione nello spazio virtuale e interagire con essi tramite hover o click.
Obiettivi principali:
Offrire un’esperienza immersiva e personalizzata di memorizzazione visiva dei ricordi.
Garantire la massima privacy, senza login o salvataggio su server.
Permettere l’esportazione e l’importazione dei ricordi in formato JSON per preservare i dati e continuare la costruzione della costellazione.
Tecnologie utilizzate:
HTML & CSS: layout, barra di inserimento ricordi e styling generale.
JavaScript (vanilla): logica di gestione dei ricordi, rendering delle stelle su canvas, gestione tooltip e interazioni utente.
Canvas: visualizzazione dinamica e animata delle stelle.
JSON: salvataggio e re-import dei ricordi.
Flusso operativo utente:
L’utente accede al sito senza bisogno di login.
Inserisce nuovi ricordi tramite testo e immagini.
Ogni ricordo viene visualizzato come stella sul cielo virtuale.
L’utente può visualizzare i dettagli del ricordo tramite hover o click.
È possibile esportare tutti i ricordi in un file JSON o importare una costellazione precedentemente salvata.

Privacy:

Tutti i dati sono gestiti lato client, nessuna informazione viene inviata a server esterni. Solo chi possiede il file JSON può accedere ai ricordi.
Documentazione Dettagliata – Costellazioni di Ricordi
1. Struttura dei file
index.html
Contiene la struttura della pagina: canvas per le stelle, tooltip, barra inferiore per inserire ricordi e pulsanti di import/export JSON.
Include anche il collegamento a style.css e script.js.
style.css
Gestisce l’aspetto visivo del sito: sfondo stellato, layout della barra inferiore, tooltip, pulsanti, input testo e file. Include effetti di hover, blur e trasparenze.
script.js
Contiene tutta la logica:
gestione del canvas e delle stelle,
aggiunta e memorizzazione dei ricordi,
tooltip interattivi,
esportazione e importazione JSON,
gestione delle interazioni click e hover.

2. Canvas e Rendering delle Stelle
Il canvas ha l’ID sky e copre l’intera finestra.
All’apertura della pagina, setupCanvas() imposta le dimensioni a quelle della finestra.
Ogni ricordo viene rappresentato come una stella bianca con bordo sfocato.
La funzione drawStar(x, y) riceve le coordinate e disegna un cerchio bianco con ctx.arc e un effetto di glow tramite shadowBlur e shadowColor.
drawAllStars() cancella il canvas e ridisegna tutte le stelle presenti nell’array memories.


3. Gestione dei Ricordi
I ricordi sono memorizzati in un array chiamato memories.
Ogni ricordo è un oggetto con le proprietà:
text: il testo del ricordo
x e y: coordinate della stella sul canvas
image: stringa base64 dell’immagine (o null se non presente)
Quando si aggiunge un ricordo:
L’utente inserisce il testo e opzionalmente un’immagine.
Se è presente un file immagine, viene letto tramite FileReader in base64 e aggiunto all’oggetto ricordo.
La stella viene generata in posizione casuale sul canvas evitando la barra inferiore.
Dopo l’aggiunta, i campi input vengono resettati.
È possibile inviare il ricordo anche premendo “Enter” nella casella testo.

4. Tooltip Interattivo
Il tooltip appare quando il cursore passa vicino a una stella (distanza < 10px) o quando si clicca (distanza < 15px).
Contiene:
Il testo del ricordo
L’immagine se presente, ridimensionata a larghezza 150px
Il tooltip si posiziona vicino al cursore per hover e al centro dello schermo per click (mobile-friendly).
È gestita automaticamente la posizione per evitare che fuoriesca dallo schermo.

5. Esportazione e Importazione JSON
Esportazione:
Tutti i ricordi vengono convertiti in JSON indentato (JSON.stringify(memories, null, 2)).
Viene creato un blob scaricabile come constellation.json.
Importazione:
L’utente seleziona un file JSON.
Il contenuto viene letto e parsato in un array di ricordi.
Se il file non è valido o non è un array, viene mostrato un alert.
Dopo l’import, tutte le stelle vengono ridisegnate sul canvas.
6. Gestione Input e Layout
Quando un input riceve focus (ad esempio tastiera mobile), il corpo della pagina viene “bloccato” a window.innerHeight per evitare che il canvas si ridimensioni e sposti le stelle.
Quando l’input perde focus, il canvas viene ridisegnato.

7. Flusso dell’utente
L’utente accede al sito senza login.
Inserisce ricordi usando testo e immagini.
Le stelle compaiono sul canvas, posizionate casualmente.
Hover o click sulle stelle mostrano il tooltip con contenuto completo.
L’utente può esportare o importare la costellazione in formato JSON per preservare o caricare i dati.

8. Privacy
Tutti i dati sono gestiti lato client, mai inviati a server.
Solo chi possiede il file JSON esportato può accedere ai ricordi.
Non è previsto login o tracciamento.



