document.addEventListener("DOMContentLoaded", function () {
  console.log("adoption.js caricato correttamente!");
 
  /* ───── 1. ANTEPRIMA ANIMALE DA URL ───── */
  // Legge il parametro ?animal=Xandi dall'URL
  var params = new URLSearchParams(window.location.search);
  var animalName = params.get('animal');
 
  if (animalName && typeof animals !== "undefined") {
    var animal = animals.find(function(a) {
      return a.name.toLowerCase() === animalName.toLowerCase();
    });
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
 
  /* ───── 2. CONTATORE CARATTERI TEXTAREA ───── */
  var motivationField = document.getElementById("motivation");
  var charCounter = document.getElementById("charCounter");
 
  motivationField.addEventListener("input", function () {
    var len = motivationField.value.length;
 
    // Limite massimo 500 caratteri
    if (len > 500) {
      motivationField.value = motivationField.value.substring(0, 500);
      len = 500;
    }
 
    charCounter.textContent = len + " / 500";
    charCounter.className = len > 450 ? "char-counter near-limit" : "char-counter";
  });
 
  /* ───── 3. FUNZIONI DI VALIDAZIONE ───── */
 
  // Segna un campo come invalido con placeholder rosso
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
 
  // Rimuove lo stato invalido da un campo
  function setValid(fieldId, errorId) {
    var field = document.getElementById(fieldId);
    var errorEl = document.getElementById(errorId);
 
    field.classList.remove("invalid");
    if (errorEl) {
      errorEl.textContent = "";
    }
  }
 
  // Controlla se un campo di testo e' vuoto
  function checkRequired(fieldId, errorId, label) {
    var field = document.getElementById(fieldId);
    if (field.value.trim() === "") {
      setInvalid(fieldId, errorId, label + " ist erforderlich.");
      return false;
    }
    setValid(fieldId, errorId);
    return true;
  }
 
  // Controlla se una select ha un valore scelto
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
 
  // Controlla formato email
  function checkEmail() {
    var field = document.getElementById("email");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
 
    if (field.value.trim() === "") {
      setInvalid("email", "emailError", "E-Mail ist erforderlich.");
      return false;
    }
    if (!emailRegex.test(field.value.trim())) {
      field.classList.add("invalid");
      document.getElementById("emailError").textContent = "Bitte eine g\u00fcltige E-Mail eingeben.";
      return false;
    }
    setValid("email", "emailError");
    return true;
  }
 
  // Controlla formato telefono (7-15 cifre)
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
 
  // Controlla data di nascita (deve essere nel passato)
  function checkBirthdate() {
    var field = document.getElementById("birthdate");
    if (field.value === "") {
      field.classList.add("invalid");
      document.getElementById("birthdateError").textContent = "Geburtsdatum ist erforderlich.";
      return false;
    }
    var born = new Date(field.value);
    var today = new Date();
    if (born >= today) {
      field.classList.add("invalid");
      document.getElementById("birthdateError").textContent = "Das Datum muss in der Vergangenheit liegen.";
      return false;
    }
    field.classList.remove("invalid");
    document.getElementById("birthdateError").textContent = "";
    return true;
  }
 
  // Controlla motivazione (minimo 30 caratteri)
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
 
  // Controlla che entrambi i consensi siano accettati
  function checkConsents() {
    var adoption = document.getElementById("consentAdoption");
    var privacy  = document.getElementById("consentPrivacy");
    var errorEl  = document.getElementById("consentError");
 
    if (!adoption.checked || !privacy.checked) {
      errorEl.textContent = "Bitte beide Einverst\u00e4ndnisse akzeptieren.";
      return false;
    }
    errorEl.textContent = "";
    return true;
  }
 
  /* ───── 4. RIMUOVE ERRORE MENTRE SI SCRIVE ───── */
 
  // Per i campi di testo: rimuove il rosso appena si inizia a scrivere
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
 
  // Email: rimuove errore mentre si digita
  document.getElementById("email").addEventListener("input", function () {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (emailRegex.test(this.value.trim())) {
      setValid("email", "emailError");
    }
  });
 
  // Telefono: accetta solo caratteri validi
  document.getElementById("phone").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9\s\-().]/g, "");
    if (this.value.trim().length >= 7) {
      this.classList.remove("invalid");
      document.getElementById("phoneError").textContent = "";
    }
  });
 
  /* ───── 5. INVIO FORM ───── */
  var form = document.getElementById("adoptionForm");
 
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Tentativo di invio form...");
 
    // Esegue tutte le validazioni
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
 
    var allValid = ok1 && ok2 && ok3 && ok4 && ok5 && ok6 && ok7 &&
                  ok8 && ok9 && ok10 && ok11 && ok12 && ok13 && ok14;
 
    if (!allValid) {
      // Scrolla al primo campo invalido
      var firstInvalid = document.querySelector(".invalid");
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      console.log("Form non valido, correggere gli errori.");
      return;
    }
 
    // Form valido: mostra messaggio di successo
    console.log("Form valido! Invio in corso...");
    var submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Wird gesendet\u2026";
 
    setTimeout(function () {
      form.style.display = "none";
      var overlay = document.getElementById("successOverlay");
      overlay.style.display = "block";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1000);
  });
 
});