// /public/content-loader.js
// Only updates textContent, image src, or href of existing elements. No layout or style changes.

async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function setIfExists(selector, fn) {
  const el = document.querySelector(selector);
  if (el) fn(el);
}

function updateHero(data) {
  // Video or poster
  setIfExists('video.hero-bg', el => {
    if (data.heroVideoSrc) el.querySelector('source').src = data.heroVideoSrc;
    if (data.heroImageFallback) el.poster = data.heroImageFallback;
    el.load && el.load();
  });
  // CTA buttons
  setIfExists('.hero-actions a.btn.primary.red', el => {
    if (data.cta1Label) el.textContent = data.cta1Label;
    if (data.cta1Link) el.href = data.cta1Link;
  });
  setIfExists('.hero-actions a.btn.secondary.outline', el => {
    if (data.cta2Label) el.textContent = data.cta2Label;
    if (data.cta2Link) el.href = data.cta2Link;
  });
}

function updateRequestQuote(data) {
  setIfExists('.quote-video-title', el => { if (data.title) el.textContent = data.title; });
  setIfExists('.quote-video-text', el => { if (data.body) el.textContent = data.body; });
  setIfExists('.quote-video-section .hero-actions a.btn.primary.red', el => {
    if (data.buttonLabel) el.textContent = data.buttonLabel;
    if (data.buttonLink) el.href = data.buttonLink;
  });
  setIfExists('.quote-video-section .hero-media img.quote-shadow', el => {
    if (data.backgroundImageSrc) el.src = data.backgroundImageSrc;
  });
}

function updateTestimonials(data) {
  if (!Array.isArray(data.testimonials)) return;
  const cards = document.querySelectorAll('.companies-grid .testimonial-card');
  data.testimonials.forEach((item, i) => {
    const card = cards[i];
    if (!card) return;
    setIfExists('.testimonial-title', el => { if (item.quoteTitle) el.textContent = item.quoteTitle; }, card);
    setIfExists('.testimonial-body', el => { if (item.quoteBody) el.textContent = item.quoteBody; }, card);
    setIfExists('.testimonial-name', el => { if (item.name) el.textContent = item.name; }, card);
    setIfExists('.testimonial-location', el => { if (item.city) el.textContent = item.city; }, card);
    setIfExists('.testimonial-tag', el => { if (item.industryTag) el.textContent = item.industryTag; }, card);
  });
}

function updateNews(data) {
  if (!Array.isArray(data.news)) return;
  const cards = document.querySelectorAll('.featured-grid .featured-card');
  data.news.forEach((item, i) => {
    const card = cards[i];
    if (!card) return;
    setIfExists('.featured-image img', el => { if (item.imageSrc) el.src = item.imageSrc; }, card);
    setIfExists('h4', el => { if (item.title) el.textContent = item.title; }, card);
    setIfExists('p', el => { if (item.excerpt) el.textContent = item.excerpt; }, card);
    setIfExists('a.featured-explore', el => { if (item.link) el.href = item.link; }, card);
  });
}

// Helper to allow context element
function setIfExists(selector, fn, context) {
  const el = (context || document).querySelector(selector);
  if (el) fn(el);
}

async function runContentLoader() {
  const hero = await fetchJSON('/public/content/hero.json');
  if (hero) updateHero(hero);
  const rq = await fetchJSON('/public/content/request-quote.json');
  if (rq) updateRequestQuote(rq);
  const testimonials = await fetchJSON('/public/content/testimonials.json');
  if (testimonials) updateTestimonials(testimonials);
  const news = await fetchJSON('/public/content/news.json');
  if (news) updateNews(news);
}

document.addEventListener('DOMContentLoaded', runContentLoader);
