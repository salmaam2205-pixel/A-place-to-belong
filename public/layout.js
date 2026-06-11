// layout.js — navbar (Bootstrap) e footer condivisi, uguali su OGNI pagina.
// I link partono da "/" così funzionano sia dalla radice sia da sottocartelle (es. spenderportal/).
(function () {
  var page = location.pathname.split('/').pop() || 'index.html';
  function active(file) { return page === file ? ' active' : ''; }
  var privacyHref = page === 'adoption.html'
    ? '/datenschutz-adoption.html?return=' + encodeURIComponent(location.pathname + location.search)
    : '/datenschutz.html';
 
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
 
  var navMount = document.getElementById('site-nav');
  if (navMount) navMount.innerHTML = navbar;
  var footMount = document.getElementById('site-footer');
  if (footMount) footMount.innerHTML = footer;
})();