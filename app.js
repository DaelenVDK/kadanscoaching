// app.js — laadt content uit Sanity en vult index + aanbod (met fallback)

const SANITY_PROJECT_ID = "fnxqcxz0";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-01-01";

// Fallback content: site blijft werken als Sanity faalt / traag is
const FALLBACK = {
  bookingUrl: "https://voorbeeld-boekingssysteem.be",
  tagline: "Coaching • Lactaattesting • Performance",
  heroTitle: "Train slimmer met data die écht iets zegt",
  heroLead:
    "Lactaattesting, prestatieanalyse en coaching voor lopers en fietsers. Op basis van objectieve data krijg je duidelijke trainingszones en een plan dat werkt voor jouw doel.",
  ctaBook: "Boek je afspraak",
  ctaOffer: "Bekijk aanbod",
  offerIntro:
    "Ontdek het aanbod aan lactaattesten, prestatieanalyses en coaching. Klik op een dienst voor de volledige uitleg.",
  coachingIntro:
    "Persoonlijke coaching op maat, gebaseerd op data en afgestemd op jouw doelen.",
  stats: [
    { title: "Coaching", text: "3 pakketten (gratis intake)" },
    { title: "Testing", text: "Lopen & fietsen" },
    { title: "Focus", text: "Performance & progressie" },
  ],
  coachingCards: [
    {
      name: "Pakket 1",
      featured: false,
      priceLabel: "€60 / maand",
      bullets: ["Min. 3 maanden", "Gratis intake", "Schema’s + platform"],
    },
    {
      name: "Pakket 2",
      featured: true,
      priceLabel: "€80 / maand",
      bullets: ["Min. 6 maanden", "Gratis intake", "Wekelijkse feedback"],
    },
    {
      name: "Pakket 3",
      featured: false,
      priceLabel: "€100 / maand",
      bullets: ["Min. 6 maanden", "Gratis intake", "Ongelimiteerde communicatie"],
    },
  ],

  // header fallback
  brandName: "Lukas Denolf",
  headerBookingText: "Boek afspraak",
  instagramUrl: "https://www.instagram.com/kadanscoaching/",
  instagramText: "Volg ons",
  brandTaglineAanbod: "Aanbod — details",
  headerBackText: "← Terug",
  navHomeOffer: "Aanbod",
  navHomeCoaching: "Coaching",
  navHomeAppointment: "Afspraak",
  navHomeContact: "Contact",
  navAanbodFiets: "Fiets",
  navAanbodLopen: "Lopen",
  navAanbodMetabool: "Metabool",
  navAanbodCoaching: "Coaching",
};

function sanityQueryUrl(groq) {
  const encoded = encodeURIComponent(groq);
  return `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encoded}`;
}

