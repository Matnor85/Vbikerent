/**
 * Huvudscript för Vargöns MTB Uthyrning
 * Filen laddas med 'defer' i HTML, så DOM:en är redo när koden körs.
 */

// ==========================================
// 1. MOBILMENY (HAMBURGARE)
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

// ==========================================
// 2. SCROLLSPY (MARKERA AKTIV LÄNK I MENYN)
// ==========================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5, // Agera när minst 50% av sektionen syns på skärmen
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentId = entry.target.getAttribute("id");

      // Loopa igenom alla meny-länkar och uppdatera aktiv klass
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

// Säg åt observatören att börja titta på alla sektioner
sections.forEach((section) => {
  observer.observe(section);
});

// ==========================================
// 3. CYKEL-DATA OCH DYNAMISK RENDERING
// ==========================================
const bikes = [
  {
    id: 1,
    name: "Hardtail Trailblazer",
    type: "Hardtail",
    desc: "Perfekt för snabba grusvägar och enklare skogsstigar. Lätt och följsam.",
    size: "M (165-178 cm)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIwUukYvmVW8Oc0jyYc77kwJMLwErfkV4Q7JPF42TAEw&s",
  },
  {
    id: 2,
    name: "XC Carbon Flyer",
    type: "Hardtail",
    desc: "Fjäderlätt kolfiberram för tävlingscyklisten. Maximerar kraftöverföringen i varje tramptag och flyger uppför backarna.",
    size: "S (155-168 cm)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLpmMAvhYIQbfagHaKV1_mZZOmsto5d9cMe_fDfh1qQA&s",
  },
  {
    id: 3,
    name: "Enduro Beast",
    type: "Full Suspension",
    desc: "Heldämpad herre på täppan. Sväljer alla rötter, stenar och drop i Vargöns skogar.",
    size: "M (170-183 cm)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD1eSyexDrQJzRY4dwcUUG96QLTKo242xE2TTT5_8l9g&s",
  },
  {
    id: 4,
    name: "Downhill Destroyer",
    type: "Full Suspension",
    desc: "Aggressiv geometri och massiv slaglängd. Specialbyggd för att krossa stenkistor och flyga nerför bikeparken.",
    size: "L (180-195 cm)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ7YUhWmNQLd16Gcyo7k6Ydb_PivkTJIMphubn9853aw&s",
  },
  {
    id: 5,
    name: "All-Mountain Explorer",
    type: "Full Suspension",
    desc: "Den perfekta allround-maskinen. Klättrar som en get uppför berget och ger grymt självförtroende på vägen ner.",
    size: "XL (190-205 cm)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPr6Jo0S1gvP5HKRJ5475qweIqez18T_7-U8omRxTXMg&s",
  },
  {
    id: 6,
    name: "Electric Mud-Trekker",
    type: "e-MTB",
    desc: "Utrustad med en kraftfull elmotor som ger dig den där extra knuffen uppför de brantaste branterna. Lekfull i alla terränger.",
    size: "L (178-192 cm)",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4Q64BsNED4vpAg7Z0ckJd0AaNmen93Nxs3np1wlT0w&s",
  },
  {
    id: 7,
    name: "Dirt Jumper Pro",
    type: "Dirt/Street",
    desc: "Avskalad och robust design, byggd för att ta stryk i pumptracken eller på dirtjumpsen. Maximerad för luftfärder.",
    size: "One Size",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ4_asF5DtAUAF_Zeq37UUoB-uEd6jhckVdBFIRr2fSg&s",
  },
];

function renderBikes() {
  const bikeGrid = document.getElementById("bike-grid");

  if (!bikeGrid) return;

  bikeGrid.innerHTML = "";

  // Loopa igenom arrayen och skapa HTML
  bikes.forEach((bike) => {
    const bikeCardHTML = `
      <div class="bike-card" data-id="${bike.id}">
        <div class="bike-badge">${bike.type}</div>
        
        <img src="${bike.image}" alt="${bike.name}" class="bike-image">
        
        <h3>${bike.name}</h3>
        <p>${bike.desc}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">Storlek: ${bike.size}</p>
        <a href="#" class="btn" style="padding: 0.5rem 1rem; margin-top: 1rem;">Boka</a>
      </div>
    `;

    bikeGrid.innerHTML += bikeCardHTML;
  });
}

// Kör funktionen när filen laddas
renderBikes();
