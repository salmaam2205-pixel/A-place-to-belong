// layout.js — gemeinsame Navbar (Bootstrap) und Footer, identisch auf JEDER Seite.
//
// Zweck: Statt Navbar/Footer in jede HTML-Datei zu kopieren, wird hier ein
// HTML-String erzeugt und per JavaScript in die Elemente #site-nav / #site-footer
// eingefügt. So muss eine Änderung (z. B. neuer Menüpunkt) nur an EINER Stelle
// gemacht werden und wirkt sich auf alle Seiten aus.
//
// Wichtig: Alle Links beginnen mit "/" (root-relative), damit sie sowohl von der
// Startseite als auch aus Unterordnern (z. B. /spenderportal/) korrekt funktionieren.
// Das setzt voraus, dass die Seite über den Server (npm start, localhost:3000)
// aufgerufen wird — nicht per Doppelklick auf die Datei (file://...).
(function () {
  // Aktuelle Seite anhand der URL ermitteln (z. B. "adoption.html")
  var page = location.pathname.split('/').pop() || 'index.html';

  // Hilfsfunktion: gibt " active" zurück, wenn "file" der aktuellen Seite entspricht
  // (wird genutzt, um den aktiven Navbar-Eintrag optisch hervorzuheben)
  function active(file) { return page === file ? ' active' : ''; }

  // Der "Datenschutzerklärung"-Link im Footer soll nach dem Lesen wieder zur
  // ursprünglichen Seite zurückführen. Deshalb wird je nach aktueller Seite
  // ein passender ?return=... Parameter mit der aktuellen URL angehängt:
  // - auf adoption.html  → datenschutz-adoption.html (mit Rücksprung zum Formular)
  // - auf spende.html    → datenschutz.html (mit Rücksprung zum Spendenformular)
  // - auf allen anderen Seiten → einfacher Link ohne Rücksprung
  var privacyHref = page === 'adoption.html'
    ? '/datenschutz-adoption.html?return=' + encodeURIComponent(location.pathname + location.search)
    : page === 'spende.html'
      ? '/datenschutz.html?return=' + encodeURIComponent(location.pathname + location.search)
      : '/datenschutz.html';
 
  // NAVBAR: Bootstrap-Navbar mit Logo, Links zu Home/Tiere und einem
  // hervorgehobenen "Jetzt Spenden"-Button. Die Klasse "active" wird
  // dynamisch über die Funktion active() gesetzt, um die aktuelle Seite
  // in der Navigation hervorzuheben.
  var navbar = `
  <nav class="navbar navbar-expand-lg fixed-top apb-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="/index.html">🐾 A Place to Belong</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#apbNav" aria-controls="apbNav"
              aria-expanded="false" aria-label="Menu">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="apbNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
          <li class="nav-item"><a class="nav-link${active('index.html')}" href="/index.html">Home</a></li>
          <li class="nav-item"><a class="nav-link${active('gallery.html')}" href="/gallery.html">Tiere</a></li>
          <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
            <a class="apb-cta" href="/spenderportal/spende.html">Jetzt Spenden</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;
 
  // FOOTER: enthält Logo/Beschreibung, Navigationslinks, den dynamischen
  // Datenschutz-Link (privacyHref) sowie statische Kontaktinformationen.
  var footer = `
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-brand">
        <span class="footer-logo">🐾 A Place to Belong</span>
        <p>Eine Web-Plattform für Tierheime und Tieradoptionen. Entwickelt mit ❤️ von Eleonora, Maria Pia, Salma &amp; Mihaela.</p>
      </div>
      <div class="footer-links">
        <h4>Navigation</h4>
        <ul>
          <li><a href="/index.html">Home</a></li>
          <li><a href="/gallery.html">Tiergalerie</a></li>
          <li><a href="/spenderportal/spende.html">Spenden</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Info</h4>
        <ul>
          <li><a href="${privacyHref}">Datenschutzerklärung</a></li>
        </ul>
      </div>
      <div class="footer-links">
        <h4>Kontakt</h4>
        <ul>
          <li>0471 123 456</li>
          <li>+39 347 123 4567</li>
          <li>+39 339 987 6228</li>
          <li><a href="mailto:info@aplacetobelong.it">info@aplacetobelong.it</a></li>
          <li>NoiTechPark straße, Bozen</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 A Place to Belong · Free University of Bozen-Bolzano · WIE Projekt</p>
    </div>
  </footer>`;
 
  // EINFÜGEN IN DIE SEITE
  // Falls die Container-Elemente <div id="site-nav"> bzw. <div id="site-footer">
  // auf der aktuellen Seite vorhanden sind, wird der erzeugte HTML-String dort
  // eingefügt (innerHTML). Die Prüfung "if (...)" verhindert einen Fehler,
  // falls eine Seite einen der beiden Container nicht enthält.
  var navMount = document.getElementById('site-nav');
  if (navMount) navMount.innerHTML = navbar;
  var footMount = document.getElementById('site-footer');
  if (footMount) footMount.innerHTML = footer;
})();