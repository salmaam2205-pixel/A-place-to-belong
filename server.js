// server.js  —  CONTROLLER
//
// Express-Server: liefert das Frontend aus (statische Dateien aus /public)
// und stellt die API-Endpoints für die Adoptionsanfragen bereit.
// Im MVC-Muster ist dies der Controller: er empfängt Anfragen vom Frontend,
// validiert sie, ruft das Model (database.js) auf und sendet eine Antwort zurück.

const express = require('express');
const path = require('path');
const db = require('./database');   // Model: Datenbankverbindung + Tabellenstruktur

const app = express();
const PORT = 3000;

// MIDDLEWARE
// express.json(): liest den JSON-Body aus den fetch()-Requests von adoption.js
app.use(express.json());
// express.static(): liefert alle Dateien aus dem Ordner "public" aus
// (HTML, CSS, JS, Bilder) — dadurch funktionieren z. B. /index.html, /style.css, ...
app.use(express.static(path.join(__dirname, 'public')));

// === POST /api/adoptions ===
// Wird von adoption.js per fetch() aufgerufen, wenn das Formular gültig ausgefüllt wurde.
// Speichert eine neue Adoptionsanfrage in der Datenbank.
app.post('/api/adoptions', (req, res) => {
  const d = req.body;

  // SERVER-SEITIGE VALIDIERUNG (zusätzlich zur Frontend-Validierung in adoption.js!)
  // Wichtig: Das Frontend kann umgangen werden (z. B. über Browser-Konsole oder
  // direkte API-Aufrufe), deshalb muss der Server alle Eingaben erneut prüfen.

  // 1. Pflichtfelder: prüfen, ob alle erforderlichen Felder vorhanden und nicht leer sind
  const obbligatori = ['first_name','last_name','birthdate','email','phone','address',
                       'housing_type','ownership','past_experience','vet_care',
                       'hours_away','absence_plan','motivation'];
  for (const campo of obbligatori) {
    if (!d[campo] || String(d[campo]).trim() === '') {
      return res.status(400).json({ error: 'Campo obbligatorio mancante: ' + campo });
    }
  }

  // 2. E-Mail-Format: gleiche Regex wie im Frontend (adoption.js), zur Sicherheit erneut geprüft
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) {
    return res.status(400).json({ error: 'Email non valida.' });
  }

  // 3. Motivationstext: muss mindestens 30 Zeichen lang sein (wie im Frontend)
  if (d.motivation.trim().length < 30) {
    return res.status(400).json({ error: 'La motivazione deve avere almeno 30 caratteri.' });
  }

  // 4. Datenschutz-Zustimmung: ohne Einverständnis darf nichts gespeichert werden (DSGVO)
  if (!d.consent_privacy) {
    return res.status(400).json({ error: 'Il consenso alla privacy è obbligatorio.' });
  }

  // SPEICHERN IN DER DATENBANK
  // Parametrisierte Query mit "?"-Platzhaltern: verhindert SQL-Injection,
  // da die Werte separat (im "valori"-Array) übergeben werden und nicht
  // direkt in den SQL-String eingefügt werden.
  const sql = `INSERT INTO adoption_requests
    (animal_name, first_name, last_name, birthdate, email, phone, address,
     housing_type, ownership, garden, other_in_home, past_experience, past_animals,
     vet_care, hours_away, travel_frequency, absence_plan, motivation, consent_privacy)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const valori = [
    d.animal_name, d.first_name, d.last_name, d.birthdate, d.email, d.phone, d.address,
    d.housing_type, d.ownership, d.garden, d.other_in_home, d.past_experience, d.past_animals,
    d.vet_care, d.hours_away, d.travel_frequency, d.absence_plan, d.motivation,
    d.consent_privacy ? 1 : 0   // Checkbox (true/false) wird zu 1/0 für SQLite umgewandelt
  ];

  db.run(sql, valori, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Errore nel salvataggio.' });
    }
    // this.lastID enthält die automatisch generierte ID der neuen Zeile (AUTOINCREMENT)
    // Diese Erfolgsantwort wird von adoption.js geprüft (result.success),
    // um die Erfolgsmeldung (#successOverlay) anzuzeigen
    res.json({ success: true, id: this.lastID });
  });
});

// === GET /api/adoptions ===
// Liefert alle gespeicherten Adoptionsanfragen zurück, sortiert nach Datum
// (neueste zuerst). Nützlich zum Testen/Überprüfen, ob die Daten korrekt
// in der Datenbank gespeichert wurden (z. B. über den Browser oder Postman).
app.get('/api/adoptions', (req, res) => {
  db.all('SELECT * FROM adoption_requests ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Errore nella lettura.' });
    res.json(rows);
  });
});

// Server starten und auf Port 3000 lauschen
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));