// ============================================================
// adoption.js
// Logik für das Adoptionsformular (Validierung, Vorschau, AJAX)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("adoption.js caricato correttamente!");
 
  /* ───── 1. TIERVORSCHAU AUS DER URL (AJAX) ───── */
  // Liest den URL-Parameter ?animal=Xandi aus und zeigt das entsprechende Tier an
  var params = new URLSearchParams(window.location.search);
  var animalName = params.get('animal');
 
  // Wenn ein Tiername in der URL vorhanden ist und das animals-Array geladen wurde
  if (animalName && typeof animals !== "undefined") {
    // Sucht das passende Tier im Array (Groß-/Kleinschreibung wird ignoriert)
    var animal = animals.find(function(a) {
      return a.name.toLowerCase() === animalName.toLowerCase();
    });
    // Aktualisiert die Vorschaukarte mit den Tierdaten
    if (animal) {
      document.getElementById('previewImg').src = animal.image;
      document.getElementById('previewImg').alt = animal.alt;
      document.getElementById('previewBadge').textContent = animal.badge;
      document.getElementById('previewName').textContent = animal.name;
      document.getElementById('previewAge').textContent = animal.age;
      document.getElementById('previewBreed').textContent = animal.breed;
      document.getElementById('previewDesc').textContent = animal.desc;
    }
  }
 
  /* ───── 2. ZEICHENZÄHLER FÜR DAS TEXTFELD ───── */
  // Zeigt die aktuelle Zeichenanzahl an und begrenzt die Eingabe auf 500 Zeichen
  var motivationField = document.getElementById("motivation");
  var charCounter = document.getElementById("charCounter");
 
  motivationField.addEventListener("input", function () {
    var len = motivationField.value.length;
 
    // Überschreitung des Limits abschneiden
    if (len > 500) {
      motivationField.value = motivationField.value.substring(0, 500);
      len = 500;
    }
 
    // Anzeige aktualisieren und Farbe bei Annäherung ans Limit ändern
    charCounter.textContent = len + " / 500";
    charCounter.className = len > 450 ? "char-counter near-limit" : "char-counter";
  });
 
  /* ───── 3. VALIDIERUNGSFUNKTIONEN ───── */
 
  // Markiert ein Feld als ungültig: leert den Wert, setzt roten Placeholder und Fehlermeldung
  function setInvalid(fieldId, errorId, errorMessage, placeholderText) {
    var field = document.getElementById(fieldId);
    var errorEl = document.getElementById(errorId);
 
    field.value = "";
    field.placeholder = placeholderText || "Bitte ausf\u00fcllen";
    field.classList.add("invalid");
 
    if (errorEl) {
      errorEl.textContent = errorMessage;
    }
  }
 
