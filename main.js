/**
 * Huvudscript för Vargöns MTB Uthyrning
 * Filen laddas med 'defer' i HTML, så DOM:en är redo när koden körs.
 */

let currentLang = "sv"; // Standard språk är svenska

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
    desc: {
      sv: "Bekväm trekkingcykel med lätt aluminiumram, många växlar och bekväm sittställning. Perfekt för cykelvägar, grusvägar och längre turer.",
      en: "Comfortable trekking bike with a lightweight aluminum frame, multiple gears, and a comfortable riding position. Perfect for bike paths, gravel roads, and longer rides.",
    },
    size: "one size",
    image: "public/damcykel.jpg",
  },
  {
    id: 2,
    name: "MERIDA Big Nine 20",
    type: "Hardtail",
    desc: {
      sv: "Lätt och smidig 29-tums mountainbike i storlek Large. Hydrauliska skivbromsar och dämpad framgaffel. Perfekt för både skogsstigar och grusvägar.",
      en: "Light and agile 29-inch mountain bike in large size. Hydraulic disc brakes and suspended front fork. Perfect for both forest trails and gravel roads.",
    },
    size: "L (177-190 cm)",
    image: "public/cykel-L.jpg",
  },
  {
    id: 3,
    name: "MERIDA Big Nine 20",
    type: "Hardtail",
    desc: {
      sv: "Lätt och smidig 29-tums mountainbike i storlek Medium. Hydrauliska skivbromsar och dämpad framgaffel. Perfekt för både skogsstigar och grusvägar.",
      en: "Light and agile 29-inch mountain bike in medium size. Hydraulic disc brakes and suspended front fork. Perfect for both forest trails and gravel roads.",
    },
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

// ==========================================
// SPRÅK & ÖVERSÄTTNINGAR (i18n)
// ==========================================
const translations = {
  sv: {
    // Navigation
    "nav-start": "Start",
    "nav-how": "Så funkar det",
    "nav-bikes": "Våra Cyklar",
    "nav-faq": "Frågor & Svar",
    "nav-location": "Hitta hit",
    "nav-contact": "Kontakt",
    // Hero-sektion
    "hero-title": "Ett äventyr på berget.",
    "hero-desc":
      "Hyr moderna, nyservade mountainbikes direkt via mobilen. Dygnet runt.",
    "hero-btn": "Boka din cykel nu",
    //How it works
    "how-title": "Så funkar det",
    "how-step1": "Boka online",
    "how-step1-desc":
      "Välj din cykel och datum direkt här på sidan. Betala snabbt och säkert. ",
    "how-step2": "Lås upp",
    "how-step2-desc":
      "Använd vår app på plats vid cykelboden för att låsa upp din valda cykel via Bluetooth. ",
    "how-step3": "Kör hårt",
    "how-step3-desc":
      "Ge dig ut på Vargöns grymma stigar. Njut av naturen och utrustningen i världsklass. ",
    "how-step4": "Återlämna",
    "how-step4-desc":
      "Återlämna cykeln på samma plats, lås via appen och du är klar!",
    // Our Bikes
    "bikes-title": "Våra Cyklar",
    "bikes-desc": "Vi har 8 grymma cyklar redo för stigarna.",
    "bikes-size-label": "Storlek:",
    "bikes-book-btn": "Boka",
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
    "how-title": "How it works",
    "how-step1-desc": "Choose your favorite bike and book it online.",
    "how-step1": "Book online",
    "how-step2": "Unlock",
    "how-step2-desc":
      "Use our app at the bike station to unlock your chosen bike via Bluetooth.",
    "how-step3": "Ride hard",
    "how-step3-desc":
      "Head out on Vargön's amazing trails. Enjoy the nature and world-class equipment.",
    "how-step4": "Return",
    "how-step4-desc":
      "Return the bike at the same location, lock it via the app, and you're done!",
    "bikes-title": "Our Bikes",
    "bikes-desc": "We have 8 awesome bikes ready for the trails.",
    "bikes-size-label": "Size:",
    "bikes-book-btn": "Book",
  },
};

// ==========================================
// SPRÅK-LOGIK (Dropdown & Byta text)
// ==========================================
const langToggleBtn = document.getElementById("lang-toggle");
const langMenu = document.getElementById("lang-menu");
const langText = document.getElementById("lang-text");
const langOptions = document.querySelectorAll(".lang-menu a");

if (langToggleBtn && langMenu) {
  // 1. Öppna/stäng dropdown när man klickar på knappen
  langToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Hindrar klicket från att "bubbla" upp
    langMenu.classList.toggle("show");
  });

  // 2. Klick på ett språk i listan
  langOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.preventDefault(); // Hindrar sidan från att hoppa högst upp

      const selectedLang = option.getAttribute("data-lang"); // "sv", "en" eller "de"

      changeLanguage(selectedLang);

      // Uppdatera texten på knappen till t.ex. "SV" (toUpperCase gör det till versaler)
      langText.innerText = selectedLang.toUpperCase();

      // Stäng menyn
      langMenu.classList.remove("show");
    });
  });

  // 3. Stäng menyn om man klickar var som helst annars på skärmen
  document.addEventListener("click", (e) => {
    if (!langToggleBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.classList.remove("show");
    }
  });
}

// Funktionen som gör grovjobbet (Samma som förut!)
function changeLanguage(lang) {
  currentLang = lang;

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      element.innerText = translations[lang][key];
    }
  });

  // Rita om dynamiska cykel-kort med det nya språket
  renderBikes();
}

function renderBikes() {
  const bikeGrid = document.getElementById("bike-grid");

  if (!bikeGrid) return;

  bikeGrid.innerHTML = "";

  // Loopa igenom arrayen och skapa HTML
  bikes.forEach((bike) => {
    const currentDesc = bike.desc[currentLang] || bike.desc["sv"];
    const sizeLabel =
      translations[currentLang]["bikes-size-label"] || "Storlek:";
    const bookBtnText = translations[currentLang]["bikes-book-btn"] || "Boka";

    const bikeCardHTML = `
      <div class="bike-card" data-id="${bike.id}">
        <div class="bike-badge">${bike.type}</div>
        
        <img src="${bike.image}" alt="${bike.name}" class="bike-image">
        
        <h3>${bike.name}</h3>
        <p>${currentDesc}</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${sizeLabel} ${bike.size}</p>
        <a href="#" class="btn" style="padding: 0.5rem 1rem; margin-top: 1rem;">${bookBtnText}</a>
      </div>
    `;

    bikeGrid.innerHTML += bikeCardHTML;
  });
}

// Kör funktionen när filen laddas
renderBikes();
