// app.js — laadt content uit Sanity en vult je HTML
// ProjectId uit jouw setup (van je screenshot eerder): fnxqcxz0
const SANITY_PROJECT_ID = "fnxqcxz0";
const SANITY_DATASET = "production";
const SANITY_API_VERSION = "2024-01-01";

function sanityQueryUrl(groq) {
  const encoded = encodeURIComponent(groq);
  return `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}?query=${encoded}`;
}

async function fetchSanity(groq) {
  const res = await fetch(sanityQueryUrl(groq), { cache: "no-store" });
  if (!res.ok) throw new Error(`Sanity query failed (${res.status})`);
  const json = await res.json();
  return json.result;
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value !== undefined && value !== null) el.textContent = value;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setBookingLinks(url) {
  if (!url) return;
  document.querySelectorAll("a.booking-link").forEach((a) => a.setAttribute("href", url));
}

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
  if (cardsWrap && Array.isArray(settings?.coachingCards)) {
    cardsWrap.innerHTML = settings.coachingCards
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
          <a class="btn ${c.featured ? "btn--primary" : "btn--outline"} btn--block" href="aanbod.html#coaching">
            Bekijk details
          </a>
        </div>`
      )
      .join("");
  }

  // Contact (over Lukas mag leeg blijven)
  setText("contactEmail", settings?.contactEmail);
  setText("contactPhone", settings?.contactPhone);
  setText("contactLocation", settings?.contactLocation);
  setText("aboutShort", settings?.aboutShort);
}

(async function init() {
  try {
    // Haal Site instellingen op
    const settings = await fetchSanity(`*[_type=="siteSettings"][0]{
      bookingUrl,
      tagline,
      heroTitle,
      heroLead,
      ctaBook,
      ctaOffer,
      offerIntro,
      coachingIntro,
      contactEmail,
      contactPhone,
      contactLocation,
      aboutShort,
      stats[]{title,text},
      coachingCards[]{name,featured,priceLabel,bullets}
    }`);

    if (settings?.bookingUrl) setBookingLinks(settings.bookingUrl);

    const path = window.location.pathname;
    if (path === "/" || path.endsWith("/index.html") || path.endsWith("/")) {
      fillHome(settings);
    }
  } catch (e) {
    console.error("Sanity load error:", e);
  }
})();