// Fetch met timeout zodat de site niet “hangt”
async function fetchSanity(groq, timeoutMs = 6000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(sanityQueryUrl(groq), {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`Sanity query failed (${res.status})`);

    const json = await res.json();
    return json.result;
  } finally {
    clearTimeout(timeout);
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setBookingLinks(url) {
  if (!url) return;
  document.querySelectorAll("a.booking-link").forEach((a) => {
    a.setAttribute("href", url);
  });
}

/* =========================
   HEADER
========================= */
function fillHeader(settings) {
  // brand
  setText("brandName", settings?.brandName);

  // home tagline (bestaat enkel op index)
  setText("brandTagline", settings?.tagline);

  // aanbod tagline (bestaat enkel op aanbod / sommige pagina's)
  setText("brandTaglineAanbod", settings?.brandTaglineAanbod);

  // header buttons
  setText("headerBookText", settings?.headerBookingText);
  setText("instagramText", settings?.instagramText);

  const ig = document.getElementById("instagramLink");
  if (ig && settings?.instagramUrl) ig.setAttribute("href", settings.instagramUrl);

  setText("headerBackText", settings?.headerBackText);

  // nav home labels
  setText("navHomeOffer", settings?.navHomeOffer);
  setText("navHomeCoaching", settings?.navHomeCoaching);
  setText("navHomeAppointment", settings?.navHomeAppointment);
  setText("navHomeContact", settings?.navHomeContact);

  // nav aanbod labels
  setText("navAanbodFiets", settings?.navAanbodFiets);
  setText("navAanbodLopen", settings?.navAanbodLopen);
  setText("navAanbodMetabool", settings?.navAanbodMetabool);
  setText("navAanbodCoaching", settings?.navAanbodCoaching);
}

/* =========================
   INDEX (home)
========================= */
function fillHome(settings) {
  // Header
  setText("brandTagline", settings?.tagline);

  // Hero
  setText("heroTitle", settings?.heroTitle);
  setText("heroLead", settings?.heroLead);
  setText("ctaBookText", settings?.ctaBook);
  setText("ctaOfferText", settings?.ctaOffer);

  // Stats
  const statsWrap = document.getElementById("heroStats");
  if (statsWrap && Array.isArray(settings?.stats)) {
    statsWrap.innerHTML = settings.stats
      .map(
        (s) => `
        <div class="stat">
          <div class="stat-title">${escapeHtml(s.title || "")}</div>
          <div class="stat-text">${escapeHtml(s.text || "")}</div>
        </div>`
      )
      .join("");
  }

  // Intro’s
  setText("offerIntro", settings?.offerIntro);
  setText("coachingIntro", settings?.coachingIntro);

  // Coaching cards (home)
  const cardsWrap = document.getElementById("coachingCards");
  if (cardsWrap) {
    const cards = Array.isArray(settings?.coachingCards)
      ? settings.coachingCards
      : [];

    const safeCards = cards.length >= 3 ? cards : FALLBACK.coachingCards;

    cardsWrap.innerHTML = safeCards
      .map(
        (c) => `
        <div class="package ${c.featured ? "featured" : ""}">
          <div class="package-top">
            <h3>${escapeHtml(c.name || "")}</h3>
            <span class="tag">${escapeHtml(c.priceLabel || "")}</span>
          </div>
          <ul>
            ${(c.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
          </ul>
          <a class="btn ${c.featured ? "btn--primary" : "btn--outline"} btn--block" href="coaching.html">
            Bekijk details
          </a>
        </div>`
      )
      .join("");
  }

  // Contact
  setText("contactEmail", settings?.contactEmail);
  setText("contactPhone", settings?.contactPhone);
  setText("contactLocation", settings?.contactLocation);
  setText("aboutShort", settings?.aboutShort);
}

/* =========================
   AANBOD/TESTING (diensten)
========================= */
function fillServices(services) {
  if (!Array.isArray(services)) return;

  services.forEach((service) => {
    const id = service?.serviceId;
    if (!id) return;

    setText(`${id}-title`, service.title);
    setText(`${id}-desc`, service.description);
    setText(`${id}-price`, service.price);
    setText(`${id}-duration`, service.duration);
    setText(`${id}-sideTitle`, service.sideTitle);
    setText(`${id}-sideText`, service.sideText);

    // tweede sidebar blok
    setText(`${id}-sideTitle2`, service.sideTitle2);
    setText(`${id}-sideText2`, service.sideText2);

    const bulletsEl = document.getElementById(`${id}-bullets`);
    if (bulletsEl && Array.isArray(service.bullets)) {
      bulletsEl.innerHTML = service.bullets
        .map((b) => `<li>${escapeHtml(b)}</li>`)
        .join("");
    }
  });
}

/* =========================
   REVIEWS SLIDESHOW
========================= */
function renderReviews(reviews) {
  const container = document.getElementById("reviewSlides");
  if (!container || !Array.isArray(reviews) || reviews.length === 0) return;

  container.innerHTML = reviews
    .map(
      (r, i) => `
      <div class="review ${i === 0 ? "active" : ""}">
        <div class="review-name">${escapeHtml(r.name || "")}</div>
        <div class="review-stars">${"★".repeat(Number(r.stars) || 0)}</div>
        <div class="review-text">“${escapeHtml(r.text || "")}”</div>
      </div>
    `
    )
    .join("");

  let index = 0;
  const slides = container.querySelectorAll(".review");
  if (!slides.length) return;

  const prevBtn = document.getElementById("reviewPrev");
  const nextBtn = document.getElementById("reviewNext");

  prevBtn?.addEventListener("click", () => {
    slides[index].classList.remove("active");
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add("active");
  });

  nextBtn?.addEventListener("click", () => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  });
}

/* =========================
   INIT
========================= */
(async function init() {
  const isHome = !!document.getElementById("coachingCards");
  const isAanbod = !!document.getElementById("aanbodIntro"); // gebruikt door testing.html & (truc) over-ons.html
  const hasReviews = !!document.getElementById("reviewSlides");

  // fallback
  if (isHome) fillHome(FALLBACK);
  setBookingLinks(FALLBACK.bookingUrl);

  // header fallback op elke pagina
  fillHeader(FALLBACK);

  try {
    // ✅ siteSettings: pak altijd de meest recent aangepaste (belangrijk als je per ongeluk 2 docs hebt)
    const settings = await fetchSanity(`*[_type=="siteSettings"] | order(_updatedAt desc)[0]{
      bookingUrl,

      // header
      brandName,
      headerBookingText,
      instagramUrl,
      instagramText,
      brandTaglineAanbod,
      headerBackText,
      navHomeOffer,
      navHomeCoaching,
      navHomeAppointment,
      navHomeContact,
      navAanbodFiets,
      navAanbodLopen,
      navAanbodMetabool,
      navAanbodCoaching,

      // bestaand
      tagline,
      heroTitle,
      heroLead,
      ctaBook,
      ctaOffer,
      offerIntro,
      coachingIntro,
      aanbodIntro,
      coachingAanbodDesc,
      overLukasText,
      contactEmail,
      contactPhone,
      contactLocation,
      aboutShort,
      stats[]{title,text},
      coachingCards[]{name,featured,priceLabel,bullets}
    }`);

    if (settings) {
      setBookingLinks(settings.bookingUrl || FALLBACK.bookingUrl);

      // header uit Sanity op elke pagina
      fillHeader({ ...FALLBACK, ...settings });

      if (isHome) {
        fillHome({ ...FALLBACK, ...settings });
      }

      // testing/over-ons placeholders
      if (isAanbod) {
        setText("aanbodIntro", settings.aanbodIntro);
        setText("coaching-desc", settings.coachingAanbodDesc);
        setText("overLukasText", settings.overLukasText);
      }
    }

    // Diensten ophalen voor testing.html én voor index-cards
    if (isAanbod || isHome) {
      const services = await fetchSanity(`*[_type=="service"] | order(_createdAt asc){
        serviceId,
        title,
        description,
        cardText,
        price,
        duration,
        bullets,
        sideTitle,
        sideText,
        sideTitle2,
        sideText2
      }`);

      // testing.html details vullen
      if (isAanbod) {
        fillServices(services);
      }

      // index.html cards vullen (placeholders)
      if (isHome && Array.isArray(services)) {
        services.forEach((s) => {
          const id = s?.serviceId;
          if (!id) return;

          const short =
            (typeof s.cardText === "string" && s.cardText.trim()) ||
            (typeof s.description === "string" &&
              s.description.trim().split("\n")[0].trim()) ||
            null;

          setText(`kaart-${id}-desc`, short);
        });
      }
    }

    // Reviews ophalen (alleen als de sectie bestaat)
    if (hasReviews) {
      const reviews = await fetchSanity(`*[_type=="review"] | order(_createdAt asc){
        name,
        stars,
        text
      }`);

      renderReviews(reviews);
    }
  } catch (e) {
    console.warn("Sanity niet bereikbaar — fallback gebruikt:", e?.message || e);
  }
})();

// Automatische slideshow - Lactaattest lopen
(function () {
  const slideshow = document.querySelector("#lactaat-loop .auto-slideshow");
  if (!slideshow) return;

  const images = slideshow.querySelectorAll("img");
  let index = 0;

  setInterval(() => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  }, 4000); // wissel elke 4 seconden
})();

/* =========================
   HAMBURGER MENU (mobile)
========================= */
(function () {
  const header = document.querySelector(".site-header");
  const btn = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");

  if (!header || !btn || !nav) return;

  function closeMenu() {
    header.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close when clicking a link
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!header.classList.contains("nav-open")) return;
    if (header.contains(e.target)) return;
    closeMenu();
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();