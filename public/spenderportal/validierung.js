// Sets the donation amount field when a preset button (5, 10, 20 €) is clicked
function setAmount(value) {
    const amountInput = document.getElementById('amount');
    amountInput.value = value;
    
    // Clear any previous validation state so the field shows as valid immediately
    amountInput.classList.remove('is-invalid');
    amountInput.classList.add('is-valid');
}


document.addEventListener('DOMContentLoaded', function () {
    'use strict'; // Enables strict mode to catch silent JS errors early

    // --- NUMERIC-ONLY FIELDS --- 
    // Strip any non-digit character on every keystroke using the 'cc-numeric' class as a selector
    const numericFields = document.querySelectorAll('.cc-numeric');
    numericFields.forEach(field => {
        field.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // --- EXPIRY DATE AUTO-FORMATTING (MM/YY) ---
    const dateField = document.getElementById('cc-date');
    if (dateField) {
        dateField.addEventListener('input', function() {
            let val = this.value.replace(/[^0-9]/g, ''); // Solo numeri// Strip non-digits first
            // Once the user has typed at least 2 digits, insert the slash automatically
            if (val.length >= 2) {
                this.value = val.slice(0, 2) + '/' + val.slice(2, 4);
            } else {
                this.value = val;
            }
        });
    }

    // --- FORM SUBMISSION & BOOTSTRAP 5 VALIDATION --- 
    const form = document.querySelector('#donationForm');

    // 'false' as the third argument ensures the listener fires in the bubbling phase
    form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
            // Prevent submission and stop the event from bubbling if validation fails
            event.preventDefault();
            event.stopPropagation();
        } else {
            // All fields valid — in production this would trigger the payment request
            alert("Herzlichen Dank! Deine Spende hilft uns sehr. 🐾");
        }

         // Adding 'was-validated' triggers Bootstrap's visual feedback
        form.classList.add('was-validated');
    }, false);
});
