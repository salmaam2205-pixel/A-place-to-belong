// server.js  —  CONTROLLER
// Server Express: serve il frontend e gestisce le richieste di adozione.

const express = require('express');
const path = require('path');
const db = require('./database');   // <-- il Model

const app = express();
const PORT = 3000;

app.use(express.json());                                  // legge il JSON dal form
app.use(express.static(path.join(__dirname, 'public')));  // serve i file frontend

// === POST: salva una nuova richiesta di adozione ===
app.post('/api/adoptions', (req, res) => {
  const d = req.body;

  // --- Validazione lato server (non fidarsi solo del frontend!) ---
  const obbligatori = ['first_name','last_name','birthdate','email','phone','address',
                       'housing_type','ownership','past_experience','vet_care',
                       'hours_away','absence_plan','motivation'];
  for (const campo of obbligatori) {
    if (!d[campo] || String(d[campo]).trim() === '') {
      return res.status(400).json({ error: 'Campo obbligatorio mancante: ' + campo });
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) {
    return res.status(400).json({ error: 'Email non valida.' });
  }
  if (d.motivation.trim().length < 30) {
    return res.status(400).json({ error: 'La motivazione deve avere almeno 30 caratteri.' });
  }
  if (!d.consent_privacy) {
    return res.status(400).json({ error: 'Il consenso alla privacy è obbligatorio.' });
  }

  // --- Salvataggio nel database ---
  const sql = `INSERT INTO adoption_requests
    (animal_name, first_name, last_name, birthdate, email, phone, address,
     housing_type, ownership, garden, other_in_home, past_experience, past_animals,
     vet_care, hours_away, travel_frequency, absence_plan, motivation, consent_privacy)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const valori = [
    d.animal_name, d.first_name, d.last_name, d.birthdate, d.email, d.phone, d.address,
    d.housing_type, d.ownership, d.garden, d.other_in_home, d.past_experience, d.past_animals,
    d.vet_care, d.hours_away, d.travel_frequency, d.absence_plan, d.motivation,
    d.consent_privacy ? 1 : 0
  ];

  db.run(sql, valori, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Errore nel salvataggio.' });
    }
    res.json({ success: true, id: this.lastID });   // this.lastID = id della nuova riga
  });
});

// === GET: leggi tutte le richieste (utile per verificare) ===
app.get('/api/adoptions', (req, res) => {
  db.all('SELECT * FROM adoption_requests ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Errore nella lettura.' });
    res.json(rows);
  });
});

app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));