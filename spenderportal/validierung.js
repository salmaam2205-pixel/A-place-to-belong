(function () {
  'use strict'
  const form = document.querySelector('#donationForm')

  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }
    form.classList.add('was-validated')
  }, false)
})()
