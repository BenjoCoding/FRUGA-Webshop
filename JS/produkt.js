async function ladeProduktDetails() {
    // 1. Die EAN aus der URL "klauen"
    const urlParams = new URLSearchParams(window.location.search);
    const eanAusUrl = urlParams.get('ean');

    if (!eanAusUrl) {
        document.getElementById('einzelprodukt-container').innerHTML = "<h2>Kein Produkt gefunden!</h2>";
        return;
    }

    try {
        // 2. Alle Produkte laden
        const antwort = await fetch('data/products.json');
        const produkte = await antwort.json();

        // 3. Genau das EINE Produkt suchen
        let gesuchtesProdukt;
        produkte.forEach((produkt) => {
            if (produkt.ean === eanAusUrl) {
                gesuchtesProdukt = produkt;
            }
        });

        if (gesuchtesProdukt) {
            // Wir checken ab, ob du in der JSON schon Beschreibung/Allergene angelegt hast.
            // Wenn nicht, setzen wir einen Platzhaltertext.
            const beschreibung = gesuchtesProdukt.beschreibung ? gesuchtesProdukt.beschreibung : "Für dieses Produkt liegt noch keine genaue Beschreibung vor.";
            const allergene = gesuchtesProdukt.allergene ? gesuchtesProdukt.allergene : "Keine Angaben zu Allergenen.";

            // 4. Das HTML für die Detailseite bauen
            const detailHTML = `
                <div class="detail-grid">
                    <div class="detail-bild-box">
                        <img src="images/produkte/icons/${gesuchtesProdukt.bild}" alt="${gesuchtesProdukt.name}">
                    </div>
                    
                    <div class="detail-info-box">
                        <h1>${gesuchtesProdukt.name}</h1>
                        <p class="detail-beschreibung">${beschreibung}</p>
                        <p class="detail-allergene"><strong>Allergene:</strong> ${allergene}</p>
                        
                        <a href="index.html" class="zurueck-button">⬅ Zurück zum Shop</a>
                    </div>
                </div>
            `;
            
            document.getElementById('einzelprodukt-container').innerHTML = detailHTML;
        }

    } catch (fehler) {
        console.error("Fehler:", fehler);
    }
}

// Skript starten!
ladeProduktDetails();