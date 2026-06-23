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
    name: "TREK T300",
    type: "Hybrid",
    desc: "Perfekt för snabba grusvägar och enklare skogsstigar. Lätt och följsam.",
    size: "one size",
    image: "public/damcykel.jpg",
  },
  {
    id: 2,
    name: "MERIDA Big Nine 20",
    type: "Hardtail",
    desc: "Fjäderlätt kolfiberram för tävlingscyklisten. Maximerar kraftöverföringen i varje tramptag och flyger uppför backarna.",
    size: "L (177-190 cm)",
    image: "public/cykel-L.jpg",
  },
  {
    id: 3,
    name: "MERIDA Big Nine 20",
    type: "Hardtail",
    desc: "Heldämpad herre på täppan. Sväljer alla rötter, stenar och drop i Vargöns skogar.",
    size: "M (167-183 cm)",
    image: "public/cykel-M.jpg",
  },
  // {
  //   id: 4,
  //   name: "Downhill Destroyer",
  //   type: "Full Suspension",
  //   desc: "Aggressiv geometri och massiv slaglängd. Specialbyggd för att krossa stenkistor och flyga nerför bikeparken.",
  //   size: "L (180-195 cm)",
  //   image: "public/damcykel.jpg",
  // },
  // {
  //   id: 5,
  //   name: "All-Mountain Explorer",
  //   type: "Full Suspension",
  //   desc: "Den perfekta allround-maskinen. Klättrar som en get uppför berget och ger grymt självförtroende på vägen ner.",
  //   size: "XL (190-205 cm)",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPr6Jo0S1gvP5HKRJ5475qweIqez18T_7-U8omRxTXMg&s",
  // },
  // {
  //   id: 6,
  //   name: "Electric Mud-Trekker",
  //   type: "e-MTB",
  //   desc: "Utrustad med en kraftfull elmotor som ger dig den där extra knuffen uppför de brantaste branterna. Lekfull i alla terränger.",
  //   size: "L (178-192 cm)",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA4Q64BsNED4vpAg7Z0ckJd0AaNmen93Nxs3np1wlT0w&s",
  // },
  // {
  //   id: 7,
  //   name: "Dirt Jumper Pro",
  //   type: "Dirt/Street",
  //   desc: "Avskalad och robust design, byggd för att ta stryk i pumptracken eller på dirtjumpsen. Maximerad för luftfärder.",
  //   size: "One Size",
  //   image:
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ4_asF5DtAUAF_Zeq37UUoB-uEd6jhckVdBFIRr2fSg&s",
  // },
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

// ==========================================
// SPRÅK & ÖVERSÄTTNINGAR (i18n)
// ==========================================
const translations = {
  sv: {
    "nav-start": "Start",
    "nav-how": "Så funkar det",
    "nav-bikes": "Våra Cyklar",
    "nav-faq": "Frågor & Svar",
    "nav-location": "Hitta hit",
    "nav-contact": "Kontakt",
    "hero-title": "Ett äventyr på berget.",
    "hero-desc":
      "Hyr moderna, nyservade mountainbikes direkt via mobilen. Dygnet runt.",
    "hero-btn": "Boka din cykel nu",
  },
  en: {
    "nav-start": "Home",
    "nav-how": "How it works",
    "nav-bikes": "Our Bikes",
    "nav-faq": "Questions & Answers",
    "nav-location": "Find Us",
    "nav-contact": "Contact",
    "hero-title": "An adventure on the mountain.",
    "hero-desc":
      "Rent modern, newly serviced mountain bikes directly via your phone. 24/7.",
    "hero-btn": "Book your bike now",
  },
};
