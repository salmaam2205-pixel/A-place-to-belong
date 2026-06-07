// database.js  —  MODEL
// Connessione a SQLite e creazione della tabella delle richieste di adozione.
 
const sqlite3 = require('sqlite3').verbose();
 
const db = new sqlite3.Database('./adoptions.db', (err) => {
  if (err) console.error('Errore apertura database:', err.message);
  else console.log('Database SQLite connesso.');
});
 
// I campi corrispondono ESATTAMENTE a quelli del vostro adoption.html
db.run(`
  CREATE TABLE IF NOT EXISTS adoption_requests (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    animal_name      TEXT,
    first_name       TEXT NOT NULL,
    last_name        TEXT NOT NULL,
    birthdate        TEXT NOT NULL,
    email            TEXT NOT NULL,
    phone            TEXT NOT NULL,
    address          TEXT NOT NULL,
    housing_type     TEXT NOT NULL,
    ownership        TEXT NOT NULL,
    garden           TEXT,
    other_in_home    TEXT,
    past_experience  TEXT NOT NULL,
    past_animals     TEXT,
    vet_care         TEXT NOT NULL,
    hours_away       TEXT NOT NULL,
    travel_frequency TEXT,
    absence_plan     TEXT NOT NULL,
    motivation       TEXT NOT NULL,
    consent_privacy  INTEGER NOT NULL,
    created_at       TEXT DEFAULT (datetime('now'))
  )
`);
 
module.exports = db;