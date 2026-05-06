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
    breed: "Hauskatze · Weiß und Grau",
    desc: "Sehr süß, liebt es gestreichelt zu werden. Ruhiges Temperament.",
    tags: ["Ruhig", "Wohnungskatze"],
    image: "kitten.jpg",
    alt: "Lily"
  },
  {
    name: "Xandi",
    age: "3 Monate",
    species: "hund",
    ageGroup: "jung",
    size: "klein",
    badge: "Hund",
    breed: "Langhaariger Deutscher Schäferhund",
    desc: "Aktiv und verspielt, liebt lange Spaziergänge und neue Abenteuer.",
    tags: ["Aktiv", "Naturliebhaber"],
    adoption: true, //giá stato adottato
    image: "xandi.jpeg",
    alt: "Xandi"
  }
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