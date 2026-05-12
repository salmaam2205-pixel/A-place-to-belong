const animals = [
  {
    name: "Bunny",
    age: "9 Monate",
    species: "Häschen",
    ageGroup: "jung",
    size: "klein",
    badge: "Häschen",
    breed: "Nederlandse Hangoordwergen",
    desc: "Stubenrein und mit ganz viel Charakter ausgestattet, ist es bereit, dein Herz im Sturm zu erobern.",
    tags: ["Sozial", "Neugierig"],
    image: "bunny.jpg",
    alt: "Bunny"
  },
  {
    name: "Lily",
    age: "2 Monate",
    species: "Katze",
    ageGroup: "jung",
    size: "klein",
    badge: "Katze",
    breed: "Kleine Schildpattkatze",
    desc: "Sehr süß, liebt es gestreichelt zu werden. Ruhiges Temperament.",
    tags: ["Ruhig", "Wohnungskatze"],
    image: "gattino_ele.jpeg",
    alt: "Lily"
  },
  {
    name: "Xandi",
    age: "3 Monate",
    species: "Hund",
    ageGroup: "jung",
    size: "klein",
    badge: "Hund",
    breed: "Langhaariger Deutscher Schäferhund",
    desc: "Aktiv und verspielt, liebt lange Spaziergänge und neue Abenteuer.",
    tags: ["Aktiv", "Naturliebhaber"],
    image: "xandi.jpeg",
    alt: "Xandi"
  },
  {
    name: "Jack",
    age: "3 Monate",
    species: "Hund",
    ageGroup: "jung",
    size: "klein",
    badge: "Hund",
    breed: "Eine Mischung zweier Bullterrier-Rassen, höchstwahrscheinlich ein American Pit Bull Terrier oder ein American Staffordshire",
    desc: "Ein süßer grau-weißer Welpe, der sich im Gras ausruht. Bereit für ein neues, liebevolles Zuhause.",
    tags: ["Entspannt", "Aufmerksam"],
    image: "puppy 2.jpg",
    alt: "Jack"
  },
  {
    name: "Luna",
    age: "6 Jahre",
    species: "Katze",
    ageGroup: "Erwachsen",
    size: "Mittelgroß",
    badge: "Katze",
    breed: "Hauskatze · Weiß und Grau",
    desc: "Sehr zutraulich, genießt Streicheleinheiten.",
    tags: ["Verschmust","Zutraulich"],
    image: "stray-white-kitty.jpg",
    alt: "Luna"
  },
  {
    name: "Ruby",
    age: "8 Jahre",
    species: "Hund",
    ageGroup: "Senior",
    size: "Groß",
    badge: "Hund",
    breed: "Rottweiler-Labrador-Mix",
    desc: "Sehr fröhlich und aufmerksam, genießt die Zeit im Freien.",
    tags: ["Fröhlich", "Aufmerksam"],
    image: "senior dog Kiya.jpg",
    alt: "Ruby"
  },
  // Add more animals...
];

function renderAnimalCard(animal) {
  return `
    <article class="animal-card" data-species="${animal.species}" data-age="${animal.ageGroup}" data-size="${animal.size}">
      <div class="card-img-wrap" style="height:220px">
        <img src="${animal.image}" alt="${animal.alt}" />
        <span class="card-badge">${animal.badge}</span>
        <div class="card-hover-info"><a href="#" class="btn-card">Profil ansehen</a></div>
      </div>
      <div class="card-body">
        <div class="card-meta"><span class="card-name">${animal.name}</span><span class="card-age">${animal.age}</span></div>
        <p class="card-breed">${animal.breed}</p>
        <p class="card-desc">${animal.desc}</p>
        <div class="card-tags">${animal.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
      </div>
    </article>
  `;
}