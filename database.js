// database.js  —  MODEL
//
// Diese Datei stellt die Verbindung zur SQLite-Datenbank her und definiert
// die Tabellenstruktur für die Adoptionsanfragen.
// Im MVC-Muster des Projekts ist diese Datei das Model: sie kennt nur die
// Datenstruktur und die Datenbankverbindung, keine Logik für Routen oder Views.
 
const sqlite3 = require('sqlite3').verbose();
 
// VERBINDUNG ZUR DATENBANK
// Wenn die Datei "adoptions.db" noch nicht existiert, wird sie automatisch
// von SQLite neu angelegt. Der Callback gibt eine Rückmeldung in der Konsole,
// ob die Verbindung erfolgreich war.
const db = new sqlite3.Database('./adoptions.db', (err) => {
  if (err) console.error('Errore apertura database:', err.message);
  else console.log('Database SQLite connesso.');
});
 
// TABELLE "adoption_requests" ANLEGEN (falls noch nicht vorhanden)
//
// Die Spalten entsprechen exakt den Feldern aus adoption.html / adoption.js,
// damit das Formular 1:1 in die Datenbank gespeichert werden kann.
//
// Wichtige Designentscheidungen:
// - id: Primärschlüssel, wird automatisch von SQLite hochgezählt (AUTOINCREMENT)
// - NOT NULL bei allen Pflichtfeldern des Formulars (entspricht der
//   Frontend-Validierung in adoption.js und der Server-Validierung in server.js)
// - optionale Felder (garden, other_in_home, past_animals, travel_frequency)
//   haben kein NOT NULL, da sie im Formular nicht verpflichtend sind
// - consent_privacy ist INTEGER (0 oder 1), da SQLite keinen echten
//   Boolean-Typ besitzt — die Checkbox wird so als 0/1 gespeichert
// - created_at wird automatisch mit dem aktuellen Datum/Uhrzeit befüllt,
//   sodass jede Anfrage einen Zeitstempel erhält (DEFAULT datetime('now'))
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
 
// Export der Datenbankverbindung, damit server.js (Controller) darauf zugreifen kann
module.exports = db;