const animals = [
  {
    name: "Bunny",
    age: "4 Monate",
    species: "Häschen",
    ageGroup: "Jung",
    size: "Klein",
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
    ageGroup: "Jung",
    size: "Klein",
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
    ageGroup: "Jung",
    size: "Klein",
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
    ageGroup: "Jung",
    size: "Klein",
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
  {
    name: "Cheddar",
    age: "3 Jahre",
    species: "Katze",
    ageGroup: "Erwachsen",
    size: "Mittelgroß",
    badge: "Katze",
    breed: "Orange Katze · Kurzhaar",
    desc: "Sehr gelassen und ruhig, liegt gerne entspannt auf dem Boden.",
    tags: ["Gelassen", "Entspannt"],
    image: "cheddar.jpeg",
    alt: "Cheddar"
  },
  {
    name: "Snowy",
    age: "9 Monate",
    species: "Häschen",
    ageGroup: "Jung",
    size: "Klein",
    badge: "Häschen",
    breed: "Neuseeländisches Kaninchen · Weiß",
    desc: "Sehr ruhig und sanft, kuschelt sich gerne in weiche Decken.",
    tags: ["Ruhig", "Sanft"],
    image: "white bunny.jpg",
    alt: "Snowy"
  },
  {
    name: "Otto",
    age: "2 Jahre",
    species: "Hund",
    ageGroup: "Jung",
    size: "Mittelgroß",
    badge: "Hund",
    breed: "American pit bull terrier",
    desc: "Sehr freundlich und aufgeschlossen, freut sich sichtlich über Aufmerksamkeit.",
    tags: ["Freundlich", "Aufgeschlossen"],
    image: "otto.jpg",
    alt: "Otto"
  },
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