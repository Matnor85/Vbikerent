// Just nu använder vi CSS för smooth scrolling, men här kommer du
// lägga in koden för hamburgermenyn när vi anpassar sidan för mobiler!
console.log("Sidan är laddad och redo att byggas vidare på!");

// ==========================================
// HAMBURGERMENY (MOBIL)
// ==========================================
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const menuLinks = document.querySelectorAll("#nav-menu li a");

// Öppna/stäng menyn när man klickar på hamburgarikonen
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("toggle"); // Animerar ikonen till ett X
});

// Stäng menyn automatiskt när man klickar på en länk (smooth scroll gör resten)
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("toggle");
  });
});

// 1. Hämta alla sektioner på sidan och alla länkar i menyn
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

// 2. Skapa vår "observatör"
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Betyder: "Agera när minst 50% av sektionen syns på skärmen"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // Om sektionen korsar skärmen (är synlig)
    if (entry.isIntersecting) {
      // Hämta ID:t på sektionen vi tittar på just nu (t.ex. "bikes")
      const currentId = entry.target.getAttribute("id");

      // Loopa igenom alla meny-länkar
      navLinks.forEach((link) => {
        // Ta först bort "active"-klassen från ALLA länkar
        link.classList.remove("active");

        // Om länkens href (t.ex. "#bikes") matchar sektionens ID...
        if (link.getAttribute("href") === `#${currentId}`) {
          // ...lägg till "active"-klassen på just denna länk!
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

// 3. Säg åt observatören att börja titta på alla sektioner
sections.forEach((section) => {
  observer.observe(section);
});
// ==========================================
// CYKEL-DATA OCH DYNAMISK RENDERING
// ==========================================

// 1. Vår "databas" - En array med objekt för cyklarna
const bikes = [
  {
    id: 1,
    name: "Hardtail Trailblazer",
    type: "Hardtail",
    desc: "Perfekt för snabba grusvägar och enklare skogsstigar. Lätt och följsam.",
    size: "M (165-178 cm)",
  },
  {
    id: 2,
    name: "XC Carbon Flyer",
    type: "Hardtail",
    desc: "Fjäderlätt kolfiberram för tävlingscyklisten. Maximerar kraftöverföringen i varje tramptag och flyger uppför backarna.",
    size: "S (155-168 cm)",
  },
  {
    id: 3,
    name: "Enduro Beast",
    type: "Full Suspension",
    desc: "Heldämpad herre på täppan. Sväljer alla rötter, stenar och drop i Vargöns skogar.",
    size: "M (170-183 cm)",
  },
  {
    id: 4,
    name: "Downhill Destroyer",
    type: "Full Suspension",
    desc: "Aggressiv geometri och massiv slaglängd. Specialbyggd för att krossa stenkistor och flyga nerför bikeparken.",
    size: "L (180-195 cm)",
  },
  {
    id: 5,
    name: "All-Mountain Explorer",
    type: "Full Suspension",
    desc: "Den perfekta allround-maskinen. Klättrar som en get uppför berget och ger grymt självförtroende på vägen ner.",
    size: "XL (190-205 cm)",
  },
  {
    id: 6,
    name: "Electric Mud-Trekker",
    type: "e-MTB",
    desc: "Utrustad med en kraftfull elmotor som ger dig den där extra knuffen uppför de brantaste branterna. Lekfull i alla terränger.",
    size: "L (178-192 cm)",
  },
  {
    id: 7,
    name: "Dirt Jumper Pro",
    type: "Dirt/Street",
    desc: "Avskalad och robust design, byggd för att ta stryk i pumptracken eller på dirtjumpsen. Maximerad för luftfärder.",
    size: "One Size",
  },
  // Här kan du enkelt fylla på med cykel 5 till 11 när du vet exakt vad han har!
];

// 2. Funktion som skapar och injicerar HTML-korten på sidan
function renderBikes() {
  const bikeGrid = document.getElementById("bike-grid");

  // Säkerhetsåtgärd så koden inte kraschar om vi råkar byta namn på ID:t i HTML
  if (!bikeGrid) return;

  // Rensa containern först (bra praxis)
  bikeGrid.innerHTML = "";

  // Loopa igenom arrayen och skapa HTML för varje cykel
  bikes.forEach((bike) => {
    const bikeCardHTML = `
      <div class="bike-card" data-id="${bike.id}">
        <div class="bike-badge">${bike.type}</div>
        <h3>${bike.name}</h3>
        <p>${bike.desc}</p>
        <p style="font-size: 0.85rem; color: #888; margin-top: 0.5rem;">Storlek: ${bike.size}</p>
        <a href="#" class="btn" style="padding: 0.5rem 1rem; margin-top: 1rem;">Boka denna</a>
      </div>
    `;

    // Lägg till kortet i vår grid
    bikeGrid.innerHTML += bikeCardHTML;
  });
}

// 3. Kör funktionen direkt när filen laddas (eftersom vi har 'defer' i HTML är DOM:en redo)
renderBikes();
