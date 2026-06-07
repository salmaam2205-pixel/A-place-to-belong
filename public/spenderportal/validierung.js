// 1. Funzione per i bottoni 5, 10, 20 Euro 
function setAmount(value) {
    const amountInput = document.getElementById('amount');
    amountInput.value = value;
    
    // Rimuove eventuali classi di validazione precedenti
    amountInput.classList.remove('is-invalid');
    amountInput.classList.add('is-valid');
}

// 2. Logica per il comportamento dei campi e validazione
document.addEventListener('DOMContentLoaded', function () {
    'use strict'

    // --- BLOCCO LETTERE (Telefono, Numero Carta, CVV) ---
    // Cerca tutti i campi con la classe 'cc-numeric' e cancella le lettere mentre scrivi
    const numericFields = document.querySelectorAll('.cc-numeric');
    numericFields.forEach(field => {
        field.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // SLASH AUTOMATICO NELLA DATA (MM/YY) 
    const dateField = document.getElementById('cc-date');
    if (dateField) {
        dateField.addEventListener('input', function() {
            let val = this.value.replace(/[^0-9]/g, ''); // Solo numeri
            if (val.length >= 2) {
                this.value = val.slice(0, 2) + '/' + val.slice(2, 4);
            } else {
                this.value = val;
            }
        });
    }

    // VALIDAZIONE BOOTSTRAP 5 
    const form = document.querySelector('#donationForm');

    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            alert("Herzlichen Dank! Deine Spende hilft uns sehr. 🐾");
        }

        form.classList.add('was-validated');
    }, false);
});