// Entfernt den Fehlerzustand eines Feldes (roten Rahmen und Fehlermeldung)
  function setValid(fieldId, errorId) {
    var field = document.getElementById(fieldId);
    var errorEl = document.getElementById(errorId);
 
    field.classList.remove("invalid");
    if (errorEl) {
      errorEl.textContent = "";
    }
  }
 
  // Prüft ob ein Textfeld ausgefüllt wurde (Pflichtfeld-Validierung)
  function checkRequired(fieldId, errorId, label) {
    var field = document.getElementById(fieldId);
    if (field.value.trim() === "") {
      setInvalid(fieldId, errorId, label + " ist erforderlich.");
      return false;
    }
    setValid(fieldId, errorId);
    return true;
  }
 
  // Prüft ob eine Dropdown-Auswahl getroffen wurde
  function checkSelect(fieldId, errorId, label) {
    var field = document.getElementById(fieldId);
    if (field.value === "") {
      field.classList.add("invalid");
      var errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.textContent = label + " ist erforderlich.";
      return false;
    }
    field.classList.remove("invalid");
    var errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = "";
    return true;
  }
 
  // Prüft das E-Mail-Format mit einem regulären Ausdruck
  function checkEmail() {
    var field = document.getElementById("email");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
 
    if (field.value.trim() === "") {
      setInvalid("email", "emailError", "E-Mail ist erforderlich.");
      return false;
    }
    
    // Syntaxprüfung: muss dem Muster user@domain.tld entsprechen
    if (!emailRegex.test(field.value.trim())) {
      field.classList.add("invalid");
      document.getElementById("emailError").textContent = "Bitte eine g\u00fcltige E-Mail eingeben.";
      return false;
    }
    setValid("email", "emailError");
    return true;
  }
 
  // Prüft die Telefonnummer: erlaubt 7–15 Ziffern sowie Leerzeichen, Bindestriche, Klammern und Punkte
  function checkPhone() {
    var field = document.getElementById("phone");
    var phoneRegex = /^[\d\s\-().]{7,15}$/;
 
    if (field.value.trim() === "") {
      setInvalid("phone", "phoneError", "Telefonnummer ist erforderlich.");
      return false;
    }
    if (!phoneRegex.test(field.value.trim())) {
      field.classList.add("invalid");
      document.getElementById("phoneError").textContent = "Bitte eine g\u00fcltige Nummer eingeben (7\u201315 Ziffern).";
      return false;
    }
    setValid("phone", "phoneError");
    return true;
  }
 
  // Prüft das Geburtsdatum: Pflichtfeld und muss in der Vergangenheit liegen
  function checkBirthdate() {
    var field = document.getElementById("birthdate");
    if (field.value === "") {
      field.classList.add("invalid");
      document.getElementById("birthdateError").textContent = "Geburtsdatum ist erforderlich.";
      return false;
    }
    var born = new Date(field.value);
    var today = new Date();
    // Zukünftige Daten werden abgelehnt
    if (born >= today) {
      field.classList.add("invalid");
      document.getElementById("birthdateError").textContent = "Das Datum muss in der Vergangenheit liegen.";
      return false;
    }
    field.classList.remove("invalid");
    document.getElementById("birthdateError").textContent = "";
    return true;
  }
 
  // Prüft den Motivationstext: mindestens 30 Zeichen erforderlich
  function checkMotivation() {
    var field = document.getElementById("motivation");
    if (field.value.trim().length < 30) {
      field.classList.add("invalid");
      document.getElementById("motivationError").textContent =
        "Bitte mindestens 30 Zeichen schreiben (aktuell: " + field.value.trim().length + ").";
      return false;
    }
    field.classList.remove("invalid");
    document.getElementById("motivationError").textContent = "";
    return true;
  }
 
  // Prüft ob beide Einverständnis-Checkboxen angehakt wurden
   function checkConsents() {
    var privacy = document.getElementById("consentPrivacy");
    var errorEl = document.getElementById("consentError");
    if (!privacy.checked) {
      errorEl.textContent = "Bitte das Einverständnis akzeptieren.";
      return false;
    }
    errorEl.textContent = "";
    return true;
  }
 
  /* ───── 4. ECHTZEIT-FEHLERENTFERNUNG WÄHREND DER EINGABE ───── */
  // Interaktion ohne Seitenneuladen (AJAX-Prinzip): Fehlermeldungen verschwinden sofort beim Tippen
 
  // Textfelder: Fehlerzustand wird entfernt, sobald etwas eingegeben wird
  var textFields = ["firstName", "lastName", "address", "absenceplan", "pastAnimals"];
  textFields.forEach(function(id) {
    var field = document.getElementById(id);
    if (field) {
      field.addEventListener("input", function () {
        if (field.value.trim() !== "") {
          field.classList.remove("invalid");
        }
      });
    }
  });
 
  // E-Mail: Fehler wird entfernt, sobald das Format korrekt ist
  document.getElementById("email").addEventListener("input", function () {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (emailRegex.test(this.value.trim())) {
      setValid("email", "emailError");
    }
  });
 
  // Telefon: Ungültige Zeichen werden direkt beim Eingeben gefiltert
  document.getElementById("phone").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9\s\-().]/g, "");
    // Fehler wird entfernt, sobald die Mindestlänge erreicht ist
    if (this.value.trim().length >= 7) {
      this.classList.remove("invalid");
      document.getElementById("phoneError").textContent = "";
    }
  });
 
  /* ───── 5. FORMULAR ABSENDEN ───── */
  var form = document.getElementById("adoptionForm");
 
  form.addEventListener("submit", function (e) {
    // Standardverhalten des Browsers verhindern (kein Neuladen der Seite) --> AJAX
    e.preventDefault();
    console.log("Tentativo di invio form...");
 
    // Alle Felder werden nacheinander validiert
    var ok1  = checkRequired("firstName",  "firstNameError",  "Vorname");
    var ok2  = checkRequired("lastName",   "lastNameError",   "Nachname");
    var ok3  = checkBirthdate();
    var ok4  = checkEmail();
    var ok5  = checkPhone();
    var ok6  = checkRequired("address",    "addressError",    "Adresse");
    var ok7  = checkSelect("housingType",  "housingTypeError","Wohnform");
    var ok8  = checkSelect("ownership",    "ownershipError",  "Eigentumsverh\u00e4ltnis");
    var ok9  = checkSelect("pastExperience","pastExperienceError","Erfahrung");
    var ok10 = checkSelect("vetCare",      "vetCareError",    "Tierarztkosten");
    var ok11 = checkSelect("hoursAway",    "hoursAwayError",  "Stunden au\u00dfer Haus");
    var ok12 = checkRequired("absenceplan","absenceplanError","Abwesenheitsplan");
    var ok13 = checkMotivation();
    var ok14 = checkConsents();
 
    // Nur wenn alle Felder gültig sind, wird das Formular abgeschickt
    var allValid = ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7 &&
                  ok8 && ok9 && ok10 && ok11 && ok12 && ok13 && ok14;
 
    if (!allValid) {
      // Bei Fehler: automatisch zum ersten ungültigen Feld scrollen
      var firstInvalid = document.querySelector(".invalid");
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      console.log("Form non valido, correggere gli errori.");
      return;
    }
 
// Formular ist gültig: Sende-Button deaktivieren (verhindert Doppelklick)
  console.log("Form valido! Invio in corso...");
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet…";

    // raccogli i dati dai campi del form
    var urlParams = new URLSearchParams(window.location.search);
    var data = {
      animal_name:      urlParams.get('animal') || '',
      first_name:       document.getElementById('firstName').value.trim(),
      last_name:        document.getElementById('lastName').value.trim(),
      birthdate:        document.getElementById('birthdate').value,
      email:            document.getElementById('email').value.trim(),
      phone:            document.getElementById('phone').value.trim(),
      address:          document.getElementById('address').value.trim(),
      housing_type:     document.getElementById('housingType').value,
      ownership:        document.getElementById('ownership').value,
      garden:           document.getElementById('garden').value,
      other_in_home:    document.getElementById('otherInHome').value,
      past_experience:  document.getElementById('pastExperience').value,
      past_animals:     document.getElementById('pastAnimals').value.trim(),
      vet_care:         document.getElementById('vetCare').value,
      hours_away:       document.getElementById('hoursAway').value,
      travel_frequency: document.getElementById('travelFrequency').value,
      absence_plan:     document.getElementById('absenceplan').value.trim(),
      motivation:       document.getElementById('motivation').value.trim(),
      consent_privacy:  document.getElementById('consentPrivacy').checked
    };

    fetch('/api/adoptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (result.success) {
          form.style.display = "none";
          document.getElementById("successOverlay").style.display = "block";
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          alert(result.error || "Es ist ein Fehler aufgetreten.");
          submitBtn.disabled = false;
          submitBtn.textContent = "Modular jetzt absenden →";
        }
      })
      .catch(function () {
        alert("Verbindung zum Server fehlgeschlagen.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Modular jetzt absenden →";
      });
  });
 
});